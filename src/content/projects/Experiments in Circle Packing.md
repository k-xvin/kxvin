---
topic: art
created: 2022-11-12T00:00:00.000Z
modified: 2024-12-05T00:00:00.000Z
title: Experiments in Circle Packing
description: Generative art variations on circle packing
date: 2022-11-12T00:00:00.000Z
tags:
  - projects
  - art
permalink: experiments-in-circle-packing/
layout: post.njk
thumbnail: /content/attachments/1.jpg
---

Generative art variations on circle packing

# Experiments in Circle Packing

![1.jpg](/content/attachments/1.jpg)

![2.jpg](/content/attachments/2.jpg)

![3.jpg](/content/attachments/3.jpg)

![4.jpg](/content/attachments/4.jpg)



## The Process

Circle packing has been something I've seen in some generative art pieces, but not something I've attempted to make before. I tend not to have a purely algorithmic approach to my work--I usually end up half-implementing what I had in mind,
and running with my mistakes (and definitely not because I am too lazy to look for my errors).

The basic premise of circle packing is this:

- Expand circles frame by frame.
- If a circle is touching/intersecting another circle, stop expanding that circle.
- Don't draw new circles inside of existing circles.

To check for intersections, we can compare every new circle with its distance to every existing circle. This is O(n^1),
and there might be a more efficient solution.

- If the distance between the center of any two circles is greater than the sum of the two circles' radii, then the circles are intersecting.
    - // For every circle,
    - // if distance <= r0 + r2, then circles are intersecting

Of the four pieces I made, only one of them is proper circle packing. In the other pieces, I made a mistake where I only check for circle intersections
with my starting pool of circles. Regardless, I got some results I was happy with.

Source code and full animations on OpenProcessing below.

[https://openprocessing.org/sketch/1734084/embed/](https://openprocessing.org/sketch/1734084/embed/)

[https://openprocessing.org/sketch/1734946/embed/](https://openprocessing.org/sketch/1734946/embed/)

[https://openprocessing.org/sketch/1734952/embed/](https://openprocessing.org/sketch/1734952/embed/)

[https://openprocessing.org/sketch/1736190/embed/](https://openprocessing.org/sketch/1736190/embed/)
