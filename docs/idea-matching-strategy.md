# Idea Matching Strategy

Idea Matching connects weekly planning rows to available seed ideas in a simple, transparent way.

## v0.1 Scope

Version 0.1 uses transparent matching only. It does not use AI and does not infer hidden meaning.

The matcher checks structured idea fields:

- tags
- possibleChapters
- possibleVerses
- possibleMetaSubjects
- possiblePersonas

If a structured field matches a weekly planning row, the idea can be listed as a suggested direction with a clear match reason.

## v0.2 Scoring

Version 0.2 adds transparent match scoring:

- exact possibleVerse match = 100 points
- chapter match = 40 points
- persona match = 20 points
- metaSubject match = 20 points
- tag match = 10 points

Only suggestions with a score of 40 or higher are included.

Suggestions are sorted by highest match score and limited to a maximum of three per weekly planning row.

## Confidence

Match confidence is derived from the score:

- 80+ = High
- 50-79 = Medium
- 40-49 = Low

If all matches are only chapter-level, they are still allowed, but they remain Low confidence.

## v0.3 Verse Theme Matching

Version 0.3 adds the Verse Theme Layer.

The matcher now loads:

- `weeklyPlan.json`
- `starter-idea-pool.json`
- `verseThemes.json`

It compares idea metadata against candidate verse metadata:

- idea tags against verse theme keywords
- idea meta subjects against verse meta subjects
- idea personas against verse personas

Verse theme matches add 25 points and populate `matchedCandidateVerses`.

Updated scoring:

- exact possibleVerse match = 100 points
- verse theme match = 25 points
- chapter match = 40 points
- persona match = 20 points
- metaSubject match = 20 points
- tag match = 10 points

Verse themes improve matching precision, but they are still suggestive. They do not replace scripture, and they should not force an idea onto a verse.

## Rules

- No forced matches.
- Empty suggestions are acceptable.
- Do not treat ideas as authoritative.
- Do not mark ideas as used during matching.
- Do not generate scripts from matched ideas.
- Preserve uncertainty.

## Future Direction

Future AI matching can be added later, but it should remain explainable. The system should show why an idea was suggested and leave Fred room to accept, defer, ignore, or reinterpret the connection.
