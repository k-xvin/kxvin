---
topic: uncategorized
created: 2022-07-01T00:00:00.000Z
modified: 2024-12-24T00:00:00.000Z
title: 'Foodpool: A Retrospective'
description: Some reflections on another startup I cofounded
date: 2022-07-01T00:00:00.000Z
tags:
  - projects
  - uncategorized
permalink: foodpool-a-retrospective/
layout: post.njk
thumbnail: /content/attachments/foodpool.jpeg
---

Some reflections on another startup I cofounded

# Foodpool: A Retrospective
(Written on 01/02/2023, but dated earlier to fit the chronological order of projects)

![foodpool.jpeg](/content/attachments/foodpool.jpeg)

![foodpool-website.png](/content/attachments/foodpool-website.png)

What the heck is a Foodpool?

Foodpool was a startup some buddies and I founded and started working on back in September 2021. We stopped working on it around July 2022.
It was initially based around the idea of "carpooling" food delivery orders.

The flow would go something like this:

1. You're planning to go to restaurant X to grab some food.
2. Your friend also wants something from X. You offer to pick something up for them, and they tell you what they want.
3. You drive over to restaurant X and purchase both your food and your friend's food.
4. On your way back home, you drop off your friend's food.
5. They pay you back for delivering it to them.
6. Foodpool complete!

As we worked on this initial idea, it evolved into a sort of student-focused meal delivery service. Our website
is still up at
[https://foodpool.app/](https://foodpool.app/), but we're no longer working on the startup itself.

# What did I do?

It's hard to list every little thing I did, but here are some that come to mind:

- Developed the initial backend API prototype using Kotlin, with the [Ktor](https://ktor.io/) framework.
    - For authentication, we used [Firebase](https://firebase.google.com/), mainly because I had experience with it.
- Developed the production backend API with Rust and SQL. For the most part, our CTO lead the charge in backend design decisions.
    - I made sure our API routes were throughly vetted with unit tests.
    - We stuck with Firebase for authentication and user information storage, so I was still responsible for that side.
- Designed and implemented the [foodpool.app](https://foodpool.app/) website.
    - There were **many** iterations here, but I'm quite proud of how it eventually turned out.
    - We went with [React](https://reactjs.org/) for the website, mainly since we were all familiar with it (granted, I ended up being the only one who was implementing it, haha).
- Started to pick up Swift and iOS development in Xcode, but we ended up ditching that side of things.
- After we decided to ditch the iOS app and backend, I hacked together a new prototype with Google Spreadsheets, Google Apps Script, Google Forms, and Twilio.

Generally, I functioned as a jack-of-all-trades. I learned a lot through both the techincal work I lead and worked on, as well as the business decisions we had to make.

# What did we achieve?

- An actual system for food delivery that worked (at least logistically).
- 2nd Place Winner at the 2022 [Beall and Butterworth Product Design Competition](https://bbcomp.tech.uci.edu/) ($6500 prize).
- [Blackstone Launchpad](https://www.blackstonelaunchpad.org/) Fellowship ($5000 grant).
- The ICS department at UCI wrote a [news article](https://www.ics.uci.edu/community/news/view_news?id=2170) about us. It's a good read if you wanted more details about what we did.

# Closing thoughts

- I like designing things to look nice.
    - such as the the website.
- I like hacking together novel solutions and prototypes that require me to get creative.
    - such as the Google Spreadsheet/Script/Forms prototype.
- Fun fact: before we called it `Foodpool`, we called it `Onthego`.
- Feel free to shoot me an email or message if you want to talk about anything here!
