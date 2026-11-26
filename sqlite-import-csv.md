---
title: How to import a CSV into SQLite
link_title: Import CSV into SQLite
subtitle: Load rows with dot-import
category: Databases
layout: snippet
last_verified_with: "SQLite 3.54.0."
updated: 2026-11-27
links:
  - title: .import
    url: https://sqlite.org/cli.html#import
---

## Importing CSV
<!-- {: .-snippets} -->

### Import into a table
<!-- {: .-snippet} -->

```sh
sqlite3 app.db \
  ".import --csv --skip 1 users.csv users"
```
<!-- {: data-highlight="--skip 1"} -->

**Loads the rows into an existing table.** `--skip 1` drops the header, and columns fill in table order; see [.import](https://sqlite.org/cli.html#import).

### Create a table from the header
<!-- {: .-snippet} -->

```sh
sqlite3 app.db \
  ".import --csv people.csv people"
```
<!-- {: data-highlight="--csv"} -->

**Creates the table from the first row.** Column names come from the header; see [.import](https://sqlite.org/cli.html#import).

### Check the imported rows
<!-- {: .-snippet} -->

```sh
sqlite3 app.db \
  ".mode box" ".headers on" \
  "select * from users;"
```
<!-- {: data-highlight="select *"} -->

**Prints the loaded rows.** Run it after an import to confirm the column mapping; see [.import](https://sqlite.org/cli.html#import).
