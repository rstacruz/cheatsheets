---
title: Arel
subtitle: SQL abstraction library for Rails
logo: { src: /assets/logos/rails.svg }
category: Rails
intro: |
  Arel is an SQL abstraction library built into Ruby on Rails.
last_verified_with: "Arel 9.0."
updated: 2026-11-25
tier: t3
links:
  - title: https://github.com/rails/arel
    url: https://github.com/rails/arel
---

### Tables

```rb
users = Arel::Table.new(:users)
users = User.arel_table  # ActiveRecord model
```

See: [Arel::Table](https://www.rubydoc.info/gems/arel/Arel/Table)

### Fields

```rb
users[:name]
users[:id]
```

See: [Column access](https://www.rubydoc.info/gems/arel/Arel/Table#[]-instance_method)

### `where` (restriction)

```rb
users.where(users[:name].eq('amy'))
# SELECT * FROM users WHERE users.name = 'amy'
```

See: [Arel::Table#where](https://www.rubydoc.info/gems/arel/Arel/Table#where-instance_method)

### `select` (projection)

```rb
users.project(users[:id])
# SELECT users.id FROM users
```

See: [Arel::Table#project](https://www.rubydoc.info/gems/arel/Arel/Table#project-instance_method)

### `join`

#### Basic join

```rb
# ActiveRecord uses the association name
users.joins(:photos)
```

```rb
# Arel uses the table object
photos = Photo.arel_table
users.join(photos)
users.join(photos, Arel::Nodes::OuterJoin)
  .on(users[:id].eq(photos[:user_id]))
```

#### Join with conditions

```rb
users.joins(:photos).merge(Photo.where(published: true))
```

```rb
# add more SQL conditions when the simple version isn't enough
users.join(
  users.join(photos, Arel::Nodes::OuterJoin)
    .on(
      photos[:user_id].eq(users[:id])
        .and(photos[:published].eq(true))
    )
)
```

#### Advanced join

```rb
creators = User.arel_table.alias('creators')
updaters = User.arel_table.alias('updaters')
photos = Photo.arel_table

photos_with_credits = photos
  .join(
    photos
      .join(creators, Arel::Nodes::OuterJoin)
      .on(photos[:created_by_id].eq(creators[:id]))
  )
  .join(
    photos
      .join(updaters, Arel::Nodes::OuterJoin)
      .on(photos[:assigned_id].eq(updaters[:id]))
  )
  .project(
    photos[:name],
    photos[:created_at],
    creators[:name].as('creator'),
    updaters[:name].as('editor')
  )

photos_with_credits.to_sql
# => "SELECT `photos`.`name`, `photos`.`created_at`,
#         `creators`.`name` AS creator, `updaters`.`name` AS editor
#      FROM `photos` INNER JOIN (SELECT FROM `photos`
#         LEFT OUTER JOIN `users` `creators`
#         ON `photos`.`created_by_id` = `creators`.`id`)
#         INNER JOIN (SELECT FROM `photos`
#         LEFT OUTER JOIN `users` `updaters`
#         ON `photos`.`updated_by_id` = `updaters`.`id`)"

# named attributes are available on the returned records
photos_with_credits.map { |x|
  "#{photo.name} - copyright #{photo.created_at.year} " \
    "#{photo.creator}, edited by #{photo.editor}"
}.join('; ')
```

Aliases let you join the same table with different meanings.

See: [Arel::Table#join](https://www.rubydoc.info/gems/arel/Arel/Table#join-instance_method)

### `limit` / `offset`

```rb
users.take(5) # => SELECT * FROM users LIMIT 5
users.skip(4) # => SELECT * FROM users OFFSET 4
```

See: [Arel::Table](https://www.rubydoc.info/gems/arel/Arel/Table)

### Aggregates

```rb
users.project(users[:age].sum) # .average .minimum .maximum
users.project(users[:id].count)
users.project(users[:id].count.as('user_count'))
```

See: [Arel::Expressions](https://www.rubydoc.info/gems/arel/Arel/Expressions)

### `order`

```rb
users.order(users[:name])
users.order(users[:name], users[:age].desc)
users.reorder(users[:age])
```

See: [Arel::Table#order](https://www.rubydoc.info/gems/arel/Arel/Table#order-instance_method)

### With ActiveRecord

```rb
User.arel_table
User.where(id: 1).arel
```

See: [arel_table](https://api.rubyonrails.org/classes/ActiveRecord/Core/ClassMethods.html#method-i-arel_table)

### Clean code with arel

```rb
# keep the clever logic in scopes
photos_with_credits = Photo.with_creator.with_editor
```

```rb
# store requests in variables, then add SQL segments
all_time      = photos_with_credits.count
this_month    = photos_with_credits.where(
  photos[:created_at].gteq(Date.today.beginning_of_month)
)
recent_photos = photos_with_credits.where(
  photos[:created_at].gteq(Date.today.beginning_of_month)
).limit(5)
```

See: [Arel::SelectManager](https://www.rubydoc.info/gems/arel/Arel/SelectManager)
