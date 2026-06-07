# Verse Recommendation Engine Strategy

The Verse Recommendation Engine sits after the Weekly Planning Engine and Idea Matching.

It does not choose a verse authoritatively. It ranks the existing unused candidate verses for each planning row so Fred can review the most promising option first.

## v0.1 Scope

Version 0.1 uses transparent scoring only. It does not use AI, does not quote scripture, and does not generate devotional content.

The engine reads:

- `data/episode-manifest/weeklyPlanWithIdeas.json` when available
- `data/episode-manifest/weeklyPlan.json` as a fallback
- `data/verse-tracker/verseThemes.json`

The engine writes:

`data/episode-manifest/weeklyPlanWithVerseRecommendations.json`

## Scoring

Each candidate verse receives:

- unused candidate baseline = 20 points
- verse theme metadata exists = 15 points
- suggested direction points at this candidate verse = 40 points
- idea match confidence bonus:
  - High = 15 points
  - Medium = 10 points
  - Low = 5 points
- row has suggested directions but none points at this exact verse = 5 points

## Confidence

Recommendation confidence is derived from the score:

- 70+ = High
- 45-69 = Medium
- 20-44 = Low

## Output Shape

Each planning row receives:

- `recommendedVerse`
- `recommendationStatus`
- `topTieCount`
- `verseRecommendations`

Each recommendation includes:

- scripture reference
- score
- confidence
- scoring signals
- scoring reasons
- verse theme metadata when available
- matched idea directions when available

## Rules

- Only rank verses already present in `candidateVerses`.
- Do not mark a verse as selected.
- Do not update verse usage.
- Do not generate scripts.
- If multiple verses share the top score, mark the row as a top tie.
- Preserve uncertainty and leave final selection to Fred.
