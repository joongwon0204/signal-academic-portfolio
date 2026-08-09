# Signal Academic Portfolio

Signal Academic Portfolio is a light, interactive Jekyll template for researchers, students, and engineers. It combines an editorial academic layout with violet, blue, and cyan circuit accents, while keeping the visible content editable through Markdown and YAML.

Every person, institution, lab, project, and publication included in this repository is neutral example content. Replace the examples before publishing your own site.

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

### Publications

Publications use the shared archive generator in year-grouping mode. Their category filters are generated directly from publication Markdown without maintaining separate HTML sections.

![Full Signal Academic Portfolio publications page](images/screenshots/publications.png)

### Archive pages

Experiences and Notes demonstrate the same shared archive design: Markdown entries are grouped by category, rendered as consistent rows, and connected to generated detail pages. They use different content sources, but they are not separate page components.

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

The template has three content workflows: Main page, shared archive pages, and CV. Publications, Experiences, Notes, and Talks are configured instances of the same archive generator.

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
├── _includes/                   # Three archive cells, header, footer, CV cells, and graphics
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

### 2. Archive pages

Publications, Experiences, Notes, and Talks are configured instances of the same `signal-collection` archive layout. Each archive is connected by one unique `key`:

1. `_pages/<key>.md` defines the page title, introduction, canonical URL, and `key`.
2. `_data/content_archives.yml` selects the content source, grouping mode, and one cell component for the whole archive.
3. For category-grouped archives, `_data/content_groups.yml` defines category order, section headings, and row labels.
4. Markdown entries provide their date, category, title, summary, and optional destination URL.
5. `_data/navigation.yml` optionally exposes the page in the top menu using the same `key`.

The page permalink remains independent. Navigation, active states, and detail-page return links resolve the page through `key`, so changing `/notes/` to `/writing/` requires changing only the page permalink.

The archive generator supports two grouping modes and two archive-level cell components:

```yaml
publications:
  source: "publications"
  group_by: "year"
  cell: "publication"

experiences:
  source: "experiences"
  group_by: "category"
  cell: "archive"
```

- `group_by: year` creates year headings and automatically adds filter buttons from the entries' unique `category` values.
- `group_by: category` creates the category sections defined in `_data/content_groups.yml` and does not display filter buttons.
- `cell: publication` renders paper metadata, authors, and the publication visual.
- `cell: archive` renders the shared Experiences/Notes-style row. It automatically shows the thumbnail layout when an entry has `thumbnail` or `image`; otherwise it renders the plain layout.

The configured `cell` applies to every entry in that archive. Individual Markdown files cannot override it, which keeps each archive visually consistent while the shared `archive` component handles optional thumbnails internally.

#### Add content to an archive

Every entry becomes a row under the configured year or category group. The source registered in `_data/content_archives.yml` determines where its Markdown files live:

- collection-backed archives such as Experiences read files from `_experiences/`;
- post-backed archives such as Notes and Talks read dated files from `_posts/` and select entries by `key`.

Both formats participate in the same grouping, sorting, row interaction, detail-page, and return-link system:

Collection-backed entry:

```yaml
---
title: "Research Assistant, Example Lab"
date: 2026-01-01
period: "2026 – Present"
category: "research"
organization: "Example University"
summary: "One concise sentence describing the role and contribution."
link: "https://example.com/project"
---

Optional detail-page content can be written here in Markdown.
```

Post-backed entry:

```yaml
---
layout: single
title: "A Reproducible Research Workflow"
subtitle: "A short description shown in the archive row"
key: notes
categories: [project]
---

## First section

Write the complete note in Markdown.
```

For collection entries, `date` controls sorting, `period` is the displayed date text, and `category` selects a group under the archive key in `_data/content_groups.yml`. For post entries, the `YYYY-MM-DD` filename supplies the date, `key` selects the archive, and the first item in `categories` selects its group. `link` may be internal or external; omit it to use the generated detail page.

To add a thumbnail to an entry in an archive using `cell: archive`:

```yaml
thumbnail: "/images/example-thumbnail.jpg"
```

`thumbnail` accepts a site-relative path or a complete external URL. `image` is also accepted as an alias. When both fields are omitted, the same archive cell automatically uses the plain layout without reserving empty image space.

#### Create another archive page

The included Talks page is an example of extending the same system without duplicating HTML.

1. Register the source, grouping mode, and archive-wide cell in `_data/content_archives.yml`:

   ```yaml
   talks:
     source: "posts"
     group_by: "category"
     cell: "archive"
   ```

2. Define the ordered groups in `_data/content_groups.yml`:

   ```yaml
   talks:
     - slug: "invited"
       title: "Invited Talks"
       label: "Invited"
     - slug: "conference"
       title: "Conference Talks"
       label: "Conference"
   ```

3. Create the thin archive page `_pages/talks.md`:

   ```yaml
   ---
   layout: signal-collection
   title: "Talks"
   description: "Talks and presentations."
   intro: "A short archive introduction."
   permalink: /talks/
   key: talks
   section_number: "04"
   ---
   ```

4. Add dated posts whose front matter contains `key: talks` and a configured category such as `categories: [invited]`.
5. To show the archive in the top menu, add its key and label to `_data/navigation.yml`:

   ```yaml
   - key: talks
     label: "Talks"
   ```

From then on, adding one Markdown file automatically creates its row, category section, date, label, detail route, and return link.

### 3. Publications

Create one file per paper under `_publications/`, for example `_publications/2026-example-paper.md`:

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

The Publications page automatically:

- sorts papers by `date` in descending order;
- creates year headings from `date`;
- creates one filter button for every unique `category` used by the publication files;
- filters rows by their `category`, so adding a new lowercase category such as `workshop` requires no page-template edit;
- emphasizes the author matching `primary_author`;
- places `venue` at the left and `highlight` at the right of the metadata row;
- links the complete row to `paperurl`, or to the generated detail page when `paperurl` is omitted.

Use lowercase, URL-safe values for `category` (for example, `conference`, `journal`, `preprint`, or `workshop`). The filter label is generated from that value, with hyphens converted to spaces. Publications uses the same `signal-collection` layout as the other archives, with `group_by: year` and `cell: publication`. Adding a paper or publication category requires only a new file in `_publications/`.

### 4. CV

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
