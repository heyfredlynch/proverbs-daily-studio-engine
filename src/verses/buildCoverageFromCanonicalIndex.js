const fs = require("fs");
const path = require("path");

const CANONICAL_INDEX_PATH = path.resolve(
  __dirname,
  "../../data/episode-manifest/canonicalIndex.json"
);

const VERSE_TRACKER_DIR = path.resolve(__dirname, "../../data/verse-tracker");

const PROVERBS_CHAPTER_VERSE_COUNTS = {
  1: 33,
  2: 22,
  3: 35,
  4: 27,
  5: 23,
  6: 35,
  7: 27,
  8: 36,
  9: 18,
  10: 32,
  11: 31,
  12: 28,
  13: 25,
  14: 35,
  15: 33,
  16: 33,
  17: 28,
  18: 24,
  19: 29,
  20: 30,
  21: 31,
  22: 29,
  23: 35,
  24: 34,
  25: 28,
  26: 28,
  27: 27,
  28: 28,
  29: 27,
  30: 33,
  31: 31
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function isValidReference(record) {
  const chapterTotal = PROVERBS_CHAPTER_VERSE_COUNTS[record.chapter];

  return (
    Number.isInteger(record.chapter) &&
    Number.isInteger(record.verse) &&
    chapterTotal !== undefined &&
    record.verse >= 1 &&
    record.verse <= chapterTotal &&
    /^\s*Proverbs\s+\d{1,2}:\d{1,2}\s*$/i.test(record.scriptureReference || "")
  );
}

function isInvalidPlaceholderReference(record) {
  const reference = (record.scriptureReference || "").trim();

  return (
    reference === "Proverbs 0:00" ||
    reference === "Proverbs [?]" ||
    reference === "Proverbs"
  );
}

function isOutOfRangeReference(record) {
  const chapterTotal = PROVERBS_CHAPTER_VERSE_COUNTS[record.chapter];

  return (
    /^\s*Proverbs\s+\d{1,2}:\d{1,2}\s*$/i.test(record.scriptureReference || "") &&
    (chapterTotal === undefined || record.verse < 1 || record.verse > chapterTotal)
  );
}

function referenceKey(chapter, verse) {
  return `Proverbs ${chapter}:${verse}`;
}

function createVerseRecord(chapter, verse) {
  return {
    chapter,
    verse,
    scriptureReference: referenceKey(chapter, verse),
    used: false,
    usageCount: 0,
    firstUsedDate: "",
    lastUsedDate: "",
    episodeTitles: [],
    callAudibleUses: [],
    notes: ""
  };
}

function buildEmptyCoverageMap() {
  const coverageMap = {};

  Object.entries(PROVERBS_CHAPTER_VERSE_COUNTS).forEach(([chapterText, totalVerses]) => {
    const chapter = Number.parseInt(chapterText, 10);

    for (let verse = 1; verse <= totalVerses; verse += 1) {
      coverageMap[referenceKey(chapter, verse)] = createVerseRecord(chapter, verse);
    }
  });

  return coverageMap;
}

function compareDateStrings(left, right) {
  const leftTime = Date.parse(left);
  const rightTime = Date.parse(right);

  if (Number.isNaN(leftTime) && Number.isNaN(rightTime)) return 0;
  if (Number.isNaN(leftTime)) return 1;
  if (Number.isNaN(rightTime)) return -1;
  return leftTime - rightTime;
}

function applyUsage(coverageMap, record) {
  const key = referenceKey(record.chapter, record.verse);
  const coverageRecord = coverageMap[key];

  coverageRecord.used = true;
  coverageRecord.usageCount += 1;

  if (!coverageRecord.firstUsedDate || compareDateStrings(record.publishedDate, coverageRecord.firstUsedDate) < 0) {
    coverageRecord.firstUsedDate = record.publishedDate || "";
  }

  if (!coverageRecord.lastUsedDate || compareDateStrings(record.publishedDate, coverageRecord.lastUsedDate) > 0) {
    coverageRecord.lastUsedDate = record.publishedDate || "";
  }

  if (record.episodeTitle) {
    coverageRecord.episodeTitles.push(record.episodeTitle);
  }
}

function buildChapterCoverage(coverageMap) {
  return Object.entries(PROVERBS_CHAPTER_VERSE_COUNTS).map(([chapterText, totalVerses]) => {
    const chapter = Number.parseInt(chapterText, 10);
    const coveredVerses = Object.values(coverageMap).filter(
      (record) => record.chapter === chapter && record.used
    ).length;
    const remainingVerses = totalVerses - coveredVerses;
    const coveragePercent = Number(((coveredVerses / totalVerses) * 100).toFixed(2));

    return {
      chapter,
      totalVerses,
      coveredVerses,
      remainingVerses,
      coveragePercent,
      lastUpdated: new Date().toISOString()
    };
  });
}

function buildDuplicateVerseUsage(coverageMap) {
  return Object.values(coverageMap)
    .filter((record) => record.usageCount > 1)
    .map((record) => ({
      scriptureReference: record.scriptureReference,
      chapter: record.chapter,
      verse: record.verse,
      usageCount: record.usageCount,
      firstUsedDate: record.firstUsedDate,
      lastUsedDate: record.lastUsedDate,
      episodeTitles: record.episodeTitles,
      callAudibleUses: record.callAudibleUses,
      notes: record.notes
    }));
}

function summarize(chapterCoverage, validRecords, invalidRecords, coverageMap, duplicateVerseUsage) {
  const uniqueVersesCovered = Object.values(coverageMap).filter((record) => record.used).length;
  const sortedByCoverage = [...chapterCoverage].sort(
    (left, right) => right.coveragePercent - left.coveragePercent || left.chapter - right.chapter
  );
  const topFive = sortedByCoverage.slice(0, 5);
  const bottomFive = [...chapterCoverage]
    .sort((left, right) => left.coveragePercent - right.coveragePercent || left.chapter - right.chapter)
    .slice(0, 5);

  console.log(`Valid records: ${validRecords.length}`);
  console.log(`Invalid records: ${invalidRecords.length}`);
  console.log(`Unique verses covered: ${uniqueVersesCovered}`);
  console.log(`Duplicate verse count: ${duplicateVerseUsage.length}`);
  console.log("Top 5 most covered chapters by percent:");
  topFive.forEach((record) => {
    console.log(`- Chapter ${record.chapter}: ${record.coveragePercent}% (${record.coveredVerses}/${record.totalVerses})`);
  });
  console.log("Bottom 5 least covered chapters by percent:");
  bottomFive.forEach((record) => {
    console.log(`- Chapter ${record.chapter}: ${record.coveragePercent}% (${record.coveredVerses}/${record.totalVerses})`);
  });
}

function run() {
  const canonicalIndex = readJson(CANONICAL_INDEX_PATH);
  const coverageMap = buildEmptyCoverageMap();
  const validRecords = [];
  const invalidRecords = [];
  const outOfRangeRecords = [];

  canonicalIndex.episodes.forEach((record) => {
    if (isValidReference(record)) {
      validRecords.push(record);
      applyUsage(coverageMap, record);
    } else if (isInvalidPlaceholderReference(record)) {
      invalidRecords.push(record);
    } else if (isOutOfRangeReference(record)) {
      outOfRangeRecords.push(record);
    } else {
      invalidRecords.push(record);
    }
  });

  const coverageRecords = Object.values(coverageMap);
  const chapterCoverage = buildChapterCoverage(coverageMap);
  const duplicateVerseUsage = buildDuplicateVerseUsage(coverageMap);

  writeJson(path.join(VERSE_TRACKER_DIR, "coverageMap.json"), {
    verses: coverageRecords,
    lastUpdated: new Date().toISOString()
  });
  writeJson(path.join(VERSE_TRACKER_DIR, "chapterCoverage.json"), {
    chapters: chapterCoverage,
    lastUpdated: new Date().toISOString()
  });
  writeJson(path.join(VERSE_TRACKER_DIR, "duplicateVerseUsage.json"), {
    duplicates: duplicateVerseUsage,
    lastUpdated: new Date().toISOString()
  });
  writeJson(path.join(VERSE_TRACKER_DIR, "invalidReferences.json"), {
    invalidReferences: invalidRecords,
    lastUpdated: new Date().toISOString()
  });
  writeJson(path.join(VERSE_TRACKER_DIR, "outOfRangeReferences.json"), {
    outOfRangeReferences: outOfRangeRecords,
    lastUpdated: new Date().toISOString()
  });

  summarize(chapterCoverage, validRecords, invalidRecords, coverageMap, duplicateVerseUsage);

  if (outOfRangeRecords.length > 0) {
    console.log(`Out-of-range references excluded from coverage: ${outOfRangeRecords.length}`);
    outOfRangeRecords.forEach((record) => {
      console.log(`- ${record.scriptureReference} | ${record.publishedDate || "[no date]"} | ${record.episodeTitle || "[no title]"}`);
    });
  }
}

if (require.main === module) {
  run();
}

module.exports = {
  PROVERBS_CHAPTER_VERSE_COUNTS,
  isValidReference,
  isInvalidPlaceholderReference,
  isOutOfRangeReference,
  buildEmptyCoverageMap,
  applyUsage,
  buildChapterCoverage,
  buildDuplicateVerseUsage
};
