---
title: How to query JSON in SQLite
link_title: Query JSON in SQLite
subtitle: Extract values from JSON columns
category: Databases
layout: snippet
last_verified_with: "SQLite 3.54.0."
updated: 2026-11-27
links:
  - title: JSON functions
    url: https://sqlite.org/json1.html
---

## Querying JSON
<!-- {: .-snippets} -->

### Extract a field
<!-- {: .-snippet} -->

```sql
SELECT json_extract(payload, '$.type') AS type
FROM events;
```
<!-- {: data-highlight="json_extract"} -->

#### Output

```text
click
view
```

**Reads one value from a JSON column.** The path starts at `$` and uses dots for keys; see [json_extract](https://sqlite.org/json1.html#the_json_extract_function).

### Return plain text
<!-- {: .-snippet} -->

```sql
SELECT payload ->> '$.type' AS type
FROM events;
```
<!-- {: data-highlight="->>"} -->

**Unquotes the extracted value.** `->` keeps JSON quoting, so a string comes back as `"click"`; see [JSON operators](https://sqlite.org/json1.html#the_and_operators).

### Expand an array
<!-- {: .-snippet} -->

```sql
SELECT events.id, tags.value AS tag
FROM events,
     json_each(events.payload, '$.tags')
       AS tags;
```
<!-- {: data-highlight="json_each("} -->

**Turns each array element into a row.** `json_each` is a table-valued function, so it works in a `FROM` clause; see [json_each](https://sqlite.org/json1.html#table_valued_functions_for_parsing_json_json_each_jsonb_each_json_tree_and_jsonb_tree_).

### Filter rows
<!-- {: .-snippet} -->

```sql
SELECT id FROM events
WHERE json_extract(payload, '$.type')
      = 'click';
```
<!-- {: data-highlight="WHERE json_extract("} -->

**Keeps rows whose JSON field matches.** Index the expression with `CREATE INDEX ... ON events(json_extract(payload, '$.type'))` for large tables; see [JSON functions](https://sqlite.org/json1.html).
