const fs = require("fs");
const path = require("path");

const COVERAGE_MAP_PATH = path.resolve(
  __dirname,
  "../../data/verse-tracker/coverageMap.json"
);

const CHAPTER_COVERAGE_PATH = path.resolve(
  __dirname,
  "../../data/verse-tracker/chapterCoverage.json"
);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getUnusedVersesByChapter(chapterNumber) {
  const chapter = Number.parseInt(chapterNumber, 10);

  if (!Number.isInteger(chapter) || chapter < 1 || chapter > 31) {
    throw new Error("Chapter must be an integer from 1 to 31.");
  }

  const coverageMap = readJson(COVERAGE_MAP_PATH);
  const chapterCoverage = readJson(CHAPTER_COVERAGE_PATH);
  const chapterSummary = chapterCoverage.chapters.find(
    (record) => record.chapter === chapter
  );

  if (!chapterSummary) {
    throw new Error(`No chapter coverage found for chapter ${chapter}.`);
  }

  const unusedVerseReferences = coverageMap.verses
    .filter((record) => record.chapter === chapter && !record.used)
    .sort((left, right) => left.verse - right.verse)
    .map((record) => record.scriptureReference);

  return {
    chapter,
    totalVerses: chapterSummary.totalVerses,
    coveredVerses: chapterSummary.coveredVerses,
    remainingVerses: chapterSummary.remainingVerses,
    coveragePercent: chapterSummary.coveragePercent,
    unusedVerseReferences
  };
}

function getLeastCoveredChapters() {
  // Future: return chapters sorted by lowest coverage percentage.
  throw new Error("getLeastCoveredChapters is not implemented yet.");
}

function getMostCoveredChapters() {
  // Future: return chapters sorted by highest coverage percentage.
  throw new Error("getMostCoveredChapters is not implemented yet.");
}

function getUnusedVerseCandidates() {
  // Future: combine day-of-month chapter rules, coverage, and selection constraints.
  throw new Error("getUnusedVerseCandidates is not implemented yet.");
}

function printUnusedVersesByChapter(chapterNumber) {
  const result = getUnusedVersesByChapter(chapterNumber);

  console.log(`Chapter ${result.chapter}`);
  console.log("");
  console.log(`Coverage: ${result.coveragePercent}%`);
  console.log(`Total verses: ${result.totalVerses}`);
  console.log(`Covered verses: ${result.coveredVerses}`);
  console.log(`Remaining verses: ${result.remainingVerses}`);
  console.log("");
  console.log("Unused Verses:");
  result.unusedVerseReferences.forEach((reference) => {
    console.log(reference);
  });

  return result;
}

if (require.main === module) {
  const chapterNumber = process.argv[2];

  if (!chapterNumber) {
    console.error("Usage: node src/verses/queryUnusedVerses.js <chapter>");
    process.exit(1);
  }

  printUnusedVersesByChapter(chapterNumber);
}

module.exports = {
  getUnusedVersesByChapter,
  getLeastCoveredChapters,
  getMostCoveredChapters,
  getUnusedVerseCandidates,
  printUnusedVersesByChapter
};
