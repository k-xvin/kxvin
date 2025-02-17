---
created: 2022-08-01T00:00:00.000Z
modified: 2024-12-05T00:00:00.000Z
tags:
  - code
  - projects
title: 'HarkTV: A Retrospective'
description: A really long hackathon project turned startup.
date: 2022-08-01T00:00:00.000Z
permalink: hark-tv-a-retrospective/
layout: post.njk
thumbnail: /content/attachments/hark.jpeg
---

A really long hackathon project turned startup.

# HarkTV: A Retrospective

(Written on 01/04/2023, but dated earlier to fit the chronological order of projects)

![hark.jpeg](/content/attachments/hark.jpeg)

This was a loooong hackathon. This project was part of the [Theta Q1 2021 Hackathon](https://theta-hackathon-v2.devpost.com/) hosted by the [Theta Network](https://www.thetatoken.org/), and the hackathon lasted about 4 months. We won 1st place at this hackathon.

In summary,

- We built a livestreaming platform that used the Theta Network's hybrid distributed peer-to-peer + content delivery network model.
- Our platform was focused around donating to nonprofits and organizations.
- We pitched it at a bunch of local entrepreneurship competitions at our universities.

The fruits of our labor can be seen in the video below.

[https://www.youtube.com/embed/RzjQTzG18Ik](https://www.youtube.com/embed/RzjQTzG18Ik)

We also have a detailed [writeup on Devpost](https://devpost.com/software/harktv-theta-for-social-good), where the hackathon was hosted.

# Why did we do it?

Jeremy and I were looking for a project to challenge ourselves on, and "the blockchain" happened to be picking up a lot of traction during this time. We didn't know a single thing about it, so we just dove right in.

As we came up with an idea and started working on it, it slowly grew into the idea of an actual platform and business. We gathered some of our friends to join us on this endeavour, and we tried to make something out of it.

Ultimately, the server costs behind running a streaming platform are very expensive, while the income avenues are few and far between. And with no userbase or traction, we decided to end the project and company.

# What did we achieve?

Despite not having commercial success, we got quite far with what we built.

- A fully functional streaming platform
    - Profiles, channels, streams, payments--all things considered, it worked!
- I managed to integrate Theta's hybrid streaming model.
    - Integrating Theta's library was quite difficult, mainly due to a lack of documentation. I had to do **a lot of digging around** in the source code to get it to work.
- Smart contracts that minted our own token and set up a working distribution/governance system
    - Jeremy was the smart contract man
- RTMP-HLS streaming servers built on top of [nginx](https://nginx.org/en/) and [Docker](https://www.docker.com/)
- Our own chat servers, built on [Socket.io](https://socket.io/) and deployed on [AWS Fargate](https://aws.amazon.com/fargate/)
    - It would not have been possible without [this tutorial](https://medium.com/containers-on-aws/building-a-socket-io-chat-app-and-deploying-it-using-aws-fargate-86fd7cbce13f)
- An API built on [Firebase Cloud Functions](https://firebase.google.com/docs/functions/) and [Express.js](https://expressjs.com/)

We even got some awards!

- 1st Place Winner at the [Theta Q1 2021 Hackathon](https://theta-hackathon-v2.devpost.com/) ($50,000 prize)
- Best Pitch at [UW Transcend](https://www.transcenduw.com/) ($3000 prize)
- Semifinalist at [CS Nest 2021 Pitch Competition](https://www.csnest.com/)
- Semifinalist at [UCI New Ventures Competition](https://merage.uci.edu/research-faculty/centers/innovation-entrepreneurship/new-venture-competiton.html)

# Closing thoughts

- This was very technically challenging for me, and I learned a lot.
    - Notably: Firebase, Docker, API development, websockets
- Our $50,000 prize was payed out in [THETA tokens](https://coinmarketcap.com/currencies/theta-network/) back in April/May 2021, and the token price has since decayed to under 1/10 of what it used to be as of Jan 2023.
- Blockchain still seems to be a solution looking for a problem.
- You can find much of codebase for public viewing [here](https://github.com/hark-streaming).
- This was the third and final hackathon of the triple hackathon streak Jeremy and I went on: [Node Visualizer](/node-visualizer) -> [MoonJelly](/moon-jelly-chrome-extension) -> [HarkTV](/hark-tv-a-retrospective)
