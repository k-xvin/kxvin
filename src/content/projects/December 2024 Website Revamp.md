---
created: 2024-12-24T00:00:00.000Z
modified: 2024-12-25T00:00:00.000Z
tags:
  - code
  - projects
title: December 2024 Website Revamp
description: Yet another website redesign
date: 2024-12-24T00:00:00.000Z
permalink: december-2024-website-revamp/
layout: post.njk
thumbnail: /content/attachments/website_20241224191902.png
---

Yet another website redesign

# December 2024 Website Revamp
The primary motivation to rework my website (again) was to improve how I store and organize my articles.

Previously, I wrote all my articles directly into my repo, into fixed categories, with the images haphazardly stored for each article. This was okay for a few years, but over time I wanted a better integration with my personal note system rather than needing to do a dance of copy-pasting and reformatting to publish something.

The old website is still up at [old.kxvin.com](https://old.kxvin.com/). If I ever redo my website again, expect the one referenced in this article to go to the titular old2.kxvin.com.
# The Result
![website_20241224191902.png](/content/attachments/website_20241224191902.png)
* Better content management system
	* Directly copies notes from my personal note system into the website repo, removing article writing/publishing friction.
* More flexible top-level categories
	* Projects - Things I did or made
	* Notes - Information and thoughts
* More readable font on posts
	* The old monospaced font looked good in some places, but I think it was a little bit of an eyesore to read. I went with generic sans-serif font.
* Simpler design. Both the codebase and the styling is simpler and more concise.
# The Process
The below scripts are invoked from my `package.json`.
## 1. Copy
Copy the files from my local Obsidian notes to the repo:
```
$ rsync -av --delete ~/Everything/Public/ src/content
# -a or --archive to preverse file data
# -v or --verbose to log during copying
```
## 2. Preprocess
```
$ node preprocess.mjs
```
Even though the Obsidian notes are written in Markdown, they aren't fully ready to be rendered by 11ty. We need to do the following:
* Replace wikilink-style Markdown links with standard Markdown links so that they are compatible with 11ty's standard Markdown parser.
* Pull and reformat various frontmatter data out of the body for easier access within 11ty (tags, title, description, thumbnail image)
## 3. Generate (let 11ty do it's thing!)
```
$ eleventy --serve
# --serve spins up a webserver for local development
```
Then we just pass the reformatted notes into 11ty and let it work its magic. All of the styling. sorting, image processing, and pagination logic happens at this stage.
# Todo
There's still a few improvements that can be made at the time of writing this. Maybe by the time you're reading this, I'll have done some of the below:
* Add "last modified" date to posts
* Two-column layout for projects/posts on wider screens?
* Highlighted/pinned posts and notes
* "Go to a random post" button
* Small CSS animations
* Inline page-specific CSS onto only those pages instead of a single global inline CSS blob
* Fix the weird scrollbar gutter
* Minor font spacing readability improvements
