---
title: "Phoenix: Ecto models"
category: Elixir
---

## Schema

```elixir
defmodule User do
  use Ecto.Schema

  schema "users" do
    field :name
    field :age, :integer
  end
end
```

## Changesets

```elixir
def changeset(user, params \\ :empty) do
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
  |> assoc_constraint(:post)   # ensure post_id exists
  |> exclude_constraint(:name)
end
```

```elixir
changeset.valid?
changeset.errors     #=> [title: "empty"]

changeset.changes    #=> %{}
changeset.params
changeset.required   #=> [:title]
changeset.optional   #=> [:body]
```

### Updating

```elixir
changeset
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
