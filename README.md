<h1 align="center">Signal Academic Portfolio</h1>

<p align="center">
  A light, interactive, data-driven Jekyll portfolio for researchers, students, and engineers.
</p>

<p align="center">
  <a href="https://jekyll-themes.com/joongwon0204/signal-academic-portfolio"><img src="https://img.shields.io/badge/featured%20on-JT-red.svg" height="20" alt="Jekyll Themes Shield"></a>
  <a href="https://joongwon0204.github.io/signal-academic-portfolio/"><img alt="Live Demo" src="https://img.shields.io/badge/Live_Demo-Open_site-0799a8?style=for-the-badge"></a>
  <a href="https://github.com/joongwon0204/signal-academic-portfolio/generate"><img alt="Use This Template" src="https://img.shields.io/badge/Use_This_Template-Create_repository-6655ff?style=for-the-badge&logo=github"></a>
  <a href="https://github.com/joongwon0204/signal-academic-portfolio/releases/latest"><img alt="Latest Release" src="https://img.shields.io/github/v/release/joongwon0204/signal-academic-portfolio?style=for-the-badge&color=2f6fed"></a>
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/joongwon0204/signal-academic-portfolio?style=for-the-badge&color=4d596c"></a>
</p>

<p align="center">
  <a href="https://joongwon0204.github.io/signal-academic-portfolio/">
    <img src="images/social-preview.png" alt="Signal Academic Portfolio preview" width="960">
  </a>
</p>

Signal Academic Portfolio combines an editorial academic layout with violet, blue, and cyan circuit accents. Visible content stays editable through Markdown and YAML, while the shared rendering engine keeps archive pages, publication lists, responsive interactions, and the CV consistent.

- **Markdown-first content** — update publications, experiences, notes, and CV entries without duplicating page HTML.
- **Reusable archive engine** — group entries by category or year and select a consistent adaptive cell for each archive.
- **Responsive academic UI** — retain the same interaction language across desktop, tablet, and mobile layouts.

Every person, institution, lab, project, and publication included in this repository is neutral example content. Replace the examples before publishing your own site.

## Quick start

1. Click **[Use this template](https://github.com/joongwon0204/signal-academic-portfolio/generate)** and create a new repository.
2. Set the deployment URL, repository name, and contact fields in `_config.yml`.
3. Replace `_data/profile.yml`, the example Markdown entries, and `images/profile.png`.
4. In **Settings → Pages**, select **GitHub Actions** as the source.
5. Push to the configured branch and open the generated site after the Pages workflow finishes.

For a working reference, open the **[live demo](https://joongwon0204.github.io/signal-academic-portfolio/)**. The detailed file map and content schemas are documented in [How to use](#how-to-use).

## Design

The visual system is built around four ideas:

- a bright, paper-like background with restrained academic typography;
- responsive circuit graphics that connect the pages without overpowering the content;
- a violet–blue–cyan accent system shared by labels, filters, timelines, and interactions;
- reusable archive rows whose hover, focus, grouping, and responsive behavior stay consistent across the site.

The screenshots below are full-page captures from the top navigation to the footer.

### Home

The Home page combines a profile hero, an interactive three-node research-interest map, and automatically selected Experiences and Notes.

![Full Signal Academic Portfolio home page](images/screenshots/home.png)

### Shared archive engine

Publications, Experiences, and Notes below are not three separately implemented page components. They are three configurations of the same archive layout:

- Publications selects year grouping and the publication cell. Its category filters come directly from publication Markdown.
- Experiences selects category grouping and the adaptive general cell from a Jekyll collection.
- Notes selects category grouping and the same adaptive general cell from dated posts.

**Publications archive**

![Full Signal Academic Portfolio publications page](images/screenshots/publications.png)

**Experiences archive**

![Full Signal Academic Portfolio experiences page](images/screenshots/experiences.png)

**Notes archive**

![Full Signal Academic Portfolio notes page](images/screenshots/notes.png)

### CV

The CV is assembled from ordered Markdown cells and keeps its timeline, section markers, and gradient colors automatic.

![Full Signal Academic Portfolio CV page](images/screenshots/cv.png)

## How to use

### Start a site

1. Click **Use this template** on GitHub.
2. Create `<username>.github.io` for a user site, or choose another repository name for a project site.
3. Set the deployment and contact values in `_config.yml`:

   ```yaml
   url: "https://<username>.github.io"
   baseurl: "" # use "/<repository>" for a project site
   repository: "<username>/<repository>"

   author:
     email: "you@example.com"
     github: "<username>"
     cv_pdf: "/assets/your-cv.pdf"
   ```

4. Replace the neutral example Markdown and image files described below.
5. In **Settings → Pages**, select **GitHub Actions** as the source.

The template has three rendering paths:

1. **Home** composes profile data, the interactive research map, and previews from configured archives.
2. **Archive engine** generates Publications, Experiences, Notes, Talks, or any new list page from one shared layout.
3. **CV engine** builds an ordered timeline from reusable Markdown cells.

Publications is not a separate page system. It is one archive configuration that uses year grouping and the publication cell.

### 0. File structure and generation mechanism

The repository separates content, page configuration, rendering, and presentation so that normal updates stay in Markdown or YAML:

```text
.
├── _config.yml                  # Site URL, collections, defaults, and contact settings
├── _data/
│   ├── profile.yml              # Home profile and research-interest content
│   ├── navigation.yml           # Top-menu order and labels
│   ├── content_archives.yml     # Archive key → source, grouping mode, and cell style
│   ├── content_groups.yml       # Archive category order, headings, and labels
│   └── cv_sections.yml          # CV section order and headings
├── _pages/                      # Thin page definitions, keys, titles, and permalinks
├── _experiences/                # Collection-backed archive entries
├── _posts/                      # Dated Notes, Talks, and other post-backed entries
├── _publications/               # One Markdown file per publication
├── _cv/                         # One Markdown file per CV cell
├── _layouts/                    # Shared page shells and archive-generation logic
├── _includes/                   # Archive dispatcher, adaptive rows, CV cells, and shared chrome
├── assets/
│   ├── css/signal.scss          # Responsive visual system
│   └── js/signal.js             # Filters, hover states, navigation, and interactions
├── images/                      # Profile image, icons, and README screenshots
└── .github/workflows/pages.yml  # GitHub Pages build and deployment
```

Generation follows the same pipeline across the site:

1. **Content** — Jekyll loads front matter and Markdown bodies from `_posts/` and the configured collections.
2. **Configuration** — YAML files in `_data/` define profile text, navigation, archive sources, category groups, and CV section order.
3. **Routing** — a thin file in `_pages/` provides the page `key`, title, permalink, and layout without containing repeated archive HTML.
4. **Rendering** — Liquid code in `_layouts/` looks up the page key, selects and sorts matching entries, then delegates each row or cell to `_includes/`.
5. **Presentation** — `signal.scss` supplies the responsive layout and color system; `signal.js` adds filtering and interaction without owning content.
6. **Deployment** — the GitHub Pages workflow builds the resulting static HTML whenever the configured branch is published.

In practice, content edits belong in Markdown, ordering and labels belong in YAML, and reusable HTML changes belong in `_layouts/` or `_includes/`.

#### Include component map

Files in `_includes/` are reusable Liquid/HTML fragments. Layouts own page-level structure; includes own repeated interface pieces and small rendering decisions.

```text
signal-content-row.html
├── cell: publication ──→ signal-publication-row.html
└── any general cell ───→ signal-plain-row.html
                           ├── thumbnail present ──→ add the image region
                           └── thumbnail empty ────→ omit the image region

cv/cell.html
├── template: entry ────→ cv/entry.html
└── template: pairs ────→ cv/pairs.html
```

The row components are:

- `_includes/signal-content-row.html` — the archive-row dispatcher. It normalizes the date or `period`, category label, organization, summary, and internal or external link before selecting the renderer.
- `_includes/signal-plain-row.html` — the one adaptive row used by general archives such as Experiences, Notes, and Talks. It renders the period, optional thumbnail, organization, title, summary, category, and arrow. A non-empty `thumbnail` or `image` adds the image composition; an empty value uses the same component without reserving image space.
- `_includes/signal-publication-row.html` — the publication-specific row. It renders the generated visual label, venue, optional highlight, paper title, author list, primary-author emphasis, and paper or detail-page link.

There is intentionally no separate thumbnail-row component. Thumbnail display is an optional state of the general row, not an archive-level cell type. One archive still selects one cell family through `_data/content_archives.yml`: `archive` for the adaptive general row or `publication` for the paper-specific row.

The remaining shared includes are:

- `_includes/signal-header.html` and `_includes/signal-footer.html` — site navigation and footer links;
- `_includes/signal-circuit.html` — the reusable circuit-line graphic used by page headers and empty states;
- `_includes/head.html`, `_includes/head/custom.html`, and `_includes/seo.html` — styles, icons, metadata, and optional custom `<head>` additions;
- `_includes/read-time.html` — estimated reading time for generated detail pages;
- `_includes/cv/cell.html` — the CV-cell dispatcher;
- `_includes/cv/entry.html` — standard CV entries with headings, dates, body copy, and optional structured facts;
- `_includes/cv/pairs.html` — compact label/value lists for coursework, skills, and similar sections;
- `_includes/base_path` — the shared URL base used by head and SEO includes.

### 1. Main page

Use `_data/profile.yml` for the visible profile and research-interest content:

```yaml
display_name: "Your Name"
given_name: "Your"
family_name: "Name"
native_name: ""
eyebrow: "Portfolio"
summary: "A concise degree, role, or professional summary."
intro: "A short introduction to your background and current work."

image:
  path: "/images/profile.png"
  alt: "Description of the profile image"

research:
  section_label: "Research Interest"
  intro: "One sentence connecting the three areas."
  interests:
    - key: "codesign"
      short_label: "Primary Research Area"
      full_label: "Primary Research Area"
    - key: "accelerators"
      short_label: "Supporting Method"
      full_label: "Supporting Method"
    - key: "inference"
      short_label: "Application Domain"
      full_label: "Application Domain"
```

The supplied research diagram has three fixed node positions. Replace the labels freely; keep the three `key` values unless you also change the diagram markup and styling.

The Home page automatically shows the newest entries from the Experiences and Notes archives. Adding or reordering archive content therefore updates both its archive page and the Home preview.

### 2. Shared archive engine

Publications, Experiences, Notes, and Talks all use `_layouts/signal-collection.html`. An archive is the combination of four pieces:

1. a page definition in `_pages/`;
2. an engine configuration in `_data/content_archives.yml`;
3. Markdown entries in the configured source;
4. optional category labels in `_data/content_groups.yml`.

There is no Publications-only archive HTML. The current four pages differ only through this data:

```yaml
# _data/content_archives.yml
experiences:
  source: "experiences"
  group_by: "category"
  cell: "archive"

notes:
  source: "posts"
  group_by: "category"
  cell: "archive"

talks:
  source: "posts"
  group_by: "category"
  cell: "archive"

publications:
  source: "publications"
  group_by: "year"
  cell: "publication"
```

The archive `key` joins the page, engine configuration, navigation, post selection, active menu state, and detail-page return link. The URL remains independent: navigation finds the page by `key` and uses that page's `permalink`.

#### Archive settings

- `source` selects a Jekyll collection such as `experiences` or `publications`. The special value `posts` selects matching files from `_posts/`.
- `group_by: category` creates ordered sections from `_data/content_groups.yml`.
- `group_by: year` creates year sections from each entry's `date` and generates filter buttons from the unique `category` values found in those entries.
- `cell: archive` uses the general-purpose row shared by Experiences, Notes, and Talks.
- `cell: publication` uses the paper-specific metadata row.

One archive uses one cell setting. Entries do not choose their own component, so a single archive cannot accidentally mix unrelated row designs. The general `archive` cell still adapts internally: entries with `thumbnail` or `image` use the thumbnail composition, and entries without either field use the plain composition.

#### Page definition

Every archive page is intentionally thin. `_pages/notes.md`, for example, contains only page-level text and routing data:

```yaml
---
layout: signal-collection
title: "Notes"
description: "Notes page description."
intro: "A short introduction shown below the title."
permalink: /notes/
key: notes
section_number: "03"
---
```

Changing `permalink` changes the public URL without renaming the archive key or editing navigation URLs manually.

#### General archive entries

Experiences, Notes, and Talks use the same general archive field names. The source folder changes where Jekyll loads the entry, but it does not change the cell schema:

```yaml
---
title: "Entry title"
date: 2026-01-01
key: notes                          # leave blank for a dedicated collection
period:                             # optional display text
category: "project"
organization:
summary: "One concise archive-row description."
thumbnail:
link:
---

## Optional detail content

Write the complete detail page in Markdown.
```

Every general-cell Markdown file keeps these nine fields in the same order. Unused display fields may remain empty; Jekyll reads an empty YAML value as `nil`, and the Liquid cell either omits that element or uses its defined fallback.

Only two source-specific rules remain:

- collection entries such as files in `_experiences/` leave `key` empty, because their source already identifies the archive;
- post entries provide `key`, because Notes and Talks share `_posts/`. Their filename must also use `YYYY-MM-DD-title.md`, and that filename date should match the explicit `date` field.

`title`, `date`, and `category` are required. All general entries use singular `category` and `summary`; there is no separate `categories`/`subtitle` compatibility schema. `period` overrides the displayed date, `category` selects a configured group, and `link` may be internal or external. Leave `link` empty to open the generated detail page.

`thumbnail` accepts a site-relative path or a complete external URL. `image` is supported as an alias. Omitting both switches the same general archive cell to its plain layout without reserving empty image space.

#### Publication entries use the same engine

Publications is the `group_by: year` + `cell: publication` configuration shown above. Add one file per paper under `_publications/`:

```yaml
---
layout: single
title: "Your Paper Title"
date: 2026-01-01
category: "conference"
venue: "Conference or Journal"
paperurl: "https://example.com/paper"
highlight: "Optional oral, spotlight, award, or featured-paper note"
thumbnail_label: "PAPER"
primary_author: "Your Name"
authors:
  - "Your Name"
  - "Coauthor Name"
---

Optional detail-page content can be written here in Markdown.
```

The shared archive layout automatically sorts these files by date, creates year sections, and creates category filter buttons. The publication cell then:

- places `venue` at the left and `highlight` at the right of one metadata row;
- emphasizes the author matching `primary_author`;
- uses `thumbnail_label` in the generated visual;
- links the complete row to `paperurl`, or to the generated detail page when `paperurl` is omitted.

Use lowercase, URL-safe categories such as `conference`, `journal`, `preprint`, or `workshop`. Adding a new category immediately adds its filter button; no page, layout, JavaScript, or YAML category list needs editing.

#### Add a new archive page

The included Talks page demonstrates the complete extension flow:

1. Choose or register a content source in `_config.yml`. Reuse `posts` when separate Jekyll collection behavior is unnecessary.
2. Register the archive in `_data/content_archives.yml` with one `key`, source, grouping mode, and cell.
3. If it uses category grouping, add its ordered section labels to `_data/content_groups.yml`.
4. Create `_pages/<key>.md` with `layout: signal-collection`, the same `key`, and any `permalink`.
5. Add Markdown entries to the selected source.
6. Optionally expose it in `_data/navigation.yml`:

   ```yaml
   - key: talks
     label: "Talks"
   ```

After that, each new Markdown entry generates its archive row, group or year placement, category label or filter, destination, and detail-page return link.

### 3. CV

The CV is independent from `_data/profile.yml`. Edit `display_name`, `given_name`, `family_name`, and `summary` in `_pages/cv.md` for its header.

Define section order and headings in `_data/cv_sections.yml`:

```yaml
- key: "education"
  title: "Education"

- key: "research-experience"
  title: "Research Experience"
```

Create one file under `_cv/` for each visible cell. The template includes two reusable cell types.

Use `template: entry` for education, honors, interests, research experience, projects, and other narrative entries:

```yaml
---
section: education
template: entry
order: 10
heading: "Example University"
link: "https://example.edu/"
period: "2022 – Present"
subtitle: "B.S. in Computer Science"
facts:
  - label: "Expected"
    value: "2027"
---

- Add optional details, links, or bullet points in Markdown.
```

Use `template: pairs` for coursework, skills, and other label–value lists:

```yaml
---
section: skills
template: pairs
order: 10
items:
  - label: "Programming"
    value: "Python, C++, JavaScript"
  - label: "Tools"
    value: "Git, Linux"
---
```

Multiple cells may share one section. Cells are sorted by `order`; values such as `10`, `20`, and `30` leave room to insert a new cell at `15`. Cells within one section use compact whitespace instead of divider lines. Empty sections are omitted, and the visible section numbers, timeline nodes, connecting-line gradient, and responsive layout are generated automatically.

Replace `assets/example-cv.pdf` with your own PDF and update `author.cv_pdf` in `_config.yml`. Remove `cv_pdf` to hide the download button.

## Run locally

Ruby 3.3 or newer is recommended.

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`. For a project site, keep the configured `baseurl` when checking links.

## Before publishing

- Replace `Your Name`, example contact details, and placeholder repository URLs.
- Replace or remove every example file in `_publications/`, `_experiences/`, `_cv/`, and `_posts/`.
- Replace `images/profile.png` if you do not want the included circuit artwork.
- Replace `assets/example-cv.pdf` and update `author.cv_pdf`; remove the setting if you do not want a download button.
- Keep archive category slugs synchronized with `_data/content_groups.yml`.
- Confirm that every image, PDF, font, and publication asset you add may be redistributed.

## License and attribution

Signal Academic Portfolio is released under the MIT License. Upstream attribution for Academic Pages and Minimal Mistakes is retained in `LICENSE` and `THIRD_PARTY_NOTICES.md`.
