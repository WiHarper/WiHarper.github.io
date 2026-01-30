---
layout: page
title: DIY ADS-B Feeder and Antenna
description: from a dorm balcony in Houston's humidity
img: assets/img/adsb/thumb.png
importance: 70
category:
related publications: false
---

I built an ADS-B ground station to track aircraft 200 miles away from my dorm balcony, all on restricted university WiFi and in Houston's 100% humidity. My limited budget required some custom engineering--specifically, a spider antenna that increased my message rate by 100x over the stock dipole.


<div class="map-facade" id="mapContainer" onclick="loadMap()" role="button" tabindex="0" onkeydown="if(event.key === 'Enter') loadMap()">
    <img src="/assets/img/adsb/preview.png" alt="Live ADS-B Map Preview" class="map-placeholder">
    
    <div class="play-button">
        <span>Click for Live Map</span>
    </div>
</div>

<style>
    .map-facade {
        width: 100%;
        height: 50vh; 
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        border: 1px solid #e1e1e1;
        background-color: #f8f9fa; 
    }
    
    .map-placeholder {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease; 
    }

    .play-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px); 
        color: white;
        padding: 12px 24px;
        border-radius: 30px;
        font-weight: bold;
        transition: all 0.2s ease;
        pointer-events: none;
        border: 1px solid rgba(255,255,255,0.2);
    }

    .map-facade:hover .play-button {
        background: rgba(0, 0, 0, 0.85);
        transform: translate(-50%, -50%) scale(1.05);
    }
    .map-facade:hover .map-placeholder {
        transform: scale(1.02);
    }
</style>

<script>
    function loadMap() {
        var container = document.getElementById('mapContainer');
        
        container.style.cursor = 'wait';
        
        var iframe = document.createElement('iframe');
        iframe.setAttribute('loading', 'eager'); 
        iframe.src = "https://adsb.wilsonharper.net/?hidesidebar&temptrails=1000&centerReceiver&zoom=9&rangeRings=1&extendedlabels=1";
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.style.border = "none";
        iframe.title = "Live Air Traffic Map";
        
        container.innerHTML = ''; 
        container.appendChild(iframe);
        container.removeAttribute('onclick');
        container.removeAttribute('onkeydown');
        container.removeAttribute('role');
        container.removeAttribute('tabindex');
        container.style.cursor = 'default';
    }
</script>

<br>

You can view the live feed in its own tab [here](https://adsb.wilsonharper.net/?temptrails=1000&centerReceiver&zoom=9&rangeRings=1&extendedlabels=1).

## Motivation & Constraints

I've been wanting to feed data to ADS-B aggregators and get some experience with Raspberry Pis as always-on computers. Living in a dorm at Rice University presented an interesting set of constraints, though.

ADS-B is the system aircraft use to broadcast GPS, altitude, and speed. Aggregators like FlightRadar24 rely on volunteer feeders to collect this 1090 MHz data. I wanted to build a node for that network.

The basic idea is that a single-board computer and software-defined radio listen to 1090 MHz signals, decode them, and send them to aggregators over the internet. (A small minority of aircraft broadcast on 978 MHz, but catching those signals requires another SDR.)

As I decided on what parts to purchase, I kept a few factors in mind:

- The entire setup must be mounted high up. The Martel College fifth floor balcony was the clear choice.
- The feeder must communicate over WiFi. I could not run an ethernet cable to the balcony. Making things more tricky, the Rice network has client isolation, preventing peer-to-peer communications.
- Cooling and weatherproofing is a priority. Houston is hot, rainy, and humid. High temperatures and moisture can cause the Pi to throttle and the software-defined radio to pick up the wrong frequencies.
- I want it to be small, consume little power, and take up little space.

I also noticed that there were only a few examples online where design decisions were explained and documented, and I'd like to make this contribution to the corpus. I'd like to thank [Ian Hsieh](https://www.linkedin.com/in/ian-hsieh-b67457216) for his help.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/adsb/PXL_20260124_200845740.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Bill of Materials

With that in mind, here's my bill of materials:

- [A 2832U-based Software-defined Radio](https://www.amazon.com/RTL-SDR-Blog-RTL2832U-Software-Defined/dp/B0CD745394)  
    I went with the RTL-SDR Blog V4. It seems like the Blog V3 might have better range but more heat, so I'm happy with this decision.
- [Raspberry Pi Zero 2 W Kit](https://www.amazon.com/Raspberry-Pi-Zero-WH-Kit/dp/B0DRRDJKDV)  
    The Pi Zero 2 W is low power consumption, leading to less heat. It has WiFi and just one USB-OTG port--that's all I need! The kit came with a heatsink, and USB and HDMI adapters. 
- [CanaKit 5V 2.5A Micro USB Power Supply](https://www.amazon.com/CanaKit-Raspberry-Supply-Adapter-Listed/dp/B00MARDJZ4)  
    A high-quality power adapter is necessary for a project like this. The SDR draws quite a bit of power for a Pi Zero, and stability issues can impact reception. I would have liked a power supply that was explicitly weather resistant. The cable's ferrite core was also inconvenient. 
- [SanDisk High Endurance MicroSD Card - 32GB](https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-high-endurance-uhs-i-microsd?sku=SDSQQNR-032G-GN6IA)  
    Continuous operation is hard on SD cards. While the software is designed to avoid tons of writing, a high-quality card ought to help with longevity, especially in Houston's heat. 16GB would have been fine, but the 32GB SKU was only a few bucks more.  
- [1090 MHz Saw Filter](https://www.amazon.com/dp/B09RPKHQ6S)  
    This filter helps the SDR avoid drowning in environmental noise. By only allowing 1090 MHz frequencies to pass through , it improves the signal-to-noise ratio.

And a few more parts that can vary depending on price and installation details:

- Weather-resistant box  
    I went with [this one](https://www.amazon.com/dp/B0CZ2ZXRKS) from Amazon, and it ended up being about the right size.
- Copper wire
- N-type to SMA cable
- N-type 4-hole bulkhead  
    I made a custom spider-style antenna out of wire and a connector. A wide variety of connectors are often used, such as F-81L or SO-239. I went with an N-type for two reasons:
    1. It's fairly rugged and weatherproof.  
    2. It handles high frequency signals better.  

Rounding out the list, I used a PVC pipe for mounting, some wire crimp connectors, and miscellaneous fasteners, glue, etc. I also purchased conformal coating for the Pi, but I'm not sure it's needed.


## Build Process

I started by getting the box ready. My strategy to deal with heat was fairly straightforward, relying on convection. A small hole in the bottom and top of the box ought to let heat rise through the container. 


<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/PXL_20260124_163439190.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/PXL_20260124_172448052.PORTRAIT.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/PXL_20260124_200950880.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

I protected both holes with some mesh to keep insects out. The top hole has a PVC elbow connector to prevent water ingress. As Houston heats up, we'll see how effective this cooling design is. Clearly, I was not going for an absolutely airtight box. Still, the cable gland at the bottom keeps things tidy.








## Software

I flashed the Pi with [ADSB.im](https://adsb.im/home). This feeder image is fairly easy to set up and can simultaneously feed several aggregators. 



All the components were kind of shoved into the box. Wire length was an issue, but this works just fine.

Initial config on Rice WiFi was a challenge. ADSB.im is meant to run headlessly, and config is done via a localhost website. Because Rice's WiFi does not support peer-to-peer connections, I set it up by connecting both the Pi and my laptop to my phone's hotspot. Now, it runs on the Rice Visitor WiFi. At 2.4 GHz, the range is there but stability is not perfect; it loses connection occasionally. Still, its uptime is around 99.9%. That sounds great to me.

The Pi Zero 2 W struggles with many aggregators, and multilateration (a method to locate an aircraft even if it does not broadcast its location) tends to have issues. This was a compromise I was willing to make in order to have the Zero 2 W's low heat generation. Right now, I'm feeding data to:
- [ADSB.lol](https://adsb.lol/)
- [ADSB.fi](https://globe.adsb.fi/)
- [ADSBExchange](https://globe.adsbexchange.com/)
- [Flightradar24](https://www.flightradar24.com/)
- [FlightAware](https://www.flightaware.com/live/map)

ADS-B signals are decoded using [readsb](https://github.com/wiedehopf/readsb). The map interface is [tar1090](https://github.com/wiedehopf/tar1090), and the graphs are from [graph1090](https://github.com/wiedehopf/graphs1090).

I used [Tailscale](https://tailscale.com/) to remote into the Pi over Rice WiFi for config, SSH, and accessing the tar1090 map directly. I used a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) to enable public access and cache map tiles/interface data to reduce load on the Pi. Port forwarding on Rice WiFi is not possible, and I like Cloudflare's security.


## Antenna Construction

There are commercially-available 1090 MHz ADS-B antennas. As an electrical engineering student, though, it seemed worthwhile (and cheaper!) to build my own. There are a few designs out there, but most follow a similar pattern with a vertical whip and four radials at 45 degrees. 

I did some math to determine the right length for the whip and radials. To find the wavelength, we divide C by 1090 MHz, giving us a length of 0.275 meters. For a quarter-wave monopole, the resonant length is 0.275 meters divided by 4, giving 68.75 mm. In copper, the velocity factor is about 0.95. This means radio waves travel at about 0.95 C. This factor means the antenna wires should be just a bit shorter. Therefore, each wire is about 66 mm from tip to connection point. 


<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/PXL_20260124_175615330.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/PXL_20260124_181314546.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/PXL_20260124_182613898.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

If the four radials were flat, they would have an impedance of about 35 Ohms. By bending them to 45 degrees, their impedance is about 50 Ohms matching the 50 Ohm standard of the coax and SDR.

## Installation


I attached the antenna to a cable gland, which I then attached to a 5' PVC pipe. I mounted the box and pipe to the balcony's railing.

<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/PXL_20260124_200900324.PORTRAIT.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/PXL_20260124_200940822.PORTRAIT.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/PXL_20260124_201023922.PORTRAIT.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Because the Pi power cord has a large ferrite core toward the end, I didn't have as much slack inside the box as I would've liked. This limitation led me to make the excellent engineering decision of shoving everything inside. Ultimately, it works just fine. I could see better placement helping with heat dissipation; we'll see later if that's needed.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/PXL_20260124_201100311.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


## Performance

I initially tested the feeder with the stock 20 cm dipole on the first floor of a brick building. Performance was as poor, as expected, but it gave me a great baseline. ADS-B signals are mostly line-of-sight, and the dipole's length wasn't doing me any favors.

Later, I installed the antenna and relocated the feeder to a 5th-floor balcony. You can see this change happened Saturday at noon in the following graphs.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/dump1090-localhost-local_trailing_rate-7d.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Message rate is one of the most important measures of an ADS-B feeder's performance. It simply refers to how often the feeder "hears" a message sent from an aircraft. 

 With the old antenna and location, I was lucky to see over 5 messages per second. After relocating and upgrading the antenna, I saw as high as 700--over two orders of magnitude greater! I am writing this after the January 2026 North American winter storm, and it seems air traffic numbers are still returning to typical levels. 

<div class="row justify-content-sm-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/dump1090-localhost-aircraft-7d.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

I also like keeping track of the actual number of aircraft tracked. It's seen up to 132 at once, and it's clear that  air traffic volume follows daily patterns.


<div class="row justify-content-sm-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/dump1090-localhost-range-7d.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>



<div class="row justify-content-sm-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/dump1090-localhost-signal-7d.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

These two above graphs might be my favorite of the bunch because the difference between antennas/locations is so stark. Signal level has increased across the board. The strongest signals are as high as -1.5 dB, and the noise floor hasn't appreciably increased. This high value means the SDR may be clipping, and I plan to investigate that.


Range has also clearly skyrocketed, and I've been able to occasionally see aircraft past Austin!

<div class="row justify-content-sm-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/Screenshot 2026-01-26 153206.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Houston is still quite cold, but it's great to see the CPU stay under 50 degrees C. It's sitting around 50% memory utilization and 25% CPU utilization. The image takes up just 4 GB.

## Some Fun Data Analysis

Now that I've run the feeder for about a week, I have some data to play with! I especially enjoy the [heatmap view](https://adsb.wilsonharper.net/?heatmap). Each dot represents one received message. Colder-colored dots are at a higher altitude.

<div class="row justify-content-sm-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/Screenshot 2026-01-29 133638.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

This is too much information to view at once. Luckily, it's easy to filter. Let's start by looking at flights at certain altitudes. Under 350', we see mainly helicopters and airplanes landing at IAH, Hobby, Pearland, and a number of smaller airports I didn't even know about.


<div class="row justify-content-sm-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/Screenshot 2026-01-29 134430.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


Filtering for military aircraft reveals more than I expected. There are plenty of Cessnas, but I've also seen tons of NASA T-38s, a C-17, and an A-330 registered to the Royal Canadian Air Force.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/adsb/canada.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/adsb/Screenshot 2026-01-25 121350.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Displaying the Info

I recently found a 10.5" 1080p monitor for free in Rice's [OEKD](https://oedk.rice.edu/). I've been looking for a project to use it in, and this was the perfect chance. I hooked up a Raspberry Pi 4 running Chromium in Kiosk Mode, wrote a few autostart scripts, and now Rice Flight has a live view of nearby aircraft! It restarts every night and reloads the website every three hours. It also auto-selects the nearest aircraft and displays a picture if available.


<div class="row justify-content-sm-center">
    <div class="col-sm-9 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/adsb/PXL_20260129_051649964.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


## Historical Performance Data

You can find historical data [here](https://adsb.wilsonharper.net/graphs1090/).
