# Draft Script Generator Strategy v0.1

Draft Script Generator v0.1 turns weekly episode briefs into creative first drafts.

These drafts are not final publication scripts. They are springboards for Fred to revise, personalize, improvise from, and reshape with his own pastoral judgment and lived voice.

## Inputs

The draft pass is based on:

- `data/episode-manifest/weeklyEpisodeBriefs.json`
- `prompts/episode-generation/season-two-script-engine.md`
- `docs/editorial-dna.md`
- `docs/content-rules.md`

## Outputs

The draft pass creates one markdown file per weekly brief in `episodes/drafts/`.

Each draft includes:

- Scripture Citation
- Verse Text when available
- Working Episode Title
- Hook
- Devotional Body
- Remember
- Prayer
- Today's Challenge
- status: `DRAFT FOR FRED REVIEW`
- Recommended Improvements for Fred

## Editorial Purpose

The purpose is speed, inspiration, and iteration rather than automatic publishing.

Each draft should give Fred:

- a workable episode shape
- a title and theme direction
- a scripture-centered devotional path
- possible story opportunities
- places for lived Fred texture
- practical next-step challenge language

## Human Review

Human editorial review remains authoritative.

Fred should revise:

- scripture handling
- title fit
- lived story texture
- theological precision
- voice fidelity
- pacing
- prayer and challenge language

The engine can create a useful starting point, but Fred's ear remains the final instrument.

## Future Improvements

Future versions should add:

- actual verse text in the episode brief
- preferred translation handling
- recommendation score visibility
- automated runtime estimates
- ElevenLabs safety checks
- Reader Version and Performance Version separation
- stronger Fred Texture Layer examples
