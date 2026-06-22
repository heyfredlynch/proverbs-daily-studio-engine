const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const INDEX_PATH = "data/media/musicBeds/musicBedIndex.json";
const MANIFEST_PATH = "data/production/week-two/productionManifest.week25.json";
const HANDOFF_PATH = "outputs/video/week-two/descript-handoff-week25.json";
const PROVERBS_14_ASSET_ID = "S2-2026-06-14_prov-14-30_the-rhythm-of-a-sound-heart";
const PROVERBS_14_MUSIC_BED = "PainChangeThangs - Lo-Fi R&B Slow-Jam Alt.mp3";
const PROVERBS_14_DRIVE_FILE_ID = "16J_ho_x8zsCIch3t4NNSkUQN5qFArGdH";

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

function validateMusicBed(musicBed, label, failures) {
  assert(Boolean(musicBed), `${label}: missing musicBed`, failures);
  if (!musicBed) {
    return;
  }

  if (musicBed.status === "NEEDS_SELECTION") {
    assert(musicBed.selected === null, `${label}: NEEDS_SELECTION must have selected null`, failures);
    assert(musicBed.driveFileId === null, `${label}: NEEDS_SELECTION must have driveFileId null`, failures);
    assert(Boolean(musicBed.mood), `${label}: NEEDS_SELECTION must keep mood`, failures);
    return;
  }

  assert(Boolean(musicBed.selected), `${label}: selected musicBed needs filename`, failures);
  assert(Boolean(musicBed.driveFileId), `${label}: selected musicBed needs driveFileId`, failures);
  assert(Boolean(musicBed.mood), `${label}: selected musicBed needs mood`, failures);
}

function validateIndex(failures) {
  assert(fs.existsSync(absolute(INDEX_PATH)), "musicBedIndex.json is missing", failures);
  if (!fs.existsSync(absolute(INDEX_PATH))) {
    return null;
  }

  const index = readJson(INDEX_PATH);
  assert(Array.isArray(index.records), "musicBedIndex records must be an array", failures);
  const records = new Map((index.records || []).map((record) => [record.filename, record]));
  assert(records.has(PROVERBS_14_MUSIC_BED), "PainChangeThangs catalog entry is missing", failures);

  const selected = records.get(PROVERBS_14_MUSIC_BED);
  if (selected) {
    assert(selected.driveFileId === PROVERBS_14_DRIVE_FILE_ID, "PainChangeThangs driveFileId mismatch", failures);
  }

  return records;
}

function validateManifest(records, failures) {
  const manifest = readJson(MANIFEST_PATH);
  assert((manifest.episodes || []).length === 7, "Week Two manifest should contain seven episodes", failures);

  for (const episode of manifest.episodes || []) {
    const label = episode.episodeAssetId || episode.date;
    validateMusicBed(episode.musicBed, label, failures);

    if (episode.musicBed && episode.musicBed.selected) {
      assert(records && records.has(episode.musicBed.selected), `${label}: selected musicBed missing from index`, failures);
    }
  }

  const proverbs14 = (manifest.episodes || []).find((episode) => episode.episodeAssetId === PROVERBS_14_ASSET_ID);
  assert(Boolean(proverbs14), "Proverbs 14:30 episode missing from manifest", failures);
  if (proverbs14 && proverbs14.musicBed) {
    assert(proverbs14.musicBed.selected === PROVERBS_14_MUSIC_BED, "Proverbs 14:30 must use PainChangeThangs", failures);
    assert(
      proverbs14.musicBed.driveFileId === PROVERBS_14_DRIVE_FILE_ID,
      "Proverbs 14:30 PainChangeThangs driveFileId mismatch",
      failures
    );
  }
}

function validateHandoff(failures) {
  assert(fs.existsSync(absolute(HANDOFF_PATH)), "Descript handoff packet is missing", failures);
  if (!fs.existsSync(absolute(HANDOFF_PATH))) {
    return;
  }

  const handoff = readJson(HANDOFF_PATH);
  assert(Array.isArray(handoff.episodes), "Descript handoff episodes must be an array", failures);
  assert((handoff.episodes || []).length === 7, "Descript handoff should contain seven episodes", failures);

  for (const episode of handoff.episodes || []) {
    validateMusicBed(episode.musicBed, episode.episodeAssetId || episode.date, failures);
  }
}

function run() {
  const failures = [];
  const records = validateIndex(failures);
  validateManifest(records, failures);
  validateHandoff(failures);

  if (failures.length) {
    console.error("Music bed validation failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log("Music bed validation passed.");
}

if (require.main === module) {
  run();
}

module.exports = {
  validateIndex,
  validateManifest,
  validateHandoff,
};
