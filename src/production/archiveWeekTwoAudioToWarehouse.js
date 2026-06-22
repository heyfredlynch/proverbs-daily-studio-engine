const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const ROOT = path.resolve(__dirname, "../..");
const MANIFEST_PATH = "data/production/week-two/productionManifest.week25.json";
const SEASON = 2;
const WEEK = 25;
const AUDIO_WAREHOUSE_RELATIVE_FOLDER = path.join("04-AUDIO", "Season-2", "Week-25", "raw");
const RECORDING_RIGHTS_STATUS = "NEEDS_ISRC_REVIEW";
const RECORDING_TYPE = "SPOKEN_WORD_WITH_MUSIC_BED";
const RIGHTS_NOTES =
  "Potential spoken-word sound recording metadata for future Cadence royalty tracking.";

function absolute(relativePath) {
  return path.join(ROOT, relativePath);
}

function loadEnv() {
  dotenv.config({ path: absolute(".env") });
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(absolute(relativePath), "utf8"));
}

function writeJson(relativePath, value) {
  fs.writeFileSync(absolute(relativePath), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function requireWarehouseRoot() {
  const warehouseRoot = process.env.WAREHOUSE_ROOT;
  if (!warehouseRoot) {
    throw new Error("WAREHOUSE_ROOT is missing. Add it to .env before running the archive.");
  }

  if (!fs.existsSync(warehouseRoot)) {
    throw new Error(`WAREHOUSE_ROOT does not exist: ${warehouseRoot}`);
  }

  const stats = fs.statSync(warehouseRoot);
  if (!stats.isDirectory()) {
    throw new Error(`WAREHOUSE_ROOT is not a directory: ${warehouseRoot}`);
  }

  return warehouseRoot;
}

function shouldDeleteLocalAfterArchive() {
  return String(process.env.WAREHOUSE_DELETE_LOCAL_AFTER_ARCHIVE || "false").toLowerCase() === "true";
}

function isForceMode() {
  return process.argv.includes("--force");
}

function ensureRecordingRightsFields(episode) {
  if (!Object.prototype.hasOwnProperty.call(episode, "isrc")) {
    episode.isrc = null;
  }

  if (!episode.recordingRightsStatus) {
    episode.recordingRightsStatus = RECORDING_RIGHTS_STATUS;
  }

  if (!episode.recordingType) {
    episode.recordingType = RECORDING_TYPE;
  }

  if (!episode.rightsNotes) {
    episode.rightsNotes = RIGHTS_NOTES;
  }
}

function copyWithArchivePolicy({ localPath, warehousePath, force }) {
  if (!fs.existsSync(localPath)) {
    throw new Error(`Local audio file does not exist: ${localPath}`);
  }

  const localSize = fs.statSync(localPath).size;

  if (fs.existsSync(warehousePath)) {
    const warehouseSize = fs.statSync(warehousePath).size;
    if (warehouseSize !== localSize && !force) {
      throw new Error(
        `Warehouse file already exists with a different size: ${warehousePath}. Use --force to overwrite.`
      );
    }

    if (warehouseSize === localSize && !force) {
      return { copied: false, size: localSize };
    }
  }

  fs.copyFileSync(localPath, warehousePath);

  const copiedSize = fs.statSync(warehousePath).size;
  if (copiedSize !== localSize) {
    throw new Error(`Copied file size mismatch for ${warehousePath}`);
  }

  return { copied: true, size: localSize };
}

function archiveEpisodeAudio({ episode, warehouseFolder, force, deleteLocal }) {
  if (!episode.audioRawPath) {
    throw new Error(`${episode.date} is missing audioRawPath`);
  }

  const filename = path.basename(episode.audioRawPath);
  const localPath = absolute(episode.audioRawPath);
  const warehousePath = path.join(warehouseFolder, filename);

  fs.mkdirSync(warehouseFolder, { recursive: true });

  const result = copyWithArchivePolicy({ localPath, warehousePath, force });

  episode.audioArchiveStatus = "ARCHIVED";
  episode.audioWarehousePath = warehousePath;
  episode.audioWarehouseFolder = warehouseFolder;
  episode.localMediaPolicy = "TEMPORARY_LOCAL_COPY";
  ensureRecordingRightsFields(episode);

  if (deleteLocal) {
    fs.unlinkSync(localPath);
  }

  return {
    filename,
    copied: result.copied,
    size: result.size,
    deletedLocal: deleteLocal,
  };
}

function run() {
  loadEnv();
  const warehouseRoot = requireWarehouseRoot();
  const manifest = readJson(MANIFEST_PATH);
  const warehouseFolder = path.join(warehouseRoot, AUDIO_WAREHOUSE_RELATIVE_FOLDER);
  const force = isForceMode();
  const deleteLocal = shouldDeleteLocalAfterArchive();

  if (manifest.week !== WEEK) {
    throw new Error(`Expected Week ${WEEK} manifest but found Week ${manifest.week}`);
  }

  const archived = [];
  for (const episode of manifest.episodes || []) {
    archived.push(archiveEpisodeAudio({ episode, warehouseFolder, force, deleteLocal }));
  }

  writeJson(MANIFEST_PATH, manifest);

  console.log(`Archived Week ${WEEK} Season ${SEASON} raw audio to ${warehouseFolder}`);
  for (const item of archived) {
    const action = item.copied ? "copied" : "verified";
    const local = item.deletedLocal ? "local deleted" : "local kept";
    console.log(`- ${action}: ${item.filename} (${item.size} bytes, ${local})`);
  }
  console.log(`Updated ${MANIFEST_PATH}`);
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
  archiveEpisodeAudio,
  copyWithArchivePolicy,
  ensureRecordingRightsFields,
};
