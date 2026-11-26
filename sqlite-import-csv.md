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
    url: https://sqlite.org/cli.html#importing_files_as_csv_or_other_formats
---

## Importing CSV
<!-- {: .-snippets} -->

### Create a table from the header
<!-- {: .-snippet} -->

```sh
sqlite3 app.db \
  ".import --csv people.csv people"
```
<!-- {: data-highlight=".import"} -->

**Creates the table from the first row.** Column names come from the header; see [.import](https://sqlite.org/cli.html#importing_files_as_csv_or_other_formats).

### Import into an existing table
<!-- {: .-snippet} -->

```sh
sqlite3 app.db \
  ".import --csv --skip 1 users.csv users"
```
<!-- {: data-highlight="--skip 1"} -->

**Loads rows into a table that already exists.** `--skip 1` drops the header, and columns fill in table order; see [.import](https://sqlite.org/cli.html#importing_files_as_csv_or_other_formats).

### Check the imported rows
<!-- {: .-snippet} -->

```sh
sqlite3 app.db \
  ".mode box" ".headers on" \
  "select * from users;"
```
<!-- {: data-highlight="select *"} -->

**Prints the loaded rows.** Run it after an import to confirm the column mapping; see [.import](https://sqlite.org/cli.html#importing_files_as_csv_or_other_formats).
