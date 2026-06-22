const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const manifestPath = path.join(ROOT, "data/production/week-two/productionManifest.week25.json");

function scenePlan(episode) {
  return [
    `# Scene Plan - ${episode.episodeAssetId || `${episode.date} - ${episode.title}`}`,
    "",
    episode.episodeAssetId ? `Episode Asset ID: ${episode.episodeAssetId}` : "",
    `Scripture: ${episode.scriptureReference} (${episode.translation})`,
    `Audio status required: AUDIO_APPROVED before production begins`,
    "",
    "## Hook Visual",
    "SOURCE_NEEDED_FROM_GOOGLE_DOC_FINAL_TAB",
    "",
    "## Scripture Card",
    "SOURCE_NEEDED_FROM_GOOGLE_DOC_FINAL_TAB",
    "",
    "## Key Metaphor Visual",
    "SOURCE_NEEDED_FROM_GOOGLE_DOC_FINAL_TAB",
    "",
    "## Remember Card",
    "SOURCE_NEEDED_FROM_GOOGLE_DOC_FINAL_TAB",
    "",
    "## Prayer Card",
    "SOURCE_NEEDED_FROM_GOOGLE_DOC_FINAL_TAB",
    "",
    "## Challenge Card",
    "SOURCE_NEEDED_FROM_GOOGLE_DOC_FINAL_TAB",
    "",
    "## Outro / End Card",
    `Use outro component as configured: ${episode.outroComponent}`,
    "",
  ].join("\n");
}

function run() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  for (const episode of manifest.episodes) {
    const filePath = path.join(ROOT, episode.videoScenePlanPath);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, scenePlan(episode), "utf8");
    console.log(`Created ${episode.videoScenePlanPath}`);
  }
}

if (require.main === module) {
  run();
}
