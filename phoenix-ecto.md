---
title: "Phoenix: Ecto"
category: Elixir
tags: [WIP]
updated: 2017-08-30
---

## Schemas
{: .-three-column}

### Generating

```bash
$ mix phx.gen.html \
    Accounts \       # domain
    Profile \        # schema
    profiles \       # table name
    email:string \
    age:integer
```

### Schema

```elixir
defmodule Myapp.Accounts.User do
  use Ecto.Schema

  schema "users" do
    field :name
    field :age, :integer
    field :password, virtual: true

    timestamps()
  end
end
```

### Field types

| Field |
| --- |
| `:id` |
| `:binary` |
| `:boolean` |
| `:string` |
| --- |
| `:integer` |
| `:float` |
| `:decimal` |
| --- |
| `{:array, inner_type}` |
| `:map` |
{: .-left-align}

## Changesets

### Changesets

```elixir
def changeset(user, params \\ :empty) do
  %User{}
  |> Ecto.Changeset.change   # basic casting to changeset

  user
  |> cast(params, ~w(name email), ~w(age)) # params to Changeset

  |> validate_format(:email, ~r/@/)

  |> validate_inclusion(:age, 18..100)
  |> validate_exclusion(:role, ~w(admin superadmin))
  |> validate_subset(:pets, ~w(cat dog parrot whale))

  |> validate_length(:body, min: 1)
  |> validate_length(:body, min: 1, max: 160)
  |> validate_length(:partners, is: 2)

  |> validate_number(:pi, greater_than: 3)
  |> validate_number(:pi, less_than: 4)
  |> validate_number(:pi, equal_to: 42)

  |> validate_change(:title, fn _, _ -> [])
  |> validate_confirmation(:password, message: "does not match")

  |> unique_constraint(:email)
  |> foreign_key_constraint(:post_id)
  |> assoc_constraint(:post)      # ensure post_id exists
  |> no_assoc_constraint(:post)   # negative (useful for deletions)
end
```

### Changeset fields

```elixir
changeset.valid?
changeset.errors     #=> [title: "empty"]

changeset.changes    #=> %{}
changeset.params[:title]

changeset.required   #=> [:title]
changeset.optional   #=> [:body]
```

### Updating

```elixir
changeset #(or model)
|> change(title: "New title")
|> change(%{ title: "New title" })
|> put_change(:title, "New title")
|> force_change(:title, "New title")
|> update_change(:title, &(&1 <> "..."))

|> delete_change(:title)
|> merge(other_changeset)

|> add_error(:title, "empty")
```

### Getting

```elixir
get_change(changeset, :title)    #=> "hi" (if changed)
get_field(changeset, :title)     #=> "hi" (even if unchanged)

fetch_change(changeset, :title)  #=> {:ok, "hi"} | :error
fetch_field(changeset, :title)   #=> {:changes | :model, "value"} | :error
```

## Repo

### Get one

```elixir
Repo.get(User, id)
Repo.get_by(User, email: "john@hello.com")  #=> %User{} | nil

# also get! get_by!
```

### Create/update

```elixir
changeset |> Repo.update
changeset |> Repo.insert
changeset |> Repo.insert_or_update
```

```
User
|> Ecto.Changeset.change(%{name: "hi"})
|> Repo.insert
```

## Many

### Queries

```elixir
from p in Post,
  where: p.title == "Hello",
  where: [state: "Sweden"],

  limit: 1,
  offset: 10,

  order_by: c.name,
  order_by: [c.name, c.title],
  order_by: [asc: c.name, desc: c.title],

  preload: [:comments],
  preload: [comments: {c, likes: l}],

  join: c in assoc(c, :comments),
  join: p in Post, on: c.post_id == p.id,
  group_by: p,

  select: p,
  select: {p.title, p.description},
  select: [p.title, p.description],
```

### Get many

```elixir
Repo.all(User)
```

### Update many

```elixir
Repo.update_all(Post, set: [title: "Title"])
Repo.update_all(Post, inc: [views: 1])
```

### Chaining `_all` with queries

```elixir
from(p in Post, where: p.id < 10)
|> Repo.update_all(...)

from(p in Post, where: p.id < 10)
|> Repo.all()
```

## References
{: .-one-column}

- Based on Ecto 1.3.
