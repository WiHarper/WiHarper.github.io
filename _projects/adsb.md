---
layout: page
title: ADS-B Feeder
description: [work in progress]
img: assets
importance: 10000
category:
related publications: false
---

<div style="width: 100%; height: 50vh; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e1e1e1;">
    <iframe 
        src="https://adsb.wilsonharper.net/" 
        width="100%" 
        height="100%" 
        style="border:none;"
        title="Live Air Traffic Map">
    </iframe>
</div>

<div class="caption">
    Live feed from my Raspberry Pi via 1090MHz ADS-B.
</div>

<div style="margin-top: 40px;">
    <h2>RF Telemetry & System Health</h2>
    <p>Real-time performance metrics of the receiver chain and demodulator.</p>
    
    <div style="width: 100%; height: 210vh; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e1e1e1;">
        <iframe 
            src="https://adsb.wilsonharper.net/graphs1090/" 
            width="100%" 
            height="100%" 
            style="border:none;"
            title="System Performance Graphs">
        </iframe>
    </div>
</div>