---
title: Postgresql JSON
category: Development
---

```
SELECT * FROM users WHERE data->>'name' = 'John'
SELECT data->>'name' AS name FROM users
```

| Operator | Example          | Description                        | Returns |
| ----     | ----             | ----                               | ----    |
| `->`     | `data->2`        | Get array element `2`              | JSON    |
| `->`     | `data->'name'`   | Get object key `name`              | JSON    |
| `#>`     | `data#>'{a,b}'`  | Get keypath `a,b` (eg, `data.a.b`) | JSON    |
| ----     | ----             | ----                               | ----    |
| `->>`    | `data->>2`       | Get array element `2`              | text    |
| `->>`    | `data->>'name'`  | Get object key `name`              | text    |
| `#>`     | `data#>>'{a,b}'` | Get keypath `a,b` (eg, `data.a.b`) | text    |

`>` returns JSON, `>>` returns text.

### Boolean operators

| Operator | Example                                      | Description                     |
| ----     | ----                                         | ----                            |
| `?`      | `data ? 'name'`                              | Does `data` have key `name`?    |
| `?|`     | `data ?| array['a','b']`                     | Does `data` have `a` or `b`?    |
| `?&`     | `data ?& array['a','b']`                     | Does `data` have `a` and `b`?   |
| `@>`     | `'{"a":1,"b":2}'::jsonb @> '{"b":2}'::jsonb` | Does `left` include `right`?    |
| `<@`     | `'{"a":1}'::jsonb <@ '{"a":1,"b":2}'::jsonb` | Does `right` include `left`?    |

When `?`/`?|`/`?&` works on objects, it checks keys; when it works on arrays, it checks for elements.

- `'{"a":1}'::jsonb ? 'a'`
- `'["a"]'::jsonb ? 'a'`

## References

- <https://www.postgresql.org/docs/9.4/static/functions-json.html>
- <https://www.postgresql.org/docs/9.4/static/datatype-json.html>
