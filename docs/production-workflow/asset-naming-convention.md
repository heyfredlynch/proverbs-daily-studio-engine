# Proverbs Daily Asset Naming Convention

Every generated episode asset uses one shared base ID:

```text
S{season}-{YYYY-MM-DD}_prov-{chapter}-{verse}_{episode-slug}
```

Example:

```text
S2-2026-06-14_prov-14-30_the-rhythm-of-a-sound-heart
```

## File Examples

For `S2-2026-06-14_prov-14-30_the-rhythm-of-a-sound-heart`:

- Script: `S2-2026-06-14_prov-14-30_the-rhythm-of-a-sound-heart.md`
- Audio: `S2-2026-06-14_prov-14-30_the-rhythm-of-a-sound-heart.mp3`
- Video: `S2-2026-06-14_prov-14-30_the-rhythm-of-a-sound-heart.mp4`
- Thumbnail: `S2-2026-06-14_prov-14-30_the-rhythm-of-a-sound-heart-thumb.png`
- Captions: `S2-2026-06-14_prov-14-30_the-rhythm-of-a-sound-heart.srt`
- Scene plan: `S2-2026-06-14_prov-14-30_the-rhythm-of-a-sound-heart.scene.md`
- Publish notes: `S2-2026-06-14_prov-14-30_the-rhythm-of-a-sound-heart.publish.md`

## Rules

All generated media assets for an episode must share the same canonical base ID. Scripts, audio files, scene plans, videos, thumbnails, captions, publish notes, and manifest references should differ only by directory, extension, or approved suffix such as `-thumb`.

The repo should store metadata, manifests, scripts, scene plans, review notes, and production instructions. Large generated media files are temporary local outputs during production and should be archived externally later instead of treated as permanent repo assets.
