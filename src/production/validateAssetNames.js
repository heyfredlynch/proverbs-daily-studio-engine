const fs = require("fs");
const path = require("path");
const { createEpisodeAssetFilenames } = require("../lib/episodeAssetNaming");

const ROOT = path.resolve(__dirname, "../..");
const MANIFEST_PATH = "data/production/week-two/productionManifest.week25.json";
const OLD_AUDIO_PATTERN = ["proverbs-daily", "proverbs-"].join("_");
const ASSET_ID_PATTERN = /^S\d+-\d{4}-\d{2}-\d{2}_prov-\d+-\d+_[a-z0-9]+(?:-[a-z0-9]+)*$/;

function absolute(relativePath) {
  return path.join(ROOT, relativePath);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(absolute(relativePath), "utf8"));
}

function exists(relativePath) {
  return fs.existsSync(absolute(relativePath));
}

function listFiles(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") {
      continue;
    }

    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      listFiles(entryPath, results);
      continue;
    }

    results.push(entryPath);
  }

  return results;
}

function assert(condition, message, failures) {
  if (!condition) {
    failures.push(message);
  }
}

function validateManifest(failures) {
  const manifest = readJson(MANIFEST_PATH);

  for (const episode of manifest.episodes || []) {
    const expected = createEpisodeAssetFilenames({
      season: 2,
      date: episode.date,
      scriptureReference: episode.scriptureReference,
      title: episode.title,
    });

    assert(
      episode.episodeAssetId === expected.episodeAssetId,
      `${episode.date}: episodeAssetId should be ${expected.episodeAssetId}`,
      failures
    );
    assert(
      ASSET_ID_PATTERN.test(episode.episodeAssetId || ""),
      `${episode.date}: episodeAssetId does not match canonical pattern`,
      failures
    );
    assert(
      episode.audioRawPath === `outputs/audio/week-two/raw/${expected.audio}`,
      `${episode.date}: audioRawPath should be outputs/audio/week-two/raw/${expected.audio}`,
      failures
    );
    assert(
      exists(episode.audioRawPath),
      `${episode.date}: referenced audio file does not exist: ${episode.audioRawPath}`,
      failures
    );
    assert(
      episode.videoScenePlanPath === `outputs/video/week-two/scene-plans/${expected.scenePlan}`,
      `${episode.date}: videoScenePlanPath should be outputs/video/week-two/scene-plans/${expected.scenePlan}`,
      failures
    );
    assert(
      exists(episode.videoScenePlanPath),
      `${episode.date}: referenced scene plan does not exist: ${episode.videoScenePlanPath}`,
      failures
    );
  }
}

function validateOldAudioNaming(failures) {
  const files = listFiles(ROOT);

  for (const filePath of files) {
    const relativePath = path.relative(ROOT, filePath).replace(/\\/g, "/");
    if (relativePath.includes(OLD_AUDIO_PATTERN)) {
      failures.push(`Old audio naming remains in filename: ${relativePath}`);
    }

    const extension = path.extname(filePath).toLowerCase();
    const textExtensions = new Set([".js", ".json", ".md", ".txt"]);
    if (!textExtensions.has(extension)) {
      continue;
    }

    const text = fs.readFileSync(filePath, "utf8");
    if (text.includes(OLD_AUDIO_PATTERN)) {
      failures.push(`Old audio naming remains in file content: ${relativePath}`);
    }
  }
}

function run() {
  const failures = [];
  validateManifest(failures);
  validateOldAudioNaming(failures);

  if (failures.length) {
    console.error("Asset name validation failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log("Asset name validation passed.");
}

if (require.main === module) {
  run();
}

module.exports = {
  validateManifest,
  validateOldAudioNaming,
};
