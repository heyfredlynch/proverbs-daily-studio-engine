const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const MANIFEST_PATH = "data/production/week-two/productionManifest.week25.json";
const REGISTRY_PATH = "data/cadence/isrcRegistry.json";
const REVIEW_PACKET_PATH = "outputs/publish/week-two/cadence-isrc-review-week25.md";
const REQUIRED_PREFIX = "QT8YT";
const REQUIRED_EPISODE_FIELDS = {
  isrc: null,
  isrcHuman: null,
  isrcPrefix: REQUIRED_PREFIX,
  isrcYear: "26",
  isrcSequence: null,
  isrcStatus: "NEEDS_ISRC_ASSIGNMENT",
  cadenceRoyaltyStatus: "NEEDS_RIGHTS_REVIEW",
  recordingType: "SPOKEN_WORD_WITH_MUSIC_BED",
  rightsOwner: "Sacred Studios",
  recordingArtist: "Fred Lynch",
  musicBedStatus: "NEEDS_MUSIC_BED_METADATA",
  rightsNotes:
    "Potential spoken-word sound recording metadata for future Cadence royalty tracking.",
};

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

function validateRegistry(failures) {
  assert(fs.existsSync(absolute(REGISTRY_PATH)), "ISRC registry file is missing", failures);
  if (!fs.existsSync(absolute(REGISTRY_PATH))) {
    return;
  }

  const registry = readJson(REGISTRY_PATH);
  assert(registry.prefix === REQUIRED_PREFIX, `registry prefix should be ${REQUIRED_PREFIX}`, failures);
  assert(registry.assignmentPolicy === "MANUAL_APPROVAL_REQUIRED", "registry must require manual approval", failures);
  assert(Array.isArray(registry.records), "registry records must be an array", failures);
}

function validateManifest(failures) {
  const manifest = readJson(MANIFEST_PATH);
  assert((manifest.episodes || []).length === 7, "Week Two manifest should contain seven episodes", failures);

  for (const episode of manifest.episodes || []) {
    const label = episode.episodeAssetId || episode.date;

    for (const [field, expected] of Object.entries(REQUIRED_EPISODE_FIELDS)) {
      assert(Object.prototype.hasOwnProperty.call(episode, field), `${label}: missing ${field}`, failures);
      if (Object.prototype.hasOwnProperty.call(episode, field) && expected !== null) {
        assert(episode[field] === expected, `${label}: ${field} should be ${expected}`, failures);
      }
    }

    const hasAssignedIsrc = Boolean(episode.isrc || episode.isrcHuman);
    if (hasAssignedIsrc) {
      assert(
        episode.isrcSequence !== null && episode.isrcSequence !== undefined,
        `${label}: actual ISRC is assigned without isrcSequence`,
        failures
      );
    }
  }
}

function validateReviewPacket(failures) {
  assert(fs.existsSync(absolute(REVIEW_PACKET_PATH)), "Cadence review packet has not been prepared", failures);
}

function run() {
  const failures = [];
  validateRegistry(failures);
  validateManifest(failures);
  validateReviewPacket(failures);

  if (failures.length) {
    console.error("Cadence registry validation failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log("Cadence registry validation passed.");
}

if (require.main === module) {
  run();
}

module.exports = {
  validateRegistry,
  validateManifest,
  validateReviewPacket,
};
