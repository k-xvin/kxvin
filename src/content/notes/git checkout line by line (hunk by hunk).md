---
created: 2024-07-08T00:00:00.000Z
modified: 2024-12-06T00:00:00.000Z
tags:
  - uncategorized
  - notes
title: git checkout line by line (hunk by hunk)
description: Use “git checkout --patch” to apply changes line by line
date: 2024-07-08T00:00:00.000Z
permalink: git-checkout-line-by-line-hunk-by-hunk/
layout: post.njk
thumbnail: /content/attachments/placeholder.png
---

Use “git checkout --patch” to apply changes line by line

# git checkout line by line (hunk by hunk)

[Is it possible to git-checkout a single line instead of the entire file?](https://stackoverflow.com/a/39158451)

```Bash
git checkout <branch> --patch -- <files>
```

Then it will interactively go through each hunk and you can add/edit/drop the changes you want

```Bash
#  From https://stackoverflow.com/a/39158451
y - stage this hunk
n - do not stage this hunk

q - quit; do not stage this hunk or any of the remaining ones
a - stage this hunk and all later hunks in the file
d - do not stage this hunk or any of the later hunks in the file
g - select a hunk to go to
/ - search for a hunk matching the given regex
j - leave this hunk undecided, see next undecided hunk
J - leave this hunk undecided, see next hunk
k - leave this hunk undecided, see previous undecided hunk
K - leave this hunk undecided, see previous hunk

s - split the current hunk into smaller hunks
e - manually edit the current hunk

? - print help
```
