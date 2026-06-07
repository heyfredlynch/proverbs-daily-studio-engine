const fs = require("fs");
const path = require("path");

const WEEKLY_EPISODE_BRIEFS_PATH = path.resolve(
  __dirname,
  "../../data/episode-manifest/weeklyEpisodeBriefs.json"
);

const TEST_SCRIPT_PATH = path.resolve(
  __dirname,
  "../../episodes/drafts/testEpisodeScript.json"
);

const SCRIPT_ENGINE_PROMPT_PATH = path.resolve(
  __dirname,
  "../../prompts/episode-generation/season-two-script-engine.md"
);

const EDITORIAL_DNA_PATH = path.resolve(__dirname, "../../docs/editorial-dna.md");

const CONTENT_RULES_PATH = path.resolve(__dirname, "../../docs/content-rules.md");

const OUTPUT_PATH = path.resolve(
  __dirname,
  "../../episodes/drafts/testScriptPromptPack.md"
);

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8").trim();
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${value.trim()}\n`, "utf8");
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

function buildEpisodeBriefBlock(brief) {
  return JSON.stringify(
    {
      date: brief.date || "",
      selectedVerse: brief.selectedVerse || "",
      episodeTitle: brief.episodeTitle || "",
      suggestedDirection: brief.suggestedDirection || "",
      persona: brief.persona || "",
      metaSubject: brief.metaSubject || "",
      runtimeTarget: brief.runtimeTarget || "",
      hardRuntimeMax: brief.hardRuntimeMax || "",
      visualNotes: brief.visualNotes || "",
      bRollTags: normalizeList(brief.bRollTags)
    },
    null,
    2
  );
}

function buildPlaceholderBlock(scriptPlaceholder) {
  return JSON.stringify(
    {
      date: scriptPlaceholder.date || "",
      scriptureReference: scriptPlaceholder.scriptureReference || "",
      episodeTitle: scriptPlaceholder.episodeTitle || "",
      status: scriptPlaceholder.status || "",
      notes: scriptPlaceholder.notes || ""
    },
    null,
    2
  );
}

function buildPromptPack({
  brief,
  scriptPlaceholder,
  scriptEnginePrompt,
  editorialDna,
  contentRules
}) {
  return `# Proverbs Daily AI Script Prompt Pack v0.1

Copy and paste this prompt pack into ChatGPT, Gemini, or another AI model for manual script-generation testing.

## 1. System / Role Instructions

Use these instructions as the primary system and role guidance:

\`\`\`markdown
${scriptEnginePrompt}
\`\`\`

## 2. Editorial DNA

Use this as a concise editorial reference. Preserve the Proverbs Daily voice: conversational, grounded, culturally aware, pastoral without being preachy, curious, hopeful, and built around Story -> Scripture -> Insight -> Walk-Out.

\`\`\`markdown
${editorialDna}
\`\`\`

## 3. Content Rules

Apply these runtime, Reader Version, Performance Version, prayer, challenge, and ElevenLabs safety rules:

\`\`\`markdown
${contentRules}
\`\`\`

Additional output safety:

- Produce both READER_VERSION and PERFORMANCE_VERSION every time.
- READER_VERSION is for Substack and ProverbsDaily.org.
- PERFORMANCE_VERSION must be ElevenLabs-safe: clean spoken copy only, no markdown, no headings, no labels, no brackets, and no director cues.
- Keep the prayer brief, preferably 10 words or fewer.
- Make todaysChallenge practical and behavior-based.

## 4. Episode Brief

Use this reviewed planning brief as the episode source:

\`\`\`json
${buildEpisodeBriefBlock(brief)}
\`\`\`

## Script Placeholder Context

The local prototype created this placeholder object. Replace the placeholder fields with real generated content while preserving the required output contract.

\`\`\`json
${buildPlaceholderBlock(scriptPlaceholder)}
\`\`\`

## 5. Required Output

Generate a JSON object with exactly these top-level fields:

\`\`\`json
{
  "READER_VERSION": {
    "Scripture Citation": "",
    "Scripture Reading": "",
    "Today's Episode": "",
    "Devotional": "",
    "Remember": "",
    "Prayer": "",
    "Today's Challenge": "",
    "Rollout": ""
  },
  "PERFORMANCE_VERSION": "",
  "remember": "",
  "prayer": "",
  "todaysChallenge": ""
}
\`\`\`

Do not include analysis before or after the JSON output.`;
}

function printSummary(brief) {
  console.log("Prompt pack file created.");
  console.log(`Episode brief used: ${brief.date || ""} | ${brief.selectedVerse || ""} | ${brief.episodeTitle || ""}`);
  console.log("Sections included:");
  console.log("- System / Role Instructions");
  console.log("- Editorial DNA");
  console.log("- Content Rules");
  console.log("- Episode Brief");
  console.log("- Required Output");
}

function run() {
  const briefsManifest = readJson(WEEKLY_EPISODE_BRIEFS_PATH);
  const brief = getFirstBrief(briefsManifest);
  const promptPack = buildPromptPack({
    brief,
    scriptPlaceholder: readJson(TEST_SCRIPT_PATH),
    scriptEnginePrompt: readText(SCRIPT_ENGINE_PROMPT_PATH),
    editorialDna: readText(EDITORIAL_DNA_PATH),
    contentRules: readText(CONTENT_RULES_PATH)
  });

  writeText(OUTPUT_PATH, promptPack);
  printSummary(brief);
  console.log("");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

if (require.main === module) {
  run();
}

module.exports = {
  buildEpisodeBriefBlock,
  buildPromptPack,
  getFirstBrief
};
