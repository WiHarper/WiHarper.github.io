---
layout: page
title: Open-Source Active PCB Business Card Powered by NFC
description: using RF to power an MCU and 21 animated LEDs from a smartphone
img: assets/img/nfc/thumb.jpg
importance: 45
category:
related publications: false
published: true
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nfc/hero.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


## Project Goals 

This project started about three months ago. I was learning KiCad and wanted an easy project to make before I jumped into complex 4-layer designs with more complicated microcontrollers. I think that would have been easier, in some ways. This final product taught me more about every aspect of the PCB process than I could have expected, but the result is also way better than I could have expected. I also think it's the first of its kind.


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        <video 
            controls 
            playsinline 
            class="img-fluid rounded z-depth-1">
            <source src="{{ '/assets/img/nfc/nfc2.mov' | relative_url }}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div> 
</div>



I've seen all sorts of business cards done on PCBs. [Most that I've seen](https://salvagedcircuitry.com/pcb-business-card.html) use the silkscreen and maybe copper to include contact details and a QR code. These are really cool--but they're more about graphic design than electrical engineering. [Others](https://mrdrprofbolt.wordpress.com/2020/04/16/an-electronic-business-card/) include more complicated features like displays, batteries, and inputs -- super cool, but more expensive and thick.

I wanted to make something that showed electrical engineering abilities but was simple and cheap enough to be able to give to people. Eventually, I stumbled upon [NFC business cards](https://www.instructables.com/PCB-Business-Card-With-NFC/). This seemed perfect: no battery required, some basic RF engineering, and a cheap BoM.

Once I started looking into specific NFC chips, I realized a few have the ability to harvest NFC energy -- most notably, the NXP NTAG I2C Plus and the STMicro ST25DV-KC. 

It's worth explaining how NFC works: Your phone continuously emits a small magnetic field. An NFC card picks up on that field, making your phone act like a tiny wireless charger. The card never actually transmits a message to your phone; instead, it changes how much energy it absorbs from the field, and your phone detects those power dips and converts them to binary data. Most NFC tags use this harvested energy only to run their internal memory, but some NFC chips are able to take excess DC voltage and route it out to external hardware. This business card uses that last feature.

The theory behind it didn't seem that complicated to me. I quickly made a schematic in KiCad. I chose the STMicro chip because I thought its datasheet seemed friendlier. The ATtiny412 microchip was also an easy choice with its compact size, sufficient GPIOs, and very low power requirements. 


<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/nfc/sch1.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


The LEDs are connected using a technique called [Charlieplexing](https://en.wikipedia.org/wiki/Charlieplexing), exploiting the face that LEDs are, of course, diodes. The Wikipedia article is a great guide to it, but the key is that tri-state logic can be used to have a few GPIOs control many LEDs. Specifically, the formula is: y = x*(x-1) where y is the number of LEDs that can be independently controlled and x is the number of GPIOs. The primary downside is that only one LED can be lit at a time, but that can be mitigated by using PWM and spreading duty cycles across multiple LEDs. For this first draft, I used 4 GPIOs to control 12 LEDs.




---

## System Architecture

While I initially choose an ATtiny412 MCU, I realized it was suboptimal for a few reasons. It only has 5 GPIOs and comes only in packages with leads.

Because I was away from Rice University this summer, I didn't have a way to assemble PCBs, so I'd have to have JLCPCB assemble them for me. Also, if I planned on giving these to people, I didn't want any lead in them, and I don't have access to a fully lead-free electronics workspace even at Rice. JLCPCB supports full RoHS compliance. 

With these constraints, there was no reason not to go with a QFN package, which the ATtiny412 does not have. After some research, I found the ATtiny816. It's similar to the ATtiny412 but with 17 GPIOs and a much thinner 3x3mm VQFN package. This choice allowed me to move to 20 Charlieplexed LEDs and a simple indicator LED that goes to `GND`. 

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/nfc/new_sch.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

---

## Hardware Choices & Bill of Materials



<div class="row justify-content-sm-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        <iframe 
            src="https://wilsonharper.net/assets/html/ibom.html" 
            style="width: 100%; height: 800px; border: none;"
            title="Interactive Bill of Materials">
        </iframe>
    </div>
</div>

View full details *[here](https://wilsonharper.net/assets/html/ibom.html)*.

---


### Antenna Physics & Resonance Calculation

As I was reading through the NTAG I2C Plus datasheet, I noticed it specified that there shouldn't be more than 220 nF of capacitance on `VOUT` because a larger capacitor would cause the voltage rail to drop, creating an oscillating loop that could never power on. I wanted more than 220 nF, though, so I made this circuit:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nfc/cap.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


The large 10 uF capacitor at the bottom helps smooth out VCC, but it would draw too much current at startup. R3 limits inrush current to just a few mA. Once the capacitor is charged, though, R3 would slow the capacitor down too much. The MOSFET, Q1, acts as a switch. After 120 ms, C3 is fully charged, the MCU pulls `GATE` low, giving the capacitor a low-impedance path to smooth voltage drops. R2 is just a pull-up resistor to keep `GATE` high for the first 120 ms. This creates a circuit with the benefits of a large capacitor without ignoring the datasheet.

### Charlieplexing Loop Current Math

I decided to use 100-Ohm resistors on each of the Charlieplexed traces. The total resistance is effectively doubled because current must flow out of one GPIO, through the resistor, through the LED, and through another resistor-GPIO pair. I also realized that if 100-Ohm resistors allowed too much current, I could PWM the LEDs at a high frequency. With the 10uF capacitor, these pulses would smooth to a steady current, preventing `VOUT` from collapsing.  

---

## PCB Layout & RF Isolation Design


I determined the dimensions and properties of the antenna using STM's [antenna inductance tool](https://eds.st.com/antenna/#/). I wanted the antenna to take up the full space of the card, so I just played around with turn count, trace width, and trace spacing until I found a combination that worked well. I needed the inductance to be close to 2.75µH. This worked:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nfc/st.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Because this inductance is a bit lower, it gives me the ability to tune it up or down. If it was exactly 2.75µH already, I could add a capacitor in parallel to increase the inductance--but there'd be no way to decrease the inductance! 

I went ahead and routed the PCB. I was surprised that KiCad doesn't offer a built-in antenna or coil generation tool, and all plug-ins I tried were not capable of a rectangular spiral. A KiPython script was the answer. An LLM helped create the script, and it was working after a few minutes of conversation. It generates a simple rectangular-spiral trace that matched the numbers I put into the SMT calculator. I've included the `.py` file [in the repo](https://github.com/WiHarper/nfc_card/blob/main/coil.py), and I could see it being genuinely useful to folks. Afterward, I rounded the corners by hand--this modification changed the enclosed area by no more than a few percent.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nfc/antenna.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


---

## PCB Industrial Design & Aesthetics



### Layout Strategy

I thought it'd be aesthetically pleasing to keep all ICs and passive components to the left third of the PCB. 


I routed, deleted, and rerouted the traces for the LEDs about six times. I settled on this design. While it is possible to route the traces in a way that results in a shorter average trace length, I wanted to avoid creating a full loop--and I also wanted to minimize loop area. With a full loop, the traces would couple with the NFC field and create destructive Foucault currents. By leaving that gap in the top middle of the loop, no currents are able to form, so the antenna remains unaffected by macro-scale RF interference. 


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nfc/ctrace.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


Net colors made it easier to understand which trace goes where. The ribbon topology does still create enclosed current between each trace. Keeping spacing and width minimal helped.

### Back Layout Strategy

I decided to show all traces on the back of the card. I also created a simple block diagram and IC BoM. To copy the traces to the `B.Silkscreen` layer, I plotted `F.Cu` and `B.Cu` as `.SVGs` and imported them onto `B.Silkscreen`, aligning them by eye. The routing is unusual in many ways, and I am sure a seasoned electrical engineer would notice changes worth making. I'm sure more than one person is reading this and thinking *Why didn't he use a ground plane?* A ground plane would prevent all flux through the antenna, killing it. With my goals of minimizing enclosed current and creating an interesting and pleasing aesthetic, I think the end result is solid. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nfc/back.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>


---

## Fabrication and Assembly

The cards are the same dimensions as a credit card, and I paid a bit extra to make them just as thin. I also opted for high-precision silkscreen printing and an ENIG finish. With that last choice, the cards are fully RoHS-compliant--no lead or other hazardous substances.


When I went to purchase, I had to make a decision: Should I order just a few to see if they work, or should I commit all the way? After hours in JLCPCB's quoting tool, I realized the marginal cost of each additional card was tiny, and the difference between purchasing five and thirty wasn't huge. I bit the bullet, crossed my fingers, and ordered thirty.

When it first arrived, I started by testing if it could even harvest power. I hooked up an LED across `VCC` and `GND`... and it worked! Of course, it's hard to take a picture of the card while it's against the back of the phone.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nfc/PXL_20260720_232537413.jpgg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>



---


## Programming



I have three small exposed pads on the back: `GND`, `VCC`, and `UPDI`. This order--similar to RC servos--prevents any damage if the connection is rotated 180 degrees. Each pad is 1.8mm in diameter with a center-to-center distance of 0.1"/0.254mm. This standard breadboard distance allows me to use the a [Pogo Pin Clip](https://www.adafruit.com/product/5434) to connect to it without adding another component. Because business cards are handled roughly and thrown in static-y wallets and pockets, I added a TVS diode bridging `UPDI` and `GND` so any high voltage flows straight into ground instead of frying the MCU.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nfc/PXL_20260720_232539684.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nfc/pads.png" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>



The ATtiny816 is programmed over UPDI--Unified Program and Debug Interface. It's similar to UART but in a single-wire format. There are official debuggers, and USB-to-serial adapters can work too. People have also used Arduinos and RPi Picos as programmers, and that last option sounded like the most fun. The majority of Arduinos that support the jtag2updi firmware have 5V logic levels, so I had to go with a Pico. I found a `UF2` file, wired everything up, and... nothing happened. I spent hours working through IDE settings and trying different pins. Finally, I had the bright idea to hook up its output to an oscilloscope. Nothing happened. I felt very silly and decided to order the [Adafruit UPDI Friend](https://www.adafruit.com/product/5879). It worked instantly.

The [code itself](https://github.com/WiHarper/nfc_card/blob/main/nfc_card.ino) is similar in some ways to a basic blinking Arduino sketch. However, I wrote the main loop in bare-metal C so the Charlieplexed matrix could loop as fast as possible, keeping flicker to a minimum. 

The NTAG I2C Plus is ironically not connected to the ATtiny through I2C. To program it, I initially used the well-known [NFC Tools](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc&hl=en_US) Android app. After some errors, I realized the [NXP TagWriter](https://play.google.com/store/search?q=nxp+tagwriter&c=apps&hl=en_US) app worked much better to format and write my contact info to the card.

The QR code and NFC link both direct devices to [connect.wilsonharper.net](connect.wilsonharper.net). Currently, that just redirects to [wilsonharper.net](wilsonharper.net), but I can configure it in Cloudflare to route to any URL.  

## Lessons Learned

The thirty cards I have now ought to last a while. Once I do run out, though, I plan to make a V2. `VOUT` stays at a high enough voltage to power any color of LEDs, and green or yellow would be interesting. I'm also considering adding a thin button or two for interactivity, and there are several arcade-style games I could make with a ring of LEDs. 

"Hardware is hard" is a phrase I've heard frequently, and this project made me realize how true it is. Individually, nothing in this project is novel or even that complicated: NFC PCB antennas, blinky LEDs with an MCU, and PCB business cards have all been done before. As far as I can tell, though, no one has combined them into one aesthetically-pleasing package. There were moments where I felt sure this was beyond my capabilities. After triple-checking every possible issue, I realized I just had to send it, and I'm so glad I did.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nfc/hero2.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
