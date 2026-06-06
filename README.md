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
  video/

src/
  config/
  archive/
  verses/
  generation/
  formats/
  utils/

templates/
  reader/
  performance/
  metadata/

docs/

tests/
  fixtures/
  unit/
```

## Current Scope

This repository currently contains the initial scaffold, documentation, templates, and an episode schema example.

Generator logic has not been built yet.
