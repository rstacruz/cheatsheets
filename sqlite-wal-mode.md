---
title: How to enable WAL mode in SQLite
link_title: Enable WAL mode
subtitle: Improve read and write concurrency
logo: { src: /assets/logos/sqlite.svg, mono: true }
category: Databases
layout: snippet
tier: t3
last_verified_with: "SQLite 3.54.0."
created_at: 2026-11-27
updated: 2026-11-28
links:
  - title: Write-ahead logging
    url: https://sqlite.org/wal.html
  - title: PRAGMA
    url: https://sqlite.org/pragma.html
---

## Configuring WAL
<!-- {: .-snippets} -->

### Turn on WAL
<!-- {: .-snippet} -->

```sh
sqlite3 app.db "PRAGMA journal_mode=WAL;"
```
<!-- {: data-highlight="journal_mode=WAL"} -->

**Switches to WAL mode.** The command prints `wal`, and the setting persists in the file. See [WAL](https://sqlite.org/wal.html).

### Check the mode
<!-- {: .-snippet} -->

```sh
sqlite3 app.db "PRAGMA journal_mode;"
```
<!-- {: data-highlight="journal_mode"} -->

**Prints the current journal mode.** WAL persists across connections; other modes revert; see [journal_mode](https://sqlite.org/pragma.html#pragma_journal_mode).

### Wait for locks
<!-- {: .-snippet} -->

```sh
sqlite3 app.db "PRAGMA busy_timeout=5000;"
```
<!-- {: data-highlight="busy_timeout=5000"} -->

**Waits five seconds.** A locked operation fails only after the timeout; set it on every connection, since it is not stored in the file. See [busy_timeout](https://sqlite.org/pragma.html#pragma_busy_timeout).

### Checkpoint the log
<!-- {: .-snippet} -->

```sh
sqlite3 app.db "PRAGMA wal_checkpoint(TRUNCATE);"
```
<!-- {: data-highlight="wal_checkpoint(TRUNCATE)"} -->

**Folds the WAL back.** The checkpoint writes into the database file and prints `0|0|0` when no connection blocks it. See [checkpointing](https://sqlite.org/wal.html#checkpointing).
