# Translation Policy

## Translation Library

The preferred translation library path is:

```text
data/scripture/all_proverbs_translations.csv
```

Use this CSV when it is available.

Current repository state also includes:

```text
data/scripture/all_proverbs_translations.xlsx
```

Until the CSV export exists, generator work should either read the workbook directly or create a controlled CSV export from it. Do not claim the CSV library is available unless the `.csv` file exists.

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

## Rules

- Never silently replace Fred's chosen translation.
- Always record `translationUsed` in the Technical Script.
- Always record `publicationTranslationStatus` in the Technical Script.
- Do not default to KJV unless Fred chooses KJV or the system is intentionally using it as a fallback.
- If the requested translation is missing from the library, mark the episode `NEEDS_FRED_REVIEW` or `TRANSLATION_MISSING` instead of substituting quietly.
- If copyright, licensing, or publication status is unclear, record the uncertainty in `publicationTranslationStatus`.

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
publicationTranslationStatus:
translationLibraryPath:
translationNotes:
```
