---
title: "Phoenix: Ecto"
subtitle: Database wrapper for Elixir
category: Elixir
updated: 2026-11-22
last_verified_with: "Ecto 3.14.3, Phoenix 1.8.17, Elixir 1.19.7."
intro: |
  Ecto maps Elixir structs to a database and validates changes before persisting them. This reference covers schemas, changesets, Repo calls and queries.
links:
  - title: Ecto documentation
    url: https://hexdocs.pm/ecto
  - title: Basic CRUD guide
    url: https://hexdocs.pm/ecto/crud.html
tier: t3
---

## Create and read records

### Generating

```bash
$ mix phx.gen.context Accounts User users \
    name:string email:string age:integer
```
<!-- {: data-highlight="mix phx.gen.context"} -->

Use `mix phx.gen.html` or `mix phx.gen.json` to add controllers and views.

See: [mix phx.gen.context](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Context.html)

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
<!-- {: data-highlight="cast"} -->

Cast external params with `cast/3`; use `change/2` for trusted values.

See: [cast/4](https://hexdocs.pm/ecto/Ecto.Changeset.html#cast/4)

### Writing

```elixir
{:ok, user} = Repo.insert(changeset)
{:error, changeset} = Repo.insert(changeset)
{:ok, user} = Repo.update(changeset)
{:ok, user} = Repo.insert_or_update(changeset)
{:ok, user} = Repo.delete(user)
```
<!-- {: data-highlight="Repo.insert; Repo.update; Repo.insert_or_update; Repo.delete"} -->

`insert_or_update/2` updates when the struct was loaded from the database; otherwise it inserts.

See: [Repo.insert/2](https://hexdocs.pm/ecto/Ecto.Repo.html#c:insert/2)

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
<!-- {: data-highlight="Repo.get; Repo.get_by; Repo.one; Repo.aggregate"} -->

`Repo.one/2` returns `nil` for no rows and raises for multiple; `one!/2` also raises for no rows.

See: [Repo.get/3](https://hexdocs.pm/ecto/Ecto.Repo.html#c:get/3)

## Schemas

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
<!-- {: data-highlight="schema"} -->

See: [schema/2](https://hexdocs.pm/ecto/Ecto.Schema.html#schema/2)

### Associations

```elixir
belongs_to :user, MyApp.Accounts.User
has_one :profile, MyApp.Accounts.Profile
has_many :comments, MyApp.Blog.Comment
many_to_many :tags, MyApp.Blog.Tag,
  join_through: "posts_tags"
```
<!-- {: data-highlight="belongs_to; has_one; has_many; many_to_many"} -->

`has_many` and `many_to_many` are loaded with `preload:` in queries.

See: [has_many/3](https://hexdocs.pm/ecto/Ecto.Schema.html#has_many/3)

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

See: [Primitive types](https://hexdocs.pm/ecto/Ecto.Schema.html#module-primitive-types)

## Changesets

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
<!-- {: data-highlight="validate_required; validate_format; validate_inclusion; validate_length"} -->

Most validations skip fields absent from `changes`; `validate_required/3` checks them too.

See: [validate_required/3](https://hexdocs.pm/ecto/Ecto.Changeset.html#validate_required/3)

### Constraints

```elixir
changeset
|> unique_constraint(:email)
|> foreign_key_constraint(:post_id)
|> assoc_constraint(:post)
|> no_assoc_constraint(:comments)
```
<!-- {: data-highlight="unique_constraint; foreign_key_constraint; assoc_constraint; no_assoc_constraint"} -->

Add matching database indexes or foreign keys; `assoc_constraint/3` needs a `belongs_to`.

See: [unique_constraint/3](https://hexdocs.pm/ecto/Ecto.Changeset.html#unique_constraint/3)

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
<!-- {: data-highlight="changeset.valid?; changeset.errors; changeset.changes; changeset.params"} -->

See: [Changeset struct](https://hexdocs.pm/ecto/Ecto.Changeset.html#module-the-ecto-changeset-struct)

### Reading values

```elixir
get_change(changeset, :name)   #=> "New"
get_field(changeset, :name)    #=> "New"
fetch_change(changeset, :name) #=> {:ok, "New"}
fetch_field(changeset, :name)  #=> {:changes, "New"}
```
<!-- {: data-highlight="get_change; get_field; fetch_change; fetch_field"} -->

`get_field/2` also reads the unchanged value from `changeset.data`.

See: [get_change/2](https://hexdocs.pm/ecto/Ecto.Changeset.html#get_change/2)

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
<!-- {: data-highlight="put_change; force_change; update_change; delete_change"} -->

`force_change/3` records a change even when the value is unchanged.

See: [put_change/3](https://hexdocs.pm/ecto/Ecto.Changeset.html#put_change/3)

## Repo

### Bulk

```elixir
Repo.insert_all(Post, [[title: "A"], [title: "B"]])
Repo.update_all(Post, set: [title: "Title"])
Repo.update_all(Post, inc: [views: 1])
Repo.delete_all(from p in Post, where: p.id < 10)
```
<!-- {: data-highlight="Repo.insert_all; Repo.update_all; Repo.delete_all"} -->

Bulk calls bypass changesets and callbacks.

See: [insert_all/3](https://hexdocs.pm/ecto/Ecto.Repo.html#c:insert_all/3)

### Transactions

```elixir
Repo.transaction(fn ->
  with {:ok, _user} <- Repo.insert(user_changeset),
       {:ok, post} <- Repo.insert(post_changeset) do
    {:ok, post}
  end
end)
```
<!-- {: data-highlight="Repo.transaction"} -->

The function must return `{:ok, value}` or `{:error, reason}`; `Repo.rollback/1` exits early.

See: [transaction/2](https://hexdocs.pm/ecto/Ecto.Repo.html#c:transaction/2)

## Queries

### Keyword queries

```elixir
from p in Post,
  where: p.title == "Hello",
  where: [views: 1],
  order_by: [desc: p.inserted_at],
  limit: 1,
  offset: 0,
  preload: [:comments],
  select: p
```
<!-- {: data-highlight="from"} -->

`from` builds a query without running it; pass it to `Repo.all/1`.

See: [Query expressions](https://hexdocs.pm/ecto/Ecto.Query.html#module-query-expressions)

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
<!-- {: data-highlight="where; order_by; limit; select"} -->

Use `^` for external values and `import Ecto.Query` for the macros.

See: [Ecto.Query](https://hexdocs.pm/ecto/Ecto.Query.html)

### Joining

```elixir
from p in Post,
  join: c in assoc(p, :comments),
  where: c.body == "Nice",
  select: p
```
<!-- {: data-highlight="assoc"} -->

Use a defined association with `assoc/2`.

See: [join/5](https://hexdocs.pm/ecto/Ecto.Query.html#join/5)

### Grouping

```elixir
from(p in Post,
  join: c in assoc(p, :comments),
  group_by: p.id,
  select: {p.title, count(c.id)})
|> Repo.all()
#=> [{"Hello", 1}]
```
<!-- {: data-highlight="group_by"} -->

Include the primary key when grouping joined rows.

See: [group_by/3](https://hexdocs.pm/ecto/Ecto.Query.html#group_by/3)

## References

- [Ecto documentation](https://hexdocs.pm/ecto)
- [Basic CRUD](https://hexdocs.pm/ecto/crud.html)
- [Phoenix generators](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.html)
