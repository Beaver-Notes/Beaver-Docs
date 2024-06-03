---
sidebar_position: 2
---

Dive into contributing by setting up your local development environment. Follow these steps to clone the Beaver Notes repository and get ready for action.

:::warning
Please note that specific system-dependent packages might be required, such as rpm for building .rpm packages or different libraries to ensure compatibility. If you encounter any issues while setting up your environment, please open a GitHub issue with the following details:
- Operating system and version
- Architecture of your system
- Description of the issue you are facing
- Output of the command that triggered the issue
:::

## Dependencies

- **Git**: Before you start ensure you have Git installed on your computer. If you don't have Git installed, you can download and install it from the official website: https://git-scm.com/
- **Node.js and npm**: Beaver Notes requires Node.js (v18) or later and npm (Node Package Manager) to build and run. If you don't have Node.js and npm installed, you can download them from the official Node.js website
- **Yarn**: Once you have Node.js and npm installed, you can use npm to install Yarn globally by running the following command in your terminal or command prompt:

```bash
npm install -g yarn
```

## Setup the Repo

### 1. Fork the Beaver Notes Repository

To contribute to the [Beaver Notes](https://github.com/Beaver-Notes/Beaver-Notes) project, you'll need to fork the official repository. Go to the Beaver Notes repository on GitHub and click the "Fork" button in the top right corner. This will create a copy of the repository under your GitHub account.

### 2. Clone the Forked Repository

After forking the repository, you need to clone it to your local machine. Open a terminal or command prompt on your computer and run the following command:

:::danger
Replace "your-username" with your GitHub username. 
:::

```bash
git clone https://github.com/your-username/beaver-notes.git
```

and open the folder by typing:

```bash
cd beaver-notes
```

### 3. Set Up the Upstream Repository

After cloning the repository, you need to set the upstream repository it to your local machin to keep your fork updated with the latest changes from the original repository. Open a terminal or command prompt on your computer and run the following command:

```bash
git remote add upstream https://github.com/Beaver-Notes/Beaver-Notes.git
```

then verify the new remote named upstream:

```bash
git remote -v
```

fetch the latest changes from the upstream repository:

```bash
git fetch upstream
```

checkout the development branch:

```bash
git checkout -b development upstream/development
```

### 4. Make Your Changes

Create a new branch for your feature or bugfix from the development branch:

```bash
git checkout -b feature/your-feature-name
```

**Make your changes in this branch.**

Stage and commit your changes:

```bash
git add .
git commit -m "Describe your changes"
```

### 5. Keep Your Branch Updated

To ensure your branch is up to date with the latest changes from the development branch, you need to regularly pull the latest changes.

Checkout the development branch:
```sh
git checkout development
```
Pull the latest changes:
```sh
git pull upstream development
```
Merge these changes into your feature branch:
```sh
git checkout feature/your-feature-name
git merge development
```

### 6. Push and Create a Pull Request
Push your feature branch to your forked repository:
```sh
git push origin feature/your-feature-name
```
Go to your forked repository on GitHub.

Click on the "Compare & pull request" button.

Ensure the base fork is set to the original repository and the base branch is set to **development**.

Provide a clear and detailed description of your changes and submit the pull request.

### 7. Respond to Feedback

Your pull request will be reviewed by the maintainers. Be prepared to make any necessary changes and respond to feedback.