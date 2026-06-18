# ElevenLabs Batch Audio Spec

## Source

The approved performance script is the audio source:

```text
outputs/approved/week-two/weekly-approved-performance-script-week-25.md
```

Use listener-facing script only.

## Strip Before Audio

Remove:

- metadata
- internal notes
- outro placeholders
- recommended improvements
- Fred revision notes
- technical YAML
- production notes

## Keep For Audio

Keep:

- scripture reference
- verse text
- title
- body
- Remember
- Prayer
- Today's Challenge

Optional outro component can be appended for audio when configured:

```text
components/outros/proverbs-daily-standard-outro.md
```

## Output Rules

Create one audio file per episode.

Naming format:

```text
YYYY-MM-DD_proverbs-daily_proverbs-CH-VERSE_episode-slug.mp3
```

Save raw audio to:

```text
outputs/audio/week-two/raw/
```

Save review notes to:

```text
outputs/audio/week-two/review/
```

## Current Integration Status

No ElevenLabs API call should run until valid credentials are present.

Required environment variables:

```text
ELEVENLABS_API_KEY
ELEVENLABS_VOICE_ID
ELEVENLABS_MODEL_ID
```

The current preparation script creates batch prep notes only:

```text
npm run audio:week-two:prepare
```
