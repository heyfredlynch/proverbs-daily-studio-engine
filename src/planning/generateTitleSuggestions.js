const fs = require("fs");
const path = require("path");

const WEEKLY_PLAN_WITH_IDEAS_PATH = path.resolve(
  __dirname,
  "../../data/episode-manifest/weeklyPlanWithIdeas.json"
);

const STARTER_IDEA_POOL_PATH = path.resolve(
  __dirname,
  "../../data/idea-reservoir/processed/starter-idea-pool.json"
);

const VERSE_THEMES_PATH = path.resolve(
  __dirname,
  "../../data/verse-tracker/verseThemes.json"
);

const OUTPUT_PATH = path.resolve(
  __dirname,
  "../../data/episode-manifest/weeklyPlanWithTitles.json"
);

const CURATED_TITLE_VARIATIONS = {
  "Grace In The Machine": [
    "When The Machine Still Needs Grace",
    "Grace Between The Gears",
    "Can Wisdom Live In The Machine?",
    "The Ghost Isn't The Point",
    "Still Human In The System"
  ],
  "Courting Disappointment": [
    "Stop Dating Disappointment",
    "When Desire Keeps Bad Company",
    "The Invitation That Costs Too Much",
    "You Can Want It And Still Walk Away",
    "Don't Let Want Lead"
  ],
  "Hum_Aw": [
    "Laughing With Your Shoes Off",
    "Awe Needs A Sense Of Humor",
    "Wonder With A Smile",
    "When Joy Learns Reverence",
    "Keep The Laugh, Keep The Awe"
  ],
  "Work The Equation": [
    "Do The Math, Do The Work",
    "Faith Still Has Homework",
    "The Equation Won't Work Itself",
    "Carry The One",
    "Process Is Part Of The Promise"
  ],
  "See It And Forget It": [
    "Growing Where Nobody Clapped",
    "Strength In The Dark",
    "Hidden Doesn't Mean Wasted",
    "Some Roots Need Night",
    "Forget The Seed, Trust The Soil"
  ],
  "Stayin' Alive": [
    "Find The Rhythm That Saves You",
    "When The Heart Loses The Beat",
    "Wisdom Has A Pulse",
    "Keep The Beat, Keep Breathing",
    "The Rhythm Of Staying Alive"
  ],
  "Leverage Your Losses": [
    "Make The Loss Work",
    "Don't Waste The Scar",
    "When Losing Starts Teaching",
    "Turn The Bruise Into Bread",
    "Loss Can Learn Your Name"
  ],
  "Like A Rock": [
    "What The Storm Revealed",
    "Still Standing After The Washout",
    "The Rock Was There The Whole Time",
    "When The Topsoil Is Gone",
    "Words That Weather Storms"
  ],
  "Risk Take – Miss Take – This Take": [
    "Miss Your Way Into The Right Take",
    "Every Miss Was A Map",
    "The Right Take Took A Few Misses",
    "Fail Forward, But Take Notes",
    "Mistakes With Receipts"
  ],
  "Cheep Speech Ain't Free": [
    "Cheap Talk Gets Expensive",
    "That Mouth Has A Receipt",
    "Free Speech Still Sends A Bill",
    "Words Cost More Than You Think",
    "Noise Has Consequences"
  ],
  "Make The World A Better Place": [
    "Small Goodness Travels",
    "The Coffee Was Ministry",
    "Love Changes The Weather",
    "Make The Room Better",
    "Goodness Has A Ripple"
  ]
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function normalizeList(value) {
  return Array.isArray(value) ? value : [];
}

function findIdea(ideaPool, ideaId) {
  return normalizeList(ideaPool.ideas).find((idea) => idea.id === ideaId);
}

function findVerseTheme(verseThemes, scriptureReference) {
  return normalizeList(verseThemes.verseThemes).find(
    (theme) => theme.scriptureReference === scriptureReference
  );
}

function buildFallbackTitles(seedTitle, direction, verseTheme) {
  const themeWords = normalizeList(verseTheme && verseTheme.themeKeywords).slice(0, 2);
  const theme = themeWords.length > 0 ? themeWords.join(" And ") : direction.category || "Wisdom";

  return [
    `${seedTitle}: What Wisdom Notices`,
    `When ${theme} Gets Real`,
    `The Wisdom Under ${seedTitle}`,
    `What ${seedTitle} Is Really Asking`,
    `Don't Miss The ${theme}`
  ];
}

function getSuggestedTitles(seedTitle, direction, row, verseThemes) {
  const curated = CURATED_TITLE_VARIATIONS[seedTitle];

  if (curated) {
    return curated.slice(0, 5);
  }

  const firstMatchedVerse = normalizeList(direction.matchedCandidateVerses)[0] ||
    normalizeList(row.candidateVerses)[0];
  const verseTheme = findVerseTheme(verseThemes, firstMatchedVerse);

  return buildFallbackTitles(seedTitle, direction, verseTheme).slice(0, 5);
}

function addTitleSuggestions(weeklyPlanWithIdeas, ideaPool, verseThemes) {
  const rows = normalizeList(weeklyPlanWithIdeas.rows).map((row) => ({
    ...row,
    suggestedDirections: normalizeList(row.suggestedDirections).map((direction) => {
      const idea = findIdea(ideaPool, direction.ideaId);
      const seedTitle = (idea && idea.title) || direction.ideaTitle || "";

      return {
        ...direction,
        seedTitle,
        suggestedTitles: getSuggestedTitles(seedTitle, direction, row, verseThemes)
      };
    })
  }));

  return {
    rows,
    lastUpdated: new Date().toISOString()
  };
}

function printSummary(result) {
  const rowsWithTitleSuggestions = result.rows.filter((row) =>
    row.suggestedDirections.some((direction) => direction.suggestedTitles.length > 0)
  ).length;
  const totalTitlesGenerated = result.rows.reduce(
    (total, row) =>
      total +
      row.suggestedDirections.reduce(
        (rowTotal, direction) => rowTotal + direction.suggestedTitles.length,
        0
      ),
    0
  );

  console.log(`Rows receiving title suggestions: ${rowsWithTitleSuggestions}`);
  console.log(`Total titles generated: ${totalTitlesGenerated}`);
  console.log("");
  console.log("Sample output:");

  ["Grace In The Machine", "Courting Disappointment", "Cheep Speech Ain't Free", "Hum_Aw"].forEach((title) => {
    const match = result.rows
      .flatMap((row) => row.suggestedDirections)
      .find((direction) => direction.seedTitle === title);

    if (match) {
      console.log(`${match.seedTitle}:`);
      match.suggestedTitles.forEach((suggestedTitle) => console.log(`- ${suggestedTitle}`));
      console.log("");
    }
  });
}

function run() {
  const weeklyPlanWithIdeas = readJson(WEEKLY_PLAN_WITH_IDEAS_PATH);
  const ideaPool = readJson(STARTER_IDEA_POOL_PATH);
  const verseThemes = readJson(VERSE_THEMES_PATH);
  const result = addTitleSuggestions(weeklyPlanWithIdeas, ideaPool, verseThemes);

  writeJson(OUTPUT_PATH, result);
  printSummary(result);
  console.log(`Wrote ${OUTPUT_PATH}`);
}

if (require.main === module) {
  run();
}

module.exports = {
  addTitleSuggestions,
  getSuggestedTitles,
  buildFallbackTitles
};
