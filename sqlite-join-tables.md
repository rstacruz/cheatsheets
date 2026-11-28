---
title: How to join tables in SQLite
link_title: Join tables in SQLite
subtitle: Combine rows from two tables
logo: { src: /assets/logos/sqlite.svg, mono: true }
category: Databases
layout: snippet
tier: t3
last_verified_with: "SQLite 3.54.0."
created_at: 2026-11-27
updated: 2026-11-28
links:
  - title: SQLite SELECT
    url: https://sqlite.org/lang_select.html
  - title: SQL joins cheatsheet
    url: /sql-join
---

## Joining tables
<!-- {: .-snippets} -->

### Join two tables
<!-- {: .-snippet} -->

```sql
SELECT users.name,
       count(posts.id) AS posts
FROM users
LEFT JOIN posts
  ON posts.user_id = users.id
GROUP BY users.id;
```
<!-- {: data-highlight="LEFT JOIN"} -->

#### Output

```text
Ada|2
Grace|1
Linus|0
```

**Counts posts for every user.** `LEFT JOIN` keeps users with no matching row; see [SELECT](https://sqlite.org/lang_select.html).

### Join three tables
<!-- {: .-snippet} -->

```sql
SELECT users.name,
       posts.title,
       comments.body
FROM users
JOIN posts ON posts.user_id = users.id
JOIN comments
  ON comments.post_id = posts.id;
```
<!-- {: data-highlight="JOIN comments"} -->

#### Output

```text
Ada|Hello|Nice
Ada|Again|Thanks
```

**Chains the joins.** It joins three tables through the middle one; each `JOIN` can read the tables above it. See [SELECT](https://sqlite.org/lang_select.html).

### Keep unmatched rows
<!-- {: .-snippet} -->

```sql
SELECT users.name
FROM users
LEFT JOIN posts
  ON posts.user_id = users.id
WHERE posts.id IS NULL;
```
<!-- {: data-highlight="IS NULL"} -->

#### Output

```text
Linus
```

**Finds users without posts.** The `IS NULL` test keeps only rows where the join found nothing; see [SELECT](https://sqlite.org/lang_select.html).
