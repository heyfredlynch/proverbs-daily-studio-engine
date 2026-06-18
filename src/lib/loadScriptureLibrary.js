const path = require("path");
const XLSX = require("xlsx");

const ROOT = path.resolve(__dirname, "../..");
const SCRIPTURE_LIBRARY_DIR = path.join(ROOT, "scripture-library");
const DEFAULT_WORKBOOK_PATH = path.join(
  ROOT,
  "data/scripture/all_proverbs_translations.xlsx"
);
const LOCAL_JSON_PATH = path.join(SCRIPTURE_LIBRARY_DIR, "all_proverbs_translations.json");
const LOCAL_CSV_PATH = path.join(SCRIPTURE_LIBRARY_DIR, "all_proverbs_translations.csv");

const TRANSLATION_KEYS = [
  "NIV",
  "NET",
  "WEB",
  "KJV",
  "NKJV",
  "NLT",
  "ESV",
  "MSG",
  "TPT",
];

const HEADER_ALIASES = {
  reference: ["reference", "scripturereference", "scripture", "ref"],
  chapter: ["chapter", "chap", "ch"],
  verseNumber: ["versenumber", "verse_num", "versenum", "verse no", "vs", "vs#", "v"],
  version: ["version", "translation"],
  verseText: [
    "text",
    "versetext",
    "scripturetext",
    "translationtext",
    "abcdefghijklmnopqrstuvwxyz",
    "a b c d e f g h i j k l m n o p q r s t u v w x y z",
  ],
};

function normalizeHeader(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function normalizeTranslationKey(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "");
}

function findSheetName(workbook) {
  const preferred = workbook.SheetNames.find((name) =>
    /proverbs|translation|scripture/i.test(name)
  );

  return preferred || workbook.SheetNames[0];
}

function buildHeaderMap(headers) {
  const map = new Map();

  headers.forEach((header, index) => {
    const normalized = normalizeHeader(header);
    const translation = normalizeTranslationKey(header);

    if (!normalized) return;

    map.set(normalized, index);

    if (TRANSLATION_KEYS.includes(translation)) {
      map.set(`translation:${translation}`, index);
    }
  });

  return map;
}

function getByAliases(row, headerMap, aliases) {
  for (const alias of aliases) {
    const index = headerMap.get(normalizeHeader(alias));
    if (index !== undefined) return row[index];
  }

  return "";
}

function getIndexByAliases(headerMap, aliases) {
  for (const alias of aliases) {
    const index = headerMap.get(normalizeHeader(alias));
    if (index !== undefined) return index;
  }

  return undefined;
}

function parseReference(value) {
  const match = String(value || "").match(/(?:Proverbs\s*)?(\d{1,2})\s*:\s*(\d{1,2})/i);

  if (!match) return null;

  return {
    chapter: Number(match[1]),
    verseNumber: Number(match[2]),
    reference: `Proverbs ${Number(match[1])}:${Number(match[2])}`,
  };
}

function normalizeRow(row, headerMap) {
  let reference = String(getByAliases(row, headerMap, HEADER_ALIASES.reference) || "").trim();
  let chapter = Number(getByAliases(row, headerMap, HEADER_ALIASES.chapter));
  let verseNumber = Number(getByAliases(row, headerMap, HEADER_ALIASES.verseNumber));

  const verseColumn = row[headerMap.get("verse")];
  const parsedVerseColumn = parseReference(verseColumn);

  if (!reference && parsedVerseColumn) reference = parsedVerseColumn.reference;
  if (!chapter && parsedVerseColumn) chapter = parsedVerseColumn.chapter;
  if (!verseNumber && parsedVerseColumn) verseNumber = parsedVerseColumn.verseNumber;

  const parsedReference = parseReference(reference);
  if (parsedReference) {
    reference = parsedReference.reference;
    if (!chapter) chapter = parsedReference.chapter;
    if (!verseNumber) verseNumber = parsedReference.verseNumber;
  }

  if (!reference && chapter && verseNumber) {
    reference = `Proverbs ${chapter}:${verseNumber}`;
  }

  const translations = {};

  for (const translation of TRANSLATION_KEYS) {
    const index = headerMap.get(`translation:${translation}`);
    const text = index === undefined ? "" : String(row[index] || "").trim();
    if (text) translations[translation] = text;
  }

  if (!reference || !chapter || !verseNumber) return null;

  return {
    reference,
    chapter,
    verseNumber,
    translations,
  };
}

function normalizeLongRows(rows, headerMap) {
  const chapterIndex = getIndexByAliases(headerMap, HEADER_ALIASES.chapter);
  const verseIndex = getIndexByAliases(headerMap, HEADER_ALIASES.verseNumber);
  const versionIndex = getIndexByAliases(headerMap, HEADER_ALIASES.version);
  const textIndex = getIndexByAliases(headerMap, HEADER_ALIASES.verseText);

  if (
    chapterIndex === undefined ||
    verseIndex === undefined ||
    versionIndex === undefined ||
    textIndex === undefined
  ) {
    return null;
  }

  const grouped = new Map();

  for (const row of rows.slice(1)) {
    const chapter = Number(row[chapterIndex]);
    const verseNumber = Number(row[verseIndex]);
    const translation = normalizeTranslationKey(row[versionIndex]);
    const text = String(row[textIndex] || "").trim();

    if (!chapter || !verseNumber || !translation || !text) continue;
    if (!TRANSLATION_KEYS.includes(translation)) continue;

    const key = `${chapter}:${verseNumber}`;
    const current =
      grouped.get(key) ||
      {
        reference: `Proverbs ${chapter}:${verseNumber}`,
        chapter,
        verseNumber,
        translations: {},
      };

    current.translations[translation] = text;
    grouped.set(key, current);
  }

  return [...grouped.values()];
}

function normalizeFlatRows(objects) {
  const grouped = new Map();

  for (const object of objects) {
    const chapter = Number(object.chapter || object.Chapter || object.ch);
    const verseNumber = Number(
      object.verseNumber ||
        object.VerseNumber ||
        object.verse ||
        object["Vs#"] ||
        object.vs
    );
    const translation = normalizeTranslationKey(
      object.translation || object.Version || object.version
    );
    const text = String(
      object.text ||
        object.verseText ||
        object.ScriptureText ||
        object["A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"] ||
        ""
    ).trim();

    if (!chapter || !verseNumber || !translation || !text) continue;
    if (!TRANSLATION_KEYS.includes(translation)) continue;

    const key = `${chapter}:${verseNumber}`;
    const current =
      grouped.get(key) ||
      {
        reference: `Proverbs ${chapter}:${verseNumber}`,
        chapter,
        verseNumber,
        translations: {},
      };

    current.translations[translation] = text;
    grouped.set(key, current);
  }

  return [...grouped.values()];
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current);
  return values;
}

function loadJsonLibrary(filePath) {
  const parsed = JSON.parse(require("fs").readFileSync(filePath, "utf8"));
  const rows = Array.isArray(parsed) ? parsed : parsed.rows || parsed.verses || [];

  return {
    workbookPath: filePath,
    sheetName: "json",
    translations: TRANSLATION_KEYS,
    rows: normalizeFlatRows(rows),
  };
}

function loadCsvLibrary(filePath) {
  const lines = require("fs")
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .filter((line) => line.trim());
  const headers = parseCsvLine(lines[0]);
  const rows = lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
  });

  return {
    workbookPath: filePath,
    sheetName: "csv",
    translations: TRANSLATION_KEYS,
    rows: normalizeFlatRows(rows),
  };
}

function loadWorkbookLibrary(workbookPath) {
  const workbook = XLSX.readFile(workbookPath);
  const sheetName = findSheetName(workbook);
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    raw: false,
  });

  if (!rows.length) {
    throw new Error(`No rows found in scripture workbook: ${workbookPath}`);
  }

  const headerMap = buildHeaderMap(rows[0]);
  const normalizedRows =
    normalizeLongRows(rows, headerMap) ||
    rows
      .slice(1)
      .map((row) => normalizeRow(row, headerMap))
      .filter(Boolean);

  return {
    workbookPath,
    sheetName,
    translations: TRANSLATION_KEYS,
    rows: normalizedRows,
  };
}

function loadScriptureLibrary(sourcePath) {
  const fs = require("fs");
  const resolvedSource = sourcePath
    ? path.resolve(sourcePath)
    : fs.existsSync(LOCAL_JSON_PATH)
      ? LOCAL_JSON_PATH
      : fs.existsSync(LOCAL_CSV_PATH)
        ? LOCAL_CSV_PATH
        : DEFAULT_WORKBOOK_PATH;

  if (/\.json$/i.test(resolvedSource)) return loadJsonLibrary(resolvedSource);
  if (/\.csv$/i.test(resolvedSource)) return loadCsvLibrary(resolvedSource);

  return loadWorkbookLibrary(resolvedSource);
}

function availableTranslations(row) {
  return TRANSLATION_KEYS.filter((translation) => row.translations[translation]);
}

function wordCount(text) {
  return String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function isSuspiciousVerseText(text) {
  const value = String(text || "").trim();

  if (!value) return true;
  if (wordCount(value) < 5) return true;
  if (/^[a-z]/.test(value)) return true;
  if (/^(and|but|for|or|so|then|therefore|because)\b/i.test(value)) return true;

  return false;
}

function safeTranslationEntries(row) {
  return TRANSLATION_KEYS.map((translation) => ({
    translation,
    text: row.translations[translation],
    suspicious: isSuspiciousVerseText(row.translations[translation]),
  })).filter((entry) => entry.text && !entry.suspicious);
}

function buildTranslationPlan({ requestedTranslation, mode }) {
  const requested = normalizeTranslationKey(requestedTranslation);
  const requestedPlan = requested ? [requested] : [];

  if (mode === "publication" || mode === "publication-safe") {
    return [...requestedPlan, "NET", "WEB", "KJV"];
  }

  return [...requestedPlan, "NIV", "NET", "WEB", "KJV"];
}

function getStatusForChoice({ requestedTranslation, chosenTranslation, mode }) {
  const requested = normalizeTranslationKey(requestedTranslation);

  if (requested && requested === chosenTranslation) return "FRED_SELECTED";
  if (chosenTranslation === "NIV" && mode !== "publication" && mode !== "publication-safe") {
    return "DEFAULT_DRAFT_NIV";
  }
  if (chosenTranslation === "NET") return "DEFAULT_PUBLICATION_NET";
  if (chosenTranslation === "WEB") return "PUBLIC_DOMAIN_WEB_FALLBACK";
  if (chosenTranslation === "KJV") {
    return requested === "KJV" ? "KJV_SELECTED_BY_FRED" : "KJV_INTENTIONAL_FALLBACK";
  }

  return "TRANSLATION_SELECTED";
}

function getVerse(library, options) {
  const chapter = Number(options.chapter);
  const verseNumber = Number(options.verse || options.verseNumber);
  const mode = options.mode || "draft";
  const requestedTranslation = options.requestedTranslation || options.translation;

  const row = library.rows.find(
    (candidate) =>
      candidate.chapter === chapter && candidate.verseNumber === verseNumber
  );

  if (!row) {
    throw new Error(`Verse not found in scripture library: Proverbs ${chapter}:${verseNumber}`);
  }

  const allowSuspicious = Boolean(options.allowSuspicious);
  const plan = [...new Set(buildTranslationPlan({ requestedTranslation, mode }))];
  const chosenTranslation = plan.find((translation) => {
    const text = row.translations[translation];
    if (!text) return false;
    return allowSuspicious || !isSuspiciousVerseText(text);
  });

  if (!chosenTranslation) {
    return {
      reference: row.reference,
      chapter: row.chapter,
      verseNumber: row.verseNumber,
      text: "[Scripture text pending translation check.]",
      translationUsed: "",
      translationRequested: normalizeTranslationKey(requestedTranslation) || "",
      translationMode: mode,
      publicationPermissionStatus: "TRANSLATION_CHECK_REQUIRED",
      requestedWasUnavailable: Boolean(requestedTranslation),
      availableTranslations: availableTranslations(row),
      safeAvailableTranslations: safeTranslationEntries(row).map((entry) => entry.translation),
      suspiciousTranslations: TRANSLATION_KEYS.filter(
        (translation) =>
          row.translations[translation] && isSuspiciousVerseText(row.translations[translation])
      ),
      libraryPath: library.workbookPath,
      sheetName: library.sheetName,
      isPlaceholder: true,
      isSuspicious: true,
    };
  }

  const requested = normalizeTranslationKey(requestedTranslation);
  const requestedWasUnavailable = Boolean(
    requested && requested !== chosenTranslation && !row.translations[requested]
  );

  return {
    reference: row.reference,
    chapter: row.chapter,
    verseNumber: row.verseNumber,
    text: row.translations[chosenTranslation],
    translationUsed: chosenTranslation,
    translationRequested: requested || "",
    translationMode: mode,
    publicationPermissionStatus: getStatusForChoice({
      requestedTranslation,
      chosenTranslation,
      mode,
    }),
    requestedWasUnavailable,
    availableTranslations: availableTranslations(row),
    safeAvailableTranslations: safeTranslationEntries(row).map((entry) => entry.translation),
    suspiciousTranslations: TRANSLATION_KEYS.filter(
      (translation) =>
        row.translations[translation] && isSuspiciousVerseText(row.translations[translation])
    ),
    libraryPath: library.workbookPath,
    sheetName: library.sheetName,
    isPlaceholder: false,
    isSuspicious: false,
  };
}

module.exports = {
  DEFAULT_WORKBOOK_PATH,
  LOCAL_CSV_PATH,
  LOCAL_JSON_PATH,
  TRANSLATION_KEYS,
  availableTranslations,
  getVerse,
  isSuspiciousVerseText,
  loadScriptureLibrary,
};
