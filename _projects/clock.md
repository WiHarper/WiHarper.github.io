---
layout: page
title: A DIY Integrated Circuit Clock and Case
description: making a case for an Aliexpress project, breaking it, and fixing it
img: assets/img/clock/thumb.jpg
importance: 70
category:
related publications: false
---

The last few months, I've ben obsessed with [Ben Eater](https://eater.net/)'s series where he builds an 8-bit CPU, video card, and 6502 computer using breadboards. He makes kits available for purchase, but I wanted to do my own thing. As I learned more about integrated circuits, it seemed like a clock would be a fun project--not too challenging, but I'd still learn plenty. It's easy to make a clock from an Arduino or other microcontroller, but making it from integrate circuits is a little harder. Shout-out to Gislain Benoit who deadbugged [a clock](https://techno-logic-art.com/clock.htm) from just transistors, resistors, and capacitors!

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/clock/fc5.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Credit to Gislain Benoit
</div>

I found [this video](https://www.youtube.com/watch?v=0hwWnPxKU14) from bigclivedotcom where he walks through soldering an IC clock kit he found on Aliexpress. I realized that it would be very helpful to have functional hardware in my hands before I designed any sort of schematic. Clive gave a link to the kit he used, and it was only $5! I picked up three because the cost of the ICs, displays, and other components would make my own future design cheaper. I also expected to break a part or two, and I did. It showed up looking like this:

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/clock/PXL_20260318_203839218.PORTRAIT.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/clock/PXL_20260318_203859592.PORTRAIT.ORIGINAL.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The soldering process was perfectly straightforward. It took a while, but it turned out well. Many pads were fairly compact, but it wasn't too hard to avoid short circuits. I like that it uses a crystal oscillator over the less-accurate 555 timer.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/clock/PXL_20260221_022456907.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

When I hooked it up to a 5V power supply, it worked immediately! 

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        <video 
            controls 
            autoplay 
            loop 
            muted 
            playsinline 
            class="img-fluid rounded z-depth-1">
            <source src="{{ '/assets/img/clock/Pxl20260221014427808.mp4' | relative_url }}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
</div>


writeup in progress