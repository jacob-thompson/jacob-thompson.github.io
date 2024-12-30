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
* A.S in Computer Science, Modesto Junior College, 2025 (expected)
  
Skills
======
* Programming languages: Python, C, C++, Lua, Java, JavaScript, HTML, CSS, SQL
* Fields: Machine Learning, Artificial Intelligence, Data Science, Web Development, Game Development
  * AI-driven applications: Chatbots, Recommendation Systems, Image Recognition
  * Data Science: Data Analysis, Data Visualization, Data Cleaning
  * Web Development: Full-stack development, Front-end development, Back-end development
* Tools: Git, Github, Vim, Unity, Unreal Engine, Blender, Adobe Photoshop, Adobe Illustrator, Slack, Discord, Zoom, Microsoft Office, Google Suite 

Portfolio
======
{% for collection in site.collections %}
{% unless collection.output == false or collection.label == "posts" %}
  {% capture label %}{{ collection.label }}{% endcapture %}
  {% if label != written_label %}
  {% capture written_label %}{{ label }}{% endcapture %}
  {% endif %}
{% endunless %}
{% for post in collection.docs %}
  {% unless collection.output == false or collection.label == "posts" %}
  {% include archive-single.html %}
  {% endunless %}
{% endfor %}
{% endfor %}
