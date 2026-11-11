---
layout: about
title: About
permalink: /
subtitle: EE @ Rice University // Mission Control Lead, Rice Eclipse // Prev. @ RTX BBN

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false # crops the image to make it circular
  more_info: >
    <p> </p>

social: false # icons and copyright now come from the site-wide footer
featured_projects: [businesscard, avio, adsb] # project file names shown as cards, in order


---

I’m Wilson, an electrical engineering student at Rice University fascinated by rockets, radars, and avionics.

At Rice, I serve as the Mission Control lead for [Rice Eclipse](https://eclipse.rice.edu/)'s liquid rocket engine program. With Eclipse, I've also designed an active fin stabilization system and other custom avionics. Previously, I interned at [RTX BBN Technologies](https://www.rtx.com/what-we-do/bbn-technologies) in Cambridge, Massachusetts, and I also engineered compact, directional wind systems for immersive environments in Rice's [Experimental Pixels Lab](https://pixels.rice.edu/). 

My open-source [NFC business card]({{ '/projects/businesscard/' | relative_url }}) was featured on [Hackaday](https://hackaday.com/2026/08/31/building-an-energy-harvesting-business-card), [Adafruit](https://blog.adafruit.com/2026/08/31/an-nfc-energy-harvesting-pcb-business-card-with-a-microcontroller/), and [Hacker News](https://news.ycombinator.com/item?id=49478426). In high school, I investigated synthetic aperture radar and its applications at the [MIT Lincoln Laboratory](https://www.ll.mit.edu/). I also built a [UAV]({{ '/projects/uav/' | relative_url }}) and competed with it nationally.

Feel free to check out more of my [projects]({{ '/projects/' | relative_url }}), my [resume]({{ '/resume/' | relative_url }}), or contact me below. I'd love to chat about aerospace, Rice, or anything else!

<br>


<div class="projects featured-projects">
  <div class="row row-cols-1 row-cols-md-3">
    {% assign featured_slugs = page.featured_projects %}
    {% for slug in featured_slugs %}
      {% assign project = site.projects | where: "slug", slug | first %}
      {% if project %}
        {% include projects.liquid %}
      {% endif %}
    {% endfor %}
  </div>
</div>


<style>
  .profile img.rounded {
    border-radius: 8% !important; 
  }
</style>
