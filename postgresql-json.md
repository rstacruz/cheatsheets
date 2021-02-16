---
title: PostgreSQL JSON
layout: 2017/sheet
prism_languages: [sql]
updated: 2018-12-06
category: Databases
---

## Operators

### Accessors

```sql
SELECT * FROM users WHERE data->>'name' = 'John';
SELECT data->>'name' AS name FROM users;
```
{: .-setup}

| Operator       | Description                        | Example          | Returns |
| ----           | ----                               | ----             | ----    |
| `->` _int_     | Get array element `2`              | `data->2`        | JSON    |
| `->` _text_    | Get object key `name`              | `data->'name'`   | JSON    |
| `#>` _text[]_  | Get keypath `a,b` (eg, `data.a.b`) | `data#>'{a,b}'`  | JSON    |
| -
| `->>` _int_    | Get array element `2`              | `data->>2`       | Text    |
| `->>` _text_   | Get object key `name`              | `data->>'name'`  | Text    |
| `#>>` _text[]_ | Get keypath `a,b` (eg, `data.a.b`) | `data#>>'{a,b}'` | Text    |
{: .-headers.-shortcuts}

`>` returns JSON, `>>` returns text.

### Boolean operators

```sql
SELECT * FROM users WHERE data->tags ? 'admin';
SELECT data->tags ? 'admin' AS is_admin FROM users;
```
{: .-setup}

| Operator      | Description                   | Example                          |
| ----          | ----                          | ----                             |
| `?` _str_     | Does `data` have key `name`?  | `data ? 'name'`                  |
| `?|` _text[]_ | Does `data` have `a` or `b`?  | `data ?| array['a','b']`         |
| `?&` _text[]_ | Does `data` have `a` and `b`? | `data ?& array['a','b']`         |
| `@>` _jsonb_  | Does `left` include `right`?  | `data @> '{"b":2}'::jsonb`       |
| `<@` _jsonb_  | Does `right` include `left`?  | `data <@ '{"a":1,"b":2}'::jsonb` |
{: .-headers.-shortcuts.-left-align}

When `?`/`?|`/`?&` works on objects, it checks keys; when it works on arrays, it checks for elements.

## Updating

### Arrays and objects

```sql
UPDATE users SET tags = tags || array['admin'];
```
{: .-setup}

| Operator       |  Example                   |  Description
| ----           |  ----                      |  ----
| `||` _json_    |  `data || array['a','b']`  |  Concatenate
| `-` _str_      |  `data - 'a'`              |  Delete a key
| `-` _int_      |  `data - 1`                |  Delete an array item
| `#-` _text[]_  |  `data #- '{us,name}'`     |  Delete a path
{: .-headers.-shortcuts}

Only available in PostgreSQL 9.5+.

### jsonb_set

```sql
UPDATE users SET data = jsonb_set(data, '{name}', '"John"');
```

Only available in PostgreSQL 9.5+.

## Functions

#### fn(json) → json

```sql
jsonb_set(data, '{path}', value)
jsonb_strip_nulls(data)
```

#### fn(···) → json

```sql
to_json("Hello"::text)
array_to_json('{1,2}'::int[])
```

#### Iteration

```sql
SELECT * from json_each('{"a":1, "b":2}')
SELECT * from json_each_text('{"a":1, "b":2}')
-- key | value
```

This is an incomplete list, there's way too many!

See: [JSON functions](https://www.postgresql.org/docs/9.5/static/functions-json.html)

## More examples

- `'{"a":1}'::jsonb ? 'a'`
- `'["a"]'::jsonb ? 'a'`

## References

- <https://www.postgresql.org/docs/9.5/static/functions-json.html>
- <https://www.postgresql.org/docs/9.5/static/datatype-json.html>
