---
layout: page
title: Simple & Cheap Digital Signage from a Pi 400
description: putting together an "it just works" display system for my college commons
img: assets/img/clock/thumb.jpg
importance: 110
category:
related publications: false
---

Rice University has a system of residential colleges (yep, like Hogwarts Houses!) and each has its own government. Saebyeok Keum and I serve as Martel College secretaries. When we were running, we noticed [Lovett College](https://lovett.rice.edu/) has a TV in their commons that displays announcements, shoutouts, and other valuable information. Martel College has a wall-mounted TV in the commons, and we've never even seen it on! We decided to make fixing up this TV one of our campaign promises.

In Martel Parliament, it's fairly easy to get a money request passed if it's under $100--that was our maximum budget. I wanted to make a system that would truly last even after we both leave office, and this turned out to be a major guiding factor in our decisions. 

## Hardware

My first step was choosing hardware. I have [some experience](https://wilsonharper.net/projects/adsb/#displaying-the-info) with using Raspberry Pis for displaying live ADS-B data, so that was my first idea. The big draw with a Pi is that there are many closed-source signage OSes, but if those ever stop being an option, I can make my own system.

The Pi 4 I used for that ADS-B display had 4GB of RAM, and I  didn't want to go below that. Unfortunately, the Pi 4 4GB is very expensive right now--$75 is a tough sell, and we'd still need a case.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/signage/pi4gb.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

I kept poking around on the Micro Center website and realized the Pi 400 was on sale for a great price!

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/signage/pi400.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The Pi 400 is an overclocked Pi 4 4GB built into a keyboard and massive heatsink, so this is a great deal for $40. The form factor is a bit strange for our purposes, but saving that much money made it a no-brainer. Once we picked it up, I started eyeing mounting options. The keyboard made it difficult to get things like zip-ties through the whole unit, so I removed the keyboard.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/clock/PXL_20260224_143254289.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Obviously, I needed a way to protect the internals, so I drew a simple .DXF you can get [here](https://wilsonharper.net/assets/img/clock/pi400case). I first cut it out of acrylic, but it broke easily. Plywood worked much better, even if it didn't look as cool.


<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/signage/picase.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/signage/PXL_20260316_175230133.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/signage/PXL_20260316_184847595.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Mounting it behind the TV took some zip-ties, and that was about it. It looks a bit precarious, but it won't budge. 

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/signage/PXL_20260316_193420825.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Software

My highest priority on the software side was making sure it was resilient, low-maintenance, and easy-to-use. My first thought was making a Google Slides presentation that the Pi would display using Chromium in kiosk mode. A cron script could automate startup and refreshes. I think this would have worked alright, but I realized the [Yodeck system](https://www.yodeck.com/) does a better job of this and is free for one screen. Aside from making it possible to control the Pi from a web interface, it caches files for offline playback, handles updates better, and can control the TV though HDMI-CEC. This feature allows me to control when the TV is on and off--and, if someone turns it off for a game night, it'll start right back up the next morning. 

If Yodeck ever changes their pricing, it won't be hard to switch to a different solution, and that's why I'm so happy we've gone with a Pi.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/signage/PXL_20260316_193410508.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>