---
layout: signal
title: "CV"
description: "Example curriculum vitae sections for the Signal Academic Portfolio template."
permalink: /cv/
---

{% assign profile = site.data.profile %}
<section class="signal-shell signal-index">
  <header class="signal-index-head signal-reveal">
    <div class="signal-index-head__copy">
      <p class="signal-kicker">04 / CURRICULUM VITAE</p>
      <h1 aria-label="{{ profile.display_name }}">{{ profile.given_name }}<br>{{ profile.family_name }}</h1>
      <p class="signal-index-head__intro">{{ profile.summary }}</p>
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
      <section class="signal-timeline__section signal-reveal" aria-labelledby="cv-education">
        <header class="signal-timeline__label">
          <span class="signal-timeline__number">01 /</span>
          <h2 id="cv-education">Education</h2>
        </header>
        <div class="signal-timeline__content">
          <article class="signal-cv-entry">
            <header class="signal-cv-entry__head">
              <h3><a href="https://example.edu/">Example University</a></h3>
              <p class="signal-cv-entry__date">Sep. 2022 &ndash; Present</p>
            </header>
            <p class="signal-cv-entry__subtitle">Replace this line with your degree program and department.</p>
            <div class="signal-cv-facts" aria-label="Academic record">
              <div><span>Degree</span><strong>B.S.</strong></div>
              <div><span>Expected</span><strong>2027</strong></div>
              <div><span>Location</span><strong>Your City</strong></div>
            </div>
            <p class="signal-cv-entry__subtitle">Use the facts row for GPA, graduation date, honors, or another concise academic detail.</p>
          </article>
        </div>
      </section>

      <section class="signal-timeline__section signal-reveal" aria-labelledby="cv-honors">
        <header class="signal-timeline__label">
          <span class="signal-timeline__number">02 /</span>
          <h2 id="cv-honors">Honors and Scholarships</h2>
        </header>
        <div class="signal-timeline__content">
          <article class="signal-cv-entry">
            <header class="signal-cv-entry__head">
              <h3>Academic Excellence Scholarship</h3>
              <p class="signal-cv-entry__date">Awarded 2024</p>
            </header>
            <p class="signal-cv-entry__subtitle">Describe why the honor was awarded and which organization granted it.</p>
          </article>
        </div>
      </section>

      <section class="signal-timeline__section signal-reveal" aria-labelledby="cv-interests">
        <header class="signal-timeline__label">
          <span class="signal-timeline__number">03 /</span>
          <h2 id="cv-interests">Research Interests</h2>
        </header>
        <div class="signal-timeline__content">
          <article class="signal-cv-entry">
            <ul>
              {% for interest in profile.research.interests %}<li>{{ interest.full_label }}</li>{% endfor %}
            </ul>
          </article>
        </div>
      </section>

      <section class="signal-timeline__section signal-reveal" id="research-experience" aria-labelledby="cv-research">
        <header class="signal-timeline__label">
          <span class="signal-timeline__number">04 /</span>
          <h2 id="cv-research">Research Experience</h2>
        </header>
        <div class="signal-timeline__content">
          <article class="signal-cv-entry">
            <header class="signal-cv-entry__head">
              <h3>Research Assistant, Example Lab</h3>
              <p class="signal-cv-entry__date">2025 &ndash; Present</p>
            </header>
            <p class="signal-cv-entry__subtitle">Advised by Prof. Example Advisor</p>
            <ul>
              <li>Summarize the research question, your contribution, and the most important outcome.</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="signal-timeline__section signal-reveal" aria-labelledby="cv-projects">
        <header class="signal-timeline__label">
          <span class="signal-timeline__number">05 /</span>
          <h2 id="cv-projects">Projects</h2>
        </header>
        <div class="signal-timeline__content">
          <article class="signal-cv-entry">
            <header class="signal-cv-entry__head">
              <h3>Open Research Toolkit</h3>
              <p class="signal-cv-entry__date">2025</p>
            </header>
            <ul>
              <li>Explain what the project does, your role, and where readers can inspect the result.</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="signal-timeline__section signal-reveal" aria-labelledby="cv-coursework">
        <header class="signal-timeline__label">
          <span class="signal-timeline__number">06 /</span>
          <h2 id="cv-coursework">Selected Coursework</h2>
        </header>
        <div class="signal-timeline__content">
          <dl class="signal-detail-list">
            <div><dt>Systems and Architecture</dt><dd>List the most relevant systems and architecture courses.</dd></div>
            <div><dt>Machine Learning</dt><dd>List machine learning, data science, or AI courses.</dd></div>
            <div><dt>Algorithms and Theory</dt><dd>List algorithms, theory, and mathematics courses.</dd></div>
            <div><dt>Additional Coursework</dt><dd>Add or remove categories to match your academic profile.</dd></div>
          </dl>
        </div>
      </section>

      <section class="signal-timeline__section signal-reveal" aria-labelledby="cv-skills">
        <header class="signal-timeline__label">
          <span class="signal-timeline__number">07 /</span>
          <h2 id="cv-skills">Technical Skills</h2>
        </header>
        <div class="signal-timeline__content">
          <dl class="signal-skill-list">
            <div><dt>Programming</dt><dd>Python, C++, JavaScript</dd></div>
            <div><dt>Research</dt><dd>Experiment Design, Data Analysis, Technical Writing</dd></div>
            <div><dt>Tools and Frameworks</dt><dd>Git, Linux, Example Framework</dd></div>
          </dl>
        </div>
      </section>
    </div>
  </div>
</section>
