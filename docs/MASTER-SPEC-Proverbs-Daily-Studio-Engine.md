# MASTER SPEC: Proverbs Daily Studio Engine

## 1. Executive Summary

Proverbs Daily is a daily devotional content system built around the chapter of Proverbs that matches the day of the month. On the 7th day, the system works from Proverbs 7. On the 18th day, it works from Proverbs 18. This chapter/day rhythm gives the project a simple recurring structure while still leaving room for fresh creative interpretation, pastoral insight, and real-life application.

The Proverbs Daily Studio Engine helps Fred Lynch plan, generate, refine, publish, and catalog Proverbs Daily episodes. It is both a creative production system and a technical operating system for the devotional workflow. It connects scripture coverage tracking, an idea reservoir, AI-assisted planning, draft generation, Fred's producer-session refinement, audio and video production, publishing outputs, future delivery automation, and long-term cataloging.

The system already includes working modules for Season One archive extraction, Proverbs verse coverage tracking, weekly planning, idea matching, verse recommendation, title generation, episode brief generation, AI prompt-pack creation, rough draft creation, and the Week One Season Two production pack. It also includes approved Week One scripts and platform-specific outputs for Substack, ProverbsDaily.org, ElevenLabs, and video planning.

The future system should become a full studio engine that can move an episode from scripture planning to creative seed matching, script drafting, Fred's revision and approval, audio generation, video production, publishing, delivery automation, and catalog updates. It should support repeatable weekly production while preserving the improvisational, pastoral, and editorial character of Fred's work.

The goal is not one-click generic devotional content. The goal is a repeatable creative production system that preserves Fred's voice, theological instincts, and editorial authority while helping him move faster, remember better, produce cleaner, publish wider, and catalog the full history of the project.

## 2. Core Creative Philosophy

Scripture is the star. Proverbs Daily should never treat the biblical text as a decorative quote attached to a preselected motivational idea. The verse should shape the episode's center of gravity, language, tension, and practical turn.

Proverbs Daily helps people recognize wisdom in ordinary life. The episodes should make ancient wisdom feel visible in relationships, habits, choices, appetite, work, family, money, technology, leadership, attention, conflict, and everyday emotional life.

The strongest episodes start with wonder, move toward wisdom, and end with practice. A strong Proverbs Daily episode usually begins by noticing something human, surprising, funny, painful, ironic, or beautiful. It then lets scripture clarify what is happening. It ends with a concrete act of wisdom the listener or reader can try today.

The Sunday producer session is the preferred creative workflow. Fred's live instincts, interruptions, edits, reframes, titles, metaphors, theological corrections, and spontaneous stories are not incidental. They are part of the source material.

The process should feel like improvisational jazz, not mechanical automation. The system should provide structure, memory, and repeatable outputs, but the best creative movement happens when Fred riffs with the material, redirects the AI, chooses a stronger angle, rejects a bland line, and lets the scripture open up in the moment.

AI drafts are creative springboards, not final authority. AI can help generate options, organize ideas, draft rough scripts, propose titles, identify patterns, and prepare production files. It should not replace Fred's judgment, theological discernment, or final approval.

Fred's editorial voice and final approval remain authoritative. If an AI-generated draft sounds plausible but not like Fred, it is not ready. If a script is technically formatted but spiritually flat, it is not ready. If the system is uncertain about a scripture reference, translation, source, title, or output state, it must surface that uncertainty instead of guessing silently.

The Season Two standard is established by the June 7-13 refined scripts. These scripts are the current best exemplar set for tone, pacing, structure, platform adaptation, and Fred's approved direction.

Key creative pattern:

```text
Seed
  |
  v
Incubate
  |
  v
Match to Scripture
  |
  v
Generate Direction
  |
  v
Generate Draft
  |
  v
Fred Improvises
  |
  v
Approve
  |
  v
Produce
  |
  v
Publish
  |
  v
Catalog
```

## 3. Current Repository Source of Truth

GitHub is the production source of truth for now. The repository holds the working scripts, data, prompts, generated planning outputs, approved production files, and strategy documentation that define the current Studio Engine.

Repository:

https://github.com/heyfredlynch/proverbs-daily-studio-engine

Production source-of-truth hierarchy:

- GitHub repo = production source of truth.
- Firebase / ProverbsDaily.org database = app publishing destination.
- Substack = long-form reader publishing channel.
- YouTube, Instagram, TikTok, LinkedIn, Facebook = media distribution channels.
- Google Docs = human editing workspace.
- Season One archive docs = historical canonical reference.
- Season Two approved scripts = current production-ready content.
- Dashboard files = planning and cataloging aids.

This hierarchy means the repo should be treated as the canonical operational system until a future database, dashboard, or CMS layer is explicitly promoted. Publishing platforms are destinations, not primary source files. Google Docs can be used for human review and editing, but approved production state should be represented in the repo.

## 4. Current Folder Architecture

### `data/`

`data/` stores canonical source material, processed planning data, coverage data, dashboard inputs, and dashboard exports.

- `season-one-archive/`: Season One historical source documents. The primary source is `season-one-source-of-truth.docx`.
- `editorial-history/`: Historical editorial notes, prior scripts, production memory, and source documents that can inform tone and future refinement.
- `idea-reservoir/`: Raw and processed creative seeds. This includes raw notes, Obsidian seed workflows, processed idea pools, and status/review metadata.
- `episode-manifest/`: Generated planning outputs such as canonical indexes, weekly plans, idea-matched plans, title suggestions, verse recommendations, and episode briefs.
- `verse-tracker/`: Coverage outputs and verse metadata, including coverage maps, chapter coverage, duplicate usage, invalid references, out-of-range references, corrections, and verse themes.
- `season-two-exemplars/`: Season Two reference documents and exemplar scripts, including the June 7-13 refinement source.
- `dashboard-sources/`: Source spreadsheet or dashboard inputs used to build a future formal dashboard.
- `dashboard-exports/`: Generated dashboard exports, including future `.xlsx`, markdown, and JSON outputs.

### `episodes/`

`episodes/` stores episode scripts by lifecycle state.

- `drafts/`: Rough AI-assisted scripts and working drafts. These are for Fred review and should not be treated as publishable by default.
- `approved/`: Approved or production-review-ready master scripts. Week One Season Two approved scripts currently live under `episodes/approved/week-one/`.
- `published/`: ROADMAP. Future location for publication-ready or final published episode records if the repo keeps published script copies separately.

### `outputs/`

`outputs/` stores platform-specific generated production files.

- `reader/substack/`: Reader-facing Substack versions.
- `reader/proverbsdaily-org/`: Structured web/app versions for ProverbsDaily.org or Firebase-backed app publishing.
- `performance/elevenlabs/`: Plain spoken scripts for ElevenLabs voice generation.
- `video/planning/`: Video planning notes, visual beats, b-roll ideas, scripture typography notes, shorts hooks, and thumbnail/title guidance.

### `prompts/`

`prompts/` stores reusable AI prompt assets.

- `episode-generation/`: Prompts for generating Proverbs Daily episode scripts.
- `idea-processing/`: Prompts for turning raw notes into structured idea reservoir entries.
- `reader-version/`: ROADMAP. Prompts or templates for generating reader-facing versions.
- `performance-version/`: ROADMAP. Prompts or templates for generating spoken audio scripts.
- `video/`: ROADMAP. Prompts or templates for video planning and production notes.

### `src/`

`src/` stores code modules for extraction, planning, matching, generation, production, formatting, and utilities.

- `archive/`: Season One archive parsing and canonical extraction logic.
- `verses/`: Coverage engine, verse lookup, unused verse query logic, schemas, and verse tracking tools.
- `planning/`: Weekly planning, idea matching, title generation, verse recommendation, and episode brief generation.
- `ideas/`: Idea schema, parser, and idea pool support.
- `generation/`: Script prompt-pack generation and rough draft generation.
- `production/`: Production pack creation, currently including the Week One generator.
- `formats/`: ROADMAP. Future shared formatters for Substack, web/app, ElevenLabs, video planning, and metadata.
- `utils/`: ROADMAP. Future shared utilities.

### `docs/`

`docs/` stores workflow, strategy, content rules, source hierarchy, editorial DNA, planning strategy, extraction strategy, dashboard strategy, production workflow, and master specification documents.

### `templates/`

`templates/` stores reusable content templates.

- `reader/`: Reader-facing devotional templates.
- `performance/`: Spoken performance templates, including ElevenLabs-oriented text templates.
- `metadata/`: ROADMAP. Metadata templates for catalog records, publishing descriptions, and platform fields.
- `ideas/`: Idea capture templates.

## 5. Already Built and Working

### A. Canonical Archive Extraction

The canonical archive extraction system uses the Season One source document as historical source material.

Source:

- `data/season-one-archive/season-one-source-of-truth.docx`

Current behavior:

- Extracts Season One episode metadata.
- Produces `data/episode-manifest/canonicalIndex.json`.
- Identifies scripture references, titles, dates, devotional sections, Remember, Prayer, and Challenge fields.
- Flags invalid references and placeholders.
- Supports a canonical Season One reference layer for coverage, duplicate detection, dashboard planning, and future cataloging.

Primary implementation:

- `src/archive/canonicalArchiveExtractor.js`

### B. Coverage Engine

The coverage engine tracks which Proverbs verses have already been used and which remain unused.

Current outputs:

- `data/verse-tracker/coverageMap.json`
- `data/verse-tracker/chapterCoverage.json`
- `data/verse-tracker/duplicateVerseUsage.json`
- `data/verse-tracker/invalidReferences.json`
- `data/verse-tracker/outOfRangeReferences.json`

Current behavior:

- Tracks covered and uncovered Proverbs verses.
- Produces chapter-level coverage summaries.
- Identifies duplicate verse usage.
- Flags invalid references.
- Flags out-of-range references.
- Supports verse usage awareness before new episodes are planned.

Primary implementations:

- `src/verses/buildCoverageFromCanonicalIndex.js`
- `src/verses/coverageEngine.js`

### C. Query Engine

The query engine allows lookup of unused verses by chapter.

Current behavior:

- Looks up unused verses.
- Supports chapter/day planning by allowing Fred or the planning engine to ask which verses remain available for a given Proverbs chapter.
- Helps avoid accidental overuse while still preserving duplicate history when a verse has been reused intentionally.

Primary implementation:

- `src/verses/queryUnusedVerses.js`

### D. Weekly Planning Engine

The weekly planning engine generates a seven-day planning structure.

Current output:

- `data/episode-manifest/weeklyPlan.json`

Current behavior:

- Uses date to determine the correct Proverbs chapter.
- Selects unused candidate verses.
- Produces a weekly plan aligned to the chapter/day rhythm.
- Provides the base planning artifact used by downstream idea matching, title generation, verse recommendation, and brief generation.

Primary implementation:

- `src/planning/generateWeeklyPlan.js`

### E. Idea Reservoir

The idea reservoir stores creative seeds and preserves uncertainty instead of flattening raw intuition into premature certainty.

Current source areas:

- `data/idea-reservoir/raw-notes/`
- `data/idea-reservoir/processed/`
- `data/idea-reservoir/obsidian-seeds/`
- `src/ideas/ideaSchema.json`
- `data/idea-reservoir/processed/starter-idea-pool.json`

Current behavior:

- Stores creative seeds.
- Supports raw notes.
- Supports processed ideas.
- Supports source tracking.
- Supports an Obsidian seed workflow.
- Uses `ideaSchema.json` and `starter-idea-pool.json`.
- Tracks status and reviewStatus.

The idea reservoir should not over-clean raw thoughts. Its job is to hold creative material in a way that can later be matched, reviewed, and expanded without losing the original spark.

### F. Idea Matching Engine

The idea matching engine connects seed ideas to weekly plans.

Current output:

- `data/episode-manifest/weeklyPlanWithIdeas.json`

Current behavior:

- Matches ideas to weekly plan entries.
- Uses chapter, verse, persona, meta subject, tags, and verse themes.
- Produces suggested directions for daily episodes.
- Supports Fred's ability to choose or reject creative directions during the Sunday producer session.

Primary implementation:

- `src/planning/matchIdeasToWeeklyPlan.js`

### G. Verse Theme Layer

The verse theme layer adds lightweight thematic metadata to candidate verses.

Current output:

- `data/verse-tracker/verseThemes.json`

Current behavior:

- Adds themes for candidate verses.
- Supports better idea matching.
- Helps planning and title generation find conceptual links.
- Does not replace scripture study, theological judgment, or Fred's interpretation.

The verse theme layer should remain lightweight. It is a planning aid, not a commentary layer.

### H. Title Engine

The title engine suggests episode titles from seed ideas and verse themes.

Current output:

- `data/episode-manifest/weeklyPlanWithTitles.json`

Current behavior:

- Suggests titles for weekly plan entries.
- Uses seed ideas, verse themes, and planning context.
- Helps Fred quickly evaluate possible creative angles.
- Should avoid accidental repeated titles by consulting prior title usage as dashboard/cataloging improves.

Primary implementation:

- `src/planning/generateTitleSuggestions.js`

### I. Verse Recommendation Engine

The verse recommendation engine scores candidate verses.

Current output:

- `data/episode-manifest/weeklyPlanWithVerseRecommendations.json`

Current behavior:

- Scores candidate verses.
- Helps prioritize stronger verse options for a daily chapter.
- Flags ties and review needs.
- Supports human decision-making rather than replacing it.

Primary implementation:

- `src/planning/recommendVersesForWeeklyPlan.js`

### J. Episode Brief Generator

The episode brief generator converts planning outputs into creative briefs.

Current output:

- `data/episode-manifest/weeklyEpisodeBriefs.json`

Current behavior:

- Turns planning data into episode-level creative briefs.
- Provides a bridge between data-driven planning and draft generation.
- Supports script prompt-pack creation and Sunday producer preparation.

Primary implementation:

- `src/planning/generateEpisodeBriefs.js`

### K. Prompt Pack Generator

The prompt pack generator creates reusable AI prompts for each planned episode.

Current output:

- `weekly-prompt-pack-bundle.md`
- Standalone AI prompts for each episode.

Current behavior:

- Converts episode briefs into generation-ready prompts.
- Supports AI-assisted script drafting.
- Keeps prompt structure repeatable while still allowing Fred's direction and corrections.

Primary implementation:

- `src/generation/buildScriptPromptPack.js`

### L. Draft Script Generator

The draft script generator creates rough draft scripts.

Current output location:

- `episodes/drafts/`

Current behavior:

- Creates rough draft scripts from briefs or prompt-pack inputs.
- Produces drafts for Fred review, not publication.
- Supports the Sunday producer workflow by generating material Fred can accept, reject, combine, or redirect.

Primary implementation:

- `src/generation/generateScriptFromBrief.js`

### M. Weekly Draft Packet

The weekly draft packet combines rough drafts into a Google Docs-friendly review packet.

Current output:

- `outputs/reader/google-docs/weekly-draft-packet.md`

Current behavior:

- Brings a week of rough scripts together for review.
- Supports human editing and copy review.
- Makes it easier for Fred to work across the full week rather than opening seven isolated draft files.

### N. Producer Session and Exemplar Layer

The producer session and exemplar layer documents the Sunday dialogue-based workflow and stores Season Two exemplars.

Current source area:

- `data/season-two-exemplars/`

Current behavior:

- Stores Season Two refinement documents.
- Preserves raw dialogue separately from clean production source.
- Treats Fred's live edits and creative redirects as valuable training and exemplar material.
- Establishes the June 7-13 scripts as the current Season Two production standard.

The raw dialogue should not be confused with the final approved script. It is valuable because it shows how the approved script was discovered.

### O. Week One Production Pack Generator

The Week One production pack generator creates platform-specific outputs from the Season Two Week One refined source document.

Source:

- `data/season-two-exemplars/FINAL-PD-Script Generator Refinement Project June 7-13.docx`

Current outputs:

- Approved master scripts in `episodes/approved/week-one/`
- Substack files in `outputs/reader/substack/week-one/`
- ProverbsDaily.org files in `outputs/reader/proverbsdaily-org/week-one/`
- ElevenLabs performance files in `outputs/performance/elevenlabs/week-one/`
- Video planning files in `outputs/video/planning/week-one/`

Repeatable generator:

- `src/production/createWeekOneProductionPack.js`

Strategy document:

- `docs/production-workflow/week-one-production-pack-strategy.md`

## 6. Season Two Week One Production Pack

The current working Week One structure is based on the refined Season Two source document.

Source:

- `data/season-two-exemplars/FINAL-PD-Script Generator Refinement Project June 7-13.docx`

Generated outputs:

### `episodes/approved/week-one/`

This folder contains approved master scripts. These are production-review files and include everything needed for final human review.

Expected characteristics:

- Status should be `APPROVED FOR PRODUCTION REVIEW`.
- Internal notes may be present.
- Recommended Improvements may be present.
- Fred Revision Notes may be present.
- The approved master is the richest script version, not the leanest platform output.

### `outputs/reader/substack/week-one/`

This folder contains reader-facing Substack versions.

Expected characteristics:

- Clean reader format.
- Full outro bumper included.
- Internal notes removed.
- Appropriate for long-form devotional reading.

### `outputs/reader/proverbsdaily-org/week-one/`

This folder contains structured web/app versions.

Expected characteristics:

- End after Today's Challenge.
- Do not include the full outro bumper because the web app has an About the Author card.
- Internal notes removed.
- Should be easy to convert later into JSON or Firebase fields.

### `outputs/performance/elevenlabs/week-one/`

This folder contains plain spoken scripts for ElevenLabs.

Expected characteristics:

- Plain spoken text.
- No markdown.
- No emojis.
- No production labels.
- Full spoken outro bumper included without emojis.
- Natural line breaks and pacing.

### `outputs/video/planning/week-one/`

This folder contains video planning notes.

Expected characteristics:

- Talking-head opening.
- Scripture typography moment.
- B-roll ideas.
- On-screen text moments.
- Emotional tone.
- Short-form clip ideas.
- Thumbnail/title idea.
- May reference internal notes if useful for production.

### `docs/production-workflow/week-one-production-pack-strategy.md`

This document records the strategy for the Week One production pack and should be treated as the current production-pack strategy reference.

### v0.2 Formatting Rules

The FINAL document opening sequence is authoritative.

Do not smooth or rephrase openings.

Opening sequence should be:

```text
Scripture reference
Verse text
Episode title
```

Do not generate openings like:

```text
Today's Proverbs Daily is called...
Proverbs chapter seven, verse one says...
```

Outro bumper rules differ by platform:

- Substack includes the full reader-facing outro bumper.
- ProverbsDaily.org ends after Today's Challenge and omits the outro bumper.
- ElevenLabs includes the full spoken outro bumper without emojis.
- Approved master scripts include what is needed for production review.
- Video planning files may reference outro behavior as part of production planning.

## 7. Script Format Standards

Final approved script structure:

```text
Day and Date

SCRIPTURE CITATION AND TRANSLATION
Proverbs X:Y

VERSE TEXT
Quoted scripture

EPISODE TITLE
Today's Episode: Title

OPENING HOOK / DEVOTIONAL BODY

REVISIT VERSE TEXT

SCRIPTURE BREAK DOWN

PRACTICAL LIVING ILLUSTRATION

ENCOURAGING TURN

REMEMBER POINT

10-WORD PRAYER

TODAY'S CHALLENGE

OUTRO BUMPER

Recommended Improvements

Fred Revision Notes
```

Public sections:

- Scripture citation and translation.
- Verse text.
- Episode title.
- Opening hook and devotional body.
- Revisit verse text.
- Scripture breakdown.
- Practical living illustration.
- Encouraging turn.
- Remember point.
- 10-word prayer.
- Today's Challenge.
- Outro bumper depending on platform.

Internal-only sections:

- Recommended Improvements.
- Fred Revision Notes.
- Production notes.
- Extraction notes.
- Formatting notes.
- Review flags.
- Any uncertain source or rights/attribution notes until cleared.

The approved master may contain both public and internal sections. Platform outputs must remove internal-only material unless the platform file is explicitly for production planning.

## 8. Platform Output Rules

### Substack

Substack output is reader-facing long-form devotional copy.

Rules:

- Clean headings are allowed.
- Emojis are allowed.
- Include the full outro bumper.
- Remove internal notes.
- Preserve Fred's voice and approved structure.
- Keep the scripture, title, body, Remember, Prayer, and Challenge clear for a reader who may not be using the app.

### ProverbsDaily.org

ProverbsDaily.org output is structured for app and web use.

Rules:

- No full outro bumper.
- End after Today's Challenge.
- Remove internal notes.
- Keep structure clean enough to convert later into JSON or Firebase fields.
- Preserve scripture citation, translation, verse text, title, devotional body, Remember, Prayer, and Challenge.
- Do not assume the web/app version needs the same ending as Substack because the app has its own About the Author card.

### ElevenLabs

ElevenLabs output is plain spoken text only.

Rules:

- No markdown.
- No hashtags.
- No emojis.
- No section labels unless intended to be spoken.
- Scripture reference and verse text appear first.
- Use the full spoken outro bumper without emojis.
- Use natural line breaks and pacing.
- Make the script speakable, not just readable.
- Avoid visual-only formatting cues.

### Video Planning

Video planning output uses the approved script as source material and prepares the episode for visual production.

Rules:

- Include visual moments.
- Include b-roll ideas.
- Include scripture typography moments.
- Include emotional cues.
- Include shorts/reels hooks.
- Include thumbnail/title ideas.
- May reference internal notes.
- Should be actionable for a video editor, producer, or AI video workflow.

### Approved Master

Approved master scripts contain everything needed for production review.

Rules:

- Include internal notes.
- Include production review context.
- Include status: `APPROVED FOR PRODUCTION REVIEW`.
- Preserve Fred's approved text.
- Do not strip useful editorial context.
- Do not treat approved master scripts as automatically identical to platform outputs.

## 9. Sunday Producer Session Workflow

The Sunday producer session is the preferred weekly creative workflow. It is where planning data, scripture, ideas, Fred's instincts, and AI-generated options come together.

Weekly process:

1. Review dashboard and verse coverage.
2. Select seven daily chapters based on dates.
3. Review candidate verses.
4. Review prior usage and episode titles.
5. Select verses.
6. Fred gives creative instincts:
   - translation
   - title
   - hook
   - story seed
   - theological direction
   - practical challenge
7. AI riffs and drafts.
8. Fred redirects and revises.
9. Seven complete rough scripts are generated.
10. Fred edits into clean approved scripts.
11. Production Pack Generator creates platform outputs.
12. Audio/video/publishing workflow begins.
13. Published status is cataloged back into dashboard.

Important workflow rules:

- Generate complete rough scripts during Sunday sessions because Fred often picks and chooses from AI drafts.
- Briefs alone are not enough for the creative workflow.
- The dialogue itself is valuable and should be archived separately as training/exemplar material.
- Raw dialogue, clean approved scripts, and platform production outputs must remain separate.
- Fred's live redirects should be treated as high-value editorial signal.
- If AI output is useful but not final, preserve it as draft material, not approved material.

The Sunday session should create enough material for the week to move into production without requiring Fred to reconstruct the creative energy later from brief notes alone.

## 10. Dashboard Generator Spec

The dashboard is a core module, not a secondary convenience. It is Fred's cockpit for verse usage, creative planning, and episode cataloging.

Goal:

Give Fred a clear operational view of every Proverbs verse, every prior usage, every planned episode, every candidate idea, and every publication state.

Dashboard requirements:

- One master tab: All Proverbs.
- One tab per chapter: Proverbs 1 through Proverbs 31.
- Track every verse in Proverbs.
- Show status per verse.
- Show all episode titles ever used for each verse.
- Show all used dates.
- Show season.
- Show translation.
- Show first words or verse snippet.
- Show one-word topic.
- Show candidate title.
- Show seed match.
- Show review status.
- Show notes.

Status options:

- `UNUSED`
- `DRAFTED`
- `APPROVED`
- `PUBLISHED`
- `CALL_AUDIBLE`
- `NEEDS_REVIEW`

Duplicate usage rule:

- If a verse has been used more than once, show all episode titles.
- Do not hide older uses.
- Duplicate history helps avoid repetition and spark fresh angles.

Inputs:

- `data/verse-tracker/coverageMap.json`
- `data/episode-manifest/canonicalIndex.json`
- Weekly plans.
- Approved scripts.
- Published records.
- Dashboard source spreadsheet.

Outputs:

- `data/dashboard-exports/proverbs-dashboard.xlsx`
- Optional markdown summary.
- Optional JSON dashboard data for future UI.

ROADMAP:

- Dashboard Generator v0.1 still needs to be built.
- The dashboard should eventually become a trusted operating surface for Sunday planning and catalog review.
- Future dashboard exports should support both human spreadsheet use and automation-friendly JSON use.

## 11. Audio Pipeline Spec

Primary audio lane v1:

```text
Approved ElevenLabs script
  |
  v
ElevenLabs voice generation
  |
  v
Human listen check
  |
  v
Audio cleanup if needed
  |
  v
Audio deposit / podcast host
  |
  v
Catalog audio URL
  |
  v
Use audio for video production
```

Current state:

- ElevenLabs files are generated in `outputs/performance/elevenlabs/`.
- Week One ElevenLabs-ready files exist under `outputs/performance/elevenlabs/week-one/`.
- These files are scripts, not final audio assets.

Rules:

- First test should be June 7 before batch processing all seven Week One episodes.
- Fred should spot-check at least one ElevenLabs output before batch audio generation.
- Audio files should eventually be stored in a structured asset folder.
- Audio metadata should include date, scripture, title, duration, version, file path, and publish status.
- Audio text must be speakable and should not include markdown, emojis, or visual production labels.

Planned audio output folder:

- `assets/audio/week-one/`

Future audio output folder:

- `assets/audio/YYYY/MM/DD/`

NEEDS DECISION:

- Final audio hosting platform.
- Naming convention for final `.mp3` or `.wav` files.
- Whether audio cleanup is manual, Descript-based, or automated.
- Whether audio files are stored in Git, cloud storage, Google Drive, or a dedicated media bucket.

## 12. Video Pipeline Spec

Primary video lane v1:

```text
ElevenLabs audio
  |
  v
Descript
  |
  v
Captions / waveform / edits
  |
  v
Video assets / b-roll / motion graphics
  |
  v
Export vertical short
  |
  v
Export YouTube-ready version if needed
  |
  v
Upload to YouTube Shorts, Instagram Reels, TikTok
```

Current position:

- Video planning files exist for Week One in `outputs/video/planning/week-one/`.
- Descript is the reliable known tool because Fred used it for Season One.
- Descript may also be explored through Claude MCP.
- Google Omni is under evaluation as a possible future all-in-one video generation, motion graphics, and captions tool.
- Google Omni should be treated as experimental until tested.

Other possible tools:

- Google Flow.
- Veo 3.
- Nano Banana 2.
- OpenArt.ai.
- Canva.
- CapCut.
- Remotion.
- Google Drive asset libraries.

Video output goals:

- Talking-head opening option.
- Scripture typography moment.
- B-roll / motion graphics.
- Captions.
- Short-form social cutdowns.
- Possible longer-form YouTube version.
- Consistent branding.
- "Be Wise. Be Well." identity.

Video planning files should guide:

- Visual tone.
- Opening shot.
- Scripture display.
- B-roll.
- Emotional pacing.
- On-screen text.
- Thumbnail/title.
- Shorts/reels hooks.

NEEDS DECISION:

- Primary video tool for v1 after testing.
- Asset storage location.
- Standard video dimensions by platform.
- Naming convention for final video exports.
- Whether Remotion or another programmable video system becomes part of the engine.

## 13. Publishing and Delivery Pipeline

Current Season One/Season Two known publishing outlets:

- Substack.
- ProverbsDaily.org.
- YouTube.
- Instagram.
- TikTok.

Additional future outlets:

- LinkedIn.
- Facebook.
- FYI.
- Podcast/audio host.
- Email/SMS later.

n8n delivery system v1 should eventually:

- Detect approved/published-ready episode package.
- Read metadata.
- Push reader copy to Substack or create draft.
- Push structured devotional to ProverbsDaily.org / Firebase.
- Upload or help schedule YouTube video.
- Prepare Instagram/Reels/TikTok assets.
- Update dashboard/catalog status.
- Store published URLs.
- Log success/failure.
- Notify Fred for review or approval.

Important:

n8n should not publish blindly at first. Initial v1 should create drafts, queue assets, or request Fred approval before final publishing.

NEEDS DECISION:

- Which platforms support reliable API-based publishing.
- Which platforms should only be queued or drafted.
- Whether Fred approves each platform individually or approves an episode package as a whole.
- Where publish logs live.

## 14. Cataloging System Spec

Cataloging goal:

Every episode should be traceable from idea seed to verse to script to audio/video to publication URLs.

Catalog record should include:

- `episodeId`
- `date`
- `day`
- `scriptureReference`
- `chapter`
- `verse`
- `translation`
- `verseText`
- `title`
- `season`
- `sourceSeedIds`
- `ideaMatch`
- `status`
- `draftPath`
- `approvedScriptPath`
- `substackPath`
- `webAppPath`
- `elevenLabsPath`
- `videoPlanningPath`
- `audioFilePath`
- `videoFilePath`
- `thumbnailPath`
- `substackUrl`
- `proverbsDailyUrl`
- `youtubeUrl`
- `instagramUrl`
- `tiktokUrl`
- `linkedinUrl`
- `facebookUrl`
- `podcastUrl`
- `publishedAt`
- `updatedAt`
- `notes`

Potential catalog outputs:

- `data/catalog/episodeCatalog.json`
- `data/catalog/publishedEpisodes.json`
- `data/catalog/mediaAssets.json`
- Dashboard export.
- Future Firebase sync.

Cataloging rules:

- Catalog records should preserve traceability.
- Published URLs should be stored after publication.
- Local file paths should point to repo or asset-library locations.
- Status should be explicit and automation-friendly.
- Missing fields should be empty, null, or clearly marked `NEEDS_DECISION`; they should not be guessed.

ROADMAP:

- Cataloging JSON is not yet implemented.
- Catalog schema should be created before n8n publishing workflows become active.
- Dashboard and catalog should agree on status vocabulary.

## 15. n8n Automation Architecture

Future n8n should be hosted on VPS / Hostinger.

The n8n system should orchestrate delivery and status updates. It should not become the creative authority. It should operate on approved inputs, create drafts or queues where possible, update catalog records, and surface review needs.

### A. Daily Publish Workflow

Potential behavior:

- Trigger by schedule or approved status.
- Pull episode metadata.
- Push reader copy.
- Push web/app record.
- Upload audio/video assets.
- Update catalog.
- Log success/failure.
- Notify Fred if human approval is required.

### B. Weekly Planning Workflow

Potential behavior:

- Trigger Sundays.
- Generate weekly candidate plan.
- Generate dashboard summary.
- Prepare prompt pack.
- Notify Fred.
- Provide links to planning files, candidate verses, title history, and seed matches.

### C. Audio Processing Workflow

Potential behavior:

- Watch ElevenLabs output folder or metadata.
- Deposit audio to podcast/audio host.
- Update catalog.
- Flag missing audio, failed uploads, or duration mismatches.

### D. Video Distribution Workflow

Potential behavior:

- Watch final video folder.
- Prepare platform-specific captions/descriptions.
- Queue YouTube/IG/TikTok/LinkedIn/Facebook.
- Store platform draft links or published URLs.
- Update catalog and dashboard status.

### E. Status Sync Workflow

Potential behavior:

- Pull publication URLs.
- Update dashboard.
- Update catalog.
- Mark `PUBLISHED`.
- Detect mismatch between catalog, dashboard, and platform state.

### F. Error/Review Workflow

Potential behavior:

- Notify Fred if missing scripture.
- Notify Fred if audio is missing.
- Notify Fred if video is missing.
- Notify Fred if extraction uncertainty appears.
- Notify Fred if upload fails.
- Notify Fred if duplicate title is detected.
- Notify Fred if status mismatch is found.

Rules:

- n8n should create drafts, queues, and review notifications before it is trusted to publish directly.
- Automated publishing without Fred approval is ROADMAP only.
- The first n8n workflows should be conservative and observable.

## 16. Human Review Gates

Mandatory review gates:

- Fred reviews and approves final scripts.
- Fred spot-checks at least one ElevenLabs output before batch audio.
- Fred reviews first video test before batch rendering.
- Fred approves n8n automated publishing before the system can publish without manual approval.
- Any uncertain extraction becomes `NEEDS_FRED_REVIEW`.
- Scripture references and translation should never be guessed silently.

Additional review guidance:

- If a verse reference is invalid, out of range, ambiguous, or inconsistent across source files, flag it.
- If a title has been used before, show the prior use and ask whether reuse is intentional.
- If a platform output removes or alters approved language, make the transformation traceable.
- If a source reference, song lyric, pop culture example, or external quote creates rights/attribution uncertainty, flag it before publication.
- If a generated script sounds generic, spiritually thin, or unlike Fred, keep it in draft state.

## 17. Quality Rules

Core quality rules:

- Scripture must remain central.
- Avoid generic devotional tone.
- Preserve Fred voice.
- Preserve theological instincts:
  - formation over condemnation
  - wisdom over rule-keeping
  - alignment over punishment
  - participation over exclusion
  - human flourishing over fear
- Avoid accidental repeated titles.
- Dashboard must show prior title usage.
- One dominant metaphor or image per episode is preferred.
- Practical challenge must be clear and doable.
- Remember line must be portable.
- Prayer should be short and natural.
- Audio text must be speakable.
- Video notes must be actionable.

Script quality:

- The opening should create interest without becoming clickbait.
- The episode should move from ordinary life into Proverbs, not away from it.
- The scripture breakdown should be clear enough for a new listener but not shallow.
- The practical illustration should illuminate the verse rather than distract from it.
- The encouraging turn should sound like good news, not scolding.
- The challenge should be specific enough to do today.

Production quality:

- Platform outputs should follow their platform rules.
- Internal notes should never leak into public reader or audio outputs.
- Audio scripts should avoid visual-only labels.
- Video planning should give editors concrete visual choices.
- Catalog and dashboard status should reflect reality.

## 18. Known Issues and Gaps

Current gaps:

- Dashboard Generator v0.1 still needs to be built.
- Production pack needs broader repeatability beyond Week One.
- Scripture translation source management now has `docs/translation-policy.md`, but generator support still needs to be implemented.
- Audio asset storage strategy needs to be implemented.
- Video creation pipeline needs testing.
- Google Omni needs testing.
- n8n publishing workflows are not yet built.
- Cataloging JSON is not yet implemented.
- Firebase/Substack/YouTube API integration is not yet implemented.
- Need better separation of dialogue transcripts, clean approved docs, and production outputs.
- Need versioning for approved scripts after edits.
- Need rights/attribution handling for external references, songs, pop culture examples, and links.
- Weekly Draft Packet v0.2 is specified in `docs/weekly-draft-packet-v2-spec.md`, but current generators still emit older draft packet structures.
- Native Google Docs tab creation is not implemented; markdown sections are the current fallback.
- Current translation library file exists as `data/scripture/all_proverbs_translations.xlsx`; this workbook is the canonical local scripture source. CSV export may be supported later but is not required now.
- Standard outro component exists at `components/outros/proverbs-daily-standard-outro.md`, but current production scripts still contain hard-coded outro text.

Additional risks:

- Draft files may be mistaken for approved scripts if lifecycle status is not visible.
- Platform outputs may drift from approved masters unless generated repeatably.
- Without a catalog, audio/video/publishing URLs may become disconnected from source episodes.
- Without dashboard title history, accidental repetition is likely over time.
- Without formal translation management, scripture quotation handling may become inconsistent.

## 19. Roadmap

### Phase 1: Foundation Completed

Completed foundation:

- Repo scaffold.
- Archive extraction.
- Coverage engine.
- Planning engine.
- Idea reservoir.
- Title engine.
- Draft generation.
- Production pack v0.2.
- Week One scripts.

### Phase 2: Production Stabilization

Next stabilization work:

- Dashboard Generator v0.1.
- Generalized production pack generator.
- Week One audio test.
- Week One video test.
- Commit/publish workflow.
- Catalog record schema.

### Phase 3: Audio/Video Pipeline

Audio/video pipeline work:

- ElevenLabs batch process.
- Descript workflow.
- Google Omni test.
- Reusable captions/templates.
- Asset folder standard.
- First full week video export.

### Phase 4: Delivery Automation

Delivery automation work:

- n8n draft creation.
- Substack draft workflow.
- ProverbsDaily.org Firebase sync.
- YouTube upload/queue.
- IG/TikTok/Reels workflow.
- Status catalog updates.

### Phase 5: Full Studio Engine

Full Studio Engine work:

- Weekly automated planning.
- AI-assisted Sunday producer packet.
- Dashboard-driven selection.
- Batch generation.
- Human approval gates.
- Scheduled publication.
- Analytics feedback.
- Future mobile-friendly workflow.

## 20. Immediate Next Steps

1. Commit current Week One production pack formatting.
2. Pull on laptop if needed.
3. Build Dashboard Generator v0.1.
4. Run June 7 ElevenLabs test.
5. Create first Descript video test.
6. Test Google Omni as possible future primary video tool.
7. Create episode catalog schema.
8. Generalize production pack generator from Week One to any week.
9. Begin n8n delivery system design.
10. Update draft and production generators to emit Weekly Draft Packet v0.2.
11. Extend translation-library loading beyond the current Week Two v0.2 generator as needed.
12. Replace remaining hard-coded outro text with `components/outros/proverbs-daily-standard-outro.md`.
13. Add full Performance Script to Technical Script synchronization from `APPROVED` episodes.

## 24. Weekly Draft Packet v0.2 Addendum

Weekly Draft Packet v0.2 is the next target review format for new weekly draft packets.

Authoritative supporting docs:

- `docs/creative-engine/proverbs-daily-script-generator-master-prompt.md`
- `docs/weekly-draft-packet-v2-spec.md`
- `docs/production-workflow/weekly-draft-packet-v2-spec.md`
- `docs/translation-policy.md`
- `docs/production-workflow/translation-policy.md`
- `components/outros/proverbs-daily-standard-outro.md`

The packet should be one Google Doc per week with three conceptual tabs:

1. PERFORMANCE SCRIPT
2. MASTER TEMPLATE
3. TECHNICAL SCRIPT

If native Google Docs tabs cannot be created yet, the generator should emit Google Docs-ready markdown with those three sections clearly separated.

Fred edits the Performance Script. Once Fred marks an episode `APPROVED`, the Performance Script becomes the source of truth. The Technical Script mirrors that approved text and adds metadata, markdown markers, platform rules, translation status, output paths, audio notes, video notes, and pipeline instructions.

Only `APPROVED` episodes can be converted into production outputs.

Translation defaults:

- Draft study default: NIV.
- Publication default when Fred does not choose another translation: NET.
- Open/public-domain fallback: WEB.
- Fred override: any selected translation from the translation library.
- Canonical local scripture source: `data/scripture/all_proverbs_translations.xlsx`.

Outro policy:

- Performance Script closes with the short spoken Proverbs Daily signoff.
- The full support/about-author outro is stored once as a reusable component.
- Substack, audio, and video attach the standard outro.
- ProverbsDaily.org web app omits the standard outro.

## 21. Appendix: Week One Episode List

June 7

- Proverbs 7:1 ESV
- How Treasures Are Measured

June 8

- Proverbs 8:3 NLT
- Location, Location, Location

June 9

- Proverbs 9:14 TPT
- Watch Who's Whispering

June 10

- Proverbs 10:3 ESV
- God Be Meddling

June 11

- Proverbs 11:1 NIV
- It's a Thin Line Between Love and Hate

June 12

- Proverbs 12:3 NLT
- Deep Roots

June 13

- Proverbs 13:2 NIV
- Armageddon Appetite

## 22. Appendix: Key Existing Strategy Docs

Reference these docs if they exist:

- `docs/workflow.md`
- `docs/content-rules.md`
- `docs/source-hierarchy.md`
- `docs/editorial-dna.md`
- `docs/idea-reservoir-strategy.md`
- `docs/obsidian-integration-plan.md`
- `docs/manual-obsidian-sync-workflow.md`
- `docs/canonical-extraction-strategy.md`
- `docs/coverage-engine-strategy.md`
- `docs/query-engine-strategy.md`
- `docs/weekly-planning-engine-strategy.md`
- `docs/idea-matching-strategy.md`
- `docs/verse-theme-layer-strategy.md`
- `docs/title-engine-strategy.md`
- `docs/verse-recommendation-engine-strategy.md`
- `docs/episode-brief-generator-strategy.md`
- `docs/ai-script-prompt-pack-strategy.md`
- `docs/draft-script-generator-strategy.md`
- `docs/producer-session-workflow.md`
- `docs/dashboard-integration-strategy.md`
- `docs/season-two-exemplar-strategy.md`
- `docs/production-workflow/week-one-production-pack-strategy.md`

If one of these documents does not exist, treat the missing document as ROADMAP rather than assuming its contents.

## 23. Appendix: Important Design Principle

The Proverbs Daily Studio Engine is not designed to replace Fred Lynch's creative and spiritual discernment. It is designed to preserve, amplify, organize, and operationalize it.

Do not build a system that removes Fred from the loop.

Build a system that helps Fred move faster, remember better, produce cleaner, publish wider, and make the sacred positively contagious.
