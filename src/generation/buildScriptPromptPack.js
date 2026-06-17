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

const CREATIVE_MASTER_PROMPT_PATH = path.resolve(
  __dirname,
  "../../docs/creative-engine/proverbs-daily-script-generator-master-prompt.md"
);

const WEEKLY_DRAFT_PACKET_V02_SPEC_PATH = path.resolve(
  __dirname,
  "../../docs/weekly-draft-packet-v2-spec.md"
);

const OUTPUT_PATH = path.resolve(
  __dirname,
  "../../episodes/drafts/testScriptPromptPack.md"
);

const OUTPUT_V02_PATH = path.resolve(
  __dirname,
  "../../episodes/drafts/testScriptPromptPackV02.md"
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

function buildPromptPackV02({
  brief,
  scriptPlaceholder,
  creativeMasterPrompt,
  weeklyDraftPacketSpec,
  editorialDna,
  contentRules
}) {
  return `# Proverbs Daily AI Script Prompt Pack v0.2

Copy and paste this prompt pack into ChatGPT, Gemini, or another AI model for Weekly Draft Packet v0.2 testing.

Weekly Draft Packet v0.2 is the current preferred workflow version. The packet model is:

1. PERFORMANCE SCRIPT
2. MASTER TEMPLATE
3. TECHNICAL SCRIPT

The Performance Script is Fred's editing and performance surface. The Technical Script mirrors the approved Performance Script and adds metadata. Do not produce production outputs unless an episode is marked APPROVED.

## 1. Creative Engine Master Prompt

Use this as the primary creative engine guidance:

\`\`\`markdown
${creativeMasterPrompt}
\`\`\`

## 2. Weekly Draft Packet v0.2 Rules

Follow the Performance / Master Template / Technical Script model:

\`\`\`markdown
${weeklyDraftPacketSpec}
\`\`\`

## 3. Editorial DNA

Preserve the Proverbs Daily voice: conversational, grounded, culturally aware, pastoral without being preachy, curious, hopeful, and built around Story -> Scripture -> Insight -> Walk-Out.

\`\`\`markdown
${editorialDna}
\`\`\`

## 4. Content Rules

Apply these runtime, performance, translation, prayer, challenge, approval-gating, and outro rules:

\`\`\`markdown
${contentRules}
\`\`\`

## 5. Episode Brief

Use this reviewed planning brief as the episode source:

\`\`\`json
${buildEpisodeBriefBlock(brief)}
\`\`\`

## Script Placeholder Context

The local prototype created this placeholder object. Replace placeholder fields only after the discovery workflow has happened.

\`\`\`json
${buildPlaceholderBlock(scriptPlaceholder)}
\`\`\`

## 6. Required Discovery-First Workflow

Before drafting, help Fred:

1. Find the hook.
2. Refine the big idea.
3. Draft the finished script.

The goal is not to explain the verse.
The goal is to help listeners discover wisdom already hiding in ordinary life.

## 7. Required Output Shape

Generate markdown with exactly these top-level sections:

\`\`\`markdown
# PERFORMANCE SCRIPT

# [Scripture Reference]

## [Verse Text]

### [Episode Title]

[Spoken performance script with no internal technical labels.]

Remember:
[Line]

Prayer:
[Exactly 10 words]

Today's Challenge:
[Actionable today]

That's your Proverbs Daily.
Be wise.
Be well.
Peace.

# MASTER TEMPLATE

[Non-listener-facing structure and creative rules.]

# TECHNICAL SCRIPT

[Metadata including translationUsed, translationMode, publicationPermissionStatus, status, approvalMarker, hookStatus, bigIdeaStatus, performanceScriptStatus, outroComponent, outroUse, and notes.]
\`\`\`

Do not include analysis before or after the markdown output.`;
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
  const scriptPlaceholder = readJson(TEST_SCRIPT_PATH);
  const isV02 = process.argv.includes("--v02");

  const promptPack = isV02
    ? buildPromptPackV02({
        brief,
        scriptPlaceholder,
        creativeMasterPrompt: readText(CREATIVE_MASTER_PROMPT_PATH),
        weeklyDraftPacketSpec: readText(WEEKLY_DRAFT_PACKET_V02_SPEC_PATH),
        editorialDna: readText(EDITORIAL_DNA_PATH),
        contentRules: readText(CONTENT_RULES_PATH)
      })
    : buildPromptPack({
        brief,
        scriptPlaceholder,
        scriptEnginePrompt: readText(SCRIPT_ENGINE_PROMPT_PATH),
        editorialDna: readText(EDITORIAL_DNA_PATH),
        contentRules: readText(CONTENT_RULES_PATH)
      });

  writeText(isV02 ? OUTPUT_V02_PATH : OUTPUT_PATH, promptPack);
  printSummary(brief);
  console.log("");
  console.log(`Wrote ${isV02 ? OUTPUT_V02_PATH : OUTPUT_PATH}`);
}

if (require.main === module) {
  run();
}

module.exports = {
  buildEpisodeBriefBlock,
  buildPromptPack,
  buildPromptPackV02,
  getFirstBrief
};
