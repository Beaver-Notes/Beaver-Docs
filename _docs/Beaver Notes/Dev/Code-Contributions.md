---
layout: post
title: Code Contributions
details: Help develop new features, squash bugs, and improve code
category: Beaver Notes (DEV)
position: 2
---

Thank you for your interest in contributing to Beaver Notes! We are thrilled to have you on board 💖

## Prerequisites

Before contributing to the project, make sure you have the necessary tools installed:

- [**Node.js**](https://nodejs.org/): Version 22 or later
- **Yarn**: `npm install -g yarn`
- **Rust toolchain**: Install via [rustup](https://rustup.rs/) (required for Tauri)
- **System dependencies**: Refer to the [Tauri v2 prerequisites guide](https://v2.tauri.app/start/prerequisites/) for your platform

Once you have these, you can verify the versions using:

```
node -v
yarn -v
rustc --version
```

## Getting Started

**1. Fork the Repository**

Click the Fork button at the top right of the repo and clone it to your machine:

<!-- IMAGE_SUGGESTION: Screenshot of the GitHub Fork button location on the Beaver-Notes repo page -->

```bash
git clone https://github.com/your-username/Beaver-Notes.git

cd Beaver-Notes
```

**2. Install Dependencies**

Ensure you have Yarn installed, then install dependencies:

```bash
yarn install
```

**3. Run the Project in Development Mode**

```bash
yarn watch
```

**4. Create a New Branch**

Use a descriptive name for your branch:

```bash
git checkout -b feature/add-dark-mode
```

## Code Style & Quality

### Linting

To maintain code quality, we use [Prettier](https://prettier.io/) for code formatting. Prettier will automatically format your code based on the `.prettierrc` configuration file.

You can run Prettier manually by executing:

```
yarn prettier --write .
```

We also use ESLint for static code analysis. This helps identify and fix code quality and style issues.

Run the linter:

```
yarn lint
```

Auto-fix lint issues:

```
yarn lint --fix
```

### Pre-commit Hooks (Husky and Lint-Staged)

We use [Husky](https://typicode.github.io/husky/) and [Lint-Staged](https://github.com/lint-staged/lint-staged) to ensure that code formatting and linting happen before committing changes.

Before you make a commit, the following will happen automatically:

- Prettier will format the code.
- ESLint will check for issues and fix them if possible.

When attempting to commit, Husky will invoke the lint-staged script, which runs the following linting tasks:

```json
"lint-staged": {
  "*.{js,ts,vue}": "eslint --cache --fix"
}
```

## Mobile Development

Beaver Notes v5 runs on iOS and Android. Mobile development requires additional setup:

<!-- IMAGE_SUGGESTION: Screenshot of Beaver Notes running on an iOS simulator or Android emulator -->

### iOS

```bash
yarn mobile:init:ios     # Initialize iOS project
yarn dev:ios              # Run on iOS simulator
yarn build:ios            # Production build for iOS
```

Requires macOS with Xcode installed.

### Android

```bash
yarn mobile:init:android  # Initialize Android project
yarn dev:android          # Run on Android emulator
yarn build:android        # Build APK + AAB
```

Requires Android Studio and the Android SDK.

### Build Types

| Command | Description |
|---|---|
| `yarn watch` | Development watch mode (hot reload) |
| `yarn build` | Production desktop build |
| `yarn build:beta` | Beta release build |
| `yarn dev:beta` | Beta development mode |

## Commit and Push Changes

After making changes, commit and push them to the repository. Here’s a typical workflow:

1. Stage your changes:

```
git add .
```

2. Commit the changes:

```
git commit -m "Your commit message"
```

Husky will run Prettier and ESLint checks before committing.

3. Push the changes:

```
git push origin branch-name
```


## Submitting a Pull Request

**Before opening a PR:**
- Keep code consistent with project style.
- Run Prettier and ESLint.

<!-- IMAGE_SUGGESTION: Screenshot of the GitHub Pull Request creation page showing the branch comparison and description fields -->

Open your PR against the **development branch**, with a clear description and completed checklist, it helps us review and merge faster 🚀.