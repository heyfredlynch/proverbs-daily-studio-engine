const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const MANIFEST_PATH = "data/production/week-two/productionManifest.week25.json";
const OLD_AUDIO_PATTERN = ["proverbs-daily", "proverbs-"].join("_");

function absolute(relativePath) {
  return path.join(ROOT, relativePath);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(absolute(relativePath), "utf8"));
}

function assert(condition, message, failures) {
  if (!condition) {
    failures.push(message);
  }
}

function fileSize(filePath) {
  return fs.statSync(filePath).size;
}

function validateEpisode(episode, failures) {
  const label = episode.episodeAssetId || episode.date;
  const isGenerated = episode.elevenLabsStatus === "GENERATED" || Boolean(episode.audioRawPath);

  assert(Object.prototype.hasOwnProperty.call(episode, "isrc"), `${label}: missing isrc field`, failures);
  assert(
    episode.recordingRightsStatus === "NEEDS_ISRC_REVIEW",
    `${label}: recordingRightsStatus should be NEEDS_ISRC_REVIEW`,
    failures
  );
  assert(
    episode.recordingType === "SPOKEN_WORD_WITH_MUSIC_BED",
    `${label}: recordingType should be SPOKEN_WORD_WITH_MUSIC_BED`,
    failures
  );
  assert(Boolean(episode.rightsNotes), `${label}: missing rightsNotes`, failures);

  if (!isGenerated) {
    return;
  }

  assert(Boolean(episode.audioWarehousePath), `${label}: missing audioWarehousePath`, failures);
  assert(Boolean(episode.audioWarehouseFolder), `${label}: missing audioWarehouseFolder`, failures);

  if (episode.audioWarehousePath) {
    assert(fs.existsSync(episode.audioWarehousePath), `${label}: warehouse file missing`, failures);
  }

  if (episode.audioWarehouseFolder) {
    assert(fs.existsSync(episode.audioWarehouseFolder), `${label}: warehouse folder missing`, failures);
  }

  if (episode.audioRawPath && episode.audioWarehousePath) {
    const localPath = absolute(episode.audioRawPath);
    if (fs.existsSync(localPath) && fs.existsSync(episode.audioWarehousePath)) {
      assert(
        fileSize(localPath) === fileSize(episode.audioWarehousePath),
        `${label}: local and warehouse file sizes do not match`,
        failures
      );
    }
  }
}

function validateNoOldAudioNames(manifest, failures) {
  const manifestText = JSON.stringify(manifest, null, 2);
  if (manifestText.includes(OLD_AUDIO_PATTERN)) {
    failures.push("Old pre-canonical audio filename pattern remains in the production manifest");
  }
}

function run() {
  const failures = [];
  const manifest = readJson(MANIFEST_PATH);

  for (const episode of manifest.episodes || []) {
    validateEpisode(episode, failures);
  }
  validateNoOldAudioNames(manifest, failures);

  if (failures.length) {
    console.error("Warehouse archive validation failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log("Warehouse archive validation passed.");
}

if (require.main === module) {
  run();
}

module.exports = {
  validateEpisode,
  validateNoOldAudioNames,
};
