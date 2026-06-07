# Episode Brief Generator Strategy

The Episode Brief Generator sits between weekly planning and script generation.

It turns the planning pipeline into human-reviewable creative briefs. A brief is not a script. It is the handoff object that gives the Script Engine enough reviewed context to generate a Season Two episode later.

## v0.1 Scope

Version 0.1 reads:

- `data/episode-manifest/weeklyPlanWithVerseRecommendations.json`
- `data/episode-manifest/weeklyPlanWithTitles.json`

It writes:

`data/episode-manifest/weeklyEpisodeBriefs.json`

## Rules

- Use `recommendedVerse` as `selectedVerse` for now.
- Use the strongest suggested direction when available.
- Use the seed title as `episodeTitle` when available.
- Include existing generated title options when available.
- Choose `persona` and `metaSubject` from the selected recommendation's verse theme metadata when available.
- Leave missing fields blank instead of inventing values.
- Do not generate devotional scripts.
- Do not generate ElevenLabs copy.
- Do not generate video scripts.

## Human Review

Briefs are intentionally editable before script generation.

Fred can review and change:

- `selectedVerse`
- `episodeTitle`
- `suggestedDirection`
- `persona`
- `metaSubject`
- `visualNotes`
- `bRollTags`
- `fredReviewNotes`

## Script Engine Handoff

After review, the brief becomes the handoff into the Script Engine. The Script Engine should receive a reviewed brief rather than raw planning rows, because the brief captures the selected verse, title direction, creative posture, and production needs in one place.
