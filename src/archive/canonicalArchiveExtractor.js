const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const DEFAULT_SOURCE = path.resolve(
  __dirname,
  "../../data/season-one-archive/season-one-source-of-truth.docx"
);

const DEFAULT_OUTPUT = path.resolve(
  __dirname,
  "../../data/episode-manifest/canonicalIndex.json"
);

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function stripXmlTags(value) {
  return value.replace(/<[^>]+>/g, "");
}

function repairMojibake(value) {
  return value
    .replace(/\u00e2\u20ac\u201d/g, "\u2014")
    .replace(/\u00e2\u20ac\u201c/g, "\u2013")
    .replace(/\u00e2\u20ac\u00a6/g, "\u2026")
    .replace(/\u00e2\u20ac\u02dc/g, "\u2018")
    .replace(/\u00e2\u20ac\u2122/g, "\u2019")
    .replace(/\u00e2\u20ac\u0153/g, "\u201c")
    .replace(/\u00e2\u20ac\u009d/g, "\u201d")
    .replace(/\u00c2 /g, " ")
    .replace(/\u00c2/g, "");
}

function normalizeText(value) {
  return repairMojibake(decodeXml(stripXmlTags(value)))
    .replace(/\s+/g, " ")
    .trim();
}

function expandDocxToTemp(sourcePath) {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Canonical archive not found: ${sourcePath}`);
  }

  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "pd-canonical-"));
  const zipPath = path.join(tempRoot, "archive.zip");
  const extractPath = path.join(tempRoot, "docx");

  fs.copyFileSync(sourcePath, zipPath);
  fs.mkdirSync(extractPath, { recursive: true });

  execFileSync(
    "powershell.exe",
    [
      "-NoProfile",
      "-Command",
      "& { param($zipPath, $extractPath) Expand-Archive -LiteralPath $zipPath -DestinationPath $extractPath -Force }",
      zipPath,
      extractPath
    ],
    { stdio: "pipe" }
  );

  return { tempRoot, extractPath };
}

function readDocxParagraphs(sourcePath) {
  const { tempRoot, extractPath } = expandDocxToTemp(sourcePath);

  try {
    const documentXmlPath = path.join(extractPath, "word", "document.xml");
    const documentXml = fs.readFileSync(documentXmlPath, "utf8");
    const paragraphMatches = documentXml.match(/<w:p[\s\S]*?<\/w:p>/g) || [];

    return paragraphMatches
      .map((paragraphXml) => {
        const textRuns = paragraphXml.match(/<w:t(?:\s[^>]*)?>[\s\S]*?<\/w:t>/g) || [];
        return normalizeText(textRuns.join(""));
      })
      .filter(Boolean);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function isPlaceholder(value) {
  return /\[(MISSING|TRANSLATION)\s+.\s+VERIFY\]/i.test(value);
}

function parseScriptureReference(scriptureReference) {
  if (isPlaceholder(scriptureReference)) {
    return { chapter: 0, verse: 0, issue: "placeholder" };
  }

  const match = scriptureReference.match(/\bProverbs\s+(\d{1,2}):(\d{1,2})\b/i);
  if (!match) {
    return { chapter: 0, verse: 0, issue: "unparseable" };
  }

  const chapter = Number.parseInt(match[1], 10);
  const verse = Number.parseInt(match[2], 10);

  if (chapter === 0 || verse === 0) {
    return { chapter, verse, issue: "zero-reference" };
  }

  return { chapter, verse, issue: null };
}

function findNextValue(paragraphs, startIndex, label) {
  const target = label.toUpperCase();

  for (let index = startIndex; index < paragraphs.length; index += 1) {
    if (paragraphs[index].toUpperCase() === target) {
      return paragraphs[index + 1] || "";
    }
  }

  return "";
}

function extractEpisodes(paragraphs) {
  const episodes = [];
  const warnings = [];

  for (let index = 0; index < paragraphs.length; index += 1) {
    if (paragraphs[index].toUpperCase() !== "SCRIPTURE REFERENCE") {
      continue;
    }

    const scriptureReference = paragraphs[index + 1] || "";
    const parsedReference = parseScriptureReference(scriptureReference);
    const publishedDate = findNextValue(paragraphs, index + 2, "PUBLISHED");
    const episodeTitle = findNextValue(paragraphs, index + 2, "EPISODE TITLE");

    if (parsedReference.issue) {
      warnings.push({
        scriptureReference,
        issue: parsedReference.issue,
        episodeTitle,
        publishedDate
      });
    }

    if (isPlaceholder(episodeTitle) || isPlaceholder(publishedDate)) {
      warnings.push({
        scriptureReference,
        issue: "metadata-placeholder",
        episodeTitle,
        publishedDate
      });
    }

    episodes.push({
      scriptureReference,
      chapter: parsedReference.chapter,
      verse: parsedReference.verse,
      publishedDate,
      episodeTitle
    });
  }

  return { episodes, warnings };
}

function writeCanonicalIndex(outputPath, episodes) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(
    outputPath,
    `${JSON.stringify({ episodes }, null, 2)}\n`,
    "utf8"
  );
}

function run() {
  const sourcePath = path.resolve(process.argv[2] || DEFAULT_SOURCE);
  const outputPath = path.resolve(process.argv[3] || DEFAULT_OUTPUT);

  const paragraphs = readDocxParagraphs(sourcePath);
  const { episodes, warnings } = extractEpisodes(paragraphs);

  writeCanonicalIndex(outputPath, episodes);

  console.log(`Extracted ${episodes.length} canonical episode records.`);
  console.log(`Wrote ${outputPath}`);

  if (warnings.length > 0) {
    console.warn(`Flagged ${warnings.length} records for human review:`);
    warnings.forEach((warning) => {
      console.warn(
        `- ${warning.issue}: ${warning.scriptureReference || "[blank]"} | ${warning.publishedDate || "[no date]"} | ${warning.episodeTitle || "[no title]"}`
      );
    });
  }
}

if (require.main === module) {
  run();
}

module.exports = {
  decodeXml,
  repairMojibake,
  normalizeText,
  readDocxParagraphs,
  parseScriptureReference,
  extractEpisodes,
  writeCanonicalIndex
};
