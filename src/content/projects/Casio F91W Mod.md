---
created: 2026-09-09
modified: 2026-09-12
tags:
  - art
  - electronics
---
fun little wearable project!
# Modded Casio F-91W

I recently got a Casio F-91W. I also heard you could mod it by swapping out the PCB with someone else's PCB, and then running your own firmware on it. That sounded pretty cool to me, so I did some digging.
* https://f91w.watch/mods/
* https://www.reddit.com/r/F91Ws_on_NATOs
* https://www.olleewatch.com/
* https://www.sensorwatch.net/
* https://www.crowdsupply.com/oddly-specific-objects/sensor-watch
* https://www.sensorwatch.net/docs/

I ended up buying:
* The [Sensor Watch Lite](https://www.crowdsupply.com/oddly-specific-objects/sensor-watch) PCB and custom LCD screen from Crowd Supply
* Gradient filters for the screen from [OGGLOGG](https://www.etsy.com/listing/1374696404/casio-f-91w-monochrome-gradient-filte) on Etsy
* 18mm NATO-style watch strap from [Amazon](https://a.co/d/01UGiqPk) (and later [StrapsCo](https://strapsco.com/product/bond-single-pass-seat-belt-strap/))

Then I put it together!
1. Forked and customized and flashed my Sensor Watch firmware ("Second Movement") onto my board, over USB.
	1. https://github.com/k-xvin/second-movement
	2. It has a great web emulator for testing the watch firmware!
	3. The PCB plugs into the "inside" tongue of the micro-USB cable, with the trace side touching the pins inside of the cable.
2. To disassemble the watch and install the Sensor Watch board, I followed the [Sensor Watch assembly tutorial](https://www.youtube.com/watch?v=Zr0pKeC2VFU).
3. I used the [Ollee watch tutorial](https://www.youtube.com/watch?v=98J-rCoEQCQ) to get a better view of how to disassemble the LCD piece so I could swap in the new LCD.
	1. I broke the LCD I ordered initially (they are VERY FRAGILE), so I had to order another one from CrowdSupply.
4. Installed the gradient filter following [OGGLOGG's provided tutorial](https://www.youtube.com/watch?v=2bDCLdt_UE0).
	1. I messed this up a little bit and needed to remove and re-stick the gradient sticker. This left some residue on the watch face that you can kind of see.
	2. If you install, this, you should be gentle and careful to line up the sticker precisely over the window before it starts sticking down, because it is VERY sticky and can't really be adjusted after it is stuck.
5. Put the watch back together.
6. Removed the original straps on the F-91W, following a [short tutorial](https://youtu.be/W3s4XkREF38).
7. Struggled the put the new strap on because it was too thick.
8. File down the plastic of the lugs/strap mount of the watch.
	1. I was not anticipating to do this, but it was actually pretty straightforward. There is a little bit of guidance on the side of the [F91Ws_on_NATOs](https://www.reddit.com/r/F91Ws_on_NATOs) subreddit.
	2. Basically you just file away the "overhang" inbetween the spring bar mounts until your strap can fit (using a wood file). For me, this ended up being almost the entire overhang.
9. Done!

Fully installed, before I put it back in the case.

![[casio_naked.jpeg]]

Before and after the strap modification.

![[casio_before_strap.jpeg]]

![[casio_modded.jpeg]]
