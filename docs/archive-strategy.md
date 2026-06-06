# Archive Strategy

The Season One archive is the canonical source of truth for Proverbs Daily Season Two continuity.

See `docs/source-hierarchy.md` for the full source hierarchy. The canonical archive should drive factual indexing, while the editorial-history document should be treated as a secondary style and editorial behavior source.

Future generation should consult the archive before creating new episodes. The archive will help the system understand which scripture references, episode titles, Remember statements, prayers, Today's Challenge statements, and publication dates have already been used.

Verse reuse should be avoided whenever possible. When selecting a verse, the system should match the Proverbs chapter to the day of the month, then prefer unused verses from that chapter.

Chapter coverage should be tracked over time. The archive index should eventually show which chapters and verses have already appeared, which chapters are underused, and where Season Two has room to explore fresh material.

`CALL_AUDIBLE` allows intentional overrides. When it is explicitly provided, the system may reuse a verse or depart from the normal selection rules, but the override should be visible in the episode notes or manifest.
