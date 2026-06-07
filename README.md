# Proverbs Daily Studio Engine

Purpose:

Generate Proverbs Daily Season Two episodes from a canonical archive of Season One content.

Goals:

- Generate new episodes
- Avoid repeated verses when possible
- Create Reader Version
- Create Performance Version
- Support ElevenLabs narration
- Support Substack publishing
- Support ProverbsDaily.org publishing
- Support future video generation workflows

Status:
Version 0.1 scaffold

## Approved Architecture

The project is organized around a simple production pipeline:

source archive -> verse selection -> script generation -> Fred review -> approval -> reader output -> performance output -> future video output

## Folder Structure

```text
data/
  season-one-archive/
  verse-tracker/
  episode-manifest/
  idea-reservoir/
    obsidian-seeds/
    raw-notes/
    processed/
    sources/

episodes/
  drafts/
  approved/
  published/

outputs/
  reader/
    substack/
    proverbsdaily-org/
  performance/
    elevenlabs/
  video/
    future-workflows/

prompts/
  episode-generation/
  reader-version/
  performance-version/
  idea-processing/
  video/

src/
  config/
  archive/
  verses/
  generation/
  formats/
  ideas/
    matching/
    status/
  utils/

templates/
  reader/
  performance/
  metadata/
  ideas/

docs/

tests/
  fixtures/
  unit/
```

## Current Scope

This repository currently contains the initial scaffold, documentation, templates, and an episode schema example.

Generator logic has not been built yet.

## Idea Reservoir

The Idea Reservoir stores unused creative inventory: story ideas, title ideas, quotes, podcast references, cultural hooks, and future episode directions.

It is separate from the canonical archive and editorial-history source. The canonical archive remains the authority for published truth, while the Idea Reservoir is suggestive only.

Obsidian Seeds are the primary Idea Reservoir input. Fred's FlynchMind vault remains the master second brain and should not be committed into this repository. Only curated Proverbs Daily relevant markdown files should be copied or synced into `data/idea-reservoir/obsidian-seeds/`.

iPhone Notes are secondary raw legacy input and live under `data/idea-reservoir/raw-notes/`.

Future dashboard workflows should use the Idea Reservoir to suggest 1-3 possible episode directions for weekly planning by combining available ideas with unused verses and chapter coverage data.
