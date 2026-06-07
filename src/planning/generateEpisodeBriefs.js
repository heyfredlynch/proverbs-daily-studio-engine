const fs = require("fs");
const path = require("path");

const WEEKLY_PLAN_WITH_RECOMMENDATIONS_PATH = path.resolve(
  __dirname,
  "../../data/episode-manifest/weeklyPlanWithVerseRecommendations.json"
);

const WEEKLY_PLAN_WITH_TITLES_PATH = path.resolve(
  __dirname,
  "../../data/episode-manifest/weeklyPlanWithTitles.json"
);

const OUTPUT_PATH = path.resolve(
  __dirname,
  "../../data/episode-manifest/weeklyEpisodeBriefs.json"
);

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

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function getRowKey(row) {
  return `${row.date || ""}|${row.chapter || ""}`;
}

function indexRowsByKey(rows) {
  return new Map(normalizeList(rows).map((row) => [getRowKey(row), row]));
}

function getTopVerseRecommendation(row) {
  return normalizeList(row.verseRecommendations)[0] || null;
}

function getTopMatchedDirectionIds(row) {
  const topRecommendation = getTopVerseRecommendation(row);

  return new Set(
    normalizeList(topRecommendation && topRecommendation.matchedDirections).map((direction) =>
      direction.ideaId
    )
  );
}

function sortDirections(left, right) {
  return (
    (Number(right.matchScore) || 0) - (Number(left.matchScore) || 0) ||
    normalizeText(left.seedTitle || left.ideaTitle).localeCompare(
      normalizeText(right.seedTitle || right.ideaTitle)
    )
  );
}

function getStrongestSuggestedDirection(recommendationRow, titleRow) {
  const suggestedDirections = normalizeList(titleRow && titleRow.suggestedDirections);

  if (suggestedDirections.length === 0) {
    return null;
  }

  const topMatchedDirectionIds = getTopMatchedDirectionIds(recommendationRow);
  const directionsMatchingRecommendedVerse = suggestedDirections.filter((direction) =>
    topMatchedDirectionIds.has(direction.ideaId)
  );
  const directionsToRank =
    directionsMatchingRecommendedVerse.length > 0
      ? directionsMatchingRecommendedVerse
      : suggestedDirections;

  return directionsToRank.slice().sort(sortDirections)[0] || null;
}

function getFirstAvailable(values) {
  return normalizeList(values).find((value) => normalizeText(value)) || "";
}

function buildBrief(recommendationRow, titleRow) {
  const topRecommendation = getTopVerseRecommendation(recommendationRow);
  const strongestDirection = getStrongestSuggestedDirection(recommendationRow, titleRow);

  return {
    date: recommendationRow.date || "",
    chapter: Number(recommendationRow.chapter) || 0,
    recommendedVerse: recommendationRow.recommendedVerse || "",
    selectedVerse: recommendationRow.recommendedVerse || "",
    episodeTitle: strongestDirection
      ? strongestDirection.seedTitle || strongestDirection.ideaTitle || ""
      : "",
    titleOptions: strongestDirection
      ? normalizeList(strongestDirection.suggestedTitles)
      : [],
    suggestedDirection: strongestDirection ? strongestDirection.cleanSummary || "" : "",
    persona: topRecommendation ? getFirstAvailable(topRecommendation.possiblePersonas) : "",
    metaSubject: topRecommendation ? getFirstAvailable(topRecommendation.possibleMetaSubjects) : "",
    runtimeTarget: "3.7 minutes",
    hardRuntimeMax: "4 minutes",
    readerVersionNeeded: true,
    performanceVersionNeeded: true,
    visualNotes: "",
    bRollTags: [],
    status: "Brief Draft",
    fredReviewNotes: ""
  };
}

function generateEpisodeBriefs(weeklyPlanWithRecommendations, weeklyPlanWithTitles) {
  const titleRowsByKey = indexRowsByKey(weeklyPlanWithTitles.rows);
  const briefs = normalizeList(weeklyPlanWithRecommendations.rows).map((row) =>
    buildBrief(row, titleRowsByKey.get(getRowKey(row)))
  );

  return {
    briefs,
    lastUpdated: new Date().toISOString()
  };
}

function printSummary(result) {
  const briefs = normalizeList(result.briefs);
  const briefsWithTitles = briefs.filter((brief) => normalizeText(brief.episodeTitle)).length;
  const briefsWithSuggestedDirections = briefs.filter((brief) =>
    normalizeText(brief.suggestedDirection)
  ).length;
  const briefsNeedingFredReview = briefs.filter(
    (brief) => brief.status === "Brief Draft"
  ).length;

  console.log(`Briefs created: ${briefs.length}`);
  console.log(`Briefs with titles: ${briefsWithTitles}`);
  console.log(`Briefs with suggested directions: ${briefsWithSuggestedDirections}`);
  console.log(`Briefs needing Fred review: ${briefsNeedingFredReview}`);
  console.log("");
  console.log("Sample brief:");
  console.log(JSON.stringify(briefs[0] || {}, null, 2));
}

function run() {
  const weeklyPlanWithRecommendations = readJson(WEEKLY_PLAN_WITH_RECOMMENDATIONS_PATH);
  const weeklyPlanWithTitles = readJson(WEEKLY_PLAN_WITH_TITLES_PATH);
  const result = generateEpisodeBriefs(weeklyPlanWithRecommendations, weeklyPlanWithTitles);

  writeJson(OUTPUT_PATH, result);
  printSummary(result);
  console.log("");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

if (require.main === module) {
  run();
}

module.exports = {
  buildBrief,
  generateEpisodeBriefs,
  getStrongestSuggestedDirection
};
