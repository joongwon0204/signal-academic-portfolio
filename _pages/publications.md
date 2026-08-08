---
layout: signal
title: "Publications"
description: "Example publication entries and instructions for the publication archive."
permalink: /publications/
---

<section class="signal-shell signal-index">
  <header class="signal-index-head signal-reveal">
    <div class="signal-index-head__copy">
      <p class="signal-kicker">01 / PUBLICATIONS</p>
      <h1>Publications</h1>
      <p class="signal-index-head__intro">Add one Markdown file per paper; years and publication types are grouped automatically.</p>
    </div>
    {% include signal-circuit.html class="signal-index-head__circuit" %}
  </header>

  <div class="signal-publications signal-reveal">
    {% if site.publications.size > 0 %}
      <div class="signal-filter-line" data-signal-filter-group data-signal-filter-target=".signal-publication-row" role="group" aria-label="Publication types">
        <button type="button" data-signal-filter="all" aria-pressed="true">ALL</button>
        <button type="button" data-signal-filter="conference" aria-pressed="false">CONFERENCE</button>
        <button type="button" data-signal-filter="journal" aria-pressed="false">JOURNAL</button>
        <button type="button" data-signal-filter="preprint" aria-pressed="false">PREPRINT</button>
      </div>
      {% assign sorted_publications = site.publications | sort: "date" | reverse %}
      {% assign current_year = "" %}
      {% for publication in sorted_publications %}
        {% assign publication_year = publication.date | date: "%Y" %}
        {% if publication_year != current_year %}
          {% unless forloop.first %}</div></section>{% endunless %}
          <section class="signal-publication-year" data-signal-filter-section>
            <header class="signal-publication-year__head"><h2>{{ publication_year }}</h2></header>
            <div class="signal-publication-year__list">
          {% assign current_year = publication_year %}
        {% endif %}
        {% include signal-publication-row.html publication=publication %}
        {% if forloop.last %}</div></section>{% endif %}
      {% endfor %}
    {% else %}
      <div class="signal-empty">
        <div class="signal-empty__copy">
          <span class="signal-empty__index">00 / NO ENTRIES</span>
          <h2>No publications yet.</h2>
          <p>The archive is intentionally left empty until publication data is added to this site.</p>
        </div>
        {% include signal-circuit.html class="signal-empty__circuit" %}
      </div>
    {% endif %}
  </div>
</section>
