# Weekly Draft Packet v0.2 Specification

## Purpose

Weekly Draft Packet v0.2 is the weekly human editing surface for Proverbs Daily. It replaces seven scattered draft files with one weekly packet that Fred can review, revise, approve, and use as the source for production outputs.

Do not generate new episode drafts as part of adopting this spec. This document defines the target packet behavior for future generator work.

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

Use `data/scripture/all_proverbs_translations.csv` as the translation library when available.

Draft study default: NIV.

Publication default when Fred does not choose another translation: NET.

Open/public-domain fallback: WEB.

Fred override: any selected translation from the translation library.

Never silently replace Fred's chosen translation.

Always record `translationUsed` and `publicationTranslationStatus` in the Technical Script.

Do not default to KJV unless Fred chooses KJV or the system is intentionally using it as a fallback.

Current repo note: `data/scripture/all_proverbs_translations.xlsx` exists. Generator work should either read this workbook directly or export it to the requested `.csv` path before treating the translation library as available.

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
