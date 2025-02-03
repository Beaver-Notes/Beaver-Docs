---
layout: post
title: Import Markdown
details: Import a Markdown archive
category: Beaver Notes
position: 7
---

**Beaver Notes 3.5.0 and later versions support importing Markdown archives.** To ensure a smooth import process, you need to organize your Markdown archive correctly. Follow these steps to prepare and import your notes:

## 1. Create the Archive

1. **Create a Main Folder**: Start by creating a new folder. This folder will contain all your Markdown files and assets.
2. **Organize Subfolders**: Inside the main folder, create two subfolders:
   - `notes-assets` for images embedded in your notes.
   - `file-assets` for other files you may have linked.

![Archive example]({{base.url}}/assets/img/docs/import-md/archive-example.png)  

## 2. Organizing Images and Files

1. **Move Images**: Place all images that are directly embedded in your notes into the `notes-assets` folder. *Note: Images added through links should not be moved.*
2. **Move Other Files**: Place all other files (e.g., attachments) into the `file-assets` folder.

Ensure that these files are placed directly inside their respective folders, without any additional subfolders. Beaver Notes does not support retrieving files from nested subdirectories.

![Note Assets]({{base.url}}/assets/img/docs/import-md/notes-assets.png)  

![File Assets]({{base.url}}/assets/img/docs/import-md/file-assets.png)  

## 3. Importing the Archive

1. **Access Import Settings**: Go to `Settings > General`, then scroll down to `Import Markdown`.
2. **Select Archive**: Click the **"Select Path"** button and choose the main folder containing your Markdown files and assets.
3. **Start Import**: Beaver Notes will begin importing your notes one by one.