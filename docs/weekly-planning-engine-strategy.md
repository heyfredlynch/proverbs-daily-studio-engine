# Weekly Planning Engine Strategy

The Weekly Planning Engine sits between the Query Engine and the Script Generator.

The Query Engine provides clean verse availability answers from coverage data. The Weekly Planning Engine uses those answers to prepare a simple seven-day planning view. The Script Generator should receive selected planning inputs later, after Fred has reviewed candidates and chosen a direction.

## Current Scope

Weekly Planning Engine v0.1 accepts a start date in `YYYY-MM-DD` format and creates seven planning rows.

Each row includes:

- date
- day of month
- Proverbs chapter
- chapter coverage percentage
- up to three unused verse candidates
- planning status
- selected verse placeholder
- notes placeholder

## Rules

- Match the day of month to the Proverbs chapter.
- Use unused verse candidates from the Query Engine.
- Do not generate scripts.
- Do not match Idea Reservoir seeds yet.
- Keep the weekly plan editable so Fred can select verses and add notes later.

## Output

The engine prints a readable plan to the console and writes JSON to:

`data/episode-manifest/weeklyPlan.json`
