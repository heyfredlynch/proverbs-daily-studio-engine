const fs = require("fs");
const path = require("path");
const { getUnusedVersesByChapter } = require("../verses/queryUnusedVerses");

const WEEKLY_PLAN_PATH = path.resolve(
  __dirname,
  "../../data/episode-manifest/weeklyPlan.json"
);

function parseStartDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) {
    throw new Error("Start date must be in YYYY-MM-DD format.");
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Start date is not a valid calendar date.");
  }

  return date;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDays(date, days) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function mapDayOfMonthToChapter(dayOfMonth) {
  return dayOfMonth;
}

function buildWeeklyPlan(startDateValue) {
  const startDate = parseStartDate(startDateValue);
  const rows = [];

  for (let offset = 0; offset < 7; offset += 1) {
    const date = addDays(startDate, offset);
    const dayOfMonth = date.getDate();
    const chapter = mapDayOfMonthToChapter(dayOfMonth);
    const chapterQuery = getUnusedVersesByChapter(chapter);

    rows.push({
      date: formatDate(date),
      dayOfMonth,
      chapter,
      coveragePercent: chapterQuery.coveragePercent,
      candidateVerses: chapterQuery.unusedVerseReferences.slice(0, 3),
      status: "Planning",
      selectedVerse: "",
      notes: ""
    });
  }

  return rows;
}

function writeWeeklyPlan(rows) {
  fs.mkdirSync(path.dirname(WEEKLY_PLAN_PATH), { recursive: true });
  fs.writeFileSync(
    WEEKLY_PLAN_PATH,
    `${JSON.stringify({ rows, lastUpdated: new Date().toISOString() }, null, 2)}\n`,
    "utf8"
  );
}

function printWeeklyPlan(rows) {
  console.log("Weekly Plan");
  console.log("");

  rows.forEach((row) => {
    console.log(`${row.date} | Day ${row.dayOfMonth} | Proverbs ${row.chapter}`);
    console.log(`Coverage: ${row.coveragePercent}%`);
    console.log(`Candidates: ${row.candidateVerses.length > 0 ? row.candidateVerses.join(", ") : "None available"}`);
    console.log(`Status: ${row.status}`);
    console.log("");
  });
}

function run() {
  const startDate = process.argv[2];

  if (!startDate) {
    console.error("Usage: node src/planning/generateWeeklyPlan.js <YYYY-MM-DD>");
    process.exit(1);
  }

  const rows = buildWeeklyPlan(startDate);
  writeWeeklyPlan(rows);
  printWeeklyPlan(rows);
  console.log(`Wrote ${WEEKLY_PLAN_PATH}`);
}

if (require.main === module) {
  run();
}

module.exports = {
  parseStartDate,
  formatDate,
  addDays,
  mapDayOfMonthToChapter,
  buildWeeklyPlan,
  writeWeeklyPlan,
  printWeeklyPlan
};
