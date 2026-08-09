---
layout: signal
permalink: /
title: "Home"
description: "A neutral demonstration of the Signal Academic Portfolio template."
---

{% assign profile = site.data.profile %}
<div class="signal-shell signal-home">
  <section class="signal-hero signal-reveal" data-signal-field aria-labelledby="home-title">
    <div class="signal-hero__copy">
      <p class="signal-hero__eyebrow">{{ profile.eyebrow | upcase }}</p>
      <h1 id="home-title"><span>{{ profile.given_name }}</span><span>{{ profile.family_name }}</span></h1>
      <p class="signal-hero__role">{{ profile.display_name }} · {{ profile.native_name }}</p>
      <p class="signal-hero__intro">{{ profile.intro }}</p>
      <p class="signal-hero__meta" aria-label="Contact links">
        {% if site.author.email %}
          <a class="signal-hero__contact" href="mailto:{{ site.author.email }}" aria-label="Email {{ profile.display_name }}">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.75 5.75h16.5v12.5H3.75z" />
              <path d="m4.5 6.5 7.5 6 7.5-6" />
            </svg>
            <span>Email</span>
          </a>
        {% endif %}
        {% if site.author.github %}
          <a class="signal-hero__contact signal-hero__contact--github" href="https://github.com/{{ site.author.github }}" rel="me" aria-label="GitHub profile of {{ profile.display_name }}">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.75a9.25 9.25 0 0 0-2.92 18.03c.46.08.63-.2.63-.45v-1.78c-2.58.56-3.12-1.1-3.12-1.1-.42-1.07-1.03-1.36-1.03-1.36-.84-.58.06-.57.06-.57.93.07 1.42.96 1.42.96.83 1.42 2.17 1.01 2.7.77.08-.6.32-1.01.59-1.24-2.06-.23-4.23-1.03-4.23-4.57 0-1.01.36-1.84.95-2.49-.1-.23-.41-1.18.09-2.46 0 0 .78-.25 2.54.95A8.8 8.8 0 0 1 12 7.07a8.8 8.8 0 0 1 2.32.31c1.76-1.2 2.53-.95 2.53-.95.51 1.28.2 2.23.1 2.46.59.65.95 1.48.95 2.49 0 3.55-2.18 4.33-4.25 4.56.34.29.63.85.63 1.72v2.67c0 .25.17.54.64.45A9.25 9.25 0 0 0 12 2.75Z" />
            </svg>
            <span>GitHub</span>
          </a>
        {% endif %}
      </p>
    </div>

    <div class="signal-hero__visual" aria-label="Profile graphic for {{ profile.display_name }}">
      <div class="signal-hero__image-wrap">
        <img class="signal-hero__image" src="{{ profile.image.path | relative_url }}" alt="{{ profile.image.alt }}">
      </div>
    </div>
    {% include signal-circuit.html class="signal-hero__traces" %}
  </section>

  <section class="signal-section signal-research-section signal-reveal" id="research" aria-labelledby="research-title">
    <div class="signal-research">
      <div class="signal-research__copy">
        <p class="signal-kicker">01 / {{ profile.research.section_label | upcase }}</p>
        <h2 id="research-title">Research<br>Interest</h2>
        <p class="signal-section-head__intro">{{ profile.research.intro }}</p>
        <ul class="signal-research__legend" aria-label="Research interest legend">
          {% for interest in profile.research.interests %}
            <li>
              <button type="button" data-signal-legend="{{ interest.key }}" aria-controls="research-{{ interest.key }}" aria-pressed="false"><i aria-hidden="true"></i>{{ interest.short_label }}</button>
            </li>
          {% endfor %}
        </ul>
      </div>

      <div class="signal-research__map" data-signal-field>
        <svg class="signal-research__routes" viewBox="0 0 640 430" aria-hidden="true">
          <defs>
            <linearGradient id="signal-route-codesign-fade" gradientUnits="userSpaceOnUse" x1="320" y1="216" x2="320" y2="108">
              <stop class="signal-route-stop--focus" offset="0" />
              <stop class="signal-route-stop--muted" offset="1" />
            </linearGradient>
            <linearGradient id="signal-route-accelerators-fade" gradientUnits="userSpaceOnUse" x1="320" y1="216" x2="160" y2="320">
              <stop class="signal-route-stop--focus" offset="0" />
              <stop class="signal-route-stop--muted" offset="1" />
            </linearGradient>
            <linearGradient id="signal-route-inference-fade" gradientUnits="userSpaceOnUse" x1="320" y1="216" x2="480" y2="320">
              <stop class="signal-route-stop--focus" offset="0" />
              <stop class="signal-route-stop--muted" offset="1" />
            </linearGradient>
          </defs>
          <path data-signal-route="codesign" d="M320 108 L320 216" />
          <path data-signal-route="accelerators" d="M160 320 L320 216" />
          <path data-signal-route="inference" d="M480 320 L320 216" />
          <circle cx="320" cy="216" r="5" />
        </svg>

        {% for interest in profile.research.interests %}
          <button class="signal-node signal-node--{{ interest.key }}" id="research-{{ interest.key }}" type="button" data-signal-node="{{ interest.key }}" aria-pressed="false">
            <span class="signal-node__inner">{{ interest.short_label }}</span>
          </button>
        {% endfor %}
      </div>
    </div>
  </section>

  <section class="signal-section signal-reveal" id="experiences" aria-labelledby="experiences-title">
    <header class="signal-section-head">
      <div>
        <p class="signal-kicker">02 / EXPERIENCES</p>
        <h2 id="experiences-title">Experiences</h2>
      </div>
      <p class="signal-section-head__aside">{% for group in site.data.content_groups.experiences %}{{ group.label | upcase }}{% unless forloop.last %} · {% endunless %}{% endfor %}</p>
    </header>

    <div class="signal-experience-list">
      {% assign sorted_experiences = site.experiences | sort: "date" | reverse %}
      {% for experience in sorted_experiences limit:3 %}
        {% include signal-content-row.html item=experience kind="experience" %}
      {% endfor %}
    </div>
    <a class="signal-more-link" href="{{ '/experiences/' | relative_url }}">Open all experiences <span aria-hidden="true">→</span></a>
  </section>

  <section class="signal-section signal-reveal" aria-labelledby="notes-title">
    <header class="signal-section-head">
      <div>
        <p class="signal-kicker">03 / NOTES</p>
        <h2 id="notes-title">Notes</h2>
      </div>
      <p class="signal-section-head__aside">{% for group in site.data.content_groups.notes %}{{ group.title | upcase }}{% unless forloop.last %} · {% endunless %}{% endfor %}</p>
    </header>

    <div class="signal-note-list">
      {% assign notes_posts = site.posts | where: "key", "notes" %}
      {% for post in notes_posts limit:3 %}
        {% include signal-content-row.html item=post kind="note" %}
      {% endfor %}
    </div>
    <a class="signal-more-link" href="{{ '/notes/' | relative_url }}">Open the notes archive <span aria-hidden="true">→</span></a>
  </section>
</div>
