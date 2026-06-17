# Translation Policy

## Translation Library

The current canonical local scripture library is an Excel workbook:

```text
data/scripture/all_proverbs_translations.xlsx
```

Use this `.xlsx` workbook for local scripture lookup.

CSV export may be supported later for automation or dashboard workflows, but it is not required for the current Weekly Draft Packet v0.2 workflow.

Do not require or expect `data/scripture/all_proverbs_translations.csv` unless a future task explicitly adds a CSV export.

## Defaults

Draft study default:

```text
NIV
```

Publication default when Fred does not choose another translation:

```text
NET
```

Open/public-domain fallback:

```text
WEB
```

Fred override:

```text
Any selected translation from the translation library.
```

Repo-safe generated markdown outputs should use publication-safe mode by default:

1. NET when available.
2. WEB if NET is unavailable.
3. KJV only if no better available source exists or Fred explicitly chooses KJV.

NIV may remain available for local study and draft discovery, but it should not be written into committed generated markdown outputs by default.

## Rules

- Never silently replace Fred's chosen translation.
- Always record `translationUsed` in the Technical Script.
- Always record `publicationPermissionStatus` in the Technical Script.
- Do not default to KJV unless Fred chooses KJV or the system is intentionally using it as a fallback.
- Do not silently fall back to KJV if NIV, NET, WEB, or Fred's selected translation exists in the workbook.
- If a selected verse cell appears suspiciously incomplete, skip it and use the next safe translation in the fallback chain.
- If no safe verse text can be retrieved, write `[Scripture text pending translation check.]` instead of committing questionable verse text.
- If the requested translation is missing from the library, mark the episode `NEEDS_FRED_REVIEW` or `TRANSLATION_MISSING` instead of substituting quietly.
- If copyright, licensing, or publication status is unclear, record the uncertainty in `publicationPermissionStatus`.

## Suggested Status Values

- `FRED_SELECTED`
- `DEFAULT_DRAFT_NIV`
- `DEFAULT_PUBLICATION_NET`
- `PUBLIC_DOMAIN_WEB_FALLBACK`
- `KJV_SELECTED_BY_FRED`
- `KJV_INTENTIONAL_FALLBACK`
- `TRANSLATION_MISSING`
- `NEEDS_FRED_REVIEW`
- `RIGHTS_STATUS_UNKNOWN`

## Technical Script Metadata

Each approved episode Technical Script should include at least:

```yaml
translationRequested:
translationUsed:
publicationPermissionStatus:
translationLibraryPath:
translationNotes:
```

## Loader

The reusable Node loader lives at:

```text
src/lib/loadScriptureLibrary.js
```

It reads the workbook, normalizes likely reference/chapter/verse/translation columns, and retrieves verses by Proverbs chapter, verse number, and requested translation or mode.
