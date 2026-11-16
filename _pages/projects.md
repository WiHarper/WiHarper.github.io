---
layout: page
title: Projects
permalink: /projects/
description: 
nav: true
nav_order: 3
display_categories: [work, fun]
horizontal: false
social: true # includes social icons at the bottom of the page

---

<!-- pages/projects.md -->
{% include ordered_projects.liquid %}
<div class="projects">
  <h2 class="projects-section-title">Featured Projects</h2>
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in featured_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>

  <h2 class="projects-section-title">Additional Projects</h2>
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in other_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>
