---
title: Postgresql JSON
category: Development
---

```
SELECT * FROM users WHERE data->>'name' = 'John'
SELECT data->>'name' AS name FROM users
```

| Postgres | JavaScript pseudocode |
| ---- | ---- |
| WHERE `data->>'name'` = 'John' | `data.name` |
| WHERE `data ? 'name'`          | `data.hasOwnProperty('name')` |
| `jsonb_array_elements_text(data->'tags')`          | `data.map(d => d.tags).flatten.uniq` |
