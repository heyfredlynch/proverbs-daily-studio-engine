# Translation Policy

## Defaults

- NIV is default for study/draft mode when available.
- NET is preferred for publication-safe default.
- WEB is the open fallback.
- KJV may be used only by explicit choice, specific creative reason, or when no better available source exists.
- Fred's chosen translation always wins when it is available and safe to use.
- Never silently replace Fred's selected translation.

## Technical Metadata

The Technical Script must clearly mark:

- `translationUsed`
- `translationMode`
- `publicationPermissionStatus`
- `translationLibraryPath`
- `translationNotes`

## Repo-Safe Output Rule

Committed generated markdown packets should use publication-safe scripture text by default.

Preferred order:

1. NET
2. WEB
3. KJV only when necessary or explicitly chosen

NIV may remain available for local study and draft discovery, but it should not be written into committed generated markdown outputs by default.

If a selected translation cell appears suspiciously incomplete, the generator should skip it. If no safe translation can be retrieved, output:

```text
[Scripture text pending translation check.]
```

## Local Scripture Sources

The current local workbook source is:

```text
data/scripture/all_proverbs_translations.xlsx
```

The future local export folder is:

```text
scripture-library/
```

Generators should look in `scripture-library/` first when supported local CSV or JSON exports exist, then fall back to the workbook source.
