---
topic: uncategorized
created: 2024-07-14T00:00:00.000Z
modified: 2024-12-06T00:00:00.000Z
title: git submodule
description: 'Initialize, pull, and update git submodules'
date: 2024-07-14T00:00:00.000Z
tags:
  - notes
  - uncategorized
permalink: git-submodule/
layout: post.njk
thumbnail: /content/attachments/placeholder.png
---

Initialize, pull, and update git submodules

# git submodule

Initialize and update all git submodules
```Bash
git submodule update --init --recursive
```

Pull git submodules
```JavaScript
git pull --recurse-submodules
```

Remove a cached submodule that has been deleted
```Bash
$ git submodule update --init --recursive
fatal: No url found for submodule path 'platforms/linux/source/linux/driver/media-tutk/tutk' in .gitmodules

$ git submodule status
+d6631ab1448354e59f377f5dd4af6c04a2e265d7 lt/thirdparty/lwip (STABLE-2_1_3_RELEASE-23-gd6631ab1)
 e139cbe61af60e66262bc75c8c930d83aa4ffc51 lt/thirdparty/opus (heads/main)
+3d70d066e13ef39195b1089e77b4cff1d6e4610d platforms/ak3918x/thirdparty/vendor-sdk/altobeam/wlan-altobeam (remotes/origin/bugfix/ATBCONNECT-25-main-1-g3d70d06)
fatal: no submodule mapping found in .gitmodules for path 'platforms/linux/source/linux/driver/media-tutk/tutk'

$ git rm --cached platforms/linux/source/linux/driver/media-tutk/tutk
rm 'platforms/linux/source/linux/driver/media-tutk/tutk'

$ git submodule update --init --recursive
Submodule path 'lt/thirdparty/lwip': checked out 'bdd113e99af7787a60756daa9db5db9ae4ab505a'
Submodule path 'platforms/ak3918x/thirdparty/vendor-sdk/altobeam/wlan-altobeam': checked out '2428c6d4792ddcbf7be348ad0c533afa44c05f82'
```
