# Video Pipeline v1 Spec

## Start Gate

The video pipeline begins only after audio is marked:

```text
AUDIO_APPROVED
```

Use the approved script plus approved audio.

## Scene Plans

Create one scene plan per episode.

Each scene plan should include:

- hook visual
- scripture card
- key metaphor visual
- Remember card
- Prayer card
- Challenge card
- outro/end card if needed

Save scene plans to:

```text
outputs/video/week-two/scene-plans/
```

Future assets go in:

```text
outputs/video/week-two/assets/
```

## Current Planning Script

Run:

```text
npm run video:week-two:plan
```

The current script creates scene-plan placeholders. Final scene direction should be filled from the approved FINAL tab script and approved audio review.
