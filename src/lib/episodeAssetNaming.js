function slugifyTitle(title) {
  if (!title || typeof title !== "string") {
    throw new Error("title is required");
  }

  return title
    .toLowerCase()
    .replace(/['\u2018\u2019]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseScriptureReference(reference) {
  if (!reference || typeof reference !== "string") {
    throw new Error("scriptureReference is required");
  }

  const match = reference.trim().match(/^(proverbs|prov\.?)\s+(\d+):(\d+)$/i);
  if (!match) {
    throw new Error(`Unsupported scripture reference: ${reference}`);
  }

  const chapter = Number(match[2]);
  const verse = Number(match[3]);

  return {
    book: "Proverbs",
    bookSlug: "prov",
    chapter,
    verse,
    referenceSlug: `prov-${chapter}-${verse}`,
  };
}

function createEpisodeAssetId({ season, date, scriptureReference, title }) {
  if (season === undefined || season === null || season === "") {
    throw new Error("season is required");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) {
    throw new Error(`date must use YYYY-MM-DD format: ${date}`);
  }

  const seasonNumber = String(season).replace(/^S/i, "");
  if (!/^\d+$/.test(seasonNumber)) {
    throw new Error(`season must be a number or S-prefixed number: ${season}`);
  }

  const parsed = parseScriptureReference(scriptureReference);
  const episodeSlug = slugifyTitle(title);

  return `S${seasonNumber}-${date}_${parsed.referenceSlug}_${episodeSlug}`;
}

function createEpisodeAssetFilenames({ season, date, scriptureReference, title }) {
  const episodeAssetId = createEpisodeAssetId({ season, date, scriptureReference, title });

  return {
    episodeAssetId,
    script: `${episodeAssetId}.md`,
    audio: `${episodeAssetId}.mp3`,
    audioReview: `${episodeAssetId}.audio-review.md`,
    scenePlan: `${episodeAssetId}.scene.md`,
    video: `${episodeAssetId}.mp4`,
    thumbnail: `${episodeAssetId}-thumb.png`,
    captionsSrt: `${episodeAssetId}.srt`,
    captionsVtt: `${episodeAssetId}.vtt`,
    publishNotes: `${episodeAssetId}.publish.md`,
  };
}

module.exports = {
  slugifyTitle,
  parseScriptureReference,
  createEpisodeAssetId,
  createEpisodeAssetFilenames,
};
