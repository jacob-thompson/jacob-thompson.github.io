---
layout: archive
title: "CV - Jacob A. Thompson"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* A.S in Computer Science, Modesto Junior College, 2025
* B.S in Computer Science, University of California, Santa Cruz, 2027 (expected)
<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 25px;">
    <a href="https://mjc.edu/">
        <img style="margin-bottom: 10px;" src="/images/mjc_logo.png" alt="Modesto Junior College Emblem" width="150px" height="150px">
    </a>

    <a href="https://ucsc.edu/">
        <img style="margin-bottom: 10px;" src="/images/ucsc_logo.png" alt="University of California, Santa Cruz Emblem" width="150px" height="150px">
    </a>
</div>

Skills
======
* Programming languages: Python, C, C++, Lua, Java, JavaScript, HTML, SQL
* Fields: Game Development, Emulator Development, Data Science
    * Game Development: Experience creating games using tools such as Simple DirectMedia Layer (SDL).
    * Emulator Development: Experience with reverse engineering and low-level programming to create and optimize emulators for gaming consoles.
    * Data Science: Experience with data analysis and visualization.
* Tools: Git, Github, Neovim
* Open Source: TODO

Portfolio
======
{% for collection in site.collections reversed %}
{% unless collection.output == false or collection.label == "posts" %}
  {% capture label %}{{ collection.label }}{% endcapture %}
  {% if label != written_label %}
  {% capture written_label %}{{ label }}{% endcapture %}
  {% endif %}
{% endunless %}
{% for post in collection.docs reversed %}
  {% unless collection.output == false or collection.label == "posts" %}
  {% include archive-single.html %}
  {% endunless %}
{% endfor %}
{% endfor %}
