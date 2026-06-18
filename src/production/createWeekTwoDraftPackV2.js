const fs = require("fs");
const path = require("path");
const { getVerse, loadScriptureLibrary } = require("../lib/loadScriptureLibrary");

const ROOT = path.resolve(__dirname, "../..");
const PACKET_TITLE = "Weekly Draft Packet - Week 25 - June 14-20, 2026";
const WEEK_NUMBER = 25;
const STATUS = "NEEDS_FRED_REVIEW";
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
  "outputs/reader/google-docs/week-two/weekly-draft-packet-week-25-v2.md"
);
const OUTPUT_TECHNICAL_PATH = path.join(
  ROOT,
  "outputs/technical/week-two/weekly-technical-script-week-25-v2.md"
);

const episodes = [
  ["2026-06-14", "Proverbs 14:30", 14, 30, "The Rhythm of a Sound Heart"],
  ["2026-06-15", "Proverbs 15:1", 15, 1, "Turn Down The Heat"],
  ["2026-06-16", "Proverbs 16:9", 16, 9, "The Route Recalculates"],
  ["2026-06-17", "Proverbs 17:1", 17, 1, "Quiet Tastes Better"],
  ["2026-06-18", "Proverbs 18:21", 18, 21, "Words With Teeth"],
  ["2026-06-19", "Proverbs 19:21", 19, 21, "Plans With Open Hands"],
  ["2026-06-20", "Proverbs 20:24", 20, 24, "Walking Without The Whole Map"],
].map(([episodeDate, scriptureReference, chapter, verse, title]) => ({
  episodeDate,
  scriptureReference,
  chapter,
  verse,
  title,
}));

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8").trim();
}

function writeText(filePath, value) {
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
      translationUsed: verseLookup.translationUsed || "PENDING",
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
    `# ${episode.scriptureReference} ${episode.translationUsed}`,
    "",
    `## "${episode.verseText}"`,
    "",
    `### ${episode.title}`,
    "",
    "[Performance script pending Fred review and discovery session.]",
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
    "## Performance Rules",
    "",
    "- All seven episodes stay stacked in one Performance Script section.",
    "- Heading 1 is scripture reference with translation.",
    "- Heading 2 is quoted verse text.",
    "- Heading 3 is episode title.",
    "- Keep only listener-facing labels: Remember, Prayer, Today's Challenge.",
    "- Internal generation labels guide drafting but do not appear as spoken performance labels.",
    "- Parenthetical creative notes belong in internal areas only.",
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
    "hookStatus: NEEDS_FRED_REVIEW",
    "bigIdeaStatus: NEEDS_FRED_REVIEW",
    "performanceScriptStatus: PLACEHOLDER_PENDING_FRED_REVIEW",
    `outroComponent: ${OUTRO_COMPONENT_ID}`,
    "outroUse:",
    "  substack: true",
    "  audio: true",
    "  video: true",
    "  webApp: false",
    "notes:",
    `  - Verse text loaded from ${episode.translationLibraryPath}.`,
    `  - Scripture source sheet/type: ${episode.translationSheetName}.`,
    `  - Available translations: ${episode.availableTranslations.join(", ")}.`,
    `  - Safe available translations: ${episode.safeAvailableTranslations.join(", ") || "none"}.`,
    `  - Suspicious translations skipped: ${episode.suspiciousTranslations.join(", ") || "none"}.`,
    episode.isPlaceholder
      ? "  - Scripture text placeholder used because no safe publication translation was available."
      : `  - Repo-safe scripture text uses ${episode.translationUsed}.`,
    `  - Standard outro referenced from components/outros/proverbs-daily-standard-outro.md (${outroLineCount} nonblank lines).`,
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
    ...enrichedEpisodes.flatMap((episode) => [
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

function assertOutputPathsAreV2Only() {
  const forbidden = [
    "outputs/reader/google-docs/week-two/weekly-draft-packet.md",
    "outputs/reader/google-docs/week-two/weekly-draft-packet-week-25-v02.md",
    "outputs/technical/week-two/weekly-technical-script-week-25-v02.md",
  ].map((relativePath) => path.join(ROOT, relativePath));

  if (forbidden.includes(OUTPUT_PACKET_PATH) || forbidden.includes(OUTPUT_TECHNICAL_PATH)) {
    throw new Error("Refusing to overwrite an existing v1 or v02 output path.");
  }
}

function run() {
  assertOutputPathsAreV2Only();

  const scriptureLibrary = loadScriptureLibrary();
  const outroText = readText(OUTRO_COMPONENT_PATH);
  const masterPrompt = readText(MASTER_PROMPT_PATH);
  const enrichedEpisodes = enrichEpisodes(scriptureLibrary);
  const packet = buildPacket({ enrichedEpisodes, masterPrompt, outroText });
  const technical = technicalSection(enrichedEpisodes, outroText);

  writeText(OUTPUT_PACKET_PATH, packet);
  writeText(OUTPUT_TECHNICAL_PATH, technical);

  console.log(`Created ${path.relative(ROOT, OUTPUT_PACKET_PATH)}`);
  console.log(`Created ${path.relative(ROOT, OUTPUT_TECHNICAL_PATH)}`);
  console.log("Left existing Week One, Week Two v1, and Week Two v02 files untouched.");
  console.log("Future v2 generation: npm run generate:week-two:v2");
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
