# Obsidian Integration Plan

FlynchMind remains Fred's master second brain.

The Proverbs Daily Studio Engine should not import or commit the full FlynchMind vault. Instead, it should use only curated Proverbs Daily relevant markdown exports or synced files.

## Curated Export Folder

Curated Obsidian Seed files live here:

`data/idea-reservoir/obsidian-seeds/`

This folder may contain selected markdown files copied or synced from FlynchMind. Obsidian markdown links, tags, and backlinks should be preserved when present.

See `docs/manual-obsidian-sync-workflow.md` for Fred's current manual copy workflow.

## Suggested Workflow

1. Capture freely in Obsidian Seeds.
2. Tag promising items with `#proverbsdaily` or place them in `Seeds/ProverbsDaily`.
3. Copy or sync selected markdown files into `data/idea-reservoir/obsidian-seeds/`.
4. Process them into structured idea entries later.

Not every seed needs an immediate verse match. The Idea Reservoir should preserve uncertainty until a real Proverbs Daily connection becomes clear.

## Future Option

A future script may scan curated markdown files and extract:

- title
- tags
- Obsidian links
- backlinks
- source URLs
- quotes
- possible Proverbs chapters
- possible Proverbs verses
- possible personas
- possible meta-subjects

Do not treat extracted ideas as published content. Obsidian Seeds are suggestive only and cannot override the canonical archive.
