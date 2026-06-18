---
created: 2025-02-25
modified: 2025-03-12
tags:
  - git
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
