---
title: How to export a SQLite table to CSV
link_title: Export SQLite to CSV
subtitle: Write query results to CSV
logo: { src: /assets/logos/sqlite.svg, mono: true }
category: Databases
layout: snippet
tier: t3
last_verified_with: "SQLite 3.54.0."
created_at: 2026-11-27
updated: 2026-11-28
links:
  - title: CSV export
    url: https://sqlite.org/cli.html#export_to_csv
---

## Exporting CSV
<!-- {: .-snippets} -->

### Export one query
<!-- {: .-snippet} -->

```sh
sqlite3 app.db ".mode csv" ".headers on" \
  ".once users.csv" "select * from users;"
```
<!-- {: data-highlight=".once users.csv"} -->

**Writes one result.** `.once` sends a single query's output to a file and reverts to stdout afterwards. See [CSV export](https://sqlite.org/cli.html#export_to_csv).

### Export from the shell
<!-- {: .-snippet} -->

```sh
sqlite3 -header -csv app.db \
  "select * from users;" > users.csv
```
<!-- {: data-highlight="-header -csv"} -->

**Sets format with flags.** The shell redirects the output, so no dot-commands are needed. See [command-line shell](https://sqlite.org/cli.html#export_to_csv).

### Export every result
<!-- {: .-snippet} -->

```sh
sqlite3 app.db ".mode csv" ".headers on" \
  ".output out.csv" "select * from users;"
```
<!-- {: data-highlight=".output out.csv"} -->

**Redirects all output until reset.** Use `.output` for several queries and `.once` for just one; see [CSV export](https://sqlite.org/cli.html#export_to_csv).
