const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const MANIFEST_PATH = "data/production/week-two/productionManifest.week25.json";
const REGISTRY_PATH = "data/cadence/isrcRegistry.json";
const REVIEW_PACKET_PATH = "outputs/publish/week-two/cadence-isrc-review-week25.md";

function absolute(relativePath) {
  return path.join(ROOT, relativePath);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(absolute(relativePath), "utf8"));
}

function writeText(relativePath, value) {
  const filePath = absolute(relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value.endsWith("\n") ? value : `${value}\n`, "utf8");
}

function recommendedNextAction(episode) {
  if (!episode.audioWarehousePath) {
    return "Archive final audio to the Google Drive warehouse before ISRC review.";
  }

  if (episode.musicBedStatus === "NEEDS_MUSIC_BED_METADATA") {
    return "Confirm music bed source, rights, and final mastered recording before manual ISRC assignment.";
  }

  return "Review final master and manually approve ISRC assignment when ready.";
}

function buildReviewPacket({ manifest, registry }) {
  const lines = [
    "# Cadence ISRC Review - Week 25",
    "",
    `Registrant: ${registry.registrant}`,
    `Contact: ${registry.contactEmail}`,
    `Prefix: ${registry.prefix}`,
    `Assignment policy: ${registry.assignmentPolicy}`,
    "",
    "No ISRC codes are assigned by this packet.",
    "",
    "## Episodes",
    "",
  ];

  for (const episode of manifest.episodes || []) {
    lines.push(
      `### ${episode.episodeAssetId}`,
      "",
      `- title: ${episode.title}`,
      `- scriptureReference: ${episode.scriptureReference}`,
      `- audioWarehousePath: ${episode.audioWarehousePath || "NEEDS_AUDIO_ARCHIVE"}`,
      `- currentIsrcStatus: ${episode.isrcStatus || "NEEDS_ISRC_ASSIGNMENT"}`,
      `- recordingType: ${episode.recordingType || "NEEDS_RECORDING_TYPE"}`,
      `- rightsOwner: ${episode.rightsOwner || "NEEDS_RIGHTS_OWNER"}`,
      `- recordingArtist: ${episode.recordingArtist || "NEEDS_RECORDING_ARTIST"}`,
      `- musicBedStatus: ${episode.musicBedStatus || "NEEDS_MUSIC_BED_METADATA"}`,
      `- recommendedNextAction: ${recommendedNextAction(episode)}`,
      ""
    );
  }

  return lines.join("\n");
}

function run() {
  const manifest = readJson(MANIFEST_PATH);
  const registry = readJson(REGISTRY_PATH);
  const packet = buildReviewPacket({ manifest, registry });
  writeText(REVIEW_PACKET_PATH, packet);
  console.log(`Created ${REVIEW_PACKET_PATH}`);
}

if (require.main === module) {
  run();
}

module.exports = {
  buildReviewPacket,
  recommendedNextAction,
};
