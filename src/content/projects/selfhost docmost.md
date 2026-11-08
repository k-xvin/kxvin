---
created: 2026-11-06
modified: 2026-11-07
---
well, "self-hosting" on a DigitalOcean server
# Self-hosting Docmost with Tailscale

![[tailscale_vox.png]]
(Image made with [MagicaVoxel](https://ephtracy.github.io/index.html?page=mv_main))

I've never gone down the homelabbing rabbit hole until now, mainly because needing to mess with VPNs and network setup, etc seemed very imposing.

But having used Tailscale at work, I saw how simple it could be to "just ssh" between various machines on a tailscale network. So I've set it up at home now!

I was previously paying for a Notion space that I shared with a friend. I took that export and stuck it into [Docmost](https://docmost.com/)  instead, on machine on my tailscale network. I was mainly looking for a Notion alternative that had a good live-editing/collaboration feature (ex. like Google docs), and docmost seemed to fit that niche better than something like Obsidian or the various projects that tried to bring the google docs style editing into Obsidian.

This was also a good excuse to play with Ansible and how it can easily provision a server environment. I had known of Ansible in the past, but have never used it myself. Plus, LLMs have also made it much easier to skip ahead an get a deployment working (at the cost of some deeper Ansible knowledge).

Since I didn't have a machine handy at home for this project, I decided to rent a VPS (virtual private serve) from DigitalOcean (a Digital Ocean "droplet"). So this project is "self-hosting", not self-hosting. It should be pretty straightforward to adapt my Ansible script to a local machine.

Also my first time using [MagicaVoxel](https://ephtracy.github.io/index.html?page=mv_main). Very awesome software!

Source code and setup: https://github.com/k-xvin/docmost-droplet
