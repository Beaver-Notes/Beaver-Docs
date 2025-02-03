---
layout: post
title: Markdown Syntax
details: A simple way to style, format and structure text
category: Beaver Notes
position: 3
---

# Headings

```markdown 
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

# Formatting

```markdown
**bold** 
*italic* 
==Highlight== 
`Inline code` 
~strikethrough~
```

# Lists

```markdown
1. This is an ordered list
- This is an unordered list 
[] This is a check list 
[x] This is a checked check list
```

# Blocks

> All the blocks mentioned here can also be added by typing /. A floating menu will appear, allowing you to search for the desired block by typing after /.

# Quote Block

```markdown
> This is a Quote Block
```
# Code block

>By default, VSCode doesn't support copying code with formatting. However, you can go into VSCode's settings, look for and disable 'Copy With Syntax Highlight.

```markdown
~~~
    print('This is a code block, the block below is a math block!')
~~~
```
~~~markdown
```
print('This is a code block, the block below is a math block!')
```
~~~

# Math inline

```markdown
$E=mc^2$
```

# Math Block

A math block can be inserted by typing $$. Clicking on a math block opens the KaTeX editor, while pressing Ctrl+Enter closes the editor. The math block supports KaTeX functions and is perfect for both simple and complex math once you get the hang of it.


![image]({{base.url}}/assets/img/docs/markdown/math.png)

# Mermaid Block

A mermaid block can be inserted by typing ::mermaid. The mermaid block supports the Mermaid.js syntax, allowing you to add beautiful flowcharts, diagrams, and charts seamlessly to your notes, making data easier to read. To discover more about using Mermaid, check out the [Contributing to the Docs]({% post_url 2024-06-17-Mermaid-Block %})

Callouts come in **yellow, red, blue, green, black, and purple**.

Type `::color name` to insert the callout in Beaver Notes 3.3.0 or later. If you are running a previous version, you can insert a callout by typing `>[color name]`.

![image]({{base.url}}/assets/img/docs/markdown/callout.png)

# Labels

```markdown
#Tutorial #Label
```