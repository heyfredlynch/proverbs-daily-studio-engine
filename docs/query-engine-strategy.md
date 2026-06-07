# Query Engine Strategy

The Query Engine sits between the Coverage Engine and the Script Generator.

The Coverage Engine builds durable coverage files from canonical archive data. The Script Generator should not directly inspect those raw coverage files. Instead, it should ask the Query Engine for clean answers.

This keeps generation logic focused on creative decisions while the Query Engine handles coverage lookups, sorting, filtering, and future selection rules.

## Current Query

Implemented:

- `getUnusedVersesByChapter()`

This query returns:

- chapter number
- total verses
- covered verses
- remaining verses
- coverage percent
- list of unused verse references

## Future Query Types

Planned:

- `getLeastCoveredChapters()`
- `getMostCoveredChapters()`
- `getUnusedVerseCandidates()`

Future candidate queries may combine coverage data, day-of-month chapter rules, recently used verses, `CALL_AUDIBLE`, and dashboard planning needs.

## Rule

The Script Generator should ask the Query Engine for verse availability. It should not directly read `coverageMap.json` or `chapterCoverage.json`.
