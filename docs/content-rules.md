# Content Rules

- Season Two target runtime is 3.7 minutes.
- Hard maximum runtime is 4 minutes.
- Reader Version is for Substack and ProverbsDaily.org.
- Performance Version is for ElevenLabs.
- Performance Version must not include headings, brackets, director cues, or markdown.
- Avoid repeating verses unless `CALL_AUDIBLE` is explicitly used.
- Match chapter to day of month when selecting verses.
- Prefer unused verses from that chapter.
- Every episode should include a Remember or equivalent mic-drop line.
- Prayer should be exactly 10 words for new generated scripts unless Fred intentionally approves a shorter legacy form.

## Weekly Draft Packet v0.2 Rules

- Weekly Draft Packet v0.2 separates Fred's editing surface from production metadata.
- Performance Script is Fred's primary editing and performance surface.
- Technical Script syncs from the approved Performance Script and should not become the source of truth after Fred edits.
- Only episodes marked `APPROVED` can be converted into production outputs.
- Performance Script keeps only spoken labels: `Remember:`, `Prayer:`, and `Today's Challenge:`.
- Technical/internal labels such as Hook, Scripture Breakdown, Revisit Scripture, Practical Illustration, and Encouraging Turn may guide generation but should not appear as spoken labels.
- Do not repeat the full stock support/about-author outro inside every Performance Script draft.
- Performance Script closes with `That's your Proverbs Daily. Be wise. Be well. Peace.`
- Platform outputs attach or omit the reusable standard outro according to `docs/weekly-draft-packet-v2-spec.md`.

## Translation Rules

- Use `data/scripture/all_proverbs_translations.csv` as the translation library when available.
- Current repo state includes `data/scripture/all_proverbs_translations.xlsx`; generator work should read it directly or export a controlled CSV before relying on the CSV path.
- Draft study default is NIV.
- Publication default is NET when Fred does not choose another translation.
- Open/public-domain fallback is WEB.
- Never silently replace Fred's chosen translation.
- Always record `translationUsed` and `publicationTranslationStatus` in the Technical Script.
- Do not default to KJV unless Fred chooses KJV or the system intentionally uses it as a fallback.
