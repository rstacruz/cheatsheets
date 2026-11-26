---
title: How to hide a page in Starlight
link_title: Starlight hide page
subtitle: Unlist docs pages
category: JavaScript libraries
layout: snippet
updated: 2026-11-27
last_verified_with: "Starlight 0.43.2, Astro 7.4.13."
links:
  - title: Sidebar frontmatter
    url: https://starlight.astro.build/reference/frontmatter/#sidebar
  - title: draft
    url: https://starlight.astro.build/reference/frontmatter/#draft
---

## Hiding pages
<!-- {: .-snippets} -->

### Hide the sidebar link
<!-- {: .-snippet} -->

```yaml
---
title: Deprecated API
sidebar:
  hidden: true
---
```
<!-- {: data-highlight="hidden: true"} -->

**Keeps the page but drops its sidebar link.** The URL still builds and search still finds it; see [sidebar frontmatter](https://starlight.astro.build/reference/frontmatter/#sidebar).

### Drop the page from production
<!-- {: .-snippet} -->

```yaml
---
title: Next release
draft: true
---
```
<!-- {: data-highlight="draft: true"} -->

**Leaves the page out of production builds.** It still renders in `dev` with a draft notice, and it is absent from the sidebar and search; see [draft](https://starlight.astro.build/reference/frontmatter/#draft).

### Remove the sidebars
<!-- {: .-snippet} -->

```yaml
---
title: Acme Docs
template: splash
---
```
<!-- {: data-highlight="template: splash"} -->

**Switches to the splash layout.** Splash pages drop both sidebars and widen the content, which suits landing pages and custom 404s; see [page layout](https://starlight.astro.build/guides/customization/#page-layout).
