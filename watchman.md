---
title: Watchman
category: Build tools
subtitle: File watching service
logo: { src: /assets/logos/watchman.svg }
created_at: 2015-03-30
updated: 2026-11-24
last_verified_with: "Watchman 2026.11.23.00."
weight: -1
keywords:
- "watchman watch ~/src"
- "watchman watch-list"
- "watchman -- trigger ~/rsc remake '*.js' -- make "
tier: t3
intro: |
  Watchman watches directories and runs commands when files change. This sheet covers watches, triggers, and their lifecycle.
links:
  - title: Watchman documentation
    url: https://facebook.github.io/watchman/
  - title: Watchman installation and setup
    url: https://facebook.github.io/watchman/docs/install.html
  - title: Watchman source
    url: https://github.com/facebook/watchman
---

## Getting started

<!-- {: .-three-column} -->

### Watch a directory

```sh
watchman watch-project ~/src
```

`watch-project` is recommended since 3.1 and reports the root it settled on; `watchman watch` is deprecated.

See: [watch-project](https://facebook.github.io/watchman/docs/cmd/watch-project.html)

### List watches

```sh
watchman watch-list
```

See: [watch-list](https://facebook.github.io/watchman/docs/cmd/watch-list.html)

### Stop watching

```sh
watchman watch-del ~/src
```

Stopping a watch also drops its triggers. Watches and triggers are saved and restored after a restart unless the server runs with `--no-save-state`.

See: [watch-del](https://facebook.github.io/watchman/docs/cmd/watch-del.html)

## Triggers

<!-- {: .-three-column} -->

### Add a trigger

```sh
watchman -- trigger ~/src retest '*.js' \
  -- npm test
```

The first `--` ends watchman's own options; the second separates the pattern from the command.

See: [trigger](https://facebook.github.io/watchman/docs/cmd/trigger.html)

### List triggers

```sh
watchman trigger-list ~/src
```

See: [trigger-list](https://facebook.github.io/watchman/docs/cmd/trigger-list.html)

### Remove a trigger

```sh
watchman trigger-del ~/src retest
```

See: [trigger-del](https://facebook.github.io/watchman/docs/cmd/trigger-del.html)

## Also see

* [Documentation](https://facebook.github.io/watchman/docs/install.html) _(facebook.github.io)_
