const fs = require("fs");
const path = require("path");
const {
  DEFAULT_WORKBOOK_PATH,
  getVerse,
  loadScriptureLibrary,
} = require("../lib/loadScriptureLibrary");

const ROOT = path.resolve(__dirname, "../..");
const PACKET_TITLE = "Weekly Draft Packet - Week 25 - June 14-20, 2026";
const WEEK_NUMBER = 25;
const STATUS = "NEEDS_FRED_DISCOVERY";
const TRANSLATION_MODE = "publication-safe";
const OUTRO_COMPONENT_ID = "proverbs-daily-standard-outro";
const OUTRO_COMPONENT_PATH = path.join(
  ROOT,
  "components/outros/proverbs-daily-standard-outro.md"
);
const MASTER_PROMPT_PATH = path.join(
  ROOT,
  "docs/creative-engine/proverbs-daily-script-generator-master-prompt.md"
);

const OUTPUT_PACKET_PATH = path.join(
  ROOT,
  "outputs/reader/google-docs/week-two/weekly-draft-packet-week-25-v02.md"
);
const OUTPUT_TECHNICAL_PATH = path.join(
  ROOT,
  "outputs/technical/week-two/weekly-technical-script-week-25-v02.md"
);

const episodes = [
  {
    episodeDate: "2026-06-14",
    scriptureReference: "Proverbs 14:30",
    chapter: 14,
    verse: 30,
    title: "The Rhythm of a Sound Heart",
  },
  {
    episodeDate: "2026-06-15",
    scriptureReference: "Proverbs 15:1",
    chapter: 15,
    verse: 1,
    title: "Turn Down The Heat",
  },
  {
    episodeDate: "2026-06-16",
    scriptureReference: "Proverbs 16:9",
    chapter: 16,
    verse: 9,
    title: "The Route Recalculates",
  },
  {
    episodeDate: "2026-06-17",
    scriptureReference: "Proverbs 17:1",
    chapter: 17,
    verse: 1,
    title: "Quiet Tastes Better",
  },
  {
    episodeDate: "2026-06-18",
    scriptureReference: "Proverbs 18:21",
    chapter: 18,
    verse: 21,
    title: "Words With Teeth",
  },
  {
    episodeDate: "2026-06-19",
    scriptureReference: "Proverbs 19:21",
    chapter: 19,
    verse: 21,
    title: "Plans With Open Hands",
  },
  {
    episodeDate: "2026-06-20",
    scriptureReference: "Proverbs 20:24",
    chapter: 20,
    verse: 24,
    title: "Walking Without The Whole Map",
  },
];

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8").trim();
}

function writeNewText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value.endsWith("\n") ? value : `${value}\n`, "utf8");
}

function enrichEpisodes(scriptureLibrary) {
  return episodes.map((episode) => {
    const verseLookup = getVerse(scriptureLibrary, {
      chapter: episode.chapter,
      verse: episode.verse,
      mode: TRANSLATION_MODE,
    });

    return {
      ...episode,
      verseText: verseLookup.text,
      translationUsed: verseLookup.translationUsed,
      translationMode: verseLookup.translationMode,
      publicationPermissionStatus: verseLookup.publicationPermissionStatus,
      translationLibraryPath: path.relative(ROOT, verseLookup.libraryPath),
      translationSheetName: verseLookup.sheetName,
      availableTranslations: verseLookup.availableTranslations,
      safeAvailableTranslations: verseLookup.safeAvailableTranslations,
      suspiciousTranslations: verseLookup.suspiciousTranslations,
      isPlaceholder: verseLookup.isPlaceholder,
    };
  });
}

function performanceEpisode(episode) {
  return [
    `# ${episode.scriptureReference}`,
    "",
    `## ${episode.verseText}`,
    "",
    `### ${episode.title}`,
    "",
    "[Performance script pending Fred discovery session.]",
    "",
    "Remember:",
    "[Pending]",
    "",
    "Prayer:",
    "[Pending exactly 10 words]",
    "",
    "Today's Challenge:",
    "[Pending]",
    "",
    "That's your Proverbs Daily.",
    "Be wise.",
    "Be well.",
    "Peace.",
  ].join("\n");
}

function performanceSection(enrichedEpisodes) {
  return [
    "# PERFORMANCE SCRIPT",
    "",
    `Document title: ${PACKET_TITLE}`,
    "",
    ...enrichedEpisodes.flatMap((episode, index) => [
      index === 0 ? "" : "---",
      "",
      performanceEpisode(episode),
      "",
    ]),
  ].join("\n").trimEnd();
}

function masterTemplateSection(masterPrompt) {
  return [
    "# MASTER TEMPLATE",
    "",
    "This section is not listener-facing.",
    "",
    "The goal is not to explain the verse.",
    "The goal is to help listeners discover wisdom already hiding in ordinary life.",
    "",
    "## Discovery Workflow",
    "",
    "1. Find the hook.",
    "2. Refine the big idea.",
    "3. Draft the finished script.",
    "",
    "## Approved Script Structure",
    "",
    "- Scripture reference",
    "- Scripture text",
    "- Today's episode title",
    "- Intro / hook",
    "- Scripture",
    "- Scripture breakdown",
    "- Practical illustration",
    "- Encouraging turn",
    "- Remember",
    "- Prayer",
    "- Today's Challenge",
    "- Short Proverbs Daily signoff",
    "",
    "## Creative Rules",
    "",
    "- Start with wonder.",
    "- Move toward wisdom.",
    "- End with practice.",
    "- Keep one dominant idea.",
    "- Let the illustration reveal the verse.",
    "- Keep the listener invited, not scolded.",
    "- Avoid preachy language, heavy-handed moralizing, church cliches, and condemnation.",
    "- Prefer formation, alignment, wisdom, participation, and discovery.",
    "",
    "## Master Prompt Reference",
    "",
    "Source: `docs/creative-engine/proverbs-daily-script-generator-master-prompt.md`",
    "",
    "```markdown",
    masterPrompt,
    "```",
  ].join("\n");
}

function technicalEpisode(episode, outroLineCount) {
  return [
    `## ${episode.episodeDate} - ${episode.scriptureReference} - ${episode.title}`,
    "",
    "```yaml",
    `episodeDate: ${episode.episodeDate}`,
    `weekNumber: ${WEEK_NUMBER}`,
    `scriptureReference: ${episode.scriptureReference}`,
    `chapter: ${episode.chapter}`,
    `verse: ${episode.verse}`,
    `translationUsed: ${episode.translationUsed}`,
    `translationMode: ${episode.translationMode}`,
    `publicationPermissionStatus: ${episode.publicationPermissionStatus}`,
    `title: ${episode.title}`,
    `status: ${STATUS}`,
    "approvalMarker:",
    "hookStatus: PENDING_DISCOVERY",
    "bigIdeaStatus: PENDING_DISCOVERY",
    "performanceScriptStatus: PLACEHOLDER_PENDING_FRED_DISCOVERY",
    `outroComponent: ${OUTRO_COMPONENT_ID}`,
    "outroUse:",
    "  substack: true",
    "  audio: true",
    "  video: true",
    "  webApp: false",
    "notes:",
    `  - Verse text loaded from ${episode.translationLibraryPath}.`,
    `  - Workbook sheet: ${episode.translationSheetName}.`,
    `  - Available translations: ${episode.availableTranslations.join(", ")}.`,
    `  - Safe available translations: ${episode.safeAvailableTranslations.join(", ") || "none"}.`,
    `  - Suspicious translations skipped: ${episode.suspiciousTranslations.join(", ") || "none"}.`,
    episode.isPlaceholder
      ? "  - Scripture text placeholder used because no safe publication translation was available."
      : `  - Repo-safe scripture text uses ${episode.translationUsed}.`,
    `  - Standard outro loaded from components/outros/proverbs-daily-standard-outro.md (${outroLineCount} nonblank lines).`,
    "  - Not eligible for production outputs until status is APPROVED.",
    "```",
  ].join("\n");
}

function technicalSection(enrichedEpisodes, outroText) {
  const outroLineCount = outroText.split(/\r?\n/).filter((line) => line.trim()).length;

  return [
    "# TECHNICAL SCRIPT",
    "",
    `Document title: ${PACKET_TITLE}`,
    "",
    "Only episodes marked `APPROVED` are eligible for Substack, ProverbsDaily.org, audio, video, or final technical exports.",
    "",
    ...enrichedEpisodes.flatMap((episode, index) => [
      index === 0 ? "" : "",
      technicalEpisode(episode, outroLineCount),
      "",
    ]),
  ].join("\n").trimEnd();
}

function buildPacket({ enrichedEpisodes, masterPrompt, outroText }) {
  return [
    performanceSection(enrichedEpisodes),
    "",
    "---",
    "",
    masterTemplateSection(masterPrompt),
    "",
    "---",
    "",
    technicalSection(enrichedEpisodes, outroText),
    "",
  ].join("\n");
}

function assertV1PathsUntouched() {
  const forbiddenOutputs = [
    path.join(ROOT, "outputs/reader/google-docs/week-two/weekly-draft-packet.md"),
    path.join(ROOT, "outputs/reader/google-docs/weekly-draft-packet.md"),
  ];

  if (forbiddenOutputs.includes(OUTPUT_PACKET_PATH)) {
    throw new Error("Refusing to overwrite a v1 weekly draft packet path.");
  }
}

function run() {
  assertV1PathsUntouched();

  const scriptureLibrary = loadScriptureLibrary(DEFAULT_WORKBOOK_PATH);
  const outroText = readText(OUTRO_COMPONENT_PATH);
  const masterPrompt = readText(MASTER_PROMPT_PATH);
  const enrichedEpisodes = enrichEpisodes(scriptureLibrary);
  const packet = buildPacket({ enrichedEpisodes, masterPrompt, outroText });
  const technical = technicalSection(enrichedEpisodes, outroText);

  writeNewText(OUTPUT_PACKET_PATH, packet);
  writeNewText(OUTPUT_TECHNICAL_PATH, technical);

  console.log(`Created ${path.relative(ROOT, OUTPUT_PACKET_PATH)}`);
  console.log(`Created ${path.relative(ROOT, OUTPUT_TECHNICAL_PATH)}`);
  console.log(`Scripture source: ${path.relative(ROOT, DEFAULT_WORKBOOK_PATH)}`);
  console.log(`Outro source: ${path.relative(ROOT, OUTRO_COMPONENT_PATH)}`);
  enrichedEpisodes.forEach((episode) => {
    console.log(`${episode.scriptureReference}: ${episode.translationUsed} (${episode.publicationPermissionStatus})`);
  });
}

if (require.main === module) {
  run();
}

module.exports = {
  buildPacket,
  enrichEpisodes,
  episodes,
  performanceSection,
  technicalSection,
};
