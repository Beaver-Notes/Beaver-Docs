---
layout: post
title: Building Plugins
details: Create extensions for Beaver Notes using the Plugin API
category: Beaver Notes (DEV)
position: 10
---

Beaver Notes supports a plugin system that lets you extend the app on both the **app plane** (notes, folders, labels, settings, network, filesystem) and the **editor plane** (Tiptap extensions, slash commands, toolbar items). Plugins are distributed as `.beax` files: standard zip archives containing a manifest and bundled JavaScript.

## Quick Start

Scaffold a new plugin project in one command:

```bash
npx @beaver-notes/create-plugin
```

Follow the interactive prompts. You will be asked for:
- **Plugin display name**: shown in the app's plugin list
- **Plugin ID**: reverse-domain identifier (e.g. `com.example.my-plugin`)
- **Planes**: `app` (data/commands), `editor` (Tiptap/slash commands), or both
- **Permissions**: which data operations the plugin needs

This generates a TypeScript project with type-safe API access via `@beaver-notes/plugin-sdk`.

```bash
cd my-plugin
npm install
npm run build        # compiles TypeScript → dist/
npm run package      # build + creates .beax
npm run install:local # build + copies .beax to Beaver Notes plugins dir
```

Then open Beaver Notes → **Settings → Plugins** (your plugin is active by default).

## .beax File Structure

A `.beax` file is a zip archive containing:

```
my-plugin.beax
├── manifest.json
└── index.js          # bundled JavaScript (ESM)
```

The builder (`@beaver-notes/plugin-builder`) compiles TypeScript, bundles dependencies, and produces the `.beax` automatically. You never create it manually.

## Manifest

`manifest.json`, placed at the project root:

```jsonc
{
  "id": "com.example.my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "What the plugin does",
  "icon": "riPuzzle2Line",
  "minAppVersion": "5.0.0",
  "isDesktopOnly": false,
  "planes": ["app", "editor"],
  "permissions": ["notes:read", "notes:write"],
  "main": "src/index.ts",
  "storageSchemaVersion": 1,
  "settings": {
    "apiKey": {
      "type": "string",
      "label": "API Key",
      "placeholder": "Enter your key...",
      "secret": true
    },
    "enableSync": {
      "type": "boolean",
      "label": "Auto-sync",
      "default": true
    }
  }
}
```

| Field | Required | Description |
|---|---|---|
| `id` | Yes | Reverse-domain identifier, globally unique |
| `name` | Yes | Display name shown in the plugin list |
| `version` | Yes | Semantic version |
| `planes` | Yes | Array: `"app"`, `"editor"`, or both |
| `permissions` | Yes | Array of permission strings (see below) |
| `main` | Yes | Entry file relative to project root |
| `author` | No | Your name or organization |
| `description` | No | Short description |
| `icon` | No | Valid RemixIcon name |
| `minAppVersion` | No | Minimum Beaver Notes version required |
| `isDesktopOnly` | No | If `true`, plugin only loads on desktop platforms |
| `storageSchemaVersion` | No | Integer version for plugin storage migrations (see [Storage Schema Version](#storage-schema-version)) |
| `settings` | No | JSON schema for auto-generated settings form |
| `settingsFile` | No | Path to code-based settings file |

## Permissions

Every plugin declares which permissions it needs. Users can toggle individual permissions in Settings.

| Permission | Scope | Gated? |
|---|---|---|
| `notes:read` | List, get, and search notes. Read folder and label data | **Yes**: blocked if toggled off |
| `notes:write` | Create, update, and delete notes, folders, and labels | **Yes**: blocked if toggled off |
| `filesystem` | Read and write files scoped to `data/` inside the plugin's directory | **Yes**: blocked if toggled off |
| `network` | Make outbound HTTP requests via `app.network.request()` | **Yes**: blocked if toggled off |
| `app:settings` | Read and modify app-level settings | **Yes**: blocked if toggled off |

> **What's NOT gated**: Editor-plane plugins (`"editor"` in manifest planes) have full access to the editor's JavaScript context. They can register Tiptap extensions, toolbar items, and slash commands regardless of permission toggles. The permission system only gates the app-plane API calls listed above. Be honest in your plugin description about what access you need.

## Entry Point

`src/index.ts`: the plugin's main file. Exports a `setup` function that receives the `beaverNotes` API object:

```ts
import type { BeaverNotes } from '@beaver-notes/plugin-sdk';
import { APP_EVENTS } from '@beaver-notes/plugin-sdk';

export function setup(beaverNotes: BeaverNotes) {
  const { app, editor, ui, storage } = beaverNotes;

  // Lifecycle
  beaverNotes.onActivate(() => console.log('activated'));
  beaverNotes.onDeactivate(() => console.log('deactivated'));

  // App plane: register a command palette entry
  if (app) {
    app.commands.register({
      id: 'hello-world',
      title: 'Hello World',
      icon: 'riStarLine',
      handler() {
        ui.notify('Hello from my plugin!');
      },
    });
  }

  // Editor plane: register a slash command
  if (editor) {
    editor.registerSlashCommand({
      name: 'greeting',
      icon: 'riStarLine',
      description: 'Insert a greeting',
      action: (ed) => ed.chain().focus().insertContent('Hello!').run(),
    });
  }
}
```

## API Reference

### `beaverNotes.app` (App Plane)

All data operations are gated by CoreAccess permissions. If a user toggles a permission off, the corresponding API calls throw `PluginPermissionError`.

#### Notes CRUD

| Method | Permission | Description |
|---|---|---|
| `app.notes.list({ folderId?, labelId?, limit?, offset? })` | `notes:read` | List notes (returns summaries with `excerpt` instead of full `body`) |
| `app.notes.get(id)` | `notes:read` | Get a full note with all fields |
| `app.notes.create({ title, body? })` | `notes:write` | Create a note |
| `app.notes.update(id, data)` | `notes:write` | Update a note |
| `app.notes.delete(id)` | `notes:write` | Delete a note |
| `app.notes.search(query, { limit? })` | `notes:read` | Full-text search (returns summaries) |

> `list()` and `search()` return `NoteSummary` objects with an `excerpt` (first 200 characters of body). `get()` returns the full note with `body`.

#### Folders CRUD

| Method | Permission | Description |
|---|---|---|
| `app.folders.list()` | `notes:read` | List folders |
| `app.folders.get(id)` | `notes:read` | Get a folder |
| `app.folders.create({ name, parentId? })` | `notes:write` | Create a folder |
| `app.folders.update(id, data)` | `notes:write` | Update a folder |
| `app.folders.delete(id)` | `notes:write` | Delete a folder |

#### Labels CRUD

| Method | Permission | Description |
|---|---|---|
| `app.labels.list()` | `notes:read` | List labels |
| `app.labels.get(id)` | `notes:read` | Get a label |
| `app.labels.create({ name, color? })` | `notes:write` | Create a label |
| `app.labels.update(id, data)` | `notes:write` | Update a label |
| `app.labels.delete(id)` | `notes:write` | Delete a label |

#### Filesystem

```js
// Requires "filesystem" permission
// All paths are relative to the plugin's data/ directory
await app.filesystem.writeText('cache/notes.json', JSON.stringify(data));
const text = await app.filesystem.readText('cache/notes.json');
const exists = await app.filesystem.exists('cache');
const entries = await app.filesystem.list('');
await app.filesystem.delete('cache/notes.json');
```

| Method | Description |
|---|---|
| `app.filesystem.readText(path)` | Read a file as UTF-8 string |
| `app.filesystem.writeText(path, content)` | Write a string to a file |
| `app.filesystem.readBinary(path)` | Read a file as base64-encoded string |
| `app.filesystem.writeBinary(path, base64)` | Write base64-encoded data to a file |
| `app.filesystem.delete(path)` | Delete a file or directory |
| `app.filesystem.list(dir?)` | List directory contents. Returns `[{ name, is_dir, size, mtime_ms }]` |
| `app.filesystem.exists(path)` | Check if a path exists |

> Files are stored in `<appData>/plugins/<pluginId>/data/`. Path traversal (`../`) is blocked. Use `filesystem` for caching API responses, storing generated assets, or persisting binary data beyond the key-value storage limit.

#### Settings

| Method | Permission | Description |
|---|---|---|
| `app.settings.get(key)` | `app:settings` | Read an app setting |
| `app.settings.set(key, value)` | `app:settings` | Write an app setting |

Available keys: `theme`, `selectedLanguage`, `colorScheme`, `selectedFont`, `selectedCodeFont`, `spellcheckEnabled`, `directionPreference`, `collapsibleHeading`, `todayDateFormat`, `timeFormat`, `soundsEnabled`, `spotlightEnabled`, `openLastEdited`, `openAfterCreation`.

#### Command Palette

```js
app.commands.register({
  id: 'my-command',
  title: 'My Command',
  icon: 'riStarLine',
  handler() { /* runs when selected */ },
});
```

> Users open the command palette with `Cmd/Ctrl+Shift+P` or `Cmd/Ctrl+K`.
> Duplicate command IDs across plugins will cause a `PluginConflictError`. IDs must be globally unique.

#### Events

```js
const unsub = app.on('note-saved', (noteId) => {
  console.log('Note saved:', noteId);
});
// unsub() to stop listening
```

| Event | Payload | Permission Required |
|---|---|---|
| `note-opened` | `noteId` | `notes:read` |
| `note-saved` | `noteId` | `notes:read` |
| `note-created` | `noteId` | `notes:read` |
| `note-deleted` | `noteId` | `notes:read` |
| `folder-created` | `folderId` | `notes:read` |
| `folder-deleted` | `folderId` | `notes:read` |
| `folder-updated` | `folderId` | `notes:read` |
| `settings-changed` | `{ key, value }` | none |
| `app-focused` | - | none |
| `app-blurred` | - | none |

#### Network

```js
// Requires "network" permission
const res = await app.network.request('https://api.example.com/data');
const json = await res.json();
```

### `beaverNotes.editor` (Editor Plane)

Editor plugins have full access to Tiptap and ProseMirror primitives through `editor.tiptap`:

```js
const {
  Extension, Node, Mark,
  VueNodeViewRenderer, NodeViewWrapper,
  Plugin, PluginKey, InputRule,
  h, mergeAttributes,
} = editor.tiptap;
```

> **Important**: Editor-plane plugins run with full access to the editor's JavaScript context. There are no permission gates on Tiptap extensions, toolbar items, or slash commands. A plugin that registers an editor extension can execute arbitrary JavaScript. Only install editor plugins from sources you trust.

#### Register a Tiptap Extension

```js
editor.registerExtension(Extension.create({
  name: 'myExtension',
  addCommands() {
    return { myCmd: () => ({ commands }) => commands.insertContent('Hello') };
  },
}));
```

> Extension `name` must be unique across all active plugins. Duplicate names throw `PluginConflictError`.

#### Register a Slash Command

```js
editor.registerSlashCommand({
  name: 'myBlock',
  icon: 'riStarLine',
  description: 'Insert a custom block',
  action: (ed) => ed.chain().focus().insertContent({ type: 'myBlock' }).run(),
});
```

Type `/myBlock` in the editor to see it in the slash menu.

> Slash command `name` must be unique across all active plugins.

#### Register a Toolbar Item

```js
editor.registerToolbarItem({
  id: 'myPlugin:action',
  label: 'My Action',
  icon: 'riStarLine',
  group: 'plugins',
});
```

> Toolbar item `id` must be unique across all active plugins.

### `beaverNotes.ui` (Programmatic UI)

#### Dialogs

```js
await ui.dialog.alert({ title: 'Hello', body: 'Something happened.' });
const ok = await ui.dialog.confirm({ title: 'Delete?', body: 'Are you sure?', okVariant: 'danger' });
const name = await ui.dialog.prompt({ title: 'Name', placeholder: 'Enter name...' });
```

#### Notifications

```js
ui.notify('Sync complete', 'All notes have been synced.');
```

#### Register Custom Icons

```js
// Alias an existing RemixIcon
ui.registerIcon('myIcon', 'riStarLine');

// Create a custom SVG icon
ui.registerIcon('myCustomIcon', {
  d: 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z',
  viewBox: '0 0 24 24',
});
```

### `beaverNotes.storage` (Isolated Storage)

Key-value storage scoped to your plugin. Persisted across app restarts, cleared on uninstall. **5 MB quota per plugin.**

```js
await beaverNotes.storage.set('lastRun', Date.now());
const lastRun = await beaverNotes.storage.get('lastRun', 0);
const keys = await beaverNotes.storage.keys();
await beaverNotes.storage.delete('tempData');

// Check usage
const { bytes, maxBytes, percent } = await beaverNotes.storage.usage();
```

If storage quota is exceeded, `storage.set()` throws `PluginStorageError`. For larger data, use the [filesystem API](#filesystem).

#### Storage Schema Version

Plugins can declare a `storageSchemaVersion` in `manifest.json`. This enables data migration when your plugin's stored data format changes across versions.

```ts
// In setup():
const needsMigration = await storage.needsMigration();
if (needsMigration) {
  const current = await storage.getDataVersion();
  // Migrate old data format...
  await storage.setDataVersion(beaverNotes.manifest.storageSchemaVersion);
}
```

| Method | Description |
|---|---|
| `await storage.needsMigration()` | Returns `true` if stored schema version < manifest `storageSchemaVersion` |
| `await storage.getDataVersion()` | Returns current stored schema version (defaults to `1`) |
| `await storage.setDataVersion(v)` | Set stored schema version to `v` |
| `await storage.usage()` | Returns `{ bytes, maxBytes, percent }` |

## Settings

### JSON Schema (auto-generated form)

Define a `"settings"` object in `manifest.json`:

```json
{
  "settings": {
    "apiKey": { "type": "string", "label": "API Key", "secret": true },
    "enableFeature": { "type": "boolean", "label": "Enable", "default": false },
    "model": { "type": "select", "label": "Model", "options": ["gpt-4", "claude-3"] }
  }
}
```

The app auto-generates a settings form. Values are read/written via `beaverNotes.storage`.

Supported field types: `string`, `number`, `boolean`, `select`.

### Code-Based Settings

For more complex settings UI, create a `settings.js` file and reference it in `manifest.json`:

```json
{
  "settingsFile": "settings.js"
}
```

The file exports a `settings` function receiving `{ root, ui, storage, pluginId }`:

```js
export function settings({ root, ui, storage }) {
  const app = Vue.createApp({
    data: () => ({ key: storage.get('apiKey', '') }),
    methods: { save() { storage.set('apiKey', this.key); } },
    template: `<div>
      <ui-input v-model="key" label="API Key" secret />
      <ui-button variant="primary" @click="save">Save</ui-button>
    </div>`,
  });
  app.mount(root);
}
```

## Using npm Dependencies

Your plugin can use any npm package. Install it in your plugin project:

```bash
npm install some-library
```

Import and use it in `src/index.ts`. The builder's esbuild step bundles all imports into a self-contained `.beax`, no runtime dependencies needed.

```ts
import { doThing } from 'some-library';
export function setup(beaverNotes: BeaverNotes) { doThing(); }
```

## Installing and Testing

### Local Testing

```bash
npm run install:local
```

This builds the plugin and copies it directly into the app's plugins directory (`~/Library/Application Support/com.beavernotes.beaver-notes/plugins/` on macOS). Restart Beaver Notes to see your plugin under **Settings → Plugins**.

### Manual Install

Build the `.beax`:

```bash
npm run package
```

Then in Beaver Notes: **Settings → Plugins → Install from file** and select the `.beax` from the `dist/` directory.

### Debugging

Plugin `console.log` output appears in the app's developer tools (View → Toggle Developer Tools in the menubar). The plugin system also logs lifecycle events prefixed with `[PluginManager]` and `[PluginAPI]`.

### Validating before submission

```bash
npx beaver-plugin validate
```

Checks manifest structure, permissions, planes, semver, and common mistakes.

## Example: A Complete Plugin

This plugin creates a **"Where am I?"** command and a **`/demoHelloCard`** slash command that inserts a card showing the current note's folder:

```ts
import type { BeaverNotes } from '@beaver-notes/plugin-sdk';

export function setup(beaverNotes: BeaverNotes) {
  const { app, editor, ui } = beaverNotes;
  let currentNoteId: string | null = null;

  app?.on('note-opened', (noteId: string) => { currentNoteId = noteId; });

  function getFolderName(): string {
    if (!app || !currentNoteId) return 'no note open';
    const note = app.notes.get(currentNoteId);
    if (!note?.folderId) return 'no folder';
    const folder = app.folders.get(note.folderId);
    return folder ? folder.name : 'no folder';
  }

  // App plane: command palette
  ui.registerIcon('demoInfo', 'riInformationLine');
  app?.commands.register({
    id: 'where-am-i',
    title: 'Where am I? (Demo)',
    icon: 'demoInfo',
    handler() {
      ui.notify('Demo Plugin', `Hello World! Current folder: ${getFolderName()}`);
    },
  });

  // Editor plane: slash command → card block
  if (editor) {
    const { Node, VueNodeViewRenderer, h, NodeViewWrapper, mergeAttributes } = editor.tiptap;
    const u = ui.components;

    editor.registerExtension(Node.create({
      name: 'demoHelloCard',
      group: 'block',
      atom: true,
      parseHTML() { return [{ tag: 'demo-hello-card' }]; },
      renderHTML({ HTMLAttributes }: any) { return ['demo-hello-card', mergeAttributes(HTMLAttributes)]; },
      addNodeView() {
        return VueNodeViewRenderer({
          render() {
            return h(NodeViewWrapper, { as: 'div', class: 'my-2' }, { default: () =>
              h(u.Card, { padding: 'p-4' }, { default: () => [
                h('strong', `Hello World`),
                h('p', { class: 'text-sm text-neutral-500' }, `Folder: ${getFolderName()}`),
              ]})
            });
          },
        });
      },
    }));

    ui.registerIcon('demoCard', 'riArticleLine');
    editor.registerSlashCommand({
      name: 'demoHelloCard',
      icon: 'demoCard',
      description: 'Insert a Hello World card',
      action: (ed: any) => ed.chain().focus().insertContent({ type: 'demoHelloCard' }).run(),
    });
  }
}
```

## Publishing to the Community Store

Beaver Notes has an in-app plugin browser (Settings → Plugins → Browse) backed by a GitHub-hosted registry.

### Prepare your repo

- Create a public GitHub repo for your plugin
- Include a `README.md` with installation and usage instructions
- Add a `LICENSE` file

### Create a GitHub Release

- Run `npm run package` to build the `.beax`
- Create a new [GitHub Release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) on your plugin repo
- Tag it with the version number (e.g. `v1.0.0`)
- Attach the `.beax` file to the release

### Submit to the registry

1. Fork [Beaver-Notes/plugin-registry](https://github.com/Beaver-Notes/plugin-registry)
2. Add your plugin to `plugins.json`:

```json
{
  "id": "com.example.my-plugin",
  "name": "My Plugin",
  "author": "Your Name",
  "description": "What it does",
  "repo": "your-username/your-plugin-repo",
  "releaseTag": "v1.0.0",
  "branch": "main",
  "screenshots": [],
  "tags": [],
  "homepage": ""
}
```

3. Open a pull request
4. A maintainer reviews your submission against the [review checklist](https://github.com/Beaver-Notes/plugin-registry/blob/main/REVIEW.md)

### After approval

- Your plugin appears in the in-app Browse tab
- Users must accept permissions before installation
- Users can toggle individual permissions in plugin settings
- Update your plugin by creating a new GitHub Release, users will be prompted to re-consent if the new version declares additional permissions

## Reference

For the full API, including all types, constants, and builder CLI options, see the packages on npm:

- [@beaver-notes/plugin-sdk](https://www.npmjs.com/package/@beaver-notes/plugin-sdk)
- [@beaver-notes/plugin-builder](https://www.npmjs.com/package/@beaver-notes/plugin-builder)
- [@beaver-notes/create-plugin](https://www.npmjs.com/package/@beaver-notes/create-plugin)
