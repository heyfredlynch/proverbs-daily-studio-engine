# Coverage Engine Strategy

The Coverage Engine determines which Proverbs verses have already been used in published episodes and which remain available.

Coverage is based only on the canonical archive:

`data/season-one-archive/season-one-source-of-truth.docx`

Editorial history does not determine coverage. It may help with style, revision behavior, and creative patterns, but it should not be used as the source of truth for whether a verse has been published.

## Coverage Fields

Coverage should be tracked by:

- chapter
- verse
- scripture reference
- publication date
- episode title

## Future Questions

The system should eventually answer:

1. Has this verse already been used?
2. What percentage of a chapter has been covered?
3. What verses remain unused?
4. Which verses have been used multiple times?
5. Which verses were used because of `CALL_AUDIBLE`?

## Rules

- Use the canonical archive first.
- Flag duplicate verse usage for review.
- Do not delete or rewrite usage records automatically.
- Track intentional reuse separately when `CALL_AUDIBLE` is used.
- Keep coverage separate from idea matching and editorial style analysis.
