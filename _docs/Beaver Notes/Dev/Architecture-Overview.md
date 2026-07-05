---
layout: post
title: Architecture Overview
details: Understanding the Beaver Notes v5 codebase
category: Beaver Notes (DEV)
position: 6
---

## Tech Stack

| Layer | Choice |
|---|---|
| **Desktop & Mobile Framework** | Tauri v2 |
| **Frontend** | Vue 3 (Composition API, `<script setup>`) |
| **State Management** | Pinia v3 |
| **Routing** | vue-router (hash history) |
| **Editor** | Tiptap v3 (ProseMirror-based) |
| **Build Tool** | Vite 5 |
| **CSS** | Tailwind CSS 3 + tw-colors |
| **Backend Language** | Rust |
| **Database** | SQLite (via rusqlite, WAL mode) |

## Project Structure

```mermaid
mindmap
  ((Beaver-Notes))
    src
      Frontend Vue 3
    src-tauri
      Rust backend Tauri v2
    scripts
      Build/dev helper scripts
    vendor
      Vendored Tauri plugins
    buildResources
      Icons entitlements
    flatpak
      Flatpak packaging
    dist
      Built frontend output
```

### src/ (Frontend)

```mermaid
mindmap
  src
    index.js (App entry point)
    App.vue (Root component)
    router.js (Route definitions)
    assets
      css (Tailwind editor styles themes)
      fonts (Custom fonts)
      images (Logos previews)
      locales (i18n JSON files)
    components
      app (Shell layout)
      home (Note browser)
      note (Editor)
      onboarding (First-run wizard)
      ui (Design system)
    composable (Reusable logic, 30+ composables)
    directives (Custom Vue directives)
    lib
      tauri-bridge.js (Central IPC facade)
      tauri (Platform wrappers)
      native (Tauri invoke wrappers)
      tiptap (Editor factory)
    pages
      Index.vue (Home note list)
      Onboarding.vue (First-run wizard)
      Settings.vue (Settings shell)
      note/_id.vue (Note editor)
      folder/_id.vue (Folder contents)
      settings (Sub-pages)
    store
      index.js (App lifecycle orchestrator)
      note.js (Note CRUD)
      note
        crud.js (Create/read/update/delete)
        search.js (Queries getters)
        lock.js (Per-note password locking)
        encryption.js (App-level encryption)
      folder.js (Folder tree)
      label.js (Labels colors)
      passwd.js (Password hashing keychain)
      app.js (App settings cache)
      i18n.js (Internationalization)
      undo.js (Undo/redo stack)
    utils
      crypto (AES-GCM via Web Workers)
      sync (Commit-based sync engine)
      import (Import from 7 sources)
      share (Export MD HTML BEA PDF)
      helpers (Shared utilities)
```

### src-tauri/ (Rust Backend)

```mermaid
mindmap
  src-tauri
    Cargo.toml (Rust dependencies)
    src
      main.rs (Entry point)
      lib.rs (App builder)
      bootstrap.rs (Window state migration)
      db.rs (SQLite pool FTS5)
      secure_blob.rs (Encrypted blob cache)
      menu.rs (macOS menu bar)
      shared
        mod.rs (AppState path access)
        crypto.rs (AES-256-GCM Argon2id PBKDF2)
        error.rs (Error types)
        cache.rs (LRU caches)
      commands
        app.rs (App info zoom spellcheck)
        fs.rs (File system operations)
        storage.rs (KV store)
        security.rs (Encryption lifecycle)
        dialogs.rs (Native dialogs)
        search.rs (FTS5 search)
        updates.rs (Auto-updater)
        imports.rs (Evernote Apple Notes import)
        pdf.rs (PDF rendering)
        external.rs (Open files externally)
```

## Data Flow

```mermaid
flowchart LR
    A["User Action"] --> B["Vue Component"]
    B --> C["Pinia Store"]
    C --> D["composable/storage.js"]
    D --> E["lib/native/storage.js"]
    E --> F["Tauri invoke"]
    F --> G["Rust command"]
    G --> H["SQLite"]
```

For sync:

```mermaid
flowchart LR
    A["Store Mutation"] --> B["trackChange()"]
    B --> C["writeCommit()"]
    C --> D["enqueueSync()"]
    D --> E["_sync()"]
    E --> F["read remote commits"]
    F --> G["applyRemoteOp()"]
    G --> H["store reload"]
```

For crypto:

```mermaid
flowchart LR
    A["UI"] --> B["security.rs Tauri command"]
    B --> C["Argon2id key derivation"]
    C --> D["AES-256-GCM"]
    D --> E["encrypted payload"]
    E --> F["SQLite or disk"]
```

## Key Patterns

- **Hash-based routing** (`createWebHashHistory`) for Tauri compatibility
- **Platform abstraction**: `lib/tauri/` handles desktop vs mobile differences (scoped storage, dialogs, haptics)
- **Two databases**: `data.db` (notes, folders, labels) and `settings.db` (settings, sync state), both SQLite with WAL mode

  ```mermaid
  graph TD
      sql["SQLite (WAL mode)"] --> data["data.db"]
      sql --> settings["settings.db"]
      data --> notes["notes"]
      data --> folders["folders"]
      data --> labels["labels"]
      settings --> s["settings"]
      settings --> sync["sync state"]
  ```
- **Web Workers**: Crypto operations run in a 4-worker pool to avoid UI thread blocking

  ```mermaid
  flowchart LR
      A["UI Thread"] --> B["security.rs (Tauri command)"]
      B --> C["4 Worker Pool"]
      C --> D["Argon2id key derivation"]
      D --> E["AES-256-GCM"]
      E --> F["SQLite or disk"]
  ```
- **Unidirectional sync**: Mutations → `trackChange()` → commit → `enqueueSync()` (non-blocking, mutex-guarded)
- **Undo/redo**: Action stack with batch merging for bulk operations
