---
title: Arel
---

### Tables

```rb
users = Arel::Table.new(:users)
```

### Fields

```rb
users[:name]
users[:id]
```

### `where` (restriction)

```rb
users.where(users[:name].eq('amy'))
# SELECT * FROM users WHERE users.name = 'amy'
```

### `select` (projection)

```rb
users.project(users[:id])
# SELECT users.id FROM users
```

### `join`

```rb
users.join(photos)
users.join(photos, Arel::Nodes::OuterJoin).on(users[:id].eq(photos[:user_id]))
```

### `limit` / `offset`

```rb
users.take(5) # => SELECT * FROM users LIMIT 5
users.skip(4) # => SELECT * FROM users OFFSET 4
```

### Aggregates

```rb
users.project(users[:age].sum) # .average .minimum .maximum
users.project(users[:id].count)
users.project(users[:id].count.as('user_count'))
```
