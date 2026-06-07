# Reference Review Workflow

`invalidReferences.json` and `outOfRangeReferences.json` must be reviewed manually.

The system should not guess scripture corrections automatically. Invalid references, placeholders, and out-of-range references may reflect missing data, formatting issues, source archive problems, or intentional editorial decisions.

Corrections should be added to:

`data/verse-tracker/referenceCorrections.json`

Each correction should preserve the original reference, the reviewed correction, the reason for the correction, status, and any notes needed for future audit.

Once reviewed, a future parser or coverage builder can apply corrections safely. Until then, invalid and out-of-range references should remain visible and excluded from automatic coverage decisions.

## Review Rules

- Do not guess corrected references automatically.
- Do not delete invalid records.
- Preserve the original reference exactly.
- Mark unresolved records as `Needs Review`.
- Add corrected references only after human review.
- Keep notes when the reason is uncertain or the source archive needs cleanup.
