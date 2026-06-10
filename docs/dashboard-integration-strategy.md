# Dashboard Integration Strategy

The Dashboard Source layer captures Fred's preferred at-a-glance format for tracking used and unused Proverbs verses.

Primary source input:

`data/dashboard-sources/Content Inventory Dashboard_ Proverbs 8-13.xlsx`

This spreadsheet should be treated as a dashboard format exemplar. It is not a parsing target yet and should not change the current engines until the structure has been reviewed and mapped into a stable data model.

## Dashboard Requirements

Keep one tab per Proverbs chapter.

Add an extra master view called `All Proverbs`.

The chapter tabs should preserve Fred's quick chapter-by-chapter review pattern. The `All Proverbs` view should make it possible to scan the whole project across chapters, seasons, statuses, and usage history.

Each verse row should show:

- Chapter
- Verse
- Status
- Translation
- First words or verse snippet
- One-word topic
- All episode titles used for that verse
- Used dates
- Season
- Candidate title
- Seed match
- Review status
- Notes

## Status Options

Supported status values:

- `UNUSED`
- `DRAFTED`
- `APPROVED`
- `PUBLISHED`
- `CALL_AUDIBLE`
- `NEEDS_REVIEW`

These status values should support both fast weekly planning and long-term chapter completion review.

## Duplicate Usage Rule

If a verse has been used more than once, show all episode titles.

Do not hide prior uses.

Duplicates help Fred avoid repetition and spark fresh angles. A repeated verse is not automatically a problem, but the dashboard should make the repetition visible so Fred can decide whether the new treatment is fresh enough.

The dashboard should also preserve used dates and season information for repeated verses so Fred can see when and how the verse has already appeared.

## Dashboard Purpose

The dashboard should help Fred:

- see what has been used
- see what remains available
- avoid repetitive titles and themes
- move Sunday producer sessions faster
- support weekly planning
- support long-term chapter completion

The dashboard should remain human-readable first. Any future automation should serve Fred's review speed, not bury the editorial view under implementation detail.

## Weekly Producer Review

During the weekly review process, the dashboard should support:

- scanning upcoming Proverbs chapters
- finding unused or underused verses
- comparing candidate titles
- checking whether a verse already has a matching seed
- seeing which episodes are drafted, reviewed, approved, or published
- identifying repeated verses
- leaving notes for future script development

## Export Layer

Dashboard exports should live under:

`data/dashboard-exports/`

This folder is reserved for future generated dashboard views, review files, or spreadsheet-ready outputs. No export logic is being added yet.

## Boundaries

Do not write spreadsheet parsing code yet.

Do not modify existing engines yet.

Future work may define:

- a canonical dashboard data schema
- spreadsheet import rules
- dashboard export rules
- synchronization with the verse tracker
- weekly planning dashboard views
- duplicate usage reporting

