---
title: "Phoenix: Ecto migrations"
category: Elixir
weight: -1
updated: 2020-02-23
---

### Creating

```bash
$ mix ecto.gen.migration update_posts_table
  creating priv/repo/migrations/20160602085927_update_posts_table.exs
  ···
```

```bash
$ mix ecto.migrate
$ mix ecto.rollback
```

Creates a migration (no models).

### Creating models

```bash
$ mix phoenix.gen.model Message messages user_id:integer content:text
```

This is only for Phoenix 1.2 or older; models aren't available in Phoenix 1.3+.

### Creating context

```bash
$ mix phx.gen.context Images Album albums title:string subtitle:string privacy:string
```
 
## Migration functions

### Creating tables

```elixir
create table(:documents) do
  add :title, :string
  add :title, :string, size: 40
  add :title, :string, default: "Hello"
  add :title, :string, default: fragment("now()")
  add :title, :string, null: false
  add :body, :text
  add :age, :integer
  add :price, :float
  add :price, :float
  add :price, :decimal, precision: 10, scale: 2
  add :published_at, :utc_datetime
  add :group_id, references(:groups)
  add :object, :json

  timestamps  # inserted_at and updated_at
end

create_if_not_exists table(:documents) do: ... end
```

### Other operations

```elixir
alter table(:posts) do
  add :summary, :text
  modify :title, :text
  remove :views
end
```

```elixir
rename table(:posts), :title, to: :summary
rename table(:posts), to: table(:new_posts)
```

```elixir
drop table(:documents)
drop_if_exists table(:documents)
```

```elixir
table(:documents)
table(:weather, prefix: :north_america)
```

### Indices

```elixir
create index(:posts, [:slug], concurrently: true)
create unique_index(:posts, [:slug])
drop index(:posts, [:name])
```

### Execute SQL

```elixir
execute "UPDATE posts SET published_at = NULL"
execute create: "posts", capped: true, size: 1024
```

## References

- [Ecto.Migration](http://devdocs.io/phoenix/ecto/ecto.migration)
