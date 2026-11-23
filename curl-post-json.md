---
title: curl POST JSON
h1_title: How to POST JSON with curl
subtitle: Send JSON request bodies
category: Networking
layout: snippet
last_verified_with: "curl 8.23.0."
updated: 2026-11-23
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
<!-- {: data-highlight="-H"} -->

`-H` sets the content type and `-d` sends the body; see [curl](https://curl.se/docs/manpage.html#-d).

### Body from a file
<!-- {: .-snippet} -->

```bash
curl -X POST https://api.example.com/items \
  -H 'Content-Type: application/json' \
  -d @item.json
```
<!-- {: data-highlight="@item.json"} -->

`@file` reads the request body from a file, keeping shell quoting out of the way. See [curl](https://curl.se/docs/manpage.html#-d).

### JSON shortcut
<!-- {: .-snippet} -->

```bash
curl --json '{"name":"Ada"}' \
  https://api.example.com/items
```
<!-- {: data-highlight="--json"} -->

`--json` sets the JSON headers and POST method in one flag; see [curl](https://curl.se/docs/manpage.html#--json).
