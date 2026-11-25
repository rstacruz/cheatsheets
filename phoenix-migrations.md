---
title: "Phoenix: Ecto migrations"
subtitle: Database migration tasks
category: Elixir
weight: -1
updated: 2026-11-23
last_verified_with: "Phoenix 1.8.17, Ecto 3.14.3, Ecto SQL 3.14.0."
tier: t3
---

## Generators

### Create a migration

#### Generate

```bash
$ mix ecto.gen.migration update_posts_table
```
<!-- {: data-highlight="mix ecto.gen.migration"} -->

#### Apply or undo

```bash
$ mix ecto.migrate
$ mix ecto.rollback
```
<!-- {: data-highlight="mix ecto.migrate; mix ecto.rollback"} -->

`ecto.migrate` applies pending migrations; `ecto.rollback` undoes the last one.

See: [mix ecto.gen.migration](https://hexdocs.pm/ecto_sql/Mix.Tasks.Ecto.Gen.Migration.html)

### Create a schema

```bash
$ mix phx.gen.schema Message messages \
  user_id:references:users content:text
```
<!-- {: data-highlight="mix phx.gen.schema"} -->

Generates a schema and migration; `phoenix.gen.model` is gone since Phoenix 1.3.

See: [mix phx.gen.schema](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Schema.html)

### Create a context

```bash
$ mix phx.gen.context Images Album albums \
  title:string subtitle:string privacy:string
```
<!-- {: data-highlight="mix phx.gen.context"} -->

See: [mix phx.gen.context](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Context.html)

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
  add :price, :decimal, precision: 10, scale: 2
  add :published_at, :utc_datetime
  add :group_id, references(:groups)
  add :object, :json

  timestamps  # inserted_at, updated_at
end

create_if_not_exists table(:documents) do
  add :title, :string
end
```
<!-- {: data-highlight="create table; create_if_not_exists"} -->

See: [table/2](https://hexdocs.pm/ecto_sql/Ecto.Migration.html#table/2)

### Other operations

#### Alter columns

```elixir
alter table(:posts) do
  add :summary, :text
  modify :title, :text
  remove :views
end
```
<!-- {: data-highlight="alter table"} -->

#### Rename

```elixir
rename table(:posts), :title, to: :summary
rename table(:posts), to: table(:new_posts)
```
<!-- {: data-highlight="rename table"} -->

#### Drop

```elixir
drop table(:documents)
drop_if_exists table(:documents)
```
<!-- {: data-highlight="drop table; drop_if_exists"} -->

#### Reference a table

```elixir
table(:documents)
table(:weather, prefix: :north_america)
```
<!-- {: data-highlight="table("} -->

See: [alter/2](https://hexdocs.pm/ecto_sql/Ecto.Migration.html#alter/2)

### Indices

```elixir
create index(:posts, [:slug], concurrently: true)
create unique_index(:posts, [:slug])
drop index(:posts, [:name])
```
<!-- {: data-highlight="create index; create unique_index; drop index"} -->

See: [index/3](https://hexdocs.pm/ecto_sql/Ecto.Migration.html#index/3)

### Execute SQL

```elixir
execute "UPDATE posts SET published_at = NULL"
execute create: "posts", capped: true, size: 1024
```
<!-- {: data-highlight="execute"} -->

See: [execute/1](https://hexdocs.pm/ecto_sql/Ecto.Migration.html#execute/1)

## References

- [Ecto.Migration](https://hexdocs.pm/ecto_sql/Ecto.Migration.html)
