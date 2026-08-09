# Signal Academic Portfolio

A light, interactive academic portfolio template for researchers, students, and engineers. It is built with Jekyll and deploys to GitHub Pages.

Every visible person, institution, lab, project, and publication in this repository is neutral example content. The examples are written to explain what each field is for rather than represent a real person or real work.

## Features

- Responsive academic portfolio with violet, blue, and cyan accents
- Interactive three-node research-interest map
- Markdown-driven experiences, publications, and notes
- Automatic category grouping for experiences and notes
- Automatic year grouping and type filtering for publications
- Collection-aware detail pages and back links
- Keyboard-accessible navigation and interactions

## Preview

### Home

![Signal Academic Portfolio home page](images/screenshots/home.png)

<table>
  <tr>
    <td><img src="images/screenshots/publications.png" alt="Publications page"></td>
    <td><img src="images/screenshots/experiences.png" alt="Experiences page"></td>
  </tr>
  <tr>
    <td align="center"><strong>Publications</strong></td>
    <td align="center"><strong>Experiences</strong></td>
  </tr>
  <tr>
    <td><img src="images/screenshots/notes.png" alt="Notes page"></td>
    <td><img src="images/screenshots/cv.png" alt="CV page"></td>
  </tr>
  <tr>
    <td align="center"><strong>Notes</strong></td>
    <td align="center"><strong>CV</strong></td>
  </tr>
</table>

## Use this template

1. Click **Use this template** on GitHub.
2. Create `<username>.github.io` for a user site, or choose any repository name for a project site.
3. Replace the placeholder values in `_config.yml`:

```yaml
url: "https://<username>.github.io"
baseurl: "" # use "/<repository>" for a project site
repository: "<username>/<repository>"

author:
  email: "you@example.com"
  github: "<username>"
  cv_pdf: "/assets/your-cv.pdf"
```

4. Replace the neutral examples described below.
5. In **Settings → Pages**, select **GitHub Actions** as the source.

## How to use

Most visible content is generated from Markdown front matter and YAML data. Add or edit those files, rebuild the site, and Jekyll updates the archive groups, dates, labels, links, and detail pages without requiring page-specific HTML.

### Content map

- `_data/profile.yml`: home-page name, introduction, hero artwork, and research-interest labels
- `_data/navigation.yml`: ordered top-navigation labels and URLs
- `_config.yml`: site URL, repository, email, GitHub username, and downloadable CV path
- `_publications/*.md`: one Markdown file per publication
- `_experiences/*.md`: one Markdown file per experience, award, teaching role, or service activity
- `_posts/*.md`: dated Notes, Talks, and other post-based archive entries
- `_data/content_groups.yml`: group order, headings, and short category labels
- `_data/content_archives.yml`: the content source and row style used by each archive key
- `_pages/*.md`: page title, introduction, permalink, and CV page structure

### 1. Configure the site and contact links

Edit `_config.yml` once for the deployed repository and contact buttons:

```yaml
url: "https://<username>.github.io"
baseurl: "" # use "/<repository>" for a project site
repository: "<username>/<repository>"

author:
  email: "you@example.com"
  github: "<username>"
  cv_pdf: "/assets/your-cv.pdf"
```

The email and GitHub values generate the Home contact buttons. `cv_pdf` generates the CV download button; remove that field to hide the button.

### 2. Edit the Home page

Edit `_data/profile.yml` to change the hero and research-interest diagram:

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

Keep the three supplied `key` values unless you also update the research-map HTML and CSS; the labels are safe to replace freely. The Home page automatically shows the three newest Experiences and three newest posts with `archive_key: notes`.

### 3. Add or edit Publications

Create one file per paper under `_publications/`, for example `_publications/2026-example-paper.md`:

```yaml
---
layout: single
title: "Your Paper Title"
date: 2026-01-01
type: "conference"
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

- sorts entries by `date` in descending order;
- creates year headings from `date`;
- filters entries by `type: conference`, `journal`, or `preprint`;
- emphasizes the author matching `primary_author`;
- places `venue` on the left and `highlight` on the right;
- links the complete cell to `paperurl`, or to the generated detail page when `paperurl` is omitted.

Edit `_pages/publications.md` only when changing the archive title or introduction, not when adding a paper.

### 4. Add or edit Experiences

Create one file per entry under `_experiences/`:

```yaml
---
title: "Research Assistant, Example Lab"
date: 2026-01-01
period: "2026 – Present"
category: "research"
organization: "Example University"
summary: "One concise sentence describing the role and contribution."
link: "/cv/#research-experience"
---

Optional experience detail content can be written here in Markdown.
```

`date` controls sorting, while `period` is the text displayed in the cell. `category` must match an `experiences` slug in `_data/content_groups.yml`. Entries are grouped and labeled automatically in that configured order. `link` may be an internal path or an external URL; omit it to use the generated detail page.

Edit `_pages/experiences.md` only to change the archive title, introduction, permalink, or section number.

### 5. Add or edit Notes

Create a dated post such as `_posts/2026-01-15-research-workflow.md`:

```yaml
---
layout: single
title: "A Reproducible Research Workflow"
subtitle: "A short description shown in the archive cell"
archive_key: notes
categories: [project]
---

## First section

Write the complete note in Markdown.
```

The `YYYY-MM-DD` filename supplies the date unless a `date` field overrides it. `archive_key: notes` sends the post to the Notes archive, and the first category selects its group and label from `_data/content_groups.yml`. The included groups are project, study, tutorial, and reflection. Each post automatically receives a detail page and a return link to Notes.

Edit `_pages/notes.md` only to change the archive title, introduction, permalink, or section number.

### 6. Create another post-based archive

The included Talks page demonstrates how to reuse the same dynamic archive without copying its HTML.

1. Register the archive once in `_data/content_archives.yml`:

   ```yaml
   talks:
     source: "posts"
     row_kind: "note"
   ```

2. Define its ordered categories in `_data/content_groups.yml`:

   ```yaml
   talks:
     - slug: "invited"
       title: "Invited Talks"
       label: "Invited"
     - slug: "conference"
       title: "Conference Talks"
       label: "Conference"
   ```

3. Create a thin page such as `_pages/talks.md`. The page needs only one routing field:

   ```yaml
   ---
   layout: signal-collection
   title: "Talks"
   description: "Talks and presentations."
   intro: "A short archive introduction."
   permalink: /talks/
   archive_key: talks
   section_number: "04"
   ---
   ```

4. Add dated posts with the same archive key:

   ```yaml
   ---
   layout: single
   title: "Example Invited Talk"
   archive_key: talks
   categories: [invited]
   subtitle: "Where and why the talk was presented."
   archive_path: /talks/
   archive_label: "Back to Talks"
   ---
   ```

The shared layout then creates the category sections, rows, dates, labels, and detail links automatically.

5. Add the page to the top navigation only if it should be globally visible. Edit `_data/navigation.yml`, not the header HTML:

   ```yaml
   - label: "Talks"
     url: "/talks/"
   ```

   Menu order follows the YAML order. The active state is inferred from the URL segment, collection name, or `archive_key`. If those names intentionally differ, add `match_key: "talks"` to the navigation item.

### 7. Edit the CV page and downloadable PDF

The CV header name, summary, and research-interest list reuse `_data/profile.yml`. Edit the timeline sections directly in `_pages/cv.md`; duplicate or remove a `signal-timeline__section` block to change the visible CV structure.

Replace `assets/example-cv.pdf` with your own file and update `author.cv_pdf` in `_config.yml`. The file path controls the download button independently from the on-page CV content.

### 8. Replace images and example content

- Replace `images/profile.png` or update `image.path` in `_data/profile.yml`.
- Replace or delete the neutral files in `_publications/`, `_experiences/`, and `_posts/`.
- Keep category slugs synchronized with `_data/content_groups.yml`; an entry with an unknown category is not shown in a configured archive group.

### 9. Preserve an old URL after renaming a page

`permalink` is the page's current canonical URL. Add `redirect_from` only when a previously published URL must continue working after a migration:

```yaml
---
permalink: /experiences/
redirect_from:
  - /old-experiences/
---
```

Do not list the current permalink under `redirect_from`. Fresh template installations do not need redirects, so this repository does not include site-specific legacy paths by default.

## Run locally

Ruby 3.3 or newer is recommended.

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`. For a project site, keep the configured `baseurl` when checking links.

## Before publishing

- Replace `Your Name`, example contact details, and placeholder repository URLs.
- Replace or remove every example Markdown entry.
- Replace `images/profile.png` if you do not want the included circuit artwork.
- Replace `assets/example-cv.pdf` and update `author.cv_pdf` in `_config.yml`; remove the setting if you do not want a download button.
- Confirm that every image, PDF, font, and publication asset you add may be redistributed.

## License and attribution

Signal Academic Portfolio is released under the MIT License. Upstream attribution for Academic Pages and Minimal Mistakes is retained in `LICENSE` and `THIRD_PARTY_NOTICES.md`.
