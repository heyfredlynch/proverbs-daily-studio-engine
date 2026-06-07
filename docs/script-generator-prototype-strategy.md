# Script Generator Prototype Strategy

The Script Generator Prototype confirms the data handoff from Episode Briefs into script generation.

This v0.1 prototype does not call an external AI API. It reads the first brief from `data/episode-manifest/weeklyEpisodeBriefs.json` and creates a structured placeholder script at `episodes/drafts/testEpisodeScript.json`.

## Current Purpose

The goal is to prove that a reviewed episode brief can supply the essential script fields:

- date
- scripture reference
- episode title
- Reader Version placeholder
- Performance Version placeholder
- Remember
- Prayer
- Today's Challenge
- status
- notes

## Future Direction

Future versions will call an AI model using:

- `prompts/episode-generation/season-two-script-engine.md`
- `docs/editorial-dna.md`
- a reviewed episode brief

The AI-generated output should follow the Season Two script engine prompt and the Proverbs Daily Editorial DNA.

## Required Output Contract

Every script output must include both:

- Reader Version
- Performance Version

Reader Version is for Substack and ProverbsDaily.org.

Performance Version is for ElevenLabs narration and must be ElevenLabs-safe:

- clean spoken copy only
- no markdown
- no headings
- no labels
- no brackets
- no director cues

## Prototype Boundary

This prototype creates placeholders only. It does not generate devotional scripts, ElevenLabs narration copy, prayers, challenges, or final creative language.
