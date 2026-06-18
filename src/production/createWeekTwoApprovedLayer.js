const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const WEEK = 25;
const APPROVED_DATE = "2026-06-18";
const APPROVED_BY = "Fred Lynch";
const SOURCE_MARKER = "SOURCE_NEEDED_FROM_GOOGLE_DOC_FINAL_TAB";
const OUTRO_COMPONENT = "proverbs-daily-standard-outro";

const approvedPerformancePath =
  "outputs/approved/week-two/weekly-approved-performance-script-week-25.md";
const approvedTechnicalPath =
  "outputs/technical/week-two/weekly-approved-technical-script-week-25.md";
const manifestPath = "data/production/week-two/productionManifest.week25.json";

const episodes = [
  ["2026-06-14", "Proverbs 14:30", "NET", "The Rhythm of a Sound Heart", "proverbs-14-30", "the-rhythm-of-a-sound-heart"],
  ["2026-06-15", "Proverbs 15:1", "NET", "Turn Down The Heat", "proverbs-15-1", "turn-down-the-heat"],
  ["2026-06-16", "Proverbs 16:9", "NET", "The Route Recalculates", "proverbs-16-9", "the-route-recalculates"],
  ["2026-06-17", "Proverbs 17:1", "NET", "Quiet Tastes Better", "proverbs-17-1", "quiet-tastes-better"],
  ["2026-06-18", "Proverbs 18:21", "NET", "Words With Teeth", "proverbs-18-21", "words-with-teeth"],
  ["2026-06-19", "Proverbs 19:21", "NET", "Plans With Open Hands", "proverbs-19-21", "plans-with-open-hands"],
  ["2026-06-20", "Proverbs 20:24", "NET", "Walking Without The Whole Map", "proverbs-20-24", "walking-without-the-whole-map"],
].map(([date, scriptureReference, translation, title, referenceSlug, episodeSlug]) => ({
  date,
  scriptureReference,
  translation,
  title,
  referenceSlug,
  episodeSlug,
  audioFilename: `${date}_proverbs-daily_${referenceSlug}_${episodeSlug}.mp3`,
}));

function absolute(relativePath) {
  return path.join(ROOT, relativePath);
}

function ensureDir(relativePath) {
  fs.mkdirSync(absolute(relativePath), { recursive: true });
}

function writeText(relativePath, value) {
  const filePath = absolute(relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value.endsWith("\n") ? value : `${value}\n`, "utf8");
}

function writeJson(relativePath, value) {
  writeText(relativePath, JSON.stringify(value, null, 2));
}

function touchGitkeep(relativePath) {
  writeText(path.join(relativePath, ".gitkeep").replace(/\\/g, "/"), "");
}

function baseMetadata(episode) {
  return {
    status: "APPROVED",
    source: "FINAL_TAB",
    approvedBy: APPROVED_BY,
    approvedDate: APPROVED_DATE,
    week: WEEK,
    productionStatus: "READY_FOR_AUDIO",
    elevenLabsStatus: "READY",
    audioReviewStatus: "NOT_STARTED",
    videoStatus: "READY_FOR_PLANNING",
    outroComponent: OUTRO_COMPONENT,
    sourceContentStatus: SOURCE_MARKER,
    ...episode,
  };
}

function yamlBlock(metadata) {
  return [
    "```yaml",
    `status: ${metadata.status}`,
    `source: ${metadata.source}`,
    `approvedBy: ${metadata.approvedBy}`,
    `approvedDate: ${metadata.approvedDate}`,
    `week: ${metadata.week}`,
    `productionStatus: ${metadata.productionStatus}`,
    `elevenLabsStatus: ${metadata.elevenLabsStatus}`,
    `audioReviewStatus: ${metadata.audioReviewStatus}`,
    `videoStatus: ${metadata.videoStatus}`,
    `outroComponent: ${metadata.outroComponent}`,
    `sourceContentStatus: ${metadata.sourceContentStatus}`,
    `date: ${metadata.date}`,
    `scriptureReference: ${metadata.scriptureReference}`,
    `translation: ${metadata.translation}`,
    `title: ${metadata.title}`,
    "```",
  ].join("\n");
}

function approvedPerformance() {
  const lines = [
    "# Week Two Approved Performance Script - Week 25",
    "",
    `Approved date: ${APPROVED_DATE}`,
    `Approved by: ${APPROVED_BY}`,
    `Source: FINAL_TAB`,
    "",
    "> FINAL Google Doc tab import is not available in this local repo context.",
    `> Replace each ${SOURCE_MARKER} block with the refined FINAL tab script before ElevenLabs generation.`,
    "",
  ];

  for (const episode of episodes) {
    const metadata = baseMetadata(episode);
    lines.push(
      "---",
      "",
      `# ${episode.scriptureReference} ${episode.translation}`,
      "",
      `## ${episode.title}`,
      "",
      yamlBlock(metadata),
      "",
      SOURCE_MARKER,
      "",
      "Scripture Reference:",
      episode.scriptureReference,
      "",
      "Verse Text:",
      SOURCE_MARKER,
      "",
      "Performance Script:",
      SOURCE_MARKER,
      "",
      "Remember:",
      SOURCE_MARKER,
      "",
      "Prayer:",
      SOURCE_MARKER,
      "",
      "Today's Challenge:",
      SOURCE_MARKER,
      ""
    );
  }

  return lines.join("\n");
}

function approvedTechnical() {
  const lines = [
    "# Week Two Approved Technical Script - Week 25",
    "",
    "This file mirrors the approved performance script metadata and prepares the week for audio, review, and video planning.",
    "",
  ];

  for (const episode of episodes) {
    const metadata = baseMetadata(episode);
    lines.push(
      `## ${episode.date} - ${episode.scriptureReference} - ${episode.title}`,
      "",
      yamlBlock(metadata),
      "",
      "pipeline:",
      "- Planner",
      "- Draft Generator",
      "- Creative Exploration",
      "- Fred Riff Layer",
      "- FINAL",
      "- APPROVED",
      "- ElevenLabs",
      "- Audio Review",
      "- Video Pipeline",
      "- Publish",
      "",
      "audio:",
      `- rawPath: outputs/audio/week-two/raw/${episode.audioFilename}`,
      `- reviewPath: outputs/audio/week-two/review/${episode.date}_${episode.referenceSlug}_audio-review.md`,
      "- sourcePolicy: Use listener-facing approved performance script only.",
      "",
      "video:",
      `- scenePlanPath: outputs/video/week-two/scene-plans/${episode.date}_${episode.referenceSlug}_scene-plan.md`,
      "- status: READY_FOR_PLANNING",
      "",
      "publish:",
      "- status: NOT_STARTED",
      ""
    );
  }

  return lines.join("\n");
}

function productionManifest() {
  return {
    week: WEEK,
    approvedDate: APPROVED_DATE,
    approvedBy: APPROVED_BY,
    source: "FINAL_TAB",
    sourceContentStatus: SOURCE_MARKER,
    episodes: episodes.map((episode) => ({
      date: episode.date,
      scriptureReference: episode.scriptureReference,
      translation: episode.translation,
      title: episode.title,
      status: "APPROVED",
      approvedScriptPath: approvedPerformancePath,
      technicalScriptPath: approvedTechnicalPath,
      audioRawPath: `outputs/audio/week-two/raw/${episode.audioFilename}`,
      audioReviewPath: `outputs/audio/week-two/review/${episode.date}_${episode.referenceSlug}_audio-review.md`,
      videoScenePlanPath: `outputs/video/week-two/scene-plans/${episode.date}_${episode.referenceSlug}_scene-plan.md`,
      elevenLabsStatus: "READY",
      audioReviewStatus: "NOT_STARTED",
      videoStatus: "READY_FOR_PLANNING",
      publishStatus: "NOT_STARTED",
      outroComponent: OUTRO_COMPONENT,
    })),
  };
}

function createFolders() {
  [
    "outputs/audio/week-two",
    "outputs/audio/week-two/raw",
    "outputs/audio/week-two/review",
    "outputs/video/week-two",
    "outputs/video/week-two/scene-plans",
    "outputs/video/week-two/assets",
    "outputs/publish/week-two",
    "outputs/approved/week-two",
    "data/production/week-two",
  ].forEach((dir) => {
    ensureDir(dir);
    touchGitkeep(dir);
  });
}

function run() {
  createFolders();
  writeText(approvedPerformancePath, approvedPerformance());
  writeText(approvedTechnicalPath, approvedTechnical());
  writeJson(manifestPath, productionManifest());

  console.log(`Created ${approvedPerformancePath}`);
  console.log(`Created ${approvedTechnicalPath}`);
  console.log(`Created ${manifestPath}`);
  console.log("Created production folder structure and .gitkeep files.");
  console.log(`Content source marker: ${SOURCE_MARKER}`);
}

if (require.main === module) {
  run();
}

module.exports = {
  episodes,
  productionManifest,
};
