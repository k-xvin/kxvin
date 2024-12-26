---
topic: uncategorized
created: 2020-08-01T00:00:00.000Z
modified: 2024-12-05T00:00:00.000Z
title: 'Quiznomer: Where it All Begins'
description: >-
  The first website a friend and I ever made, filled with bizarre and nonsense
  quizzes
date: 2020-08-01T00:00:00.000Z
tags:
  - projects
  - uncategorized
permalink: quiznomer-where-it-all-begins/
layout: post.njk
thumbnail: /content/attachments/quiznomer.png
---

The first website a friend and I ever made, filled with bizarre and nonsense quizzes

# Quiznomer: Where it All Begins

(Written on 01/03/2023, but dated earlier to fit the chronological order of projects)

![quiznomer.png](/content/attachments/quiznomer.png)

In the words of my friend Jeremy,

> The first website we ever made: a knock-off buzzfeed quizzes website. Hosting quizzes like 'What Disney Princess are You?' while returning only Ratatouille rats, or 'How Much Are You Worth (in Kidneys)?' Sadly, a database error removed this from existence.

Quiznomer holds a special place in my heart. It was rough, it was janky, it was made in Wordpress, and neither Jeremy nor I knew what we were doing. We could code in Java and C#, but knew nothing about websites and servers and the like.

I see this project as how I got my start in web development, and really, technical work in general.

Plus, the database got corrupted and we lost all the quizzes, which is kind of funny but mostly sad.

# What was in this thing?

While the original Quiznomer is gone, the main page was [archived at archive.org](https://web.archive.org/web/20210123194034/https://quiznomer.com/), so you can still sort of see it.

- We built Quiznomer on Wordpress, but we still had to write a lot of custom modifications to plugins and templates we found.
- For quizzes, we used the [ARI Stream Quiz](https://wordpress.org/plugins/ari-stream-quiz/) plugin.
    - Since this plugin did not come with a non-admin interface to create quizzes, we had to reverse engineer it's functionality in order to allow users to create quizzes.
    - I made the custom form for users to make quizzes (it is a massive, messy pile of Javascript).
    - Jeremy took care of the backend of actually inserting that quiz data into the database in a way that the plugin could read it.
- Stupid custom banner images and quiz result images.
- User profiles, badges, and points.
- Awards for quizzes (think: reddit-esque awards).
- Comment system (this was mostly filled with spam).
- Something in the range of ~30-50 handmade quizzes.
- A "Thinkz Zone" section filled with nonsense questions to discuss with your friends.
    - I spent a good amount of time coming up with inane questions here, and it's unfortunate this data
        was also lost.

- I spent ~115 hours in total on this project.
- Jeremy spent ~217 hours in total on this project.

# Closing thoughts

- Despite the Wordpress jank, Quiznomer was surprisingly robust and had a lot of features.
    - If we were to build it again with the choice of any framework/software/etc, it would still take a non-trivial amount of time just due to the amount of features we had.
- I repurchased the [quiznomer.com](https://quiznomer.com/) domain, and am currently converting it to an archive for the quizzes we were able to partially recover from cache plugin data.

![sad_walnut.jpg](/content/attachments/sad_walnut.jpg)
