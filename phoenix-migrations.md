---
title: "Phoenix: Ecto migrations"
subtitle: Database migration tasks
category: Elixir
weight: -1
updated: 2026-11-23
last_verified_with: "Phoenix 1.8.17, Ecto 3.14.3, Ecto SQL 3.14.0."
---

### Creating

#### Generate

```bash
$ mix ecto.gen.migration update_posts_table
```

#### Apply or undo

```bash
$ mix ecto.migrate
$ mix ecto.rollback
```

Creates a migration (no models).

### Creating schemas

```bash
$ mix phx.gen.schema Message messages \
    user_id:references:users content:text
```

Generates a schema and migration; `phoenix.gen.model` is gone since Phoenix 1.3.

### Creating context

```bash
$ mix phx.gen.context Images Album albums \
    title:string subtitle:string privacy:string
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

create_if_not_exists table(:documents) do
  add :title, :string
end
```

### Other operations

#### Alter columns

```elixir
alter table(:posts) do
  add :summary, :text
  modify :title, :text
  remove :views
end
```

#### Rename

```elixir
rename table(:posts), :title, to: :summary
rename table(:posts), to: table(:new_posts)
```

#### Drop

```elixir
drop table(:documents)
drop_if_exists table(:documents)
```

#### Reference a table

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

- [Ecto.Migration](https://hexdocs.pm/ecto_sql/Ecto.Migration.html)
