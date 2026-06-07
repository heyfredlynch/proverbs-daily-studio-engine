# Source Hierarchy

The Proverbs Daily Studio Engine uses a two-level source hierarchy so factual indexing stays separate from style modeling.

## 1. Canonical Source

`data/season-one-archive/season-one-source-of-truth.docx`

### Purpose

- Used scripture references
- Publication dates
- Episode titles
- Remember statements
- Prayers
- Today's Challenges
- Chapter coverage
- Published episode archive

### Rules

- Treat as authoritative.
- Use first for indexing and verse tracking.
- Flag placeholders like `[MISSING — VERIFY]`, `[TRANSLATION — VERIFY]`, or `Proverbs 0:00` for human review.

## 2. Editorial Style Source

`data/editorial-history/ALL PD SCRIPT AND NOTES.docx`

### Purpose

- Fred's live-writing voice
- Pacing instincts
- Title development
- Hook styles
- Revision preferences
- Cultural references
- Outro variations
- Draft-to-polish patterns

### Rules

- Do not treat as authoritative for scripture usage.
- Use only as secondary style and editorial behavior corpus.
- Never allow draft-only content to override canonical published records without human review.

## 3. Idea Reservoir Source

`data/idea-reservoir/`

Primary input:

`data/idea-reservoir/obsidian-seeds/`

Secondary legacy input:

`data/idea-reservoir/raw-notes/`

### Purpose

- Creative seeds
- Story hooks
- Quotes
- Podcast references
- Cultural metaphors
- Future episode directions

### Rules

- Non-authoritative.
- Suggestive only.
- Cannot override canonical archive.
- Can be selected, deferred, used, rejected, or archived.
- Obsidian Seeds are the primary Idea Reservoir input.
- iPhone Notes are secondary/raw legacy input.
- The full FlynchMind vault should not be committed into this repo.
- Only curated Proverbs Daily relevant markdown files should be copied or synced.
- Keep Obsidian markdown links, tags, and backlinks if present.

## 4. Parsing Strategy

- Build canonical archive parser first.
- Build editorial style analyzer second.
- Keep factual indexing separate from style modeling.
- Any repeated title or duplicate verse should be flagged, not automatically deleted.
- `CALL_AUDIBLE` allows intentional verse reuse.
