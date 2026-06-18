# Approved Content Layer

The Approved Content Layer is the boundary between creative development and production.

## Source Of Truth

The FINAL Google Doc tab is the Week Two source of truth.

Codex and generator drafts are conversation starters. They are useful for structure, metadata, packet formatting, and creative exploration, but they are not approved content by themselves.

Fred's Riff Layer is required before approval. The live Fred revision pass is where the final voice, pacing, theology, story choices, titles, and spoken rhythm become production-ready.

Approved files in the repo become the production source after Fred marks the FINAL tab approved and the approved layer is created from that final text.

## Production Flow

```text
Planner
  -> Draft Generator
  -> Creative Exploration
  -> Fred Riff Layer
  -> FINAL
  -> APPROVED
  -> ElevenLabs
  -> Audio Review
  -> Video Pipeline
  -> Publish
```

## Week Two Current State

Direct FINAL Google Doc tab import is not available in this local repo context.

Week Two approved files therefore use:

```text
SOURCE_NEEDED_FROM_GOOGLE_DOC_FINAL_TAB
```

That marker means the production shell is ready, but the refined FINAL tab script text must be copied/imported before actual ElevenLabs generation.

## Approval Rule

Only files under `outputs/approved/` with `status: APPROVED` may become production inputs.

If approved files contain `SOURCE_NEEDED_FROM_GOOGLE_DOC_FINAL_TAB`, they are structurally approved but still waiting for final source text import before audio generation.
