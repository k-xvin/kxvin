---
created: 2025-03-04
modified: 2025-03-04
tags:
  - git
---

change the base of a branch to a different branch
# git rebase onto

![[git_rebase.png]]

Useful for moving a branch based off of unmerged features to a more recent branch that has now merged those features.

```
git rebase --onto new-branch-base old-branch-base my-branch-name
```

In practice, I use it more like so to move my current commits onto a new base:

```
git rebase --onto new-branch-base <hash of commit before the one to move>
```

https://git-scm.com/docs/git-rebase
