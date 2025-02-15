---
layout: post
title: Contributing to the Docs
details: Good documentation is the foundation of a great project.
category: Beaver Notes (DEV)
position: 3
---

Beaver's Documentation website is built using Jekyll, a static site generator. This makes collaboration straightforward, even if you’re not a developer. There are two main ways to contribute to the docs:

1. [Contributing using your computer](#heading-0)
2. [Using GitHub code spaces](#heading-10)

The first involves getting your hands dirty. If you have some experience or are willing to install some programs and tinker a bit, this step is for you. If you prefer a straightforward approach, the second option is better. Feel free to skip to the step you prefer.

> **If you're not ready to create a post or make technical edits, you can still contribute by simply proofreading and suggesting improvements.**

# Contributing Using Your Computer

Before we get started, you'll need to install a couple of packages. To set everything up, check out the [Jekyll docs](https://jekyllrb.com/docs/installation/) and return when you're ready. You'll also need a GitHub account. If you don't have one yet, you can create one by following this guide: [Creating an account on GitHub](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github). Once you're ready, you can begin by forking the repository

## 1. **Fork the Repository**

1. Navigate to the Beaver Docs repository: [Beaver Docs on GitHub](https://github.com/Beaver-Notes/Beaver-Docs.git).
2. Click the **Fork** button in the upper-right corner to create a copy of the repository under your own GitHub account.

![image]({{base.url}}/assets/img/docs/contributing-docs/fork.png)

## 2. **Clone Your Fork**

Clone your forked repository to your local machine:

```bash
git clone https://github.com/your-username/Beaver-Docs.git
cd Beaver-Docs
```

## 3. **Set the Upstream Remote**

Add the original repository as the upstream remote. This will help keep your fork up-to-date with the original repository:

```bash
git remote add upstream https://github.com/Beaver-Notes/Beaver-Docs.git
```

## 4. **Create a New Branch**

Create a new branch in your fork for making changes:

```bash
git checkout -b contributing-to-the-docs
```

## 5. **Create a Page**

1. Locate the `_posts` directory. Inside, you'll find two folders: `Beaver Notes` and `Beaver Pocket`, each containing `Dev` and `User` subfolders.

```bash
.
├── Beaver Notes
│   ├── Dev
│   │   └── 2025-01-03-How-to-contribute.md
│   └── User
│       ├── 2025-01-03-Getting-Started.md
│       ├── 2025-01-04-Common-Issues.md
│       └── 2025-01-05-User-Tips.md
└── Beaver Pocket
    ├── Dev
    │   └── 2025-01-04-Contributing-to-Beaver-Pocket.md
    └── User
        ├── 2025-01-03-Getting-Started.md
        ├── 2025-01-04-Common-Issues.md
        └── 2025-01-05-User-Tips.md
```

2. Create a file named `YYYY-MM-DD-title.md` (replace `YYYY-MM-DD` with the current date and `title` with the name of your page).

3. Every file must start with the following section:

```markdown
---
layout: post
title: Untitled
details: This is a description.
category: Beaver Notes (DEV)
position: 1
---
```

#### **Adding Images**

If your page requires images:

1. Create a new folder under `assets/img/docs` named after your page (e.g., `assets/img/docs/page-name`).
2. Place your images in that folder.
3. Use the following format for image URLs in your Markdown file:
   ```markdown
   ![alt text]({{base.url}}/path-to-image)
   ```

#### Install Dependencies and Run Live Reload

To set up Jekyll and enable live reload during development:

1. Install Jekyll and Bundler if not already installed:

```bash
gem install jekyll bundler
```

2. Install project dependencies:

```bash
bundle install
```

3. Run the Jekyll server with live reload enabled:

```bash
bundle exec jekyll serve --livereload
```

4. Access the development site at:

```
http://localhost:4000
```

## 6. **Stage and Commit Changes**

Add your changes to the staging area and commit them with a descriptive message:

```bash
git add .
git commit -m "Describe the changes"
```

## 7. **Push Your Changes**

Push your branch to your forked repository:

```bash
git push origin contributing-to-the-docs
```

## 8. **Submit a Pull Request**

1. Go to your forked repository on GitHub.
2. Click **Compare & pull request**.
3. Ensure you're submitting your pull request to the original repository's main branch (or the appropriate branch).
4. Add a descriptive title and explanation of your changes, then submit the pull request.

### Keeping Your Fork Updated

To actively contribute to the documentation, regularly update your fork with changes from the original repository. Run the following commands:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```


# **Using GitHub Codespaces to Contribute**

## 1. **Fork the Repository**

1. Navigate to the Beaver Docs repository: [Beaver Docs on GitHub](https://github.com/Beaver-Notes/Beaver-Docs.git).
2. Click the **Fork** button in the upper-right corner to create a copy of the repository under your own GitHub account.  
   ![image]({{base.url}}/assets/img/docs/contributing-docs/fork.png)

## 2. **Create a New Branch**

Create a new branch in your fork to make changes:

1. Click the **main branch** button in the upper-left corner, then select **View all branches**.  
   ![image]({{base.url}}/assets/img/docs/contributing-docs/view-branches.png)

2. In the upper-right corner, click the **New branch** button. Enter a branch name, such as "math-block-page," then click **Create new branch**.  
   ![image]({{base.url}}/assets/img/docs/contributing-docs/new-branch-button.png)  
   ![image]({{base.url}}/assets/img/docs/contributing-docs/new-branch-dialog.png)

## 3. **Create a Codespace**

After creating your branch, select it by:

1. Click the **main branch** button in the upper-left corner, then select **View all branches** and choose your branch.  
   ![image]({{base.url}}/assets/img/docs/contributing-docs/view-branches.png)

2. In the upper-right corner, click **Code** > **Codespaces** > **Create codespace on [branch name]**.  
   ![image]({{base.url}}/assets/img/docs/contributing-docs/codespaces-button.png)  
   ![image]({{base.url}}/assets/img/docs/contributing-docs/create-codespace.png)

## 4. **Working on the Docs**

Once your Codespace is open, you’ll see an interface similar to the one shown below. In the sidebar, locate the `_posts` folder.

Here’s a graphical representation of the posts folder:

```bash
.
├── Beaver Notes
│   ├── Dev
│   │   └── 2025-01-03-How-to-contribute.md
│   └── User
│       ├── 2025-01-03-Getting-Started.md
│       ├── 2025-01-04-Common-Issues.md
│       └── 2025-01-05-User-Tips.md
└── Beaver Pocket
    ├── Dev
    │   └── 2025-01-04-Contributing-to-Beaver-Pocket.md
    └── User
        ├── 2025-01-03-Getting-Started.md
        ├── 2025-01-04-Common-Issues.md
        └── 2025-01-05-User-Tips.md
```

![image]({{base.url}}/assets/img/docs/contributing-docs/codespace.png)

### **Adding a New Post**

1. In the `_posts` folder, navigate to the appropriate subfolder:

   - **Beaver Notes > Dev**: For everything related to the project or desktop app development.
   - **Beaver Notes / Pocket > User**: For everything related to the user experience of the desktop or mobile app.
   - **Beaver Pocket > Dev**: For everything specific to mobile app development.
   - **General topics** (e.g., blog, documentation, website): These should go under **Beaver Notes**.

2. Right-click on the subfolder, and select **New File**.
3. Name the file using the format `YYYY-MM-DD-title.md`.
4. Paste the following content into the file, and adjust the `position` value based on existing files in the folder:

   ```markdown
   ---
   layout: post
   title: Untitled
   details: This is a description.
   category: Beaver Notes (DEV)
   position: 1
   ---
   ```

#### **Adding Images**

If your page requires images:

1. Create a new folder under `assets/img/docs` named after your page (e.g., `assets/img/docs/page-name`).
2. Place your images in that folder.
3. Use the following format for image URLs in your Markdown file:
   ```markdown
   ![alt text]({{base.url}}/path-to-image)
   ```

#### Install Dependencies and Run Live Reload

To set up Jekyll and enable live reload during development:

1. Install Jekyll and Bundler if not already installed:

```bash
gem install jekyll bundler
```

2. Install project dependencies:

```bash
bundle install
```

3. Run the Jekyll server with live reload enabled:

```bash
bundle exec jekyll serve --livereload
```

4. Access the development site at:

```
http://localhost:4000
```

## 5. **Push Your Changes and Open a Pull Request**

### **Push Changes**

1. Once your changes are complete, go to the **Source Control** tab in the Codespace.
2. Stage your changes by clicking the **+** icon next to the changes dropdown.
3. Write a commit message (e.g., "Add new math block page") and click **Commit**.
4. Push your branch by clicking the **Publish Branch** button.

![image]({{base.url}}/assets/img/docs/contributing-docs/source-control.png)

### **Open a Pull Request**

1. Go to your forked repository on GitHub.
2. GitHub will display a banner prompting you to open a pull request. Click **Compare & pull request**.
   ![image]({{base.url}}/assets/img/docs/contributing-docs/compare-&-pull.png)
3. Add a title and description for your pull request.
4. Ensure the base repository is the original repository (`Beaver-Notes/Beaver-Docs`) and the base branch is `main`.
5. Click **Create Pull Request**.
