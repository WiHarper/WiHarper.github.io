---
layout: page
title: Synthetic Aperture Radar at MIT Lincoln Laboratory
description: conducting and presenting research on SAR and Doppler at MIT LL RISE
img: assets/img/radar/PXL_20240724_022544293.NIGHT.jpg
importance: 80
category:
related_publications: false
---

**Authors:** [Wilson Harper](https://www.linkedin.com/in/wilson-harper/), [Rony Korab](https://www.linkedin.com/in/rony-korab/), [Soledad Quainoo](https://www.linkedin.com/in/soledad-quainoo-0a6a1331a/), and [Chloe Zabounidis](https://www.linkedin.com/in/chloe-zabounidis/)

## What is Synthetic Aperture Radar?
* Collects data by taking multiple snapshots of an area/surroundings to recreate a model 
* Unlike other radar modes, SAR can be used for detailed 2-D modeling 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/radar/PXL_20240724_022544293.NIGHT.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The radar
</div>

---

## SAR Modes
* SAR Spotlight (Frame)
* SAR Strip Map (Scan)

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/radar/from_slides/image15.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

---

## Crossrange & Downrange
* 
**Range:** Distance from the radar to the target 
* 
**Crossrange:** Field perpendicular to the range 

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/radar/from_slides/image8.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/radar/from_slides/image6.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

---

## How our SAR works

* Takes a specific number of data captures 
* Data appears as radar pulse compression returns 
* Combines data by back projection, like "smear and add" 

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/radar/from_slides/image10.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

---

## Smear and Add

<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/radar/from_slides/image9.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/radar/from_slides/image45.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/radar/from_slides/image12.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/radar/from_slides/image22.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The final result
</div>

---

## Setup

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/radar/from_slides/image18.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Measurements are taken every inch
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/radar/from_slides/image17.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The radar is moved along the tape measure every time a tone is heard
</div>

---

## Experiments: Finding the Limits of SAR

### Settings
* 
**Mode:** MTI 
* 
**Voltage Gain:** 20 
* 
**Bandwidth:** 300 MHz 
* 
**SAR Step Size:** 60 

---

### Experiment 1: Shadowing

**Question:** Will a large object prevent our radar from detecting a smaller object placed directly behind it? 

**Hypothesis:** A large plastic trash can will block the detection of Wilson because the trash can reflects most of the waves back to the radar. 

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/radar/from_slides/image31.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/radar/from_slides/image36.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The field where we ran the experiment 
</div>

---

<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/radar/from_slides/image26.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/radar/from_slides/image51.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/radar/from_slides/image29.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Empty field (control); just Wilson (control); Wilson & trash can 
</div>

---

### Experiment 2: Movement

**Question:** How does a moving object’s speed affect its appearance on a SAR image? 

**Hypothesis:** The faster a target moves, the weaker it will appear on a SAR image. 

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/radar/from_slides/image28.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/radar/from_slides/image24.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Our testing location
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/radar/from_slides/image33.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The perspective of the radar and the produced data
</div>

**Results:**

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/radar/from_slides/fastandslow.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Results with fast movement (left) and slow movement (right)
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/radar/from_slides/overlay.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The results layered with Google Earth data
</div>

---

### Experiment 3: Aerial Data

**Question:** Can we replicate aerial SAR data using our handheld radar? 

**Hypothesis:** We will be able to capture useable aerial SAR data using our radar. 

**Procedure:**

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/radar/from_slides/reflectorvisual.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The location we scanned without reflector and with reflector
</div>


<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/radar/from_slides/reflectordata.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Aerial SAR data collection results without reflector and with reflector
</div>

---

## Conclusion

* We demonstrated the ability of using SAR as a high-resolution 2D imaging method that overcomes traditional radar limitations. Using our small radar, we were able to create a larger synthetic aperture that captured much more detail.
* Strip Map and Spotlight Modes: We focused primarily on the Strip Map mode, using it to create maps that could be confirmed with visual inspection and satellite imagery.
* We determined that shadowing and blocking properties vary depending on an object’s density or metallic properties. It was possible to obscure objects behind more reflective objects, although our SAR had some ability to “see around” objects.
* Fast movement blurs the resulting image, creating smears and less useful data. Slower—or no—motion results in better clarity.
* Aerial data was best collected at an angle. Scanning from 45 degrees down from horizontal created data that had a better contrast between foreground objects and the environment compared to scanning top-down. It also reduced shadowing compared to collecting data from a horizontal viewpoint.


---

## Acknowledgements

A special thanks to:
* [Zac Chance](https://www.linkedin.com/in/zac-chance/)
* [Billy Maurer](https://www.linkedin.com/in/billy-maurer-5bbab5321/)
* Kate Dobson

and the [MIT Lincoln Laboratory](https://www.ll.mit.edu/outreach/llrise).
