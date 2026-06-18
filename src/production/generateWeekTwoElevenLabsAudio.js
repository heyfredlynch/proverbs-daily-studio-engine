const fs = require("fs");
const https = require("https");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const MANIFEST_PATH = "data/production/week-two/productionManifest.week25.json";
const RAW_AUDIO_DIR = "outputs/audio/week-two/raw";
const DEFAULT_OUTPUT_FORMAT = "mp3_44100_128";
const MODE = process.argv.includes("--generate") ? "generate" : "dry-run";

function absolute(relativePath) {
  return path.join(ROOT, relativePath);
}

function readText(relativePath) {
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function writeJson(relativePath, value) {
  const filePath = absolute(relativePath);
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function fileExists(relativePath) {
  return fs.existsSync(absolute(relativePath));
}

function loadDotEnv() {
  const envPath = absolute(".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) {
      continue;
    }

    const key = match[1];
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function requireElevenLabsEnv() {
  const required = ["ELEVENLABS_API_KEY", "ELEVENLABS_VOICE_ID", "ELEVENLABS_MODEL_ID"];
  const missing = required.filter((key) => !process.env[key]);
  if (!missing.length) {
    return {
      apiKey: process.env.ELEVENLABS_API_KEY,
      voiceId: process.env.ELEVENLABS_VOICE_ID,
      modelId: process.env.ELEVENLABS_MODEL_ID,
    };
  }

  console.error("Missing ElevenLabs environment variables:");
  for (const key of missing) {
    console.error(`- ${key}`);
  }
  console.error("");
  console.error("Add them to .env or your shell before running generation:");
  console.error("ELEVENLABS_API_KEY=your_api_key");
  console.error("ELEVENLABS_VOICE_ID=your_voice_id");
  console.error("ELEVENLABS_MODEL_ID=eleven_multilingual_v2");
  console.error("");
  console.error("Dry-run does not call ElevenLabs:");
  console.error("npm run audio:week-two:dry-run");
  process.exit(1);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function collapseBlankLines(value) {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function ensureListenerSafe(value, episode) {
  const banned = [
    ["SOURCE_NEEDED", "FROM_GOOGLE_DOC_FINAL_TAB"].join("_"),
    ["DRAFT", "FOR FRED REVIEW"].join(" "),
    ["Recommended", "Improvements"].join(" "),
    ["Fred", "Revision Notes"].join(" "),
    ["OUTRO", "PLACEHOLDER"].join(" "),
    ["productionStatus", ""].join(""),
    ["elevenLabsStatus", ""].join(""),
    ["audioReviewStatus", ""].join(""),
    "```",
  ];

  for (const marker of banned) {
    if (value.includes(marker)) {
      throw new Error(`${episode.date} ${episode.title} contains non-listener marker: ${marker}`);
    }
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function referenceSlug(scriptureReference) {
  const match = scriptureReference.match(/^Proverbs\s+(\d+):(\d+)$/i);
  if (!match) {
    throw new Error(`Unsupported scripture reference for audio filename: ${scriptureReference}`);
  }
  return `proverbs-${match[1]}-${match[2]}`;
}

function expectedAudioPath(episode) {
  const refSlug = referenceSlug(episode.scriptureReference);
  const episodeSlug = slugify(episode.title);
  return `${RAW_AUDIO_DIR}/${episode.date}_proverbs-daily_${refSlug}_${episodeSlug}.mp3`;
}

function extractEpisodeSection(scriptText, episode) {
  const exactHeading = `## ${episode.scriptureReference} - ${episode.title}`;
  let headingIndex = scriptText.indexOf(exactHeading);

  if (headingIndex < 0) {
    const fallbackPattern = new RegExp(`^##\\s+${escapeRegExp(episode.scriptureReference)}\\s+-\\s+.*$`, "m");
    const fallbackMatch = scriptText.match(fallbackPattern);
    if (!fallbackMatch || fallbackMatch.index === undefined) {
      throw new Error(`Could not find approved script section for ${episode.date} ${episode.title}`);
    }
    headingIndex = fallbackMatch.index;
  }

  const afterHeading = scriptText.slice(headingIndex).replace(/^##[^\n]*\n/, "");
  const nextDivider = afterHeading.search(/\n---\n/);
  const section = nextDivider >= 0 ? afterHeading.slice(0, nextDivider) : afterHeading;
  const cleaned = collapseBlankLines(section);

  ensureListenerSafe(cleaned, episode);
  return cleaned;
}

function formatForAudio(sectionText) {
  return collapseBlankLines(
    sectionText
      .replace(/^Scripture Reference:\s*/m, "")
      .replace(/^Verse Text:\s*/m, "")
      .replace(/^Episode Title:\s*/m, "Today's Episode: ")
      .replace(/^Body:\s*\n?/m, "")
  );
}

function shouldAppendOutro(manifest, episode) {
  return Boolean(
    episode.appendOutroForAudio ||
      episode.includeOutroInAudio ||
      episode.audioAppendOutro ||
      episode.audio?.appendOutro ||
      manifest.appendOutroForAudio ||
      manifest.includeOutroInAudio ||
      manifest.audioAppendOutro ||
      manifest.audio?.appendOutro ||
      manifest.elevenLabs?.appendOutro
  );
}

function loadOutroText(componentName) {
  if (!componentName) {
    return "";
  }

  const candidates = [
    `components/outros/${componentName}.md`,
    `components/outros/${componentName}`,
  ];

  const existing = candidates.find(fileExists);
  if (!existing) {
    throw new Error(`Outro component requested but not found: ${componentName}`);
  }

  return collapseBlankLines(
    readText(existing)
      .replace(/^#.*$/gm, "")
      .replace(/^[^\S\r\n]*[-*]\s*/gm, "")
  );
}

function buildAudioJobs(manifest) {
  const scriptCache = new Map();

  return manifest.episodes.map((episode) => {
    const approvedPath = episode.approvedScriptPath;
    if (!approvedPath) {
      throw new Error(`Missing approvedScriptPath for ${episode.date}`);
    }

    if (!scriptCache.has(approvedPath)) {
      scriptCache.set(approvedPath, readText(approvedPath));
    }

    const baseText = formatForAudio(extractEpisodeSection(scriptCache.get(approvedPath), episode));
    const outroText = shouldAppendOutro(manifest, episode) ? loadOutroText(episode.outroComponent) : "";
    const text = collapseBlankLines(outroText ? `${baseText}\n\n${outroText}` : baseText);
    const outputPath = expectedAudioPath(episode);

    ensureListenerSafe(text, episode);

    return {
      episode,
      text,
      outputPath,
      characterCount: text.length,
    };
  });
}

function printDryRun(jobs) {
  console.log(`ElevenLabs Week Two dry-run: ${jobs.length} episodes`);
  console.log("No API calls were made.");
  console.log("");

  for (const job of jobs) {
    console.log(`${job.episode.date} - ${job.episode.title}`);
    console.log(`outputPath: ${job.outputPath}`);
    console.log(`estimatedCharacters: ${job.characterCount}`);
    console.log("preview:");
    console.log(job.text.slice(0, 300).replace(/\n/g, " "));
    console.log("");
  }
}

function postElevenLabsSpeech({ apiKey, voiceId, modelId }, text) {
  const body = JSON.stringify({
    text,
    model_id: modelId,
  });

  const requestOptions = {
    method: "POST",
    hostname: "api.elevenlabs.io",
    path: `/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=${DEFAULT_OUTPUT_FORMAT}`,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
      "xi-api-key": apiKey,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(requestOptions, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const payload = Buffer.concat(chunks);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(payload);
          return;
        }

        reject(
          new Error(
            `ElevenLabs request failed with ${res.statusCode}: ${payload.toString("utf8").slice(0, 500)}`
          )
        );
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function generateAudio(manifest, jobs) {
  const env = requireElevenLabsEnv();
  fs.mkdirSync(absolute(RAW_AUDIO_DIR), { recursive: true });

  for (const job of jobs) {
    console.log(`Generating ${job.episode.date} - ${job.episode.title}`);
    const audio = await postElevenLabsSpeech(env, job.text);
    fs.writeFileSync(absolute(job.outputPath), audio);

    job.episode.elevenLabsStatus = "GENERATED";
    job.episode.audioRawPath = job.outputPath;
    job.episode.audioReviewStatus = "READY_FOR_REVIEW";
    writeJson(MANIFEST_PATH, manifest);
    console.log(`Saved ${job.outputPath}`);
  }

  writeJson(MANIFEST_PATH, manifest);
  console.log(`Updated ${MANIFEST_PATH}`);
}

async function run() {
  loadDotEnv();
  const manifest = readJson(MANIFEST_PATH);
  const jobs = buildAudioJobs(manifest);

  if (MODE === "dry-run") {
    printDryRun(jobs);
    return;
  }

  await generateAudio(manifest, jobs);
}

if (require.main === module) {
  run().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

module.exports = {
  buildAudioJobs,
  expectedAudioPath,
  extractEpisodeSection,
  shouldAppendOutro,
};
