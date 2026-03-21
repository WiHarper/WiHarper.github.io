---
layout: page
title: A DIY Integrated Circuit Clock and Case
description: making a case for an AliExpress project, breaking it, and fixing it
img: assets/img/clock/thumb.jpg
importance: 70
category:
related publications: false
---

## A Clock Without an MCU

The last few months, I've been obsessed with [Ben Eater](https://eater.net/)'s series where he builds an 8-bit CPU, video card, and 6502 computer using breadboards. He makes kits available for purchase, but I wanted to do my own thing. As I learned more about integrated circuits, it seemed like a clock would be a fun project--not too challenging, but I'd still learn plenty. It's easy to make a clock from an Arduino or other microcontroller, but making it from integrated circuits is a little (lot) harder. Instead of writing a few lines of code to handle ticking and keeping track of time, I'm relying on discrete logic signals propagating through larger circuits.

Shout-out to Gislain Benoit who deadbugged [a clock](https://techno-logic-art.com/clock.htm) from just transistors, resistors, and capacitors!

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/clock/fc5.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Credit to Gislain Benoit
</div>

I found [this video](https://www.youtube.com/watch?v=0hwWnPxKU14) from bigclivedotcom where he walks through soldering an [IC clock kit](https://www.aliexpress.us/item/3256805867230474.html?) he found on AliExpress. I realized that it would be very helpful to have functional hardware in my hands before I designed any sort of schematic. Clive gave a link to the kit he used, and it was only $5! I picked up three kits because the cost of the bundled ICs and displays was actually lower than sourcing the individual components for my own future designs. I also expected to break a component or two, and I did. It showed up looking like this:

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/clock/PXL_20260318_203839218.PORTRAIT.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/clock/PXL_20260318_203859592.PORTRAIT.ORIGINAL.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Making It

The soldering process was perfectly straightforward. It took a while, but it turned out well. Many pads were fairly compact, but it wasn't too hard to avoid short circuits. I like that it uses a crystal oscillator over the less-accurate 555 timer.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/clock/PXL_20260221_022456907.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

When I hooked it up to a 5V power supply, it worked immediately! The controls are simple--one button increments hours, the other increments minutes. The switch connects and disconnects the 1HZ signal that causes the "tick".

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        <video 
            controls 
            playsinline 
            class="img-fluid rounded z-depth-1">
            <source src="{{ '/assets/img/clock/Pxl20260221014427808.mp4' | relative_url }}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
</div>



At this point, I was very happy with how this looked--I just needed a way to display it! Some time in Fusion led to this design. The base is pretty simple. A circular hole in the base lets the USB cable pass through. The rectangular cutout that the clock rests on is so the through-hole components have enough space. The cover is laser-cut acrylic. 


<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/clock/cad1.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/clock/cad2.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/clock/cad3.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## How it Works


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/clock/CD4511.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

| Component |Function | Description |
| :--- | :--- | :--- | 
| **CD4511**  | Binary to 7-Segment Decoder | Converts 4-bit binary into signals suitable for each LED segment |
| **CD4518**  | Dual Binary Up-Counter | A chip with two binary counters--each counter handles one digit |
| **CD4060**  | 14-Stage Ripple Counter | Divides the 32.768 kHz signal into a 2 Hz signal though flip-flops |
| **CD4013**  | Dual D-Type Flip-Flop | Divides the 2 Hz signal into a 1 Hz signal |
| **CD4081**  | Quad 2-Input AND Gate | Increments next digit when a counter maxes out |
| **32.768 kHz Crystal**  | Crystal Oscillator | Vibrates at 32.768 kHz |



Without any power negotiation, a USB adapter puts out 5V. I found an old USB-A cable and chopped off the end. Stripping the insulation from the VCC and GND wires inside creates an easy 5V power supply. I found the brightness was a bit too high, so I attached a resistor in series with ground inside the USB cable, bringing the voltage closer to 3.3V.

During testing, I powered it up while the back was sitting on the metal underside of a removed Raspberry Pi 400 keyboard (taken from [this project](wilsonharper.net/projects/signage)). I instantly noticed that a segment on the very first display was no longer lighting up--I had short-circuited it! I felt very silly indeed. Because I had two more kits, I had plenty of parts to troubleshoot with. Since the ICs are all in sockets, my first step was swapping them all out. That didn't fix anything. Next, I got a power supply out, connected ground to ground, and touched 5V to each resistor-segment in order and found that the 7-segment display itself had broken. After a few minutes with a soldering iron and a hot-air rework station, I swapped in a spare display and was back in business.



<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/clock/PXL_20260318_200806730.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/clock/PXL_20260318_202640562.PORTRAIT.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/clock/PXL_20260318_203143488.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


Overall, I'm very happy with how it's turned out. My original goal was to learn more about IC clocks, and, while I have accomplished that, I've also made a functional, cool-looking clock! In the future, I plan on using [SimulIDE](https://simulide.com/p/) to create an IC-powered Pomodoro-style timer. 


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        <video 
            controls 
            playsinline 
            class="img-fluid rounded z-depth-1">
            <source src="{{ '/assets/img/clock/Pxl 20260318 204613189.Locked.mp4' | relative_url }}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
</div>

If you have the same kit, I've uploaded the files for the case [here](/assets/img/clock/Clock Case.zip). I printed the base in PLA, and the acrylic is 1/4". The hardware is all M3.