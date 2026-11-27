---
title: How to upsert in SQLite
link_title: Upsert in SQLite
subtitle: Insert or update a row
logo: { src: /assets/logos/sqlite.svg, mono: true }
category: Databases
layout: snippet
tier: t3
last_verified_with: "SQLite 3.54.0."
updated: 2026-11-27
links:
  - title: UPSERT
    url: https://sqlite.org/lang_upsert.html
---

## Upserting rows
<!-- {: .-snippets} -->

### Update on conflict
<!-- {: .-snippet} -->

```sql
INSERT INTO users (id, name, email)
VALUES (1, 'Ada Lovelace', 'ada@example.com')
ON CONFLICT(id) DO UPDATE
SET name = excluded.name;
```
<!-- {: data-highlight="ON CONFLICT(id)"} -->

**Updates the row when its key exists.** `excluded` holds the values the insert proposed; see [UPSERT](https://sqlite.org/lang_upsert.html).

### Do nothing on conflict
<!-- {: .-snippet} -->

```sql
INSERT INTO users (id, name)
VALUES (1, 'Duplicate')
ON CONFLICT(id) DO NOTHING;
```
<!-- {: data-highlight="DO NOTHING"} -->

**Skips the insert instead of failing.** Only the targeted conflict is ignored, while `INSERT OR IGNORE` also ignores other constraint failures; see [UPSERT](https://sqlite.org/lang_upsert.html).

### Upsert on a unique column
<!-- {: .-snippet} -->

```sql
INSERT INTO users (name, email)
VALUES ('Ada L', 'ada@example.com')
ON CONFLICT(email) DO UPDATE
SET name = excluded.name;
```
<!-- {: data-highlight="ON CONFLICT(email)"} -->

**Targets the unique index on `email`.** The conflict target must match a unique constraint; see [UPSERT](https://sqlite.org/lang_upsert.html).
