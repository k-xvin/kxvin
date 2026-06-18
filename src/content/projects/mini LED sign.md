---
created: 2022-10-13
modified: 2024-12-05
tags:
  - electronics
---

Made with an ESP32 WROOM32 and 1088AS LED matrix

# Mini LED Sign

![[mini_led_sign.jpg]]

This was my first project in messing around with an ESP32. I've always wanted to make a scrolling LED sign ever since I saw one as an artpiece in the SFMOMA. For some reason, that artpiece really left an impression in my mind. I originally made this back in May 2022.

I used PlatformIO to write and flash the code onto the ESP32-WROOM32. To get the text I want to display, the ESP32 GET requests pastebin, and we spit the raw response out onto the 1088AS matrix. The ESP32 will continue to poll the pastebin to get more text to display.

I think the code I wrote has some artifacts in it from when I was trying to make it more robust, but for the most part, it works as a proof of concept and reference.

Code can be [found here.](https://github.com/k-xvin/esp32-1088as-matrix)
