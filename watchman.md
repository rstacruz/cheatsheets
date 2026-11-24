---
title: Watchman
category: Build tools
subtitle: File watching service
updated: 2026-11-24
last_verified_with: "Watchman 2026.11.23.00."
weight: -1
keywords:
- "watchman watch ~/src"
- "watchman watch-list"
- "watchman -- trigger ~/rsc remake '*.js' -- make "
---

## Getting started

<!-- {: .-three-column} -->

### Watch a directory

```sh
watchman watch-project ~/src
```

`watch-project` is recommended since 3.1 and reports the root it settled on; `watchman watch` is deprecated.

### List watches

```sh
watchman watch-list
```

### Stop watching

```sh
watchman watch-del ~/src
```

Stopping a watch also drops its triggers. Watches and triggers are saved and restored after a restart unless the server runs with `--no-save-state`.

## Triggers

### Add a trigger

```sh
watchman -- trigger ~/src retest '*.js' -- npm test
```

The first `--` ends watchman's own options; the second separates the pattern from the command.

### List triggers

```sh
watchman trigger-list ~/src
```

### Remove a trigger

```sh
watchman trigger-del ~/src retest
```

## Also see

* [Documentation](https://facebook.github.io/watchman/docs/install.html) _(facebook.github.io)_
