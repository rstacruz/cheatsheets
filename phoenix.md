---
title: Phoenix
category: Elixir
---

### Directory

```
config/
web/
  controllers/
  models/
  views/

  templates/
  static/
```

## Migrations

```
$ mix ecto.gen.migration  add_posts_table
  creating priv/repo/migrations/20160602085927_add_posts_table.exs
  ...

$ mix ecto.migrate
```

### [Ecto.Migration](http://devdocs.io/phoenix/ecto/ecto.migration)

```
create index(:posts, [:slug], concurrently: true)
create table(:documents) do
  add :body, :string
  add :deletion_key, :string

  timestamps
end
```
