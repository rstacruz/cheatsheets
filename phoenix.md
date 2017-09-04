---
title: Phoenix
category: Elixir
layout: 2017/sheet
weight: -1
updated: 2017-09-04
---

### Directory structure

```
config/
web/
  controllers/
  models/
  views/
  templates/
  static/
```

This is Phoenix 1.2's structure. Phoenix 1.3 has no `models`.

### Migrations

See [Ecto migrations cheatsheet](./phoenix-migrations).
{: .-setup}

```bash
$ mix ecto.gen.migration update_posts_table
  creating priv/repo/migrations/20160602085927_update_posts_table.exs
  ...
```

```elixir
create table(:documents) do
  add :title, :string
  add :title, :string, default: "Hello"
  add :body, :text
  add :age, :integer
  add :price, :float, precision: 10, scale: 2
  timestamps
end
```

### Routing

See [Phoenix routing cheatsheet](./phoenix-routing).
{: .-setup}

```elixir
get "/", PageController, :index

resources "/users", UserController do
  resources "/posts", PostController
end
```

```elixir
user_post_path(:index, 17)     #=> /users/17/posts
user_post_path(:show, 17, 12)  #=> /users/17/posts/12
```

### Conn

See [Phoenix conn cheatsheet](./phoenix-conn).
{: .-setup}

```elixir
conn.host          #=> "example.com"
conn.method        #=> "GET"
conn.path_info     #=> ["posts", "1"]
conn.request_path  #=> "/posts/1"
```

```elixir
conn
|> put_status(202)
|> html("<html><head>...")
|> json(%{ message: "Hello" })
|> text("Hello")
|> redirect(to: "/foo")
|> render("index.html")
|> render("index.html", hello: "world")
|> render(MyApp.ErrorView, "404.html")
```

### Ecto


See [Ecto cheatsheet](./phoenix-ecto).
{: .-setup}

```bash
$ mix phx.gen.html \
    Accounts \       # domain
    Profile \        # schema
    profiles \       # table name
    email:string \
    age:integer
```

### Also see

- [Plug.Conn](./phoenix-conn.html)
- [Ecto migrations](./phoenix-migrations.html)
- [Router](./phoenix-routing.html)
