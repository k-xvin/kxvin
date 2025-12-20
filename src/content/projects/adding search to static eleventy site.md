---
created: 2025-02-16T00:00:00.000Z
modified: 2025-12-19T00:00:00.000Z
tags:
  - projects
  - code
title: Adding Search to an Eleventy Site
description: Using Pagefind to add search to my website
date: 2025-02-16T00:00:00.000Z
permalink: adding-search-to-an-eleventy-site/
layout: post.njk
thumbnail: /content/attachments/pagefind.png
---
Using Pagefind to add search to my website
# Adding Search to an Eleventy Site

![pagefind.png](/content/attachments/pagefind.png)

Since this website has a lot of stuff on it, I wanted to try adding a low-overhead search feature. After some digging around, it seems like Pagefind is the solution for me.

As of writing this article, I haven't actually added an official search button. Maybe by the time you're reading this, it exists. For now, it is directly accessible at https://kxvin.com/search.

# What is Pagefind?
Pagefind crawls your site and generates an index of all of the pages.

The generated index can be directly bundled with your site to queried by clientside Javascript in order to find pages. Note that this index only needs to be re-generated when there is new content on the site.

No fancy server code needed for the website! Users will directly search the pre-generated index to find pages and terms.
# Add Pagefind to Eleventy

It was very straightforward! I also put off writing up this project for a while, so you get the pleasure of reading a very sparse tutorial :)
1. Install the Pagefind NPM package
2. Add Pagefind to eleventy.js using the "after event" to create the pagefind index
3. Add "data-pagefind" attributes to HTML elements that contain index-able content
4. Use the premade Pagefind UI to run the clientside JS that searches the index (what I'm using at  https://kxvin.com/search !)


# Helpful Resources

https://pagefind.app/docs
* Great documentation! Simple, concise, readable, and most importantly, usable.

https://permortensen.com/adding-pagefind-to-an-eleventy-site/
* Short and to the point, with a code snippet included

https://mikefallows.com/posts/adding-search-to-eleventy-site/
* Also short and to the point
* Has some thoughts on Pagefind alternatives and other resources

https://rknight.me/blog/using-pagefind-with-eleventy-for-search/
* A little more in-depth, but still concise
