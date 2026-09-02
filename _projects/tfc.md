---
layout: page
title: Did I Design the World's Smallest Rocket Flight Computer?
description: a work in progress
img: assets/img/tfc/hero.png
importance: 40
category:
related_publications: false
published: true
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/tfc/hero.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Six months ago, I built a [flight computer](https://wilsonharper.net/projects/avio/) in two weeks. Using what I've learned from that project, I've designed a new flight computer that I believe to be the world's smallest, measuring just 10 x 10mm. The current record seems to be a [16 x 17mm computer](https://www.youtube.com/watch?v=5TTcbMv5tDc) built by Joe at BPS.Space. Mine is 36% the size of his. Joe's build was focused on a compact way to achieve thrust-vector control. Mine is designed to go on more traditional hobby rockets, so I haven't included PWM servo outputs--giving me space to add 16 MB of onboard flash.

It's currently being fabricated and assembled, and this page will be updated as it progresses.

The flight computer features an STM32L4 microcontroller and a flash chip running in Quad-SPI. Because the STM32L4 supports QSPI and DMA, data can be quickly moved to flash without stalling loops.

The board also uses the LPS22DF barometer and the LSM6DSV320X IMU, which combines two accelerometers into one IC. This feature allows it to collect high-precision data at low acceleration without clipping during launch--a problem I ran into on my original computer. One accelerometer will be capable of ±16g while the other can go up to ±320g.

<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/tfc/side.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/tfc/back.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


Power and data share one connector. When the board is on the rocket, a 1s or 2s LiPo can be plugged straight into the Molex connector. To remove flight logs from it, a custom USB-Molex cable will be used to both power it and communicate with it straight over the STM32's D+/D- pins. I have exposed SWD pads on the back for debugging that are accessible using a pogo pin clip. 

Because of the board's low power draw and interrupt-driven logging, the LDO can handle the heat dissipation from even a 2s LiPo over the duration of a flight. My back-of-the-envelope calculation estimates heat generation at 150 mW, which isn't a problem over a short flight.

I designed it in KiCad and used the [JLCImport tool](https://github.com/jvanderberg/kicad_jlcimport) for 3D models. 



---

## Schematic

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/tfc/sch.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

---

## Bill of Materials

<br>

<div class="row justify-content-sm-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        <iframe 
            src="/assets/html/bom2.html" 
            style="width: 100%; height: 1180px; border: none;"
            title="Interactive Bill of Materials">
        </iframe>
    </div>
</div>

<br>

---

## Stackup

Routing a microcontroller, flash, sensors, and power into this small a form factor was a fun challenge. Signal traces are routed at 0.1 mm width, and power traces are 0.25 mm. Vias are 0.4 mm in diameter. To escape fine-pitch footprints, I've used via-in-pad.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/tfc/all.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

#### Top Layer and Inner Layer 1

<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/tfc/1.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/tfc/2.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

#### Inner Layer 2 and Bottom Layer

<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/tfc/3.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/tfc/4.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>