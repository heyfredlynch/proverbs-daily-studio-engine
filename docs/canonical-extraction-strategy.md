# Canonical Extraction Strategy

The first canonical archive extractor is a proof of concept focused only on published episode metadata.

Source:

`data/season-one-archive/season-one-source-of-truth.docx`

Output:

`data/episode-manifest/canonicalIndex.json`

## Assumptions

- The canonical archive is the authoritative source for published episode metadata.
- Episode records use repeated labels such as `SCRIPTURE REFERENCE`, `PUBLISHED`, and `EPISODE TITLE`.
- The extractor should read only metadata needed for indexing and future coverage work.
- Devotional text, Remember statements, Prayer statements, and Today's Challenge statements are intentionally ignored in this first pass.

## Extraction Rules

For each `SCRIPTURE REFERENCE` label, the extractor reads:

- the next paragraph as `scriptureReference`
- the next `PUBLISHED` label value as `publishedDate`
- the next `EPISODE TITLE` label value as `episodeTitle`

The scripture reference is parsed into:

- `chapter`
- `verse`

The output structure is:

```json
{
  "episodes": [
    {
      "scriptureReference": "",
      "chapter": 0,
      "verse": 0,
      "publishedDate": "",
      "episodeTitle": ""
    }
  ]
}
```

## Placeholder Handling

The extractor defensively flags records for human review when it finds:

- `Proverbs 0:00`
- `[MISSING — VERIFY]`
- `[TRANSLATION — VERIFY]`
- unparseable scripture references

Invalid or placeholder scripture references are retained in the output instead of being deleted. When a reference cannot be parsed, `chapter` and `verse` are set to `0` so the record remains visible for later cleanup.

## Known Issues

- This proof of concept depends on the current label structure of the DOCX archive.
- It does not calculate coverage.
- It does not extract devotional content, Remember, Prayer, or Today's Challenge.
- It does not validate the total verse count for each Proverbs chapter.
- It does not distinguish intentional reuse from accidental duplicate usage yet.
- It does not update `src/archive/archiveIndex.json`.
