---
title: Phoenix: Migrations
category: Elixir
---

## Creating

```
$ mix ecto.gen.migration  add_posts_table
  creating priv/repo/migrations/20160602085927_add_posts_table.exs
  ...

$ mix ecto.migrate
$ mix ecto.rollback
```


## Tables

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
  add :price, :float, precision: 10, scale: 2
  add :published_at, :datetime
  add :group_id, references(:groups)
  add :object, :json

  timestamps  # inserted_at and updated_at
end

create_if_not_exists table(:documents) do: ... end
```

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

table(:documents)
table(:weather, prefix: :north_america)
```

## Indices

```elixir
create index(:posts, [:slug], concurrently: true)
create unique_index(:posts, [:slug])
drop index(:posts, [:name])
```

## Execute

```elixir
execute "UPDATE posts SET published_at = NULL"
execute create: "posts", capped: true, size: 1024
```

## References

* [Ecto.Migration](http://devdocs.io/phoenix/ecto/ecto.migration)
