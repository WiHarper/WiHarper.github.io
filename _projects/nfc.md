---
layout: page
title: An Open-Source Active PCB Business Card Powered by NFC
description: using NFC energy harvesting to power an 8-bit MCU and 21 animated LEDs from a smartphone tap
img: assets/img/nfc/thumb.png
importance: 45
category:
related publications: false
published: false
---



## Project Goals

This project started about three months ago. I was learning KiCad and wanted an easy project to make before I jumped into more complex 4-layer designs with more complicated microcontrollers. I think that would have been easier, in some ways.

This final product taught me more about every aspect of the PCB process than I could have expected, but the result is also way better than I could have expected.

I've seen all sorts of business cards done on PCBs. [Most that I've seen](https://salvagedcircuitry.com/pcb-business-card.html) use the silkscreen and maybe copper to include contact details and a QR code. These are really cool! But they're more like graphic design than electrical engineering in some ways. [Others](https://mrdrprofbolt.wordpress.com/2020/04/16/an-electronic-business-card/) include more complicated features like displays, batteries, and inputs -- super cool, but more expensive and thick.

I wanted to make something that showed electrical engineering abilities but was simple and cheap enough to be able to give to people. Eventually, I stumbled upon [NFC business cards](https://www.instructables.com/PCB-Business-Card-With-NFC/). This seemed perfect: no battery required, some basic RF engineering, and a cheap BoM.

Once I started looking into specific NFC chips, I realized a few have the ability to harvest NFC energy -- most notably, the NXP NTAG I2C Plus and the STMicro ST25DV-KC. 

It's worth explaining how NFC works: Your phone continuously emits a small magnetic field. An NFC card picks up on that field, making your phone act like a tiny wireless charger. The card never actually transmits a message to your phone; instead, it changes how much energy it absorbs from the field, and your phone detects those power dips and converts them to binary data. Most NFC tags use this harvested energy only to run their internal memory, but some NFC chips are able to take excess DC voltage and route it out to external hardware. This business card uses that last feature.

The theory behind it didn't seem that complicated to me. I quickly made a schematic in KiCad. I chose the STMicro chip because I thought its datasheet seemed friendlier. The ATtiny412 microchip was also an easy choice with its compact size, sufficient GPIOs, and very low power requirements. 

//schematic picture here

The LEDs are connected using a technique called [Charlieplexing](https://en.wikipedia.org/wiki/Charlieplexing), exploiting the face that LEDs are, of course, diodes. The Wikipedia article is a great guide to it, but the key is that tri-state logic can be used to have a few GPIOs control many LEDs. Specifically, the formula is: y = x*(x-1) where y is the number of LEDs that can be independently controlled and x is the number of GPIOs. The primary downside is that only one LED can be lit at a time, but that can be mitigated by using PWM and spreading duty cycles across multiple LEDs.

For this first draft, I used 4 GPIOs to control 12 LEDs.

// charlieplexing picture here

I went ahead and routed the PCB, using STM's antenna inductance tool and a KiPython script.








---

## System Architecture

---

## Hardware Choices & Bill of Materials

---

## Circuit Math & Hardware Engineering

### Antenna Physics & Resonance Calculation

As I was reading through the NTAG I2C Plus datasheet, I noticed it specified that there shouldn't be more than 220 nF of capacitance on `VOUT` because a larger capacitor would cause the voltage rail to drop, creating an oscillating loop that could never power on. I wanted more than 220 nF, though, so I made this circuit:

// power cap mosfet

The large 10 uF capacitor at the bottom helps smooth out VCC, but it would draw too much current at startup. R3 limits inrush current to just a few mA. Once the capacitor is charged, though, R3 would slow the capacitor down too much. The MOSFET, Q1, acts as a switch. After 120 ms, C3 is fully charged, the MCU pulls `GATE` low, giving the capacitor a low-impedance path to smooth voltage drops. R2 is just a pull-up resistor to keep `GATE` high for the first 120 ms. This creates a circuit with the benefits of a large capacitor without ignoring the datasheet.

### Charlieplexing Loop Current Math

---

## PCB Layout & RF Isolation Design

## The C-Shape Ribbon Bus Topology

I routed, deleted, and rerouted the traces for the LEDs around six times. I settled on this design. While it is possible to route the traces in a way that results in a shorter average length, I wanted to avoid creating a full loop--and I also wanted to minimize loop area. With a loop, the traces would couple with the NFC field and create destructive Foucault currents. By leaving that gap in the middle of the top, no currents are able to form.

---

## PCB Industrial Design & Aesthetics

### Layout Strategy



I thought it'd be aesthetically pleasing to keep all ICs and passive components to the left third of the PCB. 

### Back Layout Strategy

---

## Fabrication and Assembly

The cards are the same dimensions as a credit card, and I paid a bit extra to make them just as thin. I also opted for high-precision silkscreen printing and an ENIG finish. With that last choice, the cards are fully RoHS-compliant--no lead or other hazardous substances.


When I went to purchase, I had to make a decision: Should I order just a few to see if they work, or should I commit all the way?

Because I'm away from Rice University this summer, I didn't have a way to assemble PCBs, so I'd have to have JLCPCB assemble them for me. Also, if I planned on giving these to people, I didn't want any lead, and I don't have access to a fully lead-free electronics workspace even at Rice.

After hours in JLCPCB's quoting tool, I realized the marginal cost of each additional card was tiny, and the difference between purchasing two and thirty wasn't huge. I bit the bullet and crossed my fingers and ordered thirty.


---

## Programming

//using pogo pin clip

The ATtiny816 is programmed over UPDI--Unified Program and Debug Interface. It's similar to UART but in a single-wire format. There are official debuggers, and USB-to-serial adapters can work too. People have also used Arduinos and RPi Picos as programmers, and that last option sounded like the most fun. The majority of Arduinos that support the jtag2updi firmware have 5V logic levels, so I had to go with a Pico. I found a `UF2` file, wired everything up, and... nothing happened. I spent hours working through IDE settings and trying different pins. Finally, I had the bright idea to hook up its output to an oscilloscope. Nothing was happening. I felt very silly and decided to just order the [Adafruit UPDI Friend](https://www.adafruit.com/product/5879). It worked instantly.

The code itself is similar in some ways to a basic blinking Arduino sketch. However, I wrote the main loop in bare-metal C so the Charlieplexed matrix could loop as fast as possible, keeping flicker to a minimum. 

---

## Lessons Learned

---

