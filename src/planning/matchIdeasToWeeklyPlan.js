const fs = require("fs");
const path = require("path");

const WEEKLY_PLAN_PATH = path.resolve(
  __dirname,
  "../../data/episode-manifest/weeklyPlan.json"
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
  "../../data/episode-manifest/weeklyPlanWithIdeas.json"
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

function hasSharedValue(leftValues, rightValues) {
  const rightSet = new Set(rightValues.map(normalizeText));
  return leftValues.some((value) => rightSet.has(normalizeText(value)));
}

function getVerseThemesForRow(row, verseThemes) {
  const candidateSet = new Set(normalizeList(row.candidateVerses).map(normalizeText));

  return normalizeList(verseThemes && verseThemes.verseThemes).filter((theme) =>
    candidateSet.has(normalizeText(theme.scriptureReference))
  );
}

function getMatchingVerseThemes(idea, row, verseThemes) {
  const ideaTags = normalizeList(idea.tags).map(normalizeText);
  const ideaMetaSubjects = normalizeList(idea.possibleMetaSubjects).map(normalizeText);
  const ideaPersonas = normalizeList(idea.possiblePersonas).map(normalizeText);
  const rowThemes = getVerseThemesForRow(row, verseThemes);

  return rowThemes.filter((theme) => {
    const themeKeywords = normalizeList(theme.themeKeywords).map(normalizeText);
    const themeMetaSubjects = normalizeList(theme.possibleMetaSubjects).map(normalizeText);
    const themePersonas = normalizeList(theme.possiblePersonas).map(normalizeText);

    return (
      hasSharedValue(ideaTags, themeKeywords) ||
      hasSharedValue(ideaMetaSubjects, themeMetaSubjects) ||
      hasSharedValue(ideaPersonas, themePersonas)
    );
  });
}

function matchIdeaToRow(idea, row, verseThemes) {
  const matchSignals = [];
  const matchReasons = [];
  let matchScore = 0;
  const rowChapter = Number(row.chapter);
  const candidateVerses = normalizeList(row.candidateVerses).map(normalizeText);
  const ideaTags = normalizeList(idea.tags).map(normalizeText);
  const possibleChapters = normalizeList(idea.possibleChapters).map(Number);
  const possibleVerses = normalizeList(idea.possibleVerses).map(normalizeText);
  const possibleMetaSubjects = normalizeList(idea.possibleMetaSubjects).map(normalizeText);
  const possiblePersonas = normalizeList(idea.possiblePersonas).map(normalizeText);

  if (possibleChapters.includes(rowChapter)) {
    matchScore += 40;
    matchSignals.push("chapter");
    matchReasons.push(`possibleChapters includes chapter ${rowChapter}`);
  }

  const matchingVerses = possibleVerses.filter((reference) =>
    candidateVerses.includes(reference)
  );

  if (matchingVerses.length > 0) {
    matchScore += 100;
    matchSignals.push("possibleVerse");
    matchReasons.push(`possibleVerses matches ${matchingVerses.join(", ")}`);
  }

  const matchingVerseThemes = getMatchingVerseThemes(idea, row, verseThemes);
  if (matchingVerseThemes.length > 0) {
    matchScore += 25;
    matchSignals.push("verseTheme");
    matchReasons.push(
      `verse themes match ${matchingVerseThemes
        .map((theme) => theme.scriptureReference)
        .join(", ")}`
    );
  }

  const rowSearchText = [
    row.notes,
    row.selectedVerse,
    row.status,
    ...(row.tags || []),
    ...(row.possibleMetaSubjects || []),
    ...(row.possiblePersonas || [])
  ]
    .map(normalizeText)
    .filter(Boolean)
    .join(" ");

  const matchingTags = ideaTags.filter((tag) => rowSearchText.includes(tag));
  if (matchingTags.length > 0) {
    matchScore += 10;
    matchSignals.push("tag");
    matchReasons.push(`tags match ${matchingTags.join(", ")}`);
  }

  const matchingMetaSubjects = possibleMetaSubjects.filter((subject) =>
    rowSearchText.includes(subject)
  );
  if (matchingMetaSubjects.length > 0) {
    matchScore += 20;
    matchSignals.push("metaSubject");
    matchReasons.push(`possibleMetaSubjects match ${matchingMetaSubjects.join(", ")}`);
  }

  const matchingPersonas = possiblePersonas.filter((persona) =>
    rowSearchText.includes(persona)
  );
  if (matchingPersonas.length > 0) {
    matchScore += 20;
    matchSignals.push("persona");
    matchReasons.push(`possiblePersonas match ${matchingPersonas.join(", ")}`);
  }

  return {
    matchScore,
    matchSignals,
    matchReasons,
    matchedCandidateVerses: matchingVerseThemes.map((theme) => theme.scriptureReference)
  };
}

function getMatchConfidence(matchScore) {
  if (matchScore >= 80) return "High";
  if (matchScore >= 50) return "Medium";
  if (matchScore >= 40) return "Low";
  return "";
}

function buildSuggestedDirection(idea, matchResult) {
  return {
    ideaId: idea.id,
    ideaTitle: idea.title,
    cleanSummary: idea.cleanSummary,
    category: idea.category,
    matchReason: matchResult.matchReasons.join("; "),
    matchedCandidateVerses: matchResult.matchedCandidateVerses,
    matchScore: matchResult.matchScore,
    matchSignals: matchResult.matchSignals,
    matchConfidence: getMatchConfidence(matchResult.matchScore),
    status: idea.status || "Available",
    reviewStatus: idea.reviewStatus || "Captured"
  };
}

function matchIdeasToWeeklyPlan(weeklyPlan, ideaPool, verseThemes) {
  const rows = normalizeList(weeklyPlan.rows).map((row) => {
    const suggestedDirections = normalizeList(ideaPool.ideas)
      .filter((idea) => idea.status !== "Used")
      .map((idea) => {
        const matchResult = matchIdeaToRow(idea, row, verseThemes);
        return matchResult.matchScore >= 40
          ? buildSuggestedDirection(idea, matchResult)
          : null;
      })
      .filter(Boolean)
      .sort((left, right) => right.matchScore - left.matchScore || left.ideaTitle.localeCompare(right.ideaTitle))
      .slice(0, 3);

    return {
      ...row,
      suggestedDirections
    };
  });

  return {
    rows,
    lastUpdated: new Date().toISOString()
  };
}

function printSummary(result, ideaPool) {
  const totalRows = result.rows.length;
  const totalIdeas = normalizeList(ideaPool.ideas).length;
  const rowsWithSuggestions = result.rows.filter(
    (row) => row.suggestedDirections.length > 0
  ).length;
  const rowsWithoutSuggestions = totalRows - rowsWithSuggestions;

  console.log(`Total weekly rows: ${totalRows}`);
  console.log(`Total ideas loaded: ${totalIdeas}`);
  console.log(`Rows with suggestions: ${rowsWithSuggestions}`);
  console.log(`Rows without suggestions: ${rowsWithoutSuggestions}`);
  console.log("");
  console.log("Sample output:");
  console.log(JSON.stringify(result.rows[0] || {}, null, 2));
}

function run() {
  const weeklyPlan = readJson(WEEKLY_PLAN_PATH);
  const ideaPool = readJson(STARTER_IDEA_POOL_PATH);
  const verseThemes = readJson(VERSE_THEMES_PATH);
  const result = matchIdeasToWeeklyPlan(weeklyPlan, ideaPool, verseThemes);

  writeJson(OUTPUT_PATH, result);
  printSummary(result, ideaPool);
  console.log("");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

if (require.main === module) {
  run();
}

module.exports = {
  matchIdeaToRow,
  buildSuggestedDirection,
  matchIdeasToWeeklyPlan
};
