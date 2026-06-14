# Proverbs Daily Studio Engine Inventory for Claude

Repository: https://github.com/heyfredlynch/proverbs-daily-studio-engine

## What this repo is
A Proverbs Daily production system for planning, drafting, refining, approving, and publishing devotional episodes built around the Proverbs chapter-of-the-day rhythm.

## Top-level structure
- `data/`: source material, manifests, verse tracking, idea reservoir, dashboards, and archival inputs
- `docs/`: strategy docs, workflows, editorial rules, and the master specification
- `episodes/`: drafts, approved scripts, and published episode records
- `outputs/`: generated reader, performance, and video-planning assets
- `prompts/`: reusable prompt packs and processing prompts
- `src/`: core code for archive extraction, verse tracking, planning, generation, production, and idea handling
- `templates/`: reusable reader, performance, metadata, and idea templates
- `tests/`: fixtures and unit tests

## Key source-of-truth files
- `docs/MASTER-SPEC-Proverbs-Daily-Studio-Engine.md`: overall product and workflow specification
- `README.md`: compact repository overview
- `data/episode-manifest/canonicalIndex.json`: Season One canonical episode index
- `data/episode-manifest/weeklyPlan.json`: weekly planning output
- `data/episode-manifest/weeklyPlanWithVerseRecommendations.json`: weekly plan with verse scoring
- `data/verse-tracker/*.json`: coverage and reference tracking

## Major code areas
- `src/archive/`: canonical archive extraction from Season One source documents
- `src/verses/`: coverage engine, unused verse queries, and verse schemas
- `src/planning/`: weekly plan generation, idea matching, title generation, verse recommendations, and episode briefs
- `src/ideas/`: idea schema, parsing, and idea pool support
- `src/generation/`: script prompt-pack generation and rough draft generation
- `src/production/`: production pack creation

## Current content states
- `episodes/drafts/`: working drafts and prompt experiments
- `episodes/approved/week-one/`: approved Season Two Week One scripts
- `outputs/reader/`: reader-facing exports for Substack and ProverbsDaily.org
- `outputs/performance/`: ElevenLabs narration exports
- `outputs/video/`: video planning artifacts

## Best way to share this with Claude
1. Share the GitHub repository URL above if Claude has access to GitHub links.
2. If you want a compact review packet, share this inventory file plus `docs/MASTER-SPEC-Proverbs-Daily-Studio-Engine.md`.
3. If Claude needs the full codebase, export or zip the repo and provide the archive.

## Short handoff prompt
Review this repository as a Proverbs Daily studio engine. Focus on the master spec, the planning pipeline, verse tracking, idea reservoir, and the generated outputs under `episodes/` and `outputs/`. Identify any structural gaps, unclear ownership, or missing validation around the planning-to-production flow.
