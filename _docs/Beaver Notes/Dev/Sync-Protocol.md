---
layout: post
title: Sync Protocol
details: How the commit-based sync engine works
category: Beaver Notes (DEV)
position: 7
---

## Overview

Beaver Notes uses a **file-based, commit-synchronized, CRDT-like sync engine**. Notes, folders, labels, and assets are synced to a user-chosen directory (e.g., Dropbox, Nextcloud, Syncthing). All sync data is optionally encrypted with the app-level AES-256-GCM key.

The engine lives in `src/utils/sync/` on the frontend and delegates crypto to Rust via Tauri commands.

## Directory Structure

```
<syncPath>/BeaverNotesSync/
├── snapshot.json          # Full state snapshot (after compaction)
├── compact.lock           # Compaction lock file
├── crypto/                # Sync encryption keys (when encryption enabled)
│   ├── key.sync           # Encrypted sync key
│   └── manifest.json      # Key manifest
└── commits/
    ├── <ts>-<deviceId>-<clock>.json
    └── ...
```

## Commit Format

Each commit is a JSON file recording operations from one device at one point in time.

```json
{
  "id": "<ts>-<deviceId>-<clock>",
  "device": "<uuid>",
  "ts": 1234567890,
  "clock": 42,
  "vector": {
    "<deviceA>": 10,
    "<deviceB>": 5,
    "<thisDevice>": 42
  },
  "ops": [
    {
      "type": "notes",
      "id": "notes.<noteId>",
      "data": { ... }
    }
  ]
}
```

### Op Types

| Type | Description | data format |
|---|---|---|
| `notes` | Note created/updated | Full note object |
| `folders` | Folder created/updated | Full folder object |
| `labels` | Label list | Array of label strings |
| `labelColors` | Label colors | `{ "label": "#hex" }` |
| `deletedIds` | Deleted note tombstone | Array of note IDs |
| `deletedFolderIds` | Deleted folder tombstone | Array of folder IDs |
| `deletedAssets` | Deleted asset tracking | Array of asset paths |

When `data` is `null`, the operation represents a deletion.

## Sync Flow

### 1. Change Tracking

<!-- IMAGE_SUGGESTION: Flowchart showing the sync lifecycle: Store Mutation → trackChange() → writeCommit() → enqueueSync() → _sync() → read remote commits → applyRemoteOp() → store reload -->

Every store mutation calls `trackChange(key, data)`:

- `noteStore.update()` / `noteStore.add()` / `noteStore.delete()`
- `folderStore.add()` / `folderStore.update()` / `folderStore.deleteFolder()`
- `labelStore.addLabel()` / `labelStore.removeLabel()` / `labelStore.setColor()`

`trackChange()` checks if `autoSync` is enabled and a `syncPath` is configured. If so, it writes a commit file and enqueues a sync.

### 2. Commit Writing (`writeCommit()`)

Each commit is written atomically to the commits directory. The filename encodes a monotonic clock per device for ordering.

### 3. Sync Execution (`_sync()`)

1. **Ensure directory**: Creates `BeaverNotesSync/` and `commits/` if missing
2. **Flush pending**: Applies queued changes from when encryption was locked
3. **Load remote cursors**: Reads per-device commit counters
4. **List remote commits**: Scans commits directory for files with clock > known cursor for each device
5. **Apply operations**: For each remote commit, calls `applyRemoteOp()` which:
   - Inserts/updates/deletes notes, folders, labels
   - Updates tombstone sets
6. **Update cursors**: Advances per-device clock tracking
7. **Sync assets**: Bidirectional sync of `notes-assets/` and `file-assets/`
8. **Compaction**: If commit count > 200, compacts into `snapshot.json` and deletes individual commit files
9. **Reload stores**: If remote changes were applied, refreshes note + folder stores

### 4. Snapshot Compaction

When commits exceed the threshold:

1. Acquires `compact.lock`
2. Reads all commits
3. Merges into a single state snapshot (`snapshot.json`)
4. Deletes individual commit files
5. Releases lock

New devices joining sync use the snapshot as their starting state.

## Encryption

When app-level encryption is enabled:

<!-- IMAGE_SUGGESTION: Diagram showing the sync encryption flow: encrypted commit payloads on disk at sync directory with encryption keys stored in crypto/ subdirectory -->

- **Payload encryption**: Each commit's content is encrypted via `encryption_encrypt_sync_payload` / `decryptJSON()`: AES-256-GCM
- **Key storage**: Sync encryption keys are stored in `crypto/` subdirectory, managed by `sync-crypto-storage.js`
- **Pending queue**: If encryption is locked (key not available), changes are queued in memory and flushed after unlock

## Asset Sync

Two asset directories are synced:

- `notes-assets/`: Images embedded in notes
- `file-assets/`: Other attached files

Asset sync is bidirectional and respects encrypted state (`.enc` extension for encrypted assets).

## Key Files

| File | Purpose |
|---|---|
| `index.js` | Orchestrator: `trackChange()`, `_sync()`, mutex, event emission |
| `sync-repository.js` | Commit read/write, snapshot compaction, pending queue |
| `sync-apply.js` | Remote op application to local stores |
| `sync-assets.js` | Asset directory sync |
| `sync-crypto-codec.js` | AES-GCM encrypt/decrypt for strings and binary |
| `sync-crypto-storage.js` | File I/O for sync encryption keys |
| `crypto.js` | High-level sync encryption wrapper |
| `path.js` | Sync path persistence and resolution |
| `constants.js` | Directory names, file extensions, op type constants |
