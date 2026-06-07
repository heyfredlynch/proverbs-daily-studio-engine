const fs = require("fs");
const path = require("path");

const WEEKLY_PLAN_WITH_IDEAS_PATH = path.resolve(
  __dirname,
  "../../data/episode-manifest/weeklyPlanWithIdeas.json"
);

const WEEKLY_PLAN_PATH = path.resolve(
  __dirname,
  "../../data/episode-manifest/weeklyPlan.json"
);

const VERSE_THEMES_PATH = path.resolve(
  __dirname,
  "../../data/verse-tracker/verseThemes.json"
);

const OUTPUT_PATH = path.resolve(
  __dirname,
  "../../data/episode-manifest/weeklyPlanWithVerseRecommendations.json"
);

const CONFIDENCE_BONUS = {
  High: 15,
  Medium: 10,
  Low: 5
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

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function loadWeeklyPlan() {
  if (fileExists(WEEKLY_PLAN_WITH_IDEAS_PATH)) {
    return readJson(WEEKLY_PLAN_WITH_IDEAS_PATH);
  }

  return readJson(WEEKLY_PLAN_PATH);
}

function findVerseTheme(verseThemes, scriptureReference) {
  return normalizeList(verseThemes && verseThemes.verseThemes).find(
    (theme) => normalizeText(theme.scriptureReference) === normalizeText(scriptureReference)
  );
}

function getDirectionsForVerse(row, scriptureReference) {
  return normalizeList(row.suggestedDirections).filter((direction) =>
    normalizeList(direction.matchedCandidateVerses)
      .map(normalizeText)
      .includes(normalizeText(scriptureReference))
  );
}

function getRecommendationConfidence(score) {
  if (score >= 70) return "High";
  if (score >= 45) return "Medium";
  if (score >= 20) return "Low";
  return "";
}

function scoreCandidateVerse(row, scriptureReference, verseThemes) {
  let recommendationScore = 20;
  const recommendationSignals = ["unusedCandidate"];
  const recommendationReasons = ["verse is listed as an unused candidate for this planning row"];
  const theme = findVerseTheme(verseThemes, scriptureReference);
  const matchedDirections = getDirectionsForVerse(row, scriptureReference);

  if (theme) {
    recommendationScore += 15;
    recommendationSignals.push("verseTheme");
    recommendationReasons.push("verse has planning theme metadata");
  }

  matchedDirections.forEach((direction) => {
    const confidenceBonus = CONFIDENCE_BONUS[direction.matchConfidence] || 0;
    recommendationScore += 40 + confidenceBonus;
    recommendationSignals.push("suggestedDirection");
    recommendationReasons.push(
      `${direction.ideaTitle} points at this candidate verse (${direction.matchConfidence || "Unrated"} idea match)`
    );
  });

  if (matchedDirections.length === 0 && normalizeList(row.suggestedDirections).length > 0) {
    recommendationScore += 5;
    recommendationSignals.push("rowDirectionContext");
    recommendationReasons.push("row has suggested directions, but none points at this exact verse yet");
  }

  return {
    scriptureReference,
    recommendationScore,
    recommendationConfidence: getRecommendationConfidence(recommendationScore),
    recommendationSignals,
    recommendationReasons,
    plainTheme: theme ? theme.plainTheme : "",
    themeKeywords: theme ? normalizeList(theme.themeKeywords) : [],
    possiblePersonas: theme ? normalizeList(theme.possiblePersonas) : [],
    possibleMetaSubjects: theme ? normalizeList(theme.possibleMetaSubjects) : [],
    matchedDirections: matchedDirections.map((direction) => ({
      ideaId: direction.ideaId,
      ideaTitle: direction.ideaTitle,
      matchScore: direction.matchScore,
      matchConfidence: direction.matchConfidence
    }))
  };
}

function recommendVersesForRow(row, verseThemes) {
  return normalizeList(row.candidateVerses)
    .map((scriptureReference) => scoreCandidateVerse(row, scriptureReference, verseThemes))
    .sort(
      (left, right) =>
        right.recommendationScore - left.recommendationScore ||
        normalizeList(row.candidateVerses).indexOf(left.scriptureReference) -
          normalizeList(row.candidateVerses).indexOf(right.scriptureReference)
    );
}

function addVerseRecommendations(weeklyPlan, verseThemes) {
  const rows = normalizeList(weeklyPlan.rows).map((row) => {
    const verseRecommendations = recommendVersesForRow(row, verseThemes);
    const primaryRecommendation = verseRecommendations[0] || null;
    const topScore = primaryRecommendation ? primaryRecommendation.recommendationScore : null;
    const topTieCount = topScore === null
      ? 0
      : verseRecommendations.filter(
          (recommendation) => recommendation.recommendationScore === topScore
        ).length;
    const recommendationStatus = primaryRecommendation
      ? topTieCount > 1
        ? "Top Tie - Needs Fred Review"
        : "Needs Fred Review"
      : "No Candidate Available";

    return {
      ...row,
      recommendedVerse: primaryRecommendation ? primaryRecommendation.scriptureReference : "",
      recommendationStatus,
      topTieCount,
      verseRecommendations
    };
  });

  return {
    rows,
    lastUpdated: new Date().toISOString()
  };
}

function printSummary(result) {
  const totalRows = result.rows.length;
  const rowsWithRecommendations = result.rows.filter(
    (row) => row.verseRecommendations.length > 0
  ).length;
  const highConfidenceRows = result.rows.filter(
    (row) =>
      row.verseRecommendations[0] &&
      row.verseRecommendations[0].recommendationConfidence === "High"
  ).length;

  console.log(`Total weekly rows: ${totalRows}`);
  console.log(`Rows with verse recommendations: ${rowsWithRecommendations}`);
  console.log(`Rows with high-confidence top recommendation: ${highConfidenceRows}`);
  console.log("");
  console.log("Top recommendations:");

  result.rows.forEach((row) => {
    const top = row.verseRecommendations[0];
    const label = top
      ? `${top.scriptureReference} (${top.recommendationScore}, ${top.recommendationConfidence})`
      : "None available";

    console.log(`${row.date} | Proverbs ${row.chapter}: ${label}`);
  });
}

function run() {
  const weeklyPlan = loadWeeklyPlan();
  const verseThemes = readJson(VERSE_THEMES_PATH);
  const result = addVerseRecommendations(weeklyPlan, verseThemes);

  writeJson(OUTPUT_PATH, result);
  printSummary(result);
  console.log("");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

if (require.main === module) {
  run();
}

module.exports = {
  addVerseRecommendations,
  recommendVersesForRow,
  scoreCandidateVerse,
  getRecommendationConfidence
};
