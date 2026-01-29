---
layout: page
title: Position-Holding UAV
description: featuring optical flow, LiDAR, and a gripper
img: assets/img/uav_images/PXL_20250402_002400514.PORTRAIT.jpg
importance: 80
category:
related publications: false
---



<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/uav_images/PXL_20250402_002400514.PORTRAIT.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The assembled UAV
</div>

This UAV was built to compete in the Technology Student Association UAV Challenge. It was built and iterated over the span of three years.

It is capable of holding position in GPS-denied environments using optical flow and LiDAR. It was designed with a modular 3D-printed airframe and servo-actuated gripper to move payloads. It implements EKF sensor fusion, remote telemetry, and power distribution systems.


---

<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/uav_images/cad/cad3.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/uav_images/cad/cad1.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/uav_images/cad/cad2.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The initial CAD
</div>


---

## **Photo Log** {#photo-log}

| | |
| :--- | :--- |
| <img src="/assets/img/uav_images/image11.jpg" width="175" class="img-zoomable"> | M3 inserts are set into the 3D printed middle plate. The inserts ensure that the PLA can’t strip. |
| :---: | :---- |
| <img src="/assets/img/uav_images/image21.jpg" width="175" class="img-zoomable"> | We used carbon fiber arms instead of 3D printed plastic arms. This change allowed us to customize and expand our frame while retaining the rigidity and durability of a traditional full carbon fiber frame. |
| <img src="/assets/img/uav_images/image7.jpg" width="175" class="img-zoomable"> | 3D printed landing gear are attached to each arm. These were used for initial assembly and testing and will later be swapped for more durable landing gear with metal inserts. |
| <img src="/assets/img/uav_images/image2.jpg" width="175" class="img-zoomable"> | The bottom plate was also 3D printed for expandability. M3 standoffs were added to the edge for later construction. |
| <img src="/assets/img/uav_images/image14.jpg" width="175" class="img-zoomable"> | Components start to get screwed together. |
| <img src="/assets/img/uav_images/image29.jpg" width="175" class="img-zoomable"> | The arms are mounted to the bottom plate. The center brace is also made of carbon fiber for better horizontal rigidity. |
| <img src="/assets/img/uav_images/image4.jpg" width="175" class="img-zoomable"> | The top plate is attached to the chassis. The four protruding screws in the center are where we will mount the flight controller (FC) and electronic speed controller (ESC). |
| <img src="/assets/img/uav_images/image18.jpg" width="175" class="img-zoomable"> | The motors are soldered to the ESC. The XT60 LiPo connector and a capacitor are soldered to the ESC. The capacitor smooths voltage spikes to prevent brownouts and dirty power for the FC. |
| <img src="/assets/img/uav_images/image5.jpg" width="175" class="img-zoomable"> | The ESC is attached to the top plate. The motors are attached to the arms. |
| <img src="/assets/img/uav_images/image23.jpg" width="175" class="img-zoomable"> | Each arm has four screw holes on the end. Two are for the motors and two are for the landing gear. The M3 spacers between the motor and the arm allow this to happen. |
| <img src="/assets/img/uav_images/image13.jpg" width="175" class="img-zoomable"> | M3 space standoffs are added to the chassis plates. Later, the top plate will be attached to these standoffs. |
| <img src="/assets/img/uav_images/image12.jpg" width="175" class="img-zoomable"> | The combined barometer and magnetometer, or compass, is plugged into a custom-soldered wiring harness. |
| <img src="/assets/img/uav_images/image16.jpg" width="175" class="img-zoomable"> | The XM+ receiver is placed in a 3D printed mount and has wires soldered onto it. |
| <img src="/assets/img/uav_images/image19.jpg" width="175" class="img-zoomable"> | The RDQ Mach 3 video transmitter (VTX) has wires soldered onto it. |
| <img src="/assets/img/uav_images/image39.jpg" width="175" class="img-zoomable"> | Wires are soldered onto the combined LiDAR/optical flow sensor. We are only using the optical flow function because the built-in LiDAR sensor doesn’t have a long enough range. |
| <img src="/assets/img/uav_images/image33.jpg" width="175" class="img-zoomable"> | The telemetry radio is plugged into a custom-soldered wiring harness. This radio allows wireless configuration of the quadcopter, as well as the ability to see telemetry data in real time. |
| <img src="/assets/img/uav_images/image15.jpg" width="175" class="img-zoomable"> | The telemetry radio and receiver are attached to the bottom plate of the chassis using a zip tie. |
| <img src="/assets/img/uav_images/image28.jpg" width="175" class="img-zoomable"> | The power module is attached. This module provides clean power at a standard voltage for the Pixhawk. |
| <img src="/assets/img/uav_images/image35.jpg" width="175" class="img-zoomable"> | The LiDAR/optical flow sensor is attached to the underside of the bottom frame. |
| <img src="/assets/img/uav_images/image26.jpg" width="175" class="img-zoomable"> | The custom 3D printed mounting plate for the Pixhawk flight controller is attached to the ESC. With velcro attached, the Pixhawk will hook in place for simple removal. |
| <img src="/assets/img/uav_images/image22.jpg" width="175" class="img-zoomable"> | The camera is attached to a mount that we will then attach to the quadcopter. |
| <img src="/assets/img/uav_images/image17.jpg" width="175" class="img-zoomable"> | The wiring system for the video transmitter, camera, and servo motor is soldered up. See more details in the wiring diagram. |
| <img src="/assets/img/uav_images/image1.jpg" width="175" class="img-zoomable"> | The camera and its mount are attached to the middle chassis plate. |
| <img src="/assets/img/uav_images/image38.jpg" width="175" class="img-zoomable"> | The magnetometer/barometer is attached to the top chassis plate. It has been attached far away from large metallic objects and from battery/motor cables to prevent electrical interference. |
| <img src="/assets/img/uav_images/image3.jpg" width="175" class="img-zoomable"> | The external, more powerful LiDAR sensor is attached to the bottom of the quadcopter. |
| <img src="/assets/img/uav_images/image40.jpg" width="175" class="img-zoomable"> | The Pixhawk is attached to the Pixhawk mount. Cardboard between the mount and the Pixhawk dampen vibrations. |
| <img src="/assets/img/uav_images/image8.jpg" width="175" class="img-zoomable"> | The VTX is zip-tied in place to the top chassis plate. |
| <img src="/assets/img/uav_images/image36.jpg" width="175" class="img-zoomable"> | Propeller guards are attached to the arms. |
| <img src="/assets/img/uav_images/image27.jpg" width="175" class="img-zoomable"> | The propellers are attached to the motors. |
| <img src="/assets/img/uav_images/image25.jpg" width="175" class="img-zoomable"> | We made this new version of the landing gear  with metal inserts and screws throughout, improving durability. |
| <img src="/assets/img/uav_images/image6.jpg" width="175" class="img-zoomable"> | Typical servos are limited to a total of about 180 degrees. Continuous rotation servos exist, but many are too weak for our use. To overcome this, we have modified a standard servo to convert it to continuous rotation. First, the servo is opened. |
| <img src="/assets/img/uav_images/image30.jpg" width="175" class="img-zoomable"> | The servo is typically limited by the small light-gray pin. In the photograph, you can see that we have ground it down with a dremel to remove the limit. Additionally, we have ground down the potentiometer and glued it in place. |
| <img src="/assets/img/uav_images/image20.jpg" width="175" class="img-zoomable"> | The modified servo is attached to the gripper base, and a gear is attached to the servo spline.  |
| <img src="/assets/img/uav_images/image31.jpg" width="175" class="img-zoomable"> | Throughout the gripper’s construction, it is lubricated with candle wax for smooth operation. |
| <img src="/assets/img/uav_images/image9.jpg" width="175" class="img-zoomable"> | The second half of the gripper and the rack is attached. |
| <img src="/assets/img/uav_images/image34.jpg" width="175" class="img-zoomable"> | The gripper assembly is attached to the middle plate of the quadcopter. Washers and nuts keep it in place. |
| <img src="/assets/img/uav_images/image37.jpg" width="175" class="img-zoomable"> | The top plate is attached. The orange part on top of the plate is to prevent the battery from becoming punctured by the screws that go through the top plate.   |
| :--- | :--- |

---

## **Wiring Schematic** {#wiring-schematic}

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/uav_images/wiring_diagram.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>

---

## **ArduPilot** {#ardupilot}

ArduPilot is an open-source piece of software that is used for flight control and autonomous navigation. This software runs on the Pixhawk. Our ArduPilot setup used a number of sensors for flight operations:

* Accelerometers, gyroscopes, and compasses: to understand its acceleration, speed, and changes in angle in a 3-dimensional space. These were built into the Pixhawk and did not have to be configured. One external compass was connected over I2C to keep it away from high-current, electromagnetically-noisy battery lines. All of those sensors were calibrated in Mission Planner for accuracy.  
* LiDAR: to measure altitude from the ground. This sensor is placed facing down and times how long a beam of light takes to bounce off of the ground to measure the quadcopter’s height. This allows for accurate altitude control, enhancing control. The LiDAR sensor is connected over UART to the TELEM 2 port and configured in Mission Planner.  
* Barometer: to measure air pressure to find altitude; is a backup to the LiDAR. However, the LiDAR is more accurate and is unaffected by propeller wash, unlike the barometer. If the LiDAR and barometer measure dramatically different altitudes, ArduPilot uses other sensors to determine which is most accurate. The barometer is built into the I2C compass module.  
* Optical flow: to measure movement, essentially a camera pointed at the ground—like a computer mouse sensor. Our goal is to enable position holding—i.e. the ability to remove all controller inputs and have the quadcopter hover, motionless. This task requires precise location measurements, and accelerometers are not accurate on their own to accomplish this—they tend to drift. A GPS receiver would usually be required for position holding, but GPS does not work indoors. However, an optical flow sensor is, of course, able to operate inside and is capable of enabling position holding, increasing the quadcopter’s stability. The sensor is connected over UART to the SERIAL 4 port and configured and calibrated in Mission Planner.

There were two popular alternatives to ArduPilot that we considered and dismissed: BetaFlight and iNav. Betaflight is intended for racing drones, and, as such, it lacks the ability to use optical flow or LiDAR sensors and cannot hold altitude, much less position. On the other hand, iNav seemed very promising: It is very easy to configure, and the quadcopter flew well without tuning. However, iNav is less powerful and less configurable than ArduPilot. For example, it is impossible to take off in Position Hold mode in iNav. Instead, the pilot must take off in Altitude Hold mode and switch to Position Hold mode in the air, which is not a limitation in ArduPilot. This limitation creates a few hazardous seconds where the pilot is not fully in control. Additionally, iNav has worse hardware compatibility than ArduPilot. Therefore, ArduPilot was the best option for our quadcopter.

Still, Ardupilot led to some challenges. There were strong oscillations in-flight, and completing pre-arm checks was difficult. Oscillations were solved by turning down PID loop sensitivity, making the drone feel “floaty” but led to a controlled flight. ArduPilot normally looks for GPS, battery sensors, and more before allowing the pilot to arm. We disabled those checks because we are flying in a close space where those features are unnecessary. Finally, configuring all sensors took time but was doable with help from our resources. 

---

<div class="row mt-5">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/uav_images/other_images/PXL_20230115_233634620.PORTRAIT.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/uav_images/other_images/PXL_20230119_003632201.PORTRAIT.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/uav_images/other_images/PXL_20230312_235735093.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Older verions
</div>

---

## **Mission Planner** {#mission-planner}

Ardupilot is configured through the use of parameters—hundreds of values that refer to specific settings. To configure something specific in ArduPilot, the user must edit one of those parameters. To tell ArduPilot that our optical flow sensor uses the MSP communications protocol, for example, we must set the RNGFND1\_TYPE parameter to the value of 32, which internally represents MSP. This is where Ground Control Station—or GCS—software comes in. This software allows the user to easily change parameters in a human-readable format. Furthermore, many GCS software choices let the pilot view live telemetry data, access flight logs, and more. There are two primary GCS choices for Ardupilot: Mission Planner and QGroundControl. QGroundControl is cross platform and has a more user-friendly interface. However, its capabilities are more limited than Mission Planner, so we decided to use Mission Planner.

If we were operating with GPS, Mission Planner would let us create waypoints and define commands for autonomous use—but, of course, we aren’t performing those operations. However, Mission Planner still gives real-time telemetry data using the 3DR radio, which tracks the vehicle’s altitude, speed, battery voltage and draw, and sensor readings. Using this information, fine adjustments can be made to the drone using Mission Planner in conjunction with ArduPilot. Flight logs are also recorded for review later on, which can give us important insights about the drone's behavior. 

---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/uav_images/other_images/IMG_20240629_003631.jpg" title=" " class="img-fluid rounded z-depth-1" %}
    </div>
</div>
