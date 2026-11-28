---
title: Browsersync
subtitle: Live-reload dev server
logo: { set: icon-park-outline, name: refresh }
category: Build tools
intro: |
  `npm i -g browser-sync`
last_verified_with: "BrowserSync 3.0."
created_at: 2015-04-04
updated: 2026-11-25
tier: t3
links:
  - title: browsersync.io
    url: https://browsersync.io
---

### Start a server

```sh
browser-sync start --server <path> --files='**/*.html, **/*.css'
```

See: [Command line usage](https://browsersync.io/docs/command-line#start)

### Options

```sh
  --port=N
  --proxy="http://127.0.0.1:3000"
```

See: [Options](https://browsersync.io/docs/options)
