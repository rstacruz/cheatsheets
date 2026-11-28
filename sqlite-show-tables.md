---
title: How to show tables in SQLite
link_title: Show tables in SQLite
subtitle: List tables, schema and columns
logo: { src: /assets/logos/sqlite.svg, mono: true }
category: Databases
layout: snippet
tier: t3
last_verified_with: "SQLite 3.54.0."
created_at: 2026-11-27
updated: 2026-11-28
links:
  - title: Command-line shell
    url: https://sqlite.org/cli.html
  - title: PRAGMA table_info
    url: https://sqlite.org/pragma.html#pragma_table_info
---

## Inspecting tables
<!-- {: .-snippets} -->

### List tables
<!-- {: .-snippet} -->

```sh
sqlite3 app.db ".tables"
# comments     events     posts     users
```
<!-- {: data-highlight=".tables"} -->

**Prints every table name.** Pass a pattern to filter, such as `.tables user%`; see [dot-commands](https://sqlite.org/cli.html).

### Show a table schema
<!-- {: .-snippet} -->

```sh
sqlite3 app.db ".schema posts"
```
<!-- {: data-highlight=".schema posts"} -->

#### Output

```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title TEXT
);
CREATE INDEX posts_user_id ON posts(user_id);
```

**Prints the CREATE statement.** It also lists indexes and triggers on the table; see [.schema](https://sqlite.org/cli.html).

### Show columns
<!-- {: .-snippet} -->

```sh
sqlite3 app.db "PRAGMA table_info(posts);"
```
<!-- {: data-highlight="PRAGMA table_info"} -->

#### Output

```text
0|id|INTEGER|0||1
1|user_id|INTEGER|0||0
2|title|TEXT|0||0
```

**Lists columns.** Each column appears with its type; the second field is the name and the last field is `1` for primary-key columns. See [table_info](https://sqlite.org/pragma.html#pragma_table_info).

### Show indexes
<!-- {: .-snippet} -->

```sh
sqlite3 app.db ".indexes posts"
```
<!-- {: data-highlight=".indexes posts"} -->

#### Output

```text
posts_user_id
```

**Prints the index names.** Without a pattern it lists indexes for the whole database; see [.indexes](https://sqlite.org/cli.html).
