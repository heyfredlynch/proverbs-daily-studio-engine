# Google Drive Warehouse Archive

The repo is the brain for Proverbs Daily production. It stores scripts, manifests, metadata, automation, validation, naming rules, and production notes.

The Google Drive warehouse is the storage layer for large generated media files. Audio, mastered audio, video renders, thumbnails, and exported production media should live there once they are ready to archive outside the repo.

Descript is the workstation. Use it for editing, mastering, waveform review, captions, exports, and production passes that create or refine media.

Google Drive Desktop sync is the first archive path. The local synced folder is treated as a filesystem target, which keeps the workflow simple and avoids starting with Google Drive API integration. API-based archive automation can come later if the Desktop sync workflow becomes too manual or brittle.

The warehouse root must be configurable through `WAREHOUSE_ROOT` instead of hard-coded into production scripts. Current local root:

```text
D:\GoogleDriveCache\.shortcut-targets-by-id\19s8jG5eKtNQ7wQRcQJX10VRlG2UQxJuM\SacredStudios-ProverbsDaily
```

## Canonical Layout

```text
SacredStudios-ProverbsDaily/
  04-AUDIO/
    Season-2/
      Week-25/
        raw/
        mastered/
        review/
  05-VIDEO/
    Season-2/
      Week-25/
        vertical/
        horizontal/
        shorts/
  03-THUMBNAILS/
    Season-2/
      Week-25/
  06-SCENE-PLANS/
    Season-2/
      Week-25/
  00-Catalog/
    Season-2/
      Week-25/
```

## Week Two Audio Archive

Raw Week Two audio copies to:

```text
WAREHOUSE_ROOT/04-AUDIO/Season-2/Week-25/raw/
```

Use:

```text
npm run archive:week-two:audio
```

The archive script keeps local MP3 files by default. Set `WAREHOUSE_DELETE_LOCAL_AFTER_ARCHIVE=true` only when the local temporary copies should be deleted after a successful copy and size check.
