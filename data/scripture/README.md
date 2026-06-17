# Scripture Library

The current canonical local scripture library is:

```text
data/scripture/all_proverbs_translations.xlsx
```

Weekly Draft Packet v0.2 uses the Excel workbook directly through:

```text
src/lib/loadScriptureLibrary.js
```

CSV export may be supported later, but the current workflow does not require `data/scripture/all_proverbs_translations.csv`.

Translation fallback policy:

- Fred-selected translation overrides should be honored when present in the workbook.
- Draft/study mode prefers NIV when available.
- Publication-safe mode prefers NET when available.
- WEB is the open fallback.
- KJV is used only when Fred selects it or no better available source exists.
- Committed generated markdown outputs should use publication-safe mode by default, not draft NIV mode.
- Suspiciously incomplete verse cells should be skipped; if no safe translation is available, generated outputs should use `[Scripture text pending translation check.]`.
