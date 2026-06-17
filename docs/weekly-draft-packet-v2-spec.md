# Weekly Draft Packet v0.2 Specification

## Purpose

Weekly Draft Packet v0.2 is the weekly human editing surface for Proverbs Daily. It replaces seven scattered draft files with one weekly packet that Fred can review, revise, approve, and use as the source for production outputs.

Do not generate new episode drafts as part of adopting this spec. This document defines the target packet behavior for future generator work.

`v0.2` is the current preferred workflow version name. The filename slug may use `v2` where that keeps existing paths short or stable.

## Naming

The weekly Google Doc should be named:

```text
Weekly Draft Packet - Week ## - Month Day-Day, Year
```

Example:

```text
Weekly Draft Packet - Week 25 - June 14-20, 2026
```

Use one Google Doc per week.

## Google Docs Tab Model

The weekly Google Doc should conceptually contain three tabs in this order:

1. PERFORMANCE SCRIPT
2. MASTER TEMPLATE
3. TECHNICAL SCRIPT

If actual Google Docs tabs cannot be created yet, generate a Google Docs-ready markdown packet with these three sections clearly separated.

## Tab 1: Performance Script

This is Fred's primary editing and performance surface.

All seven weekly episodes should be stacked in this tab or section.

Each episode starts with:

- Heading 1 = Scripture reference
- Heading 2 = Verse text
- Heading 3 = Episode title

Normal text after Heading 3 is the spoken performance script.

Spoken section labels that remain in the Performance Script:

- Remember:
- Prayer:
- Today's Challenge:

Technical/internal labels should not appear as spoken labels:

- Hook
- Scripture Breakdown
- Revisit Scripture
- Practical Illustration
- Encouraging Turn

These technical/internal sections may guide generation but should not be spoken in the Performance Script.

The Performance Script should close with:

```text
That's your Proverbs Daily.
Be wise.
Be well.
Peace.
```

Do not repeat the full stock support/about-author outro inside every Performance Script draft.

## Tab 2: Master Template

The Master Template captures the reusable episode-generation structure and quality gates. It should reference:

- `docs/creative-engine/proverbs-daily-script-generator-master-prompt.md`
- `docs/content-rules.md`
- `docs/editorial-dna.md`
- `docs/translation-policy.md`
- `components/outros/proverbs-daily-standard-outro.md`

The Master Template exists so weekly packets can preserve the creative rules without duplicating every source document inside every draft episode.

## Tab 3: Technical Script

Technical Script mirrors the Performance Script.

Technical Script is generated from the Performance Script. Once Fred edits the Performance Script and marks an episode `APPROVED`, the Performance Script becomes the source of truth.

Technical Script should sync from the approved Performance Script and include:

- metadata
- markdown markers
- platform rules
- translation status
- output paths
- audio notes
- video notes
- pipeline instructions
- outro attachment rules

## Approval Rule

The status marker is:

```text
APPROVED
```

Only `APPROVED` episodes can be converted into production outputs.

## Translation Rules

Use `data/scripture/all_proverbs_translations.xlsx` as the current canonical local translation library.

Draft study default: NIV.

Publication default when Fred does not choose another translation: NET.

Open/public-domain fallback: WEB.

Fred override: any selected translation from the translation library.

Committed repo-safe v0.2 markdown packet outputs should use publication-safe scripture text by default: NET first, WEB if NET is unavailable, and KJV only when no better available source exists.

NIV may remain available for local study and discovery mode, but should not be written into committed generated markdown outputs by default.

Never silently replace Fred's chosen translation.

Always record `translationUsed` and `publicationPermissionStatus` in the Technical Script.

Do not default to KJV unless Fred chooses KJV or the system is intentionally using it as a fallback.

CSV export may be supported later, but the Weekly Draft Packet v0.2 generator should not require or expect a CSV file.

If a selected translation cell appears suspiciously incomplete, the generator should skip it. If no safe translation can be retrieved, output:

```text
[Scripture text pending translation check.]
```

## Outro Component Rules

Store the reusable outro at:

```text
components/outros/proverbs-daily-standard-outro.md
```

Do not repeat the full stock outro inside every Performance Script draft.

Technical Script should specify outro attachment rules:

- Substack: attach standard outro
- Audio: attach standard outro
- Video: attach standard outro
- ProverbsDaily.org web app: omit standard outro

## Required Future Generator Behavior

Future packet generators should:

- create one weekly packet per week
- preserve Week One and Week Two outputs unless explicitly asked to regenerate them
- emit the three-tab model as Google Docs-ready markdown until native Google Docs tabs are supported
- build Technical Script from Fred-approved Performance Script text
- require `APPROVED` before producing platform outputs
- avoid full outro duplication in the Performance Script
- attach or omit the reusable outro according to platform rules
- record translation decisions in technical metadata
- use `src/lib/loadScriptureLibrary.js` for workbook-backed verse lookup
- keep unapproved episodes in draft/review mode

## Current Generator

The current markdown-first Week Two v0.2 generator is:

```text
src/production/createWeekTwoDraftPackV02.js
```

It writes new v0.2 files only:

```text
outputs/reader/google-docs/week-two/weekly-draft-packet-week-25-v02.md
outputs/technical/week-two/weekly-technical-script-week-25-v02.md
```

It must not overwrite:

```text
outputs/reader/google-docs/week-two/weekly-draft-packet.md
```

## Approval Gating

Allowed draft statuses:

- `NEEDS_FRED_DISCOVERY`
- `NEEDS_FRED_REVIEW`
- `APPROVED`

Only `APPROVED` episodes are eligible for production outputs:

- Substack output
- ProverbsDaily.org reader output
- ElevenLabs/audio script
- video script
- final technical export
