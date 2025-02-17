---
created: 2023-12-30T00:00:00.000Z
modified: 2024-12-05T00:00:00.000Z
tags:
  - code
  - projects
title: 'LYNE Puzzle Solver, C'
description: 'A basic solution finder for the puzzle game LYNE, written in C'
date: 2023-12-30T00:00:00.000Z
permalink: lyne-puzzle-solver-c/
layout: post.njk
thumbnail: /content/attachments/header.jpg
---

A basic solution finder for the puzzle game LYNE, written in C

# LYNE Puzzle Solver, C

![header.jpg](/content/attachments/header.jpg)

![GIFa_small.gif](/content/attachments/GIFa_small.gif)

![GIFb_small.gif](/content/attachments/GIFb_small.gif)

[LYNE on Steam](https://store.steampowered.com/app/266010/LYNE/). Images above taken from the Steam page.

In July/August of 2023, I wanted to brush up on my C before starting work full time. I happened to be playing though some LYNE puzzles at the time, and so I thought it might be a good project.

I made a simple recursive solver. It traverses all the possible moves for a given puzzle board, and returns all the solutions.

Boards and solutions are represented as text characters. A/B/C are the color/shape types, with uppercase representing end terminals.

Connector nodes are numbers that indicate the number of open slots.

Example Input Board:

```Plain
A a 2 a b
C B 2 2 2
A 3 c 2 b
c C c c B
```

Sample Solutions:

```Plain
Solution 1
A-a-2-a.b
.../|.|/|
C.B.2-2-2
.\./.\./|
A-3-c-2.b
./.\..|.|
c-C.c-c.B

Solution 2
A-a-2-a.b
.../|.|/|
C.B.2-2-2
.\./.\./|
A-3-c-2.b
./.\..|.|
c-C.c-c.B

Solution 3
A-a-2-a.b
.../|.|/|
C.B.2-2-2
.\./.\./|
A-3-c.2-b
./.\.\.\.
c-C.c-c.B

...

Solution 94
A-a-2-a.b
....|\|/|
C.B-2.2-2
.\./.\./|
A-3-c.2-b
./.\.\.\.
c-C.c-c.B

Total Solutions: 94
Total Moves Explored: 31507
0.013583

```

This post is 5 months late, but better late than never! I had aspirations of optmizing this code,
compiling it to webassembly, and designing a nice web interface for it. I may still do that in the future.

I know there are LYNE solvers out there already, but it'd be fun to get familiar with WASM and package this
solver into a complete product.

[Source code](https://github.com/k-xvin/FreeCrosswordPuzzles-Navigation-Extension)
