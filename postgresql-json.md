---
title: PostgreSQL JSON
subtitle: Types, operators and functions
category: Databases
updated: 2026-11-22
last_verified_with: "PostgreSQL 19.0 (postgres:19 Docker image), psql 19.0"
keywords: [postgres, jsonb, jsonpath, json functions]
intro: |
  PostgreSQL stores JSON as `json` (exact text) or `jsonb` (binary, indexable). This sheet covers extraction, containment, updates, and SQL/JSON paths.
links:
  - title: JSON functions and operators
    url: https://www.postgresql.org/docs/current/functions-json.html
  - title: JSON data types
    url: https://www.postgresql.org/docs/current/datatype-json.html
  - title: Indexing jsonb
    url: https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING
---

## Query JSON

### Extract fields

```sql
SELECT '{"name":"John"}'::jsonb -> 'name' AS j,  -- "John"
       '{"name":"John"}'::jsonb ->> 'name' AS t; -- John
```

#### Operators

| Operator      | Extracts             | Result  |
| ---           | ---                  | ---     |
| `->` _text_   | Object key           | `jsonb` |
| `->>` _text_  | Object key           | `text`  |
| `->` _int_    | Array item (0-based) | `jsonb` |
| `#>` _text[]_ | Nested path          | `jsonb` |
| `#>>` _text[]_ | Nested path         | `text`  |

<!-- {: .-headers} -->

Negative indexes count from the end: `'["a","b"]'::jsonb -> -1` is `"b"`.

### Query a table

```sql
CREATE TEMP TABLE users (id int, data jsonb);
INSERT INTO users VALUES
  (1, '{"name":"John","tags":["admin"]}'),
  (2, '{"name":"Jane","tags":["dev"]}');
SELECT id FROM users WHERE data->>'name' = 'John'; -- 1
```

Most examples below reuse `users`.

### Extract paths

```sql
SELECT '{"a":{"b":["x","y"]}}'::jsonb #> '{a,b,1}' AS j,  -- "y"
       '{"a":{"b":["x","y"]}}'::jsonb #>> '{a,b,1}' AS t; -- y
```

`#>` returns JSON; `#>>` returns text. A missing key yields SQL `NULL`.

### Existence and containment

```sql
SELECT '{"tags":["dev"]}'::jsonb ? 'tags' AS has_key,    -- t
       '{"tags":["dev"]}'::jsonb -> 'tags' ? 'dev' AS has_dev; -- t
```

#### Operators

| Operator      | Test                          |
| ---           | ---                           |
| `?` _text_    | Top-level key or array item   |
| <code>?&#124;</code> _text[]_ | Any of the keys or items     |
| `?&` _text[]_ | All of the keys or items      |
| `@>` _jsonb_  | Left contains right           |
| `<@` _jsonb_  | Left is contained in right    |

<!-- {: .-headers.-left-align} -->

`?` checks only the top level; `@>` nests and can use a GIN index.

## Modify JSON

### Concatenate

```sql
SELECT '{"a":1}'::jsonb || '{"b":2}'::jsonb AS merged;
-- {"a": 1, "b": 2}
SELECT '["a"]'::jsonb || '["b"]'::jsonb AS appended;
-- ["a", "b"]
```

Object merges are shallow; the right value wins. Arrays append.

### Delete keys and items

```sql
SELECT '{"a":1,"b":2}'::jsonb - 'a' AS dropped;
-- {"b": 2}
SELECT '["a","b","c"]'::jsonb - 1 AS dropped;
-- ["a", "c"]
SELECT '{"a":{"b":1}}'::jsonb #- '{a,b}' AS dropped;
-- {"a": {}}
```

`-` removes keys or array items; `#-` removes a nested path.

### Replace values

```sql
SELECT jsonb_set(
  '{"name":"John"}'::jsonb, '{name}', '"Jane"') AS updated;
-- {"name": "Jane"}
SELECT jsonb_set('{"a":1}'::jsonb, '{b}', '2', false) AS no_add;
-- {"a": 1}
SELECT jsonb_set_lax('{"a":1}'::jsonb, '{b}', NULL,
  true, 'use_json_null') AS set_null;
-- {"a": 1, "b": null}
SELECT jsonb_strip_nulls(
  '{"a":1,"b":null,"c":{"d":null}}') AS clean;
-- {"a": 1, "c": {}}
```

`jsonb_set` creates a missing final key by default; `false` disables it. `jsonb_set_lax` handles SQL `NULL` replacements, and `jsonb_strip_nulls` drops null object fields.

### Insert elements

```sql
SELECT jsonb_insert('{"a":[1,2]}'::jsonb, '{a,1}', '"x"') AS before;
-- {"a": [1, "x", 2]}
SELECT jsonb_insert(
  '{"a":[1,2]}'::jsonb, '{a,1}', '"x"', true) AS after;
-- {"a": [1, 2, "x"]}
```

Inserts before the array element at the path; `true` inserts after it.

### Subscript assignment

#### Read

```sql
SELECT ('{"a":{"b":1}}'::jsonb)['a']['b']; -- 1
```

#### Update

```sql
CREATE TEMP TABLE documents (data jsonb);
INSERT INTO documents VALUES ('{"a":1}');
UPDATE documents SET data['a'] = '2';
SELECT data FROM documents; -- {"a": 2}
```

Subscripting creates missing objects and pads arrays with `null` (14+).

## Build JSON

### From values

```sql
SELECT to_jsonb('hello'::text) AS scalar,
       jsonb_build_object('name','John','age',30) AS obj,
       jsonb_build_array(1,'two',true) AS arr;
-- "hello" | {"age": 30, "name": "John"} | [1, "two", true]
```

`to_json` and `array_to_json` return `json` instead of `jsonb`.

### From rows

```sql
SELECT jsonb_agg(data->>'name' ORDER BY id) AS names FROM users;
-- ["John", "Jane"]
SELECT jsonb_object_agg(k, v)
  FROM (VALUES ('a',1),('b',2)) AS t(k, v);
-- {"a": 1, "b": 2}
```

Add `ORDER BY` inside `jsonb_agg` for a predictable array order.

### Parse and validate

```sql
SELECT '{"a":1}' IS JSON AS valid, 'nope' IS JSON AS invalid;
-- t | f
SELECT '{"a":1, "a":2}'::json AS j, '{"a":1, "a":2}'::jsonb AS b;
-- {"a":1, "a":2} | {"a": 2}
```

`jsonb` normalizes whitespace, keeps the last duplicate key, and is indexable.

## Inspect JSON

### Expand objects

```sql
SELECT * FROM jsonb_each('{"a":1,"b":2}');
-- a | 1
-- b | 2
SELECT * FROM jsonb_object_keys('{"a":1,"b":2}');
-- a
-- b
```

Use `jsonb_each_text` when values should come back as `text`.

### Expand arrays

```sql
SELECT value FROM jsonb_array_elements_text('["a","b"]');
-- a
-- b
SELECT jsonb_array_length('["a","b"]') AS n; -- 2
```

`jsonb_array_elements` returns `jsonb` values instead of `text`.

### Types and pretty-print

```sql
SELECT jsonb_typeof('null'::jsonb) AS kind; -- null
SELECT jsonb_pretty('{"a":[1,2]}'::jsonb) AS pretty;
-- {
--     "a": [
--         1,
--         2
--     ]
-- }
```

`jsonb_typeof` returns `object`, `array`, `string`, `number`, `boolean`, or `null`.

## SQL/JSON paths

### Path predicates

```sql
SELECT '{"a":[1,2,3]}'::jsonb @? '$.a[*] ? (@ > 1)' AS any; -- t
SELECT '{"a":[1,2,3]}'::jsonb @@ '$.a[*] > 1' AS is_true; -- t
```

`@?` checks whether a path returns any item; `@@` evaluates a predicate.

### Query with jsonpath

```sql
SELECT * FROM jsonb_path_query(
  '{"a":[1,2,3]}', '$.a[*] ? (@ > 1)');
-- 2
-- 3
SELECT jsonb_path_query_array('{"a":[1,2,3]}',
  '$.a[*] ? (@ >= $min)', '{"min":2}') AS matched;
-- [2, 3]
```

`$` is the document root, `@` the current item, `$min` a supplied variable.

## SQL/JSON functions

### Scalar extraction

```sql
SELECT JSON_VALUE('{"a":123.45}'::jsonb, '$.a' RETURNING float) AS n;
-- 123.45
SELECT JSON_EXISTS(
  '{"a":[1,2,3]}'::jsonb, '$.a[*] ? (@ > 2)') AS found;
-- t
SELECT JSON_QUERY('{"a":[1,2]}'::jsonb, '$.a') AS arr;
-- [1, 2]
```

`JSON_VALUE` returns a scalar, `JSON_EXISTS` a boolean, `JSON_QUERY` JSON (17+).

### Rows from JSON

```sql
SELECT * FROM JSON_TABLE(
  '[{"a":1},{"a":2}]'::jsonb, '$[*]'
  COLUMNS (id FOR ORDINALITY, n int PATH '$.a')) AS jt;
-- 1 | 1
-- 2 | 2
```

`JSON_TABLE` turns JSON arrays into typed rows (17+).

## Index JSON

### GIN indexes

```sql
CREATE INDEX users_data_idx ON users USING GIN (data);
CREATE INDEX users_tags_idx ON users USING GIN ((data -> 'tags'));
```

An expression index targets a single extracted path such as `data -> 'tags'`.

### Operator classes

```sql
CREATE INDEX users_path_idx ON users
  USING GIN (data jsonb_path_ops);
```

#### Supported operators

| Operator            | `jsonb_ops` | `jsonb_path_ops` |
| ---                 | ---         | ---              |
| `?`, <code>?&#124;</code>, `?&`    | Yes         | No               |
| `@>`, `@?`, `@@`    | Yes         | Yes              |

<!-- {: .-headers} -->

`jsonb_path_ops` is smaller and faster for containment and path matches, but cannot answer key-existence queries.

