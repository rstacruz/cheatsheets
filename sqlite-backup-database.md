---
title: How to back up a SQLite database
link_title: Back up SQLite
subtitle: Safe copies and SQL dumps
logo: { src: /assets/logos/sqlite.svg, mono: true }
category: Databases
layout: snippet
tier: t3
last_verified_with: "SQLite 3.54.0."
updated: 2026-11-27
links:
  - title: Backup API
    url: https://sqlite.org/backup.html
  - title: VACUUM
    url: https://sqlite.org/lang_vacuum.html
---

## Backing up and restoring
<!-- {: .-snippets} -->

### Copy with .backup
<!-- {: .-snippet} -->

```sh
sqlite3 app.db ".backup backup.db"
```
<!-- {: data-highlight=".backup backup.db"} -->

**Takes a consistent copy while the database is in use.** Copying the file with `cp` can capture a partial write; see [backup](https://sqlite.org/backup.html).

### Snapshot with VACUUM INTO
<!-- {: .-snippet} -->

```sh
sqlite3 app.db "VACUUM INTO 'snapshot.db';"
```
<!-- {: data-highlight="VACUUM INTO"} -->

**Writes a compact copy.** It fails when the target exists, so remove old snapshots first; see [VACUUM](https://sqlite.org/lang_vacuum.html).

### Dump to SQL
<!-- {: .-snippet} -->

```sh
sqlite3 app.db ".dump" > dump.sql
```
<!-- {: data-highlight=".dump"} -->

**Exports schema and data as SQL.** Load the file into a new database with `sqlite3 new.db < dump.sql`; see [.dump](https://sqlite.org/cli.html#converting_an_entire_database_to_a_text_file).

### Restore a copy
<!-- {: .-snippet} -->

```sh
sqlite3 app.db ".restore backup.db"
```
<!-- {: data-highlight=".restore backup.db"} -->

**Copies a SQLite database file into the current database.** Unlike `.dump`, the source must be a database file, not a SQL script; see [restore](https://sqlite.org/cli.html#other_dot_commands).
