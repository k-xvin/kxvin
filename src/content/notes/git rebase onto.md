---
created: 2025-03-04T00:00:00.000Z
modified: 2025-03-04T00:00:00.000Z
tags:
  - notes
  - git
title: git rebase onto
description: change the base of a branch to a different branch
date: 2025-03-04T00:00:00.000Z
permalink: git-rebase-onto/
layout: post.njk
thumbnail: /content/attachments/placeholder.png
---

change the base of a branch to a different branch
# git rebase onto
Useful for moving a branch based off of unmerged features to a more recent branch that has now merged those features.

```
git rebase --onto new-branch-base old-branch-base my-branch-name
```

https://git-scm.com/docs/git-rebase
