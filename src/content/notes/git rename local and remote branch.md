---
created: 2025-02-25T00:00:00.000Z
modified: 2025-03-12T00:00:00.000Z
tags:
  - notes
  - git
title: git rename local and remote branch
description: rename a branch that has already been pushed
date: 2025-02-25T00:00:00.000Z
permalink: git-rename-local-and-remote-branch/
layout: post.njk
thumbnail: /content/attachments/placeholder.png
---
rename a branch that has already been pushed
# git rename local and remote branch
1. Rename current branch
```
git branch -m my-new-branch-name
```
2. Rename remote branch (will delete the old remote branch)
```
git push -u origin :my-old-branch-name my-new-branch-name
```

https://stackoverflow.com/a/70003418
