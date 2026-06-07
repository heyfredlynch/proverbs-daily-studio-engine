# AI Script Prompt Pack Strategy

The AI Script Prompt Pack bridges the local planning engine and AI script generation.

The local pipeline already produces episode briefs and script placeholders. The prompt pack turns that local context into a reusable manual prompt that Fred can copy into ChatGPT, Gemini, or another model for testing.

## v0.1 Scope

Version 0.1 reads:

- `data/episode-manifest/weeklyEpisodeBriefs.json`
- `episodes/drafts/testEpisodeScript.json`
- `prompts/episode-generation/season-two-script-engine.md`
- `docs/editorial-dna.md`
- `docs/content-rules.md`

It writes:

`episodes/drafts/testScriptPromptPack.md`

## Current Use

The prompt pack supports manual AI testing only.

It includes:

- system and role instructions
- editorial DNA
- content rules
- the first episode brief
- script placeholder context
- required output structure

## Future Direction

Future versions may call an AI API directly. When that happens, the same prompt-pack structure can become the request payload foundation.

Until then, the prompt pack keeps the boundary clear: local code prepares context, and external AI generation happens manually.
