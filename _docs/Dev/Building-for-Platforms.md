---
layout: post
title: Building for Platforms
details: Build Beaver Notes for desktop and mobile
category: Beaver Notes (DEV)
position: 9
---

## Prerequisites

- **Node.js** >= 18 (or >= 22 for full compatibility)
- **Yarn**: `npm install -g yarn`
- **Rust toolchain**: Install via [rustup](https://rustup.rs/)
- **Tauri system dependencies**: See the [Tauri v2 prerequisites guide](https://v2.tauri.app/start/prerequisites/) for your platform

## Development

```bash
git clone https://github.com/Beaver-Notes/Beaver-Notes.git
cd Beaver-Notes
yarn install
yarn watch
```

`yarn watch` launches the Vite dev server with hot reload and Tauri in development mode.

## Desktop Builds

### Standard Build

<!-- IMAGE_SUGGESTION: Terminal screenshot showing the yarn build command output with the platform-specific artifacts generated -->

```bash
yarn build
```

This produces platform-specific bundles in `src-tauri/target/release/`:

| Platform | Output |
|---|---|
| macOS | `.dmg` + `.app` |
| Windows | `.msi` or `.exe` installer |
| Linux | `.deb`, `.rpm`, `.AppImage` |

### Beta Build

```bash
yarn build:beta
```

Uses `src-tauri/tauri.beta.conf.json` for beta-specific configuration.

## Mobile Builds

### iOS

<!-- IMAGE_SUGGESTION: Screenshot of Beaver Notes running on iOS simulator or device -->

```bash
yarn mobile:init:ios     # Initialize Xcode project (run once)
yarn dev:ios              # Run on simulator
yarn build:ios            # Production build
yarn open:ios             # Open simulator
```

Requires macOS with Xcode installed and an Apple Developer account for device deployment.

### Android

<!-- IMAGE_SUGGESTION: Screenshot of Beaver Notes running on Android emulator or device -->

```bash
yarn mobile:init:android  # Initialize Android project (run once)
yarn dev:android          # Run on emulator
yarn build:android        # Build APK + AAB
yarn open:android         # Open emulator
```

Requires Android Studio and the Android SDK (API 34+).

## Linux Packaging

Beaver Notes is distributed through multiple Linux channels:

| Format | Distribution |
|---|---|
| Flatpak | Flathub: `com.beavernotes.beavernotes` |
| DEB | Debian/Ubuntu-based distros |
| RPM | Fedora/CentOS-based distros |
| AppImage | Portable Linux binary |
| AUR | Arch Linux (community-maintained) |

Flatpak builds are configured in the `flatpak/` directory.

## Update Strategy

Beaver Notes uses Tauri's built-in updater. Update artifacts are published to GitHub Releases. The app checks for updates on startup and periodically in the background.

Configuration is in `src-tauri/tauri.conf.json`:
- **Updater endpoint**: GitHub Releases
- **Public key**: For signed updates (set via `TAURI_UPDATER_PUBKEY` env var)
- **Auto-update**: Can be toggled in **Settings > About**

## Common Scripts

| Command | Description |
|---|---|
| `yarn watch` | Dev mode with hot reload |
| `yarn build` | Production desktop build |
| `yarn lint` | Run ESLint on all source files |
| `yarn tran-update` | Pull latest translations |
| `yarn tran-util <lang>` | Check translation status |
| `yarn version:bump` | Bump app version |
