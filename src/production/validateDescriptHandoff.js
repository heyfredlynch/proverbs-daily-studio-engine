const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const MANIFEST_PATH = "data/production/week-two/productionManifest.week25.json";
const HANDOFF_PATH = "outputs/video/week-two/descript-handoff-week25.json";
const REQUIRED_SCENES = ["OPEN", "SCRIPTURE", "TEACHING", "PIVOT", "CLOSE"];
const INTERNAL_LABEL_PATTERN = /^(open|pivot|close|remember|scripture|body|prayer|today's challenge)\s*:/i;
const EMOJI_PATTERN = /[\u{1f300}-\u{1faff}]/u;

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

function validateAvatarLine(episode, key, failures) {
  const label = episode.episodeAssetId || episode.date;
  const line = episode.avatarLines && episode.avatarLines[key];

  assert(typeof line === "string" && line.trim().length > 0, `${label}: avatarLines.${key} is empty`, failures);
  if (typeof line !== "string") {
    return;
  }

  assert(line.length < 300, `${label}: avatarLines.${key} is too long`, failures);
  assert(!/^#{1,6}\s/.test(line), `${label}: avatarLines.${key} contains a markdown heading`, failures);
  assert(!EMOJI_PATTERN.test(line), `${label}: avatarLines.${key} contains an emoji`, failures);
  assert(!INTERNAL_LABEL_PATTERN.test(line), `${label}: avatarLines.${key} contains an internal label`, failures);
  assert(!/[`*_]/.test(line), `${label}: avatarLines.${key} contains markdown markup`, failures);
}

function validateEpisode(episode, failures) {
  const label = episode.episodeAssetId || episode.date;

  for (const key of ["open", "pivot", "close"]) {
    validateAvatarLine(episode, key, failures);
  }

  assert(Array.isArray(episode.brollKeywords), `${label}: brollKeywords must be an array`, failures);
  if (Array.isArray(episode.brollKeywords)) {
    assert(
      episode.brollKeywords.length >= 5 && episode.brollKeywords.length <= 8,
      `${label}: brollKeywords must contain 5-8 phrases`,
      failures
    );
  }

  assert(Boolean(episode.musicMood), `${label}: missing musicMood`, failures);
  assert(Boolean(episode.audioWarehousePath), `${label}: missing audioWarehousePath`, failures);
  assert(episode.videoStatus === "READY_FOR_DESCRIPT_BUILD", `${label}: videoStatus is not READY_FOR_DESCRIPT_BUILD`, failures);

  assert(Array.isArray(episode.descriptSceneModel && episode.descriptSceneModel.scenes), `${label}: missing descriptSceneModel.scenes`, failures);
  if (Array.isArray(episode.descriptSceneModel && episode.descriptSceneModel.scenes)) {
    assert(
      JSON.stringify(episode.descriptSceneModel.scenes) === JSON.stringify(REQUIRED_SCENES),
      `${label}: descriptSceneModel.scenes mismatch`,
      failures
    );
  }

  assert(
    episode.descriptSceneModel &&
      episode.descriptSceneModel.speakers &&
      episode.descriptSceneModel.speakers.avatar === "Fred Daily Wisdom" &&
      episode.descriptSceneModel.speakers.narrator === "Fred Narrator",
    `${label}: descriptSceneModel.speakers mismatch`,
    failures
  );
}

function validateHandoffPacket(manifest, failures) {
  assert(fs.existsSync(absolute(HANDOFF_PATH)), "Descript handoff packet is missing", failures);
  if (!fs.existsSync(absolute(HANDOFF_PATH))) {
    return;
  }

  const handoff = readJson(HANDOFF_PATH);
  assert(Array.isArray(handoff.episodes), "Descript handoff packet episodes must be an array", failures);
  if (Array.isArray(handoff.episodes)) {
    assert(handoff.episodes.length === 7, "Descript handoff packet should contain seven episodes", failures);
  }

  const manifestIds = new Set((manifest.episodes || []).map((episode) => episode.episodeAssetId));
  for (const episode of handoff.episodes || []) {
    assert(manifestIds.has(episode.episodeAssetId), `${episode.episodeAssetId}: handoff episode is not in manifest`, failures);
  }
}

function run() {
  const failures = [];
  const manifest = readJson(MANIFEST_PATH);

  assert((manifest.episodes || []).length === 7, "Week Two manifest should contain seven episodes", failures);
  for (const episode of manifest.episodes || []) {
    validateEpisode(episode, failures);
  }
  validateHandoffPacket(manifest, failures);

  if (failures.length) {
    console.error("Descript handoff validation failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log("Descript handoff validation passed.");
}

if (require.main === module) {
  run();
}

module.exports = {
  validateEpisode,
  validateHandoffPacket,
};
