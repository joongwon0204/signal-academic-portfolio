---
layout: signal
title: "CV"
description: "Example curriculum vitae sections for the Signal Academic Portfolio template."
permalink: /cv/
key: cv
display_name: "Your Name"
given_name: "Your"
family_name: "Name"
summary: "Use this line for your degree, role, institution, or professional focus."
---

<section class="signal-shell signal-index">
  <header class="signal-index-head signal-reveal">
    <div class="signal-index-head__copy">
      <p class="signal-kicker">04 / CURRICULUM VITAE</p>
      <h1 aria-label="{{ page.display_name }}">{{ page.given_name }}<br>{{ page.family_name }}</h1>
      <p class="signal-index-head__intro">{{ page.summary }}</p>
    </div>
    {% if site.author.cv_pdf %}
      <aside class="signal-index-head__aside">
        <a class="signal-cv-download" href="{{ site.author.cv_pdf | relative_url }}" download aria-label="Download example CV as PDF">Download CV PDF&nbsp; ↓</a>
      </aside>
    {% endif %}
    {% include signal-circuit.html class="signal-index-head__circuit" %}
  </header>

  <div class="signal-cv">
    <div class="signal-timeline">
      {% assign section_number = 0 %}
      {% for section in site.data.cv_sections %}
        {% assign cells = site.cv | where: "section", section.key | sort: "order" %}
        {% if cells.size > 0 %}
          {% assign section_number = section_number | plus: 1 %}
          <section class="signal-timeline__section signal-reveal" id="{{ section.key }}" aria-labelledby="cv-{{ section.key }}">
            <header class="signal-timeline__label">
              <span class="signal-timeline__number">{% if section_number < 10 %}0{% endif %}{{ section_number }} /</span>
              <h2 id="cv-{{ section.key }}">{{ section.title }}</h2>
            </header>
            <div class="signal-timeline__content">
              {% for cell in cells %}
                {% include cv/cell.html cell=cell %}
              {% endfor %}
            </div>
          </section>
        {% endif %}
      {% endfor %}
    </div>
  </div>
</section>
