---
title: How to back up a SQLite database
link_title: Back up SQLite
subtitle: Safe copies and SQL dumps
logo: { src: /assets/logos/sqlite.svg, mono: true }
category: Databases
layout: snippet
tier: t3
last_verified_with: "SQLite 3.54.0."
updated: 2026-11-28
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

**Takes a consistent copy.** It works while the database is in use; copying the file with `cp` can capture a partial write. See [backup](https://sqlite.org/backup.html).

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

**Exports SQL.** Schema and data go into the file; load it into a new database with `sqlite3 new.db < dump.sql`. See [.dump](https://sqlite.org/cli.html#converting_an_entire_database_to_a_text_file).

### Restore a copy
<!-- {: .-snippet} -->

```sh
sqlite3 app.db ".restore backup.db"
```
<!-- {: data-highlight=".restore backup.db"} -->

**Restores a copy.** It copies a SQLite database file into the current database; unlike `.dump`, the source must be a database file, not a SQL script. See [restore](https://sqlite.org/cli.html#other_dot_commands).
