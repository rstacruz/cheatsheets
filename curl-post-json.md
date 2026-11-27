---
title: How to POST JSON with curl
link_title: curl POST JSON
subtitle: Send JSON request bodies
logo: { src: /assets/logos/curl.svg, mono: true }
category: Networking
layout: snippet
last_verified_with: "curl 8.23.0."
updated: 2026-11-23
tier: t3
links:
  - title: curl manual
    url: https://curl.se/docs/manpage.html
---

## JSON requests
<!-- {: .-snippets} -->

### Inline body
<!-- {: .-snippet} -->

```bash
curl -X POST https://api.example.com/items \
  -H 'Content-Type: application/json' \
  -d '{"name":"Ada"}'
```
<!-- {: data-highlight="-d"} -->

**Sends a JSON request body.** `-H` sets the content type and `-d` sends the body; see [curl](https://curl.se/docs/manpage.html#-d).

### Body from a file
<!-- {: .-snippet} -->

```bash
curl -X POST https://api.example.com/items \
  -H 'Content-Type: application/json' \
  -d @item.json
```
<!-- {: data-highlight="@item.json"} -->

**Sends a JSON body from a file.** `@file` keeps shell quoting out of the way. See [curl](https://curl.se/docs/manpage.html#-d).

### JSON shortcut
<!-- {: .-snippet} -->

```bash
curl --json '{"name":"Ada"}' \
  https://api.example.com/items
```
<!-- {: data-highlight="--json"} -->

**Sends JSON with one flag.** `--json` sets the headers and POST method; see [curl](https://curl.se/docs/manpage.html#--json).
