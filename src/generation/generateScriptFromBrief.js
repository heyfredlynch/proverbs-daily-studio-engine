const fs = require("fs");
const path = require("path");

const WEEKLY_EPISODE_BRIEFS_PATH = path.resolve(
  __dirname,
  "../../data/episode-manifest/weeklyEpisodeBriefs.json"
);

const OUTPUT_PATH = path.resolve(
  __dirname,
  "../../episodes/drafts/testEpisodeScript.json"
);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function normalizeList(value) {
  return Array.isArray(value) ? value : [];
}

function getFirstBrief(briefsManifest) {
  const firstBrief = normalizeList(briefsManifest.briefs)[0];

  if (!firstBrief) {
    throw new Error("No episode briefs found.");
  }

  return firstBrief;
}

function buildPlaceholderScript(brief) {
  const scriptureReference = brief.selectedVerse || brief.recommendedVerse || "";
  const episodeTitle = brief.episodeTitle || "";

  return {
    date: brief.date || "",
    scriptureReference,
    episodeTitle,
    readerVersion:
      `Placeholder Reader Version for ${episodeTitle || "untitled episode"} using ${scriptureReference || "the selected verse"}. ` +
      "Future AI generation will create the Substack and ProverbsDaily.org reader script from the reviewed episode brief.",
    performanceVersion:
      `Placeholder Performance Version for ${episodeTitle || "untitled episode"} using ${scriptureReference || "the selected verse"}. ` +
      "Future AI generation will create clean ElevenLabs-safe spoken copy with no markdown, headings, labels, brackets, or director cues.",
    remember: "",
    prayer: "",
    todaysChallenge: "",
    status: "Script Placeholder",
    notes: "Ready for AI generation"
  };
}

function generateScriptFromFirstBrief(briefsManifest) {
  return buildPlaceholderScript(getFirstBrief(briefsManifest));
}

function printSummary(script) {
  console.log("Test script object created:");
  console.log(JSON.stringify(script, null, 2));
}

function run() {
  const briefsManifest = readJson(WEEKLY_EPISODE_BRIEFS_PATH);
  const script = generateScriptFromFirstBrief(briefsManifest);

  writeJson(OUTPUT_PATH, script);
  printSummary(script);
  console.log("");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

if (require.main === module) {
  run();
}

module.exports = {
  buildPlaceholderScript,
  generateScriptFromFirstBrief,
  getFirstBrief
};
