---
layout: signal
permalink: /notes/
title: "Notes"
description: "Example project logs, study records, and short-form writing."
redirect_from:
  - /year-archive/
  - /wordpress/blog-posts/
---

<section class="signal-shell signal-index">
  <header class="signal-index-head signal-reveal">
    <div class="signal-index-head__copy">
      <p class="signal-kicker">03 / NOTES</p>
      <h1>Notes</h1>
      <p class="signal-index-head__intro">Create dated posts for project logs, study records, or any additional writing category.</p>
    </div>
    {% include signal-circuit.html class="signal-index-head__circuit" %}
  </header>

  <div class="signal-notes-index">
    {% for group in site.data.content_groups.notes %}
      {% assign group_items = site.categories[group.slug] %}
      {% if group_items.size > 0 %}
        <section class="signal-work-group signal-reveal" aria-labelledby="{{ group.slug }}-notes-title">
          <h2 class="signal-work-group__title" id="{{ group.slug }}-notes-title">{{ group.title }}</h2>
          <div class="signal-note-list">
            {% for post in group_items %}
              {% include signal-content-row.html item=post kind="note" %}
            {% endfor %}
          </div>
        </section>
      {% endif %}
    {% endfor %}
  </div>
</section>
