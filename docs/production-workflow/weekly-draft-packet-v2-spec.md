# Weekly Draft Packet v2 Specification

Weekly Draft Packet v2 is the Fred-review-first weekly production document for Proverbs Daily. The current preferred workflow version is Weekly Draft Packet v0.2, and `v2` is the short filename slug for this workflow.

## Google Docs Model

- One Google Doc per week.
- Title format: `Weekly Draft Packet - Week 25 - June 14-20, 2026`
- Tab 1: `PERFORMANCE SCRIPT`
- Tab 2: `MASTER TEMPLATE`
- Tab 3: `TECHNICAL SCRIPT`

Until Google Docs API tab creation exists, the generator should emit a markdown-first packet with those three sections in order.

## Performance Script

The Performance Script is Fred's primary editing and performance surface.

- All seven episodes are stacked in one section.
- Each episode starts with Heading 1.
- Heading 1 = scripture reference with book/chapter/verse/translation, such as `Proverbs 18:20 NET`.
- Heading 2 = quoted verse text.
- Heading 3 = episode title.
- Body = listener-facing performance script.
- Keep visible labels: `Remember`, `Prayer`, and `Today's Challenge`.
- Remove internal spoken labels such as `Scripture Breakdown`, `Revisit Scripture`, `Encouraging Turn`, `Practical Illustration`, and `Fred Revision Notes`.
- Parenthetical creative notes may appear only in draft/internal areas, never final listener-facing output.

## Master Template

The Master Template is not listener-facing. It carries the approved creative structure from `docs/creative-engine/proverbs-daily-script-generator-master-prompt.md`.

The required discovery workflow is:

1. Find the hook.
2. Refine the big idea.
3. Draft the finished script.

The goal is not to explain the verse. The goal is to help listeners discover wisdom already hiding in ordinary life.

## Technical Script

The Technical Script mirrors the Performance Script and adds markdown metadata plus pipeline fields.

Required fields include:

- `episodeDate`
- `weekNumber`
- `scriptureReference`
- `chapter`
- `verse`
- `translationUsed`
- `translationMode`
- `publicationPermissionStatus`
- `title`
- `status`
- `approvalMarker`
- `hookStatus`
- `bigIdeaStatus`
- `performanceScriptStatus`
- `outroComponent`
- `outroUse`
- `notes`

The Technical Script should sync with the Performance Script after Fred edits and marks an episode `APPROVED`.

## Translation Handling

- `draftDefault`: NIV
- `publicationDefault`: NET
- `fallbackOpen`: WEB
- `fredOverride`: true

Committed repo-safe markdown outputs should use publication-safe scripture text by default: NET first, WEB if NET is unavailable, and KJV only when no better available source exists or Fred explicitly chooses KJV.

## Outro Component

Reference the outro component instead of repeating it unnecessarily:

```yaml
outroComponent: proverbs-daily-standard-outro
outroUse:
  substack: true
  audio: true
  video: true
  webApp: false
```

## Current Week Two v2 Outputs

The Week Two v2 generator writes:

```text
outputs/reader/google-docs/week-two/weekly-draft-packet-week-25-v2.md
outputs/technical/week-two/weekly-technical-script-week-25-v2.md
```

It must not overwrite Week One files, Week Two v1 files, or the existing `v02` outputs.
