const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const MANIFEST_PATH = "data/production/week-two/productionManifest.week25.json";
const HANDOFF_PATH = "outputs/video/week-two/descript-handoff-week25.json";
const SCENES = ["OPEN", "SCRIPTURE", "TEACHING", "PIVOT", "CLOSE"];
const SPEAKERS = {
  avatar: "Fred Daily Wisdom",
  narrator: "Fred Narrator",
};

const EPISODE_VIDEO_METADATA = {
  "Proverbs 14:30": {
    open: "A sound heart has a rhythm. Not frantic, not comparing, but steady enough to give life.",
    pivot:
      "You are not stuck with envy as your rhythm. Gratitude can tune the heart again.",
    brollKeywords: [
      "diverse adults in calm morning prayer",
      "CPR training hands keeping steady rhythm",
      "phone apps draining battery abstract visual",
      "heart monitor gentle pulse close up",
      "multiethnic friends celebrating without comparison",
      "quiet room with soft sunlight and journal",
      "musical rhythm wave abstract animation",
    ],
    musicMood: "contemplative lo-fi gospel",
  },
  "Proverbs 15:1": {
    open: "You know that thing magnets do? Turn one around, and suddenly there is invisible resistance.",
    pivot:
      "A gentle answer is trained strength. It creates space for peace to enter the room.",
    brollKeywords: [
      "diverse coworkers having calm conversation",
      "magnets repelling on clean tabletop",
      "family kitchen tension softening",
      "invisible force field abstract light wave",
      "person pausing before replying to text",
      "community mediation circle respectful listening",
      "thermostat cooling warm room metaphor",
    ],
    musicMood: "gentle ambient hip-hop",
  },
  "Proverbs 16:23": {
    open: "GPS has made us both bold and helpless. One little word can change the whole mood: rerouting.",
    pivot:
      "Your heart can teach your mouth before your words take the wrong exit.",
    brollKeywords: [
      "diverse rideshare driver using GPS at dusk",
      "navigation app rerouting on dashboard",
      "person pausing before difficult conversation",
      "classroom chalkboard wisdom metaphor",
      "road fork with soft sunrise",
      "close up of thoughtful speaker at microphone",
      "glowing route line recalculating abstract",
    ],
    musicMood: "warm reflective soul",
  },
  "Proverbs 17:1": {
    open: "A simple table can become a feast when peace is present.",
    pivot:
      "Sometimes wisdom is not walking into the fight. Sometimes wisdom is making the room easier to breathe in.",
    brollKeywords: [
      "diverse family sharing simple meal peacefully",
      "dry bread on rustic table warm light",
      "quiet kitchen after conflict resolves",
      "empty dining room with calm atmosphere",
      "gentle apology between friends at home",
      "breathing room abstract soft light",
      "hands clearing kitchen counter peacefully",
    ],
    musicMood: "warm reflective gospel",
  },
  "Proverbs 18:21": {
    open: "Spoken words can feel free until the bill arrives.",
    pivot:
      "Speak words today you would not mind living on tomorrow.",
    brollKeywords: [
      "diverse teacher encouraging student",
      "text message being typed then paused",
      "comment thread transforming into calm dialogue",
      "fruit growing from spoken words abstract",
      "parent blessing child at doorway",
      "apology between friends in coffee shop",
      "microphone with warm light and gentle shadows",
    ],
    musicMood: "hopeful cinematic gospel",
  },
  "Proverbs 19:21": {
    open: "All of us have patterns running under the surface, almost like an inner algorithm.",
    pivot:
      "There is something stronger than the algorithm. The counsel of the Lord stands.",
    brollKeywords: [
      "diverse person journaling repeated reactions",
      "abstract code overlay on human heart",
      "community prayer group listening quietly",
      "person pausing before defensive response",
      "old machinery becoming new light metaphor",
      "mentor conversation in urban park",
      "algorithm flowchart dissolving into calm path",
    ],
    musicMood: "thoughtful neo-soul worship",
  },
  "Proverbs 20:24": {
    open: "Sometimes your steps can be ordered by God before they are understood by you.",
    pivot:
      "Maybe God is not giving you the whole map. Maybe He is giving you the next faithful step.",
    brollKeywords: [
      "diverse minister driving rainy back road at night",
      "headlights on dark pine tree highway",
      "small church community gathering warmly",
      "road map fading into single lit step",
      "person helping young people in neighborhood",
      "rain on windshield reflective close up",
      "quiet faithful walk through doorway",
    ],
    musicMood: "soulful cinematic reflection",
  },
};

function absolute(relativePath) {
  return path.join(ROOT, relativePath);
}

function readText(relativePath) {
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function writeJson(relativePath, value) {
  const filePath = absolute(relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function parseApprovedSections(scriptText) {
  const sections = new Map();
  const chunks = scriptText.split(/\n---\n/);

  for (const chunk of chunks) {
    const heading = chunk.match(/^##\s+(Proverbs\s+\d+:\d+)\s+-\s+(.+)$/m);
    if (!heading) {
      continue;
    }

    const remember = chunk.match(/^Remember:\s*(.+)$/m);
    sections.set(heading[1], {
      scriptureReference: heading[1],
      title: heading[2].trim(),
      remember: remember ? remember[1].trim() : "",
    });
  }

  return sections;
}

function buildAvatarLines(episode, approvedSection) {
  const metadata = EPISODE_VIDEO_METADATA[episode.scriptureReference];
  if (!metadata) {
    throw new Error(`Missing Descript metadata for ${episode.scriptureReference}`);
  }

  if (!approvedSection || approvedSection.title !== episode.title) {
    throw new Error(`Approved script section mismatch for ${episode.scriptureReference}`);
  }

  if (!approvedSection.remember) {
    throw new Error(`Missing Remember line for ${episode.scriptureReference}`);
  }

  return {
    open: metadata.open,
    pivot: metadata.pivot,
    close: `${approvedSection.remember} Be Wise. Be Well.`,
  };
}

function descriptSceneModel() {
  return {
    scenes: SCENES,
    speakers: SPEAKERS,
  };
}

function buildHandoffPacket(manifest) {
  return {
    week: manifest.week,
    sourceManifestPath: MANIFEST_PATH,
    episodes: manifest.episodes.map((episode) => ({
      episodeAssetId: episode.episodeAssetId,
      date: episode.date,
      title: episode.title,
      scriptureReference: episode.scriptureReference,
      approvedScriptPath: episode.approvedScriptPath,
      audioWarehousePath: episode.audioWarehousePath,
      avatarLines: episode.avatarLines,
      brollKeywords: episode.brollKeywords,
      musicMood: episode.musicMood,
      descriptSceneModel: episode.descriptSceneModel,
      videoStatus: episode.videoStatus,
    })),
  };
}

function run() {
  const manifest = readJson(MANIFEST_PATH);
  const scriptPath = manifest.episodes && manifest.episodes[0] && manifest.episodes[0].approvedScriptPath;
  if (!scriptPath) {
    throw new Error("Week Two manifest is missing approvedScriptPath");
  }

  const approvedSections = parseApprovedSections(readText(scriptPath));

  for (const episode of manifest.episodes || []) {
    const approvedSection = approvedSections.get(episode.scriptureReference);
    const metadata = EPISODE_VIDEO_METADATA[episode.scriptureReference];

    episode.avatarLines = buildAvatarLines(episode, approvedSection);
    episode.brollKeywords = metadata.brollKeywords;
    episode.musicMood = metadata.musicMood;
    episode.descriptSceneModel = descriptSceneModel();
    episode.videoStatus = "READY_FOR_DESCRIPT_BUILD";
  }

  writeJson(MANIFEST_PATH, manifest);
  writeJson(HANDOFF_PATH, buildHandoffPacket(manifest));

  console.log(`Updated ${MANIFEST_PATH}`);
  console.log(`Created ${HANDOFF_PATH}`);
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
  buildHandoffPacket,
  buildAvatarLines,
  parseApprovedSections,
};
