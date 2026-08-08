---
layout: signal
title: "Experiences"
description: "Example research experiences, awards, and other academic milestones."
permalink: /experiences/
redirect_from:
  - /projects/
---

<section class="signal-shell signal-index">
  <header class="signal-index-head signal-reveal">
    <div class="signal-index-head__copy">
      <p class="signal-kicker">02 / EXPERIENCES</p>
      <h1>Experiences</h1>
      <p class="signal-index-head__intro">Add independent Markdown entries and organize them with categories defined in the data files.</p>
    </div>
    {% include signal-circuit.html class="signal-index-head__circuit" %}
  </header>

  <div class="signal-work-index signal-reveal">
    {% for group in site.data.content_groups.experiences %}
      {% assign group_items = site.experiences | where: "category", group.slug | sort: "date" | reverse %}
      {% if group_items.size > 0 %}
        <section class="signal-work-group" aria-labelledby="{{ group.slug }}-experiences-title">
          <h2 class="signal-work-group__title" id="{{ group.slug }}-experiences-title">{{ group.title }}</h2>
          <div class="signal-experience-list signal-experience-list--archive">
            {% for experience in group_items %}
              {% include signal-content-row.html item=experience kind="experience" %}
            {% endfor %}
          </div>
        </section>
      {% endif %}
    {% endfor %}
  </div>
</section>
