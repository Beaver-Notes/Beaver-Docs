---
layout: post
title: Code Contributions
details: Help develop new features, squash bugs, and improve code
category: Beaver Notes (DEV)
position: 2
---

Thank you for your interest in contributing to Beaver Notes! We are thrilled to have you on board.

# Prerequisites

Before contributing to the project, make sure you have the necessary tools installed:

- [**Node.js**](https://nodejs.org/): Version 22 or later
- **Yarn**: `npm install -g yarn`

Once you have these, you can verify the versions using:

```
node -v
yarn -v
```

# Getting Started

**1. Fork the Repository**

Click the Fork button at the top right of the repo and clone it to your machine:

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

# Code Style & Quality

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

# 6. Commit and Push Changes

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


# 9. Submitting a Pull Request

> If you’re planning to make significant changes or add new features, ensure that you follow the project’s conventions. This includes:
- Keeping the code consistent with the existing style.
- Running Prettier and ESLint checks before pushing your changes.

Once your changes are committed and pushed to your branch, you can open a pull request (PR) to merge your changes into the development branch. They will be merged into the main branch once a new release is ready. Make sure to describe the changes in the PR description, including any important details. Also, check the relevant checkboxes. We know it can be boring, but it helps get your PR accepted faster.