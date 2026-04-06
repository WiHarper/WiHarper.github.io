---
layout: page
title: Live Rocket Telemetry and Logging in Two Weeks
description: creating a custom logging and telemetry system for my L1 certification rocket
img: assets/img/l1/thumb.png
importance: 50
category:
related publications: false
---

I had exactly two weeks to design and build a custom flight computer for my Level 1 high-power certification rocket. I wanted a custom RP2040-based flight computer transmitting telemetry data over LoRa, logging at 20 Hz to a μSD card, and updating a live 3D tracker in Google Earth. Here is how I went from cardboard prototypes to flying my avionics system in 14 days.

[**Skip to the launch**](https://wilsonharper.net/projects/avio/#launch)


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/l1/55149321512_7e03b56905_o(1).jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


---


## The _Prestige_ Inspiration

The two major U.S. rocket clubs--National Association of Rocketry and the Tripoli Rocketry Association--regulate the purchase of high-powered motors through a certification system. [Rice Eclipse](https://eclipse.rice.edu/) rocketry has a division that helps people get their Level 1 Certifications. 

Two weeks before my certification launch, I went to another Eclipse event--the launch of our _Prestige_ rocket. This dual-stage rocket had a simulated apogee of 9,000 feet. I've been part of the team designing the avionics bay for _Prestige_, and it was amazing to see our gear in action. Specifically, the booster and sustainer had several pieces of electronics each--a flight computer, GPS tracker, altimeter, and so on. 

I've long had an interest in NASA Mission Control. During the _Prestige_ launch, I realized just how much this passion for mission control carried over to high-powered rocketry. Seeing the telemetry systems come alive--and seeing the troubleshooting when they didn't--was a highlight of the day. I realized I wanted my own telemetry system for my L1.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        <video 
            controls 
            playsinline 
            class="img-fluid rounded z-depth-1">
            <source src="{{ '/assets/img/l1/Vid 20260301 180501.mp4' | relative_url }}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div> 
</div>


I'd like to thank [Brandon Shin](https://www.linkedin.com/in/brandon-shin-46b67020b/) for his contributions to the codebase, debugging, and overall help. I also want to give a shout-out to the Certification Leads [Ilina Goyal](https://www.linkedin.com/in/ilina-goyal/) and [Lavinia Barker](https://www.linkedin.com/in/lavinia-barker/) for supporting this project.
 
---

## System Architecture 

The first step was naturally making a list of goals for this flight computer. The most basic system would act as an altimeter, logging apogee. I knew I could go further than that, though. I also wanted to log this data over time and record GPS location/altitude, acceleration, and temperature. A μSD card makes sense for this quantity of information--in fact, my final `.csv` file was ~15 MB. This wouldn't fit on many MCU flash chips. The radio bandwidth was fairly low and updated at 1 Hz, but with an onboard μSD card, I expected to log at speeds around 20 Hz. 

The stretch goal was live data visualization on my laptop. For an L1 cert that doesn't fly all that high, it's certainly overkill. Still, getting such a system working would be great experience for when I eventually build my level 2 certification rocket. Also, it's just plain cool!

Notably, this flight computer does not handle separation charges and has no way to physically interact with the world. After several passive flights, I'd be interested in implementing charge deployment--with a commercial off-the-shelf backup, of course. The data my flight computer collects would be useful for running simulations to be sure the recovery system works safely. 

Let's make the goals clearer:
- Collect altitude and temperature data
- Collect GPS data
- Collect acceleration data

And:
- Log these data points to a black box onboard μSD card
- Send these data points to a laptop ground station

Let's do it!



<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/l1/IMG_5282.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


---

## Hardware Choices

Here's my bill of materials:

- [Feather RP2040 Adalogger](https://www.adafruit.com/product/5980)
    Choosing a microcontroller was the biggest decision. The Adafruit Feather line is a modular system with easy expansion. I chose the RP2040 version for its low power consumption and the reliability of the built-in SPI μSD card slot.
- [Adafruit BMP390](https://www.adafruit.com/product/4816)
     The BMP390 is a classic choice, and I found one lying around the [Rice Oshman Engineering Design Kitchen](https://oedk.rice.edu) for free. Its performance is good, it's lightweight and compact, and it supports SPI and I2C. The temperature sensor is built in. I used I2C for communication. 
- [Adafruit LSM6DSOX + LIS3MDL](https://www.adafruit.com/product/4517)
    An IMU combo. While I only used the LSM6DSOX accelerometer, I plan to enable the LIS3MDL magnetometer in the future for full 9-axis tracking. This board also uses I2C.
- [NEO-6MV2 GPS](https://www.amazon.com/gp/product/B0B31NRSD2)
     Adafruit's GPS is pricey, but any UART GPS unit works fine. This generic Amazon module is perfectly adequate, and the micro-USB plug makes configuration easy. The external antenna is also great. 
- [Missile Works Screw Switch](https://store2263081.ecwid.com/Screw-Switch-p38076724)
     Screw switches are common in high-powered rocketry because they are extremely unlikely to have issues under heavy vibration and acceleration. I'm grateful to [Wyatt Armstrong](https://www.linkedin.com/in/wyatt-armstrong/) for letting me borrow one from Eclipse Flight Control. With my wiring, the flight computer is actually enabled when the screw switch is in the disconnected position--more on this later. 
- [Adafruit RFM95W LoRa Transceiver](https://www.adafruit.com/product/3072)
     915 MHz radio was the obvious choice here. It's a standard in COTS flight computers; the other standard is 435 MHz. 435 MHz radio requires an amateur radio license, and while I do have one, using 915 MHz is just easier. Also, a 435 MHz quarter-wave antenna is naturally about twice the length of a 915 MHz antenna, so I like the compactness of this choice. It uses SPI. 
- [Adafruit Feather RP2040 with RFM95 LoRa](https://www.adafruit.com/product/5714)
    Used for the ground station. It features the same RFM95 radio as the rocket's module, and having the radio built directly onto the MCU board is convenient.
- N-Type 4-Hole Bulkhead and N-Type to uFL Cable
     I planned to make a custom 915 MHz ground plane antenna, and these parts are what individual solid-core wires attach to. Similar bulkheads will work fine. 
- 1000 mAh 3.7V LiPo
     I bought a generic unit off Amazon and it works fine. However, keep in mind the polarity--the JST connector on the battery was actually reversed from what the RP2040 Adalogger expects. It was a quick but crucial fix.


---

## Making the Rocket

Obviously, I needed to put this avionics system into a real rocket. And hey--wasn't the original goal just getting my L1 Cert? Let's talk about it. Aside from the avionics bay, my rocket is standard fare, so this section will be quick.

The first step was deciding the rocket's basic specifications. I immediately knew I wanted the internal space that two body tubes would provide. A body diameter of 2.6 inches provides enough space without lowering the apogee. I modeled it in OpenRocket and realized stability would be a challenge--not because it would be unstable, but because it'd be overstable. The stability margin depends on the center of gravity, the center of pressure, and the rocket's diameter. Ideally, the stability margin should be between ~1.3 and ~2, and a rocket with a stability margin over ~2.3 is considered overstable. My initial model had a stability margin of ~2.7.

Overstability increases the rocket's predisposition to weathercocking--pitching into the wind. My rocket model was overstable because the flight computer put so much mass toward the nose of the rocket. The solution? Move the flight computer as low as possible. Instead of using a typical coupler, I realized I'd need to create a system that combines the nose cone, upper body tube, and coupler into one solid unit.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/l1/opr1.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/l1/opr2.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

You can find the OpenRocket model [here](https://wilsonharper.net/assets/img/l1/L1 Cert with Avionics - Wide.ork). The rest of the design was simpler. The body tubes are heavy-duty cardboard, and the fins are laser-cut plywood. The nosecone is 3D-printed PLA. The rest is lots of epoxy.

<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260306_040314583.PORTRAIT.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260306_040254154.PORTRAIT.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

---

## CAD & Assembly

I wanted to get a sense of space in the real world before I dove into any CAD. Because I had just two weeks and the boards hadn't arrived yet, I used the next best thing--cardboard! I cut each piece to its actual size and assembled them on a "sled." This first design had surprising longevity. 

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/l1/PXL_20260302_140750474.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/l1/PXL_20260302_140805713.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

After that first design, I did some actual CAD. Big thanks to [Ian Hsieh](https://www.linkedin.com/in/ian-hsieh-b67457216/) for helping out. In terms of component placement, I knew the GPS antenna would need to be away from noisy or RF-opaque materials. Similarly, the 915 MHz LoRa antenna needed to be away from the two M5 threaded rods to avoid shielding and unpredictable reflections. The accelerometer/magnetometer also needed to be away from large metal objects and high-current wires. 


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/l1/cad1.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/l1/cad2.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Because I needed a clean way to slide the avionics bay in and out of the upper body tube, I decided to make it slide onto threaded rods that are directly attached to the nose cone. Additionally, the top of the nose cone slides onto the base where it is epoxied in place.

<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/cad4.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/cad5.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/cad6.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

You can see this in real life:

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260309_010125102.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Finally, I put all the components in the model to ensure everything was the right size. The tight timeline impacted how pretty the renders are and my ability to include things like the LoRa antenna, the screw switch, etc. in the CAD.


<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/cad7.PNG" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/cad8.PNG" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/cad9.PNG" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

---

## Wiring

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/L1 Avionics(5).gif" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


| Component            | Sensor/Module Pin | Feather RP2040 Pin | Function / Protocol        |
|----------------------|-------------------|--------------------|----------------------------|
| **BMP390 Barometer** | VIN               | 3.3V               | Power (3.3V)               |
|                      | GND               | GND                | Ground                     |
|                      | SCL               | SCL                | I2C Clock                  |
|                      | SDA               | SDA                | I2C Data                   |
| **LSM6DSOX IMU**     | VIN               | 3.3V               | Power (3.3V)               |
|                      | GND               | GND                | Ground                     |
|                      | SCL               | SCL                | I2C Clock                  |
|                      | SDA               | SDA                | I2C Data                   |
| **NEO-6MV2 GPS**     | VCC               | USB or 3.3V        | Power                      |
|                      | GND               | GND                | Ground                     |
|                      | TX                | RX (GPIO 1)        | UART Receive (Serial1)     |
|                      | RX                | TX (GPIO 0)        | UART Transmit (Serial1)    |
| **RFM95W LoRa**      | VIN               | 3.3V                 | Power (3.3V)               |
|                      | GND               | GND                | Ground                     |
|                      | SCK               | SCK                | SPI Clock                  |
|                      | MISO              | MI                 | SPI Master In              |
|                      | MOSI              | MO                 | SPI Master Out             |
|                      | CS                | 9                  | SPI Chip Select            |
|                      | RST               | 10                 | Hardware Reset             |
|                      | G0 (IRQ)          | 11                 | Interrupt Request          |
| **μSD Writer**       | CS                | 23                 | SPI Chip Select (Internal) |
| **Screw Switch**     | Terminal 1        | EN                 | Enable Pin                 |
|                      | Terminal 2        | GND                | Pull to GND to disable     |

---

Most of the wiring plan was straightforward. The only tricky part was making sure the μSD card slot and LoRa didn't have any issues both operating on SPI. The screw switch pulls EN to GND when closed, so its function is inverted from typical operation. 

I'll walk through the assembly process. I physically attached all the boards, working from the first layer to the last. Afterwards, I wired everything up, again from the bottom up.

Notice that the GPS antenna (tan plastic and metal) is at the very top to avoid shielding. The battery has its own section because it naturally doesn't have any attachment points. The screw switch protrudes a bit, but there was enough space for everything to slide in and out of the body tube.

<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260308_184617271.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260308_184625087.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260308_184638893.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Wiring took a bit longer. Here are some in-progress photos:

<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260314_030319848.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260309_010133867.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The 915 MHz antenna was a fun challenge. The math (using the same formula I used for my [ADS-B 1090 MHz antenna](https://wilsonharper.net/projects/adsb)) indicates an ideal length of ~80 mm. This is the vertical green wire you see here:

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260403_170608158.PORTRAIT.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

At the top of the radio, I've added a capacitor bridging the 3.3V and GND pads to reduce the possibility of a brownout.

I also ought to have a radial for the antenna, and the typical approach to that would be another 80 mm wire going up, parallel but opposite the green wire. There wasn't enough space to do that, so I had to route it around a few components without letting it get too close to the GPS antenna. I considered attaching it to one of the threaded rods to create a massive ground plane, but I thought there was a chance that would affect performance in unpredictable ways. It would also make assembly annoying. You can see the radial antenna here in black coming off a pad directly next to the green antenna. It routes to the other side of the sled.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/l1/PXL_20260403_170616673.PORTRAIT.ORIGINAL.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/l1/PXL_20260403_170624488.PORTRAIT.ORIGINAL.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

---

## Putting it Together

Because I wanted a structure that wasn't too reliant on the cardboard body tubes, I made a slightly overengineered system. 

##### Upper Body Tube Assembly

The basic idea with the upper body tube is that the avionics bay slides on rails attached to the nose cone, which then slides in the packing tube.



<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260319_124603149.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


First, the avionics sled slides onto two M5 threaded rods connected to the nose cone:


<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260319_124549839.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

It gets secured in place:

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260319_124539323.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The upper body tube slides over the entire assembly:


<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260319_124517896.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


This "half-coupler" slides into the upper body tube and is lightly held in place by the earlier M5 nuts.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260319_124440946.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Finally, the bulkhead is screwed in and the full upper body is done.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260319_124423608.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


##### Making a Livery

Painting the rocket and making custom decals was way more fun than I expected!

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/l1/PXL_20260313_015629277.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/l1/PXL_20260312_194248310.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

This was my first time using a Cricut. I don't love its software, but it's hard to argue with the results.

<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260314_061332973.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260314_061328479.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260314_061323425.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

---

## Ground Station

The ground station was a fun mini-project. I used the same design (and spare parts) from my 1090 MHz ground plane antenna I built for my [ADS-B feeder](https://wilsonharper.net/adsb). Each wire is just a few millimeters longer to account for the longer wavelength of the lower frequency 915 MHz LoRa. 


<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260404_193510239.PORTRAIT.ORIGINAL.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260404_193516821.PORTRAIT.ORIGINAL.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260404_193527628.PORTRAIT.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The microcontroller is another Adafruit Feather RP2040, this time with the radio built in. I already had the tripod from prior adventures with software-defined radio.

---

## The Software Stack

The software stack was split into three distinct environments: 
1. C++ running on the flight computer, responsible for logging and transmitting data.
2. C++ running on the ground station, responsible for receiving radio packets and giving them to my laptop.
3. Python running on my laptop, responsible for visualizing data in a GUI and logging backup data.

##### Flight Computer

The flight computer code consists of a big loop that:
- Reads sensor values at 20 Hz
- Stores sensor values to a `.csv` on the μSD card at 20 Hz
- Closes and reopens the `.csv` at 1 Hz
- Transmits sensor values over LoRa at 1 Hz

Rather than using a big loop with `delay()`, the flight computer uses `millis()` to handle those separate tasks at different frequencies. 

Every 50 ms, the RP2040 polls the BMP390 barometer, the LSM6DSOX accelerometer, and the GPS module. It constructs a comma-separated string containing mission time, absolute pressure altitude, GPS altitude, latitude, longitude, vertical velocity, temperature, and acceleration. This string is  written to the μSD card.

While logging happens 20 times a second, transmitting data that fast over LoRa would take too much bandwidth. At 1 Hz, the flight computer sends the most recent set of data as a `char` array. To save bandwidth further, this sent data includes only GPS latitude and longitude, barometric altitude, and satellite count. Additionally, the data on the μSD card is not safe until it is flushed--otherwise, it will disappear on power loss or disconnection. Calling `flush()` every so often is necessary to fully write the data. 


<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260403_170630205.PORTRAIT.ORIGINAL.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

While most of the components in my avionics bay use very little power, the μSD card and radio (transmitting at 20 dBm) take a bit more. I've offset flushing the μSD card and transmitting to avoid brownouts. This is also why I added the capacitor to the radio earlier! Specifically, the radio transmits on the second (e.g., 1000ms, 2000ms), while the SD card flushes to disk on the half-second (e.g., 1500ms, 2500ms).

I dealt with an issue for ages where the loop would hang after 5-30 minutes. A few things could cause this--a memory leak, an I2C issue, or many cosmic ray bit flips (/s). Because I was short on time, it was easier to implement a watchdog. `watchdog_enable(2000, 1)` starts a high-level timer that reboots the RP2040 after 2 seconds unless the watchdog is fed (yes, that's the actual term). In the main loop, `watchdog_update()` keeps the dog happy. While it's absolutely true that this is not an ideal solution, my code is lightweight enough that it reboots nearly instantly.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/hard_reboot.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    xkcd.com/1495
</div>

The BMP390 barometer has a known issue where its first reading upon startup is often wildly inaccurate. To fix this, `setup()` calls `bmp.performReading()` once and discards the result before the main loop. I initially implemented a calibration script that would take the average of the first 10 readings and mark that as ground level, but if the watchdog restarted in mid-air, the calibration would break. Instead, I just logged raw barometric data and calibrated it post-launch.

Standard GPS modules are limited to about Mach 1.6--the COCOM limit. While my rocket is subsonic, I learned that if I send a specific hex payload to the u-blox GPS, I can change the dynamic platform model and adjust the Kalman filters for high acceleration. It's probably not needed, but it's fun!

##### Ground Station

This code is much less complicated. The RP2040 constantly listens for LoRa packets. When data arrives, it prints it over the Serial port as a comma-separated string. It also appends signal strength to the end, following this format: `TELEMETRY,altitude,latitude,longitude,velocity,sats,rssi`.

##### Laptop GUI

I wanted my laptop to do three things with the data:
- Display numerical information
- Plot altitude over time
- Show the rocket in 3D in Google Earth

With the ground station printing strings over the COM port, I wanted a nicer way to visualize that data than just the serial monitor. Using the `tkinter` library, I made a simple dashboard to display information. It uses the first 10 telemetry packets to establish a ground level--and because this script never restarts, it doesn't have issues if the flight computer watchdog triggers. Using the Haversine formula, it calculates the distance between the launch pad and the rocket's GPS location. I used `Matplotlib` to graph altitude. It makes a pretty parabola!

My favorite part of the software stack is the live 3D tracking. I wanted to see the rocket fly in real time on Google Earth. To accomplish this, the Python script generates a Keyhole Markup Language file with the rocket's coordinates and altitude. Google Earth looks at this `.KML` file at 1 Hz and updates the location and altitude of a pin. For how cool it looks, the software side wasn't too bad.

Finally, the script saves a local `.csv` file in case there are any issues with the onboard μSD card.

---

## Launch

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/l1/PXL_20260314_170713052.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/l1/PXL_20260314_134159202.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

On March 14th, we drove out to Hearne, through Aggieland! The wind was mostly calm with occasional gusts. I packed in a CTI H135 motor and disconnected the screw switch. The ground station started receiving packets. I put the rocket on the pad. 

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260314_172841933.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

And then it sat on the pad for what felt like an hour. First, the igniter didn't ignite the motor--it likely wasn't in far enough. After that, a few prop planes that seemed to be ignoring Tripoli Houston's waiver caused more delays. I was biting my fingernails hoping the flight computer kept transmitting. It did. 

And then it launched.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        <video 
            controls 
            playsinline 
            class="img-fluid rounded z-depth-1">
            <source src="{{ '/assets/img/l1/img_1475.mov.mp4' | relative_url }}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div> 
</div>

Pretty cool, eh?

The live telemetry worked! It lost GPS lock for a bit during ascent, but I was able to monitor altitude and apogee in real time--I instantly knew the rocket hit 1680 feet!

Shortly after apogee, it lost contact and only retransmitted once during the rest of the descent. I don't know why--my guess is the shielding from the threaded rods plus the vertically-polarized antenna was just too much. Specifically, during apogee, the flight computer antenna pivots to be horizontal, no longer matching the vertically-polarized ground station antenna.

Using the logged data, I'm able to replay the flight in the mission control GUI:

<div class="row justify-content-sm-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        <video 
            controls 
            playsinline 
            class="img-fluid rounded z-depth-1">
            <source src="{{ '/assets/img/l1/2026-04-04 16-18-35 - Trim.mp4' | relative_url }}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div> 
</div>

When I recovered it, the flight computer was still flashing its LED, indicating all systems survived the launch and the landing just fine. I was thrilled!

---

## Data Analysis

When I took the μSD card out and plugged it into my computer, I was pleased to find ~15 MB of `.csv` data saved. Most of it is simply the rocket sitting on the launch pad. However, there are about 900 lines of flight data!

Most of it is what you might expect. Graphing altitude and time yields a parabola for ascent and linear decay after parachute deployment.

<div class="row justify-content-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/Altitude (m) and Time (s).png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Temperature slowly decreased--notice the zoomed-in vertical axis:

<div class="row justify-content-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/Temperature (C) and Time (s).png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The acceleration data is interesting:

<div class="row justify-content-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/Acceleration (ms^-2) and Time (s).png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

As it's sitting on the pad, it registers 9.5 m/s² of acceleration. This is pretty close to the expected value of 9.81 m/s². During powered ascent, Accel_Y seems to max out at 39.18 m/s². Dividing that by 9.81 m/s² yields almost exactly 4g. OpenRocket estimates a maximum acceleration of 128 m/s², or 13.1 Gs. Interesting! 

I've done some research and have learned that, by default, the accelerometer maxes out at ±4g, which perfectly matches its clipping behavior. I had hit the sensor's default ceiling! For future versions, I'll have to change that config and enable it to read up to ±16g.

After launch, we can see negative acceleration, indicating the rocket is coasting and losing velocity. After parachute deployment, the oscillations in the wind appear effectively random. I was hoping to be able to integrate over acceleration to get another estimate for apogee, but the maxed-out value during ascent makes that impossible. Next time!

---

## Conclusion

I feel strongly that this project has been a massive success. This two-week timeline was a serious sprint, and I'm a bit shocked I was able to pull it off. I learned a ton about LoRa and telemetry, robust programming, and integration in tight, harsh spaces. 

Still, I see clear ways to improve:
- Allow the accelerometer to register higher acceleration
- Figure out the comms loss after apogee
- Fix whatever bug required the watchdog
- Create a two-way link so I can enable or disable logging remotely

I've started work on my Level 2 Certification rocket and plan to launch soon. I'll integrate this same telemetry system. Because of the sled design, it's easy to make new bulkheads and slide this on the rails. Over the long-term, I plan to keep iterating on my design--maybe make it into a custom PCB or, once reliability is near-perfect, allow it to control black powder charges for parachute deployment. That's a project for another day.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/l1/PXL_20260314_155055065.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>