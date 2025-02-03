---
layout: post
title: Contributing to the Blog
details: An engaging blog is a good blog.
category: Beaver Notes (DEV)
position: 3
---

Beaver's Blog website, like the docs, is built using Jekyll, a static site generator. To contribute to the blog, you don't need to be an artist, blogger, or developer.

1. [Contributing using your computer](#heading-0)
2. [Using GitHub Codespaces](#heading-10)

The first involves getting your hands dirty. If you have some experience or are willing to install some programs and tinker a bit, this step is for you. If you prefer a straightforward approach, the second option is better. Feel free to skip to the step you prefer.

> **If you're not ready to create a post or make technical edits, you can still contribute by simply proofreading and suggesting improvements.**

# Contributing Using Your Computer

Before we get started, you'll need to install a couple of packages. To set everything up, check out the [Jekyll docs](https://jekyllrb.com/docs/installation/) and return when you're ready. You'll also need a GitHub account. If you don't have one yet, you can create one by following this guide: [Creating an account on GitHub](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github). Once you're ready, you can begin by forking the repository.

## 1. **Fork the Repository**

1. Navigate to the Beaver Blog repository: [Beaver Blog on GitHub](https://github.com/Beaver-Notes/Beaver-Blog.git).
2. Click the **Fork** button in the upper-right corner to create a copy of the repository under your own GitHub account.

![image]({{base.url}}/assets/img/docs/contributing-blog/fork.png)

## 2. **Clone Your Fork**

Clone your forked repository to your local machine:

```bash
git clone https://github.com/your-username/Beaver-Blog.git
cd Beaver-Blog
```

## 3. **Set the Upstream Remote**

Add the original repository as the upstream remote. This will help keep your fork up-to-date with the original repository:

```bash
git remote add upstream https://github.com/Beaver-Notes/Beaver-Blog.git
```

## 4. **Create a New Branch**

Create a new branch in your fork for making changes:

```bash
git checkout -b amazing-new-feature
```

## 5. **Create a Post**

- Locate the `_posts` directory. Inside, you'll find some folders labeled by year; locate the current year.
- Create a file named `YYYY-MM-DD-untitled.md` (replace `YYYY-MM-DD` with the current date and `untitled` with the title of your post).
- Paste the following text into your file:

```markdown
---
layout: post
title: Untitled
date: 2025-01-05
author: Daniele Rolli
label:
- Example
image: assets/img/2025/2025-01-05.png
excerpt_separator: <!--more-->
---
```

- Every post needs to have its artwork. It doesn't need to be anything complicated—it can be as easy as an icon with an inner shadow or something more intricate. You are allowed to reach out if you need any help. You can use any software, from [Figma]() to [Gimp](). Every artwork must be saved under the folder `assets/img/YYYY` and called `YYYY-MM-DD.png`. Here are two examples of artworks from current articles on the blog:

<p class="text-sm text-neutral-600 dark:text-neutral-200 text-center"><img src="{{base.url}}/assets/img/docs/contributing-blog/example-1.png" alt="Image">Easy artwork example</p>

<p class="text-sm text-neutral-600 dark:text-neutral-200 text-center"><img src="{{base.url}}/assets/img/docs/contributing-blog/example-2.png" alt="Image">Complicated artwork example</p>

#### **Adding Images**

If your page requires images other than the artwork:

1. Create a new folder under `assets/img/YYYY` named after your page (e.g., `assets/img/YYYY/YYYY-MM-DD-title`).
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
git push origin amazing-new-feature
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

1. Navigate to the Beaver Blog repository: [Beaver Blog on GitHub](https://github.com/Beaver-Notes/Beaver-Blog.git).
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

1. Clicking the **main branch** button in the upper-left corner, then selecting **View all branches** and choosing your branch.

![image]({{base.url}}/assets/img/docs/contributing-docs/view-branches.png)

2. In the upper-right corner, click **Code** > **Codespaces** > **Create codespace on [branch name]**.

![image]({{base.url}}/assets/img/docs/contributing-docs/codespaces-button.png)  
![image]({{base.url}}/assets/img/docs/contributing-docs/create-codespace.png)