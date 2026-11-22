---
title: "Phoenix: Ecto"
subtitle: Database wrapper for Elixir
category: Elixir
updated: 2026-11-22
intro: |
  Ecto maps Elixir structs to a database and validates changes before persisting them. This reference covers schemas, changesets, Repo calls and queries.
links:
  - title: Ecto documentation
    url: https://hexdocs.pm/ecto
  - title: Basic CRUD guide
    url: https://hexdocs.pm/ecto/crud.html
---

## Schemas

### Generating

```bash
$ mix phx.gen.context Accounts User users \
    name:string email:string age:integer
```

Use `mix phx.gen.html` or `mix phx.gen.json` to add controllers and views.

### Schema

```elixir
defmodule MyApp.Accounts.User do
  use Ecto.Schema

  schema "users" do
    field :name, :string
    field :email, :string
    field :age, :integer
    field :password, :string, virtual: true

    has_many :posts, MyApp.Posts.Post
    timestamps(type: :utc_datetime)
  end
end
```

### Associations

```elixir
belongs_to :user, MyApp.Accounts.User
has_one :profile, MyApp.Accounts.Profile
has_many :comments, MyApp.Blog.Comment
many_to_many :tags, MyApp.Blog.Tag,
  join_through: "posts_tags"
```

`has_many` and `many_to_many` are loaded with `preload:` in queries.

### Field types

| Type |
| --- |
| `:id` |
| `:binary_id` |
| `:integer` |
| `:float` |
| `:decimal` |
| `:boolean` |
| --- |
| `:string` |
| `:binary` |
| `:bitstring` |
| `:map` |
| `{:map, inner_type}` |
| `{:array, inner_type}` |
| --- |
| `:date` |
| `:time` |
| `:time_usec` |
| `:naive_datetime` |
| `:naive_datetime_usec` |
| `:utc_datetime` |
| `:utc_datetime_usec` |
| --- |
| `:duration` |

<!-- {: .-left-align} -->

## Changesets

### Defining

```elixir
import Ecto.Changeset

def changeset(user, attrs \\ %{}) do
  user
  |> cast(attrs, [:name, :email, :age])
  |> validate_required([:name, :email])
  |> validate_format(:email, ~r/@/)
  |> validate_inclusion(:age, 18..100)
  |> unique_constraint(:email)
end
```

Cast external params with `cast/3`; use `change/2` for trusted values.

### Validations

```elixir
changeset
|> validate_required([:name, :email])
|> validate_format(:email, ~r/@/)
|> validate_inclusion(:age, 18..100)
|> validate_exclusion(:role, ["admin", "owner"])
|> validate_subset(:pets, ["cat", "dog"])
|> validate_length(:bio, min: 1, max: 160)
|> validate_number(:price, greater_than: 0)
|> validate_confirmation(:password)
|> validate_acceptance(:terms)
```

Most validations skip fields absent from `changes`; `validate_required/3` checks them too.

### Constraints

```elixir
changeset
|> unique_constraint(:email)
|> foreign_key_constraint(:post_id)
|> assoc_constraint(:post)
|> no_assoc_constraint(:comments)
```

Add matching database indexes or foreign keys; `assoc_constraint/3` needs a `belongs_to`.

### Inspecting

```elixir
changeset.valid?   #=> true
changeset.errors   #=> []
changeset.required #=> [:name, :email]
changeset.changes
#=> %{name: "Mary", email: "mary@example.com", age: 42}
changeset.params
#=> %{"age" => "42", "email" => "mary@example.com", "name" => "Mary"}
```

### Reading values

```elixir
get_change(changeset, :name)   #=> "New"
get_field(changeset, :name)    #=> "New"
fetch_change(changeset, :name) #=> {:ok, "New"}
fetch_field(changeset, :name)  #=> {:changes, "New"}
```

`get_field/2` also reads the unchanged value from `changeset.data`.

### Changing

```elixir
change(user, name: "New")
put_change(changeset, :name, "New")
force_change(changeset, :email, "forced@example.com")
update_change(changeset, :age, &(&1 + 1))
delete_change(changeset, :age)
merge(changeset, other_changeset)
add_error(changeset, :name, "taken")
```

`force_change/3` records a change even when the value is unchanged.

## Repo

### Fetching

```elixir
Repo.get(User, 1)
Repo.get_by(User, email: "john@example.com")
Repo.get_by!(User, email: "john@example.com")
Repo.get_by(User, email: "missing@example.com") #=> nil
Repo.one(from p in Post, where: p.title == "Hello")
Repo.exists?(Post)                #=> true
Repo.aggregate(Post, :count, :id) #=> 3
```

`Repo.one/2` returns `nil` for no rows and raises for multiple; `one!/2` also raises for no rows.

### Writing

```elixir
{:ok, user} = Repo.insert(changeset)
{:error, changeset} = Repo.insert(changeset)
{:ok, user} = Repo.update(changeset)
{:ok, user} = Repo.insert_or_update(changeset)
{:ok, user} = Repo.delete(user)
```

`insert_or_update/2` updates when the struct was loaded from the database; otherwise it inserts.

### Bulk

```elixir
Repo.insert_all(Post, [[title: "A"], [title: "B"]])
Repo.update_all(Post, set: [title: "Title"])
Repo.update_all(Post, inc: [views: 1])
Repo.delete_all(from p in Post, where: p.id < 10)
```

Bulk calls bypass changesets and callbacks.

### Transactions

```elixir
Repo.transaction(fn ->
  case Repo.insert(changeset) do
    {:ok, post} -> post
    {:error, reason} -> Repo.rollback(reason)
  end
end)
```

Returns `{:ok, value}` or `{:error, reason}`; `rollback/1` aborts the transaction.

## Queries

### Keyword queries

```elixir
from p in Post,
  where: p.title == "Hello",
  where: [state: "published"],
  order_by: [desc: p.inserted_at],
  limit: 1,
  offset: 0,
  preload: [:comments],
  select: p
```

`from` builds a query without running it; pass it to `Repo.all/1`.

### Piped queries

```elixir
title = "Hello"

Post
|> where([p], p.title == ^title)
|> order_by([p], desc: p.id)
|> limit(5)
|> select([p], p.title)
|> Repo.all()
#=> ["Hello"]
```

Use `^` for external values and `import Ecto.Query` for the macros.

### Joining

```elixir
from p in Post,
  join: c in assoc(p, :comments),
  where: c.body == "Nice",
  select: p
```

Use `join: c in assoc(p, :comments)` with a defined association.

### Grouping

```elixir
from(p in Post,
  join: c in assoc(p, :comments),
  group_by: p.id,
  select: {p.title, count(c.id)})
|> Repo.all()
#=> [{"Hello", 1}]
```

Group by a primary key when selecting grouped rows.

## References

- [Ecto documentation](https://hexdocs.pm/ecto)
- [Basic CRUD](https://hexdocs.pm/ecto/crud.html)
- [Phoenix generators](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.html)
