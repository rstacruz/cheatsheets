---
title: Phoenix
category: Elixir
layout: 2017/sheet
weight: -1
updated: 2018-03-06
---

### Quick start

```bash
# Install Phoenix
mix local.hex
mix archive.install https://github.com/phoenixframework/archives/raw/master/phx_new.ez
```

```bash
# Create a new project
mix phx.new hello
```

```bash
# Start the application
mix phx.server
```

Install Erlang, Elixir, Node.js, PostgreSQL first.
See: [Installation](https://hexdocs.pm/phoenix/installation.html) _(hexdocs.pm)_

### Directory structure

```
./
├── _build
├── assets/
│   ├── css/
│   ├── js/
│   ├── static/
│   └── node_modules/
├── config/
├── deps/
├── lib/
│   ├── hello/
│   ├── hello.ex
│   ├── hello_web/
│   │   ├── channels/
│   │   ├── controllers/
│   │   ├── templates/
│   │   ├── views/
│   │   ├── router.ex
│   │   └── gettext.ex
│   └── hello_web.ex
├── priv/
└── test/
```
{: .-box-chars}

See: [Adding pages](https://hexdocs.pm/phoenix/adding_pages.html) _(hexdocs.pm)_

### Migrations

```bash
$ mix ecto.gen.migration update_posts_table
  creating priv/repo/migrations/20160602085927_update_posts_table.exs
  ···
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

[Ecto migrations cheatsheet](./phoenix-migrations)
{: .-crosslink}

### Routing

```elixir
get "/", PageController, :index

resources "/users", UserController do
  resources "/posts", PostController
end
```

```elixir
user_post_path(conn, :index, 17)     # → /users/17/posts
user_post_path(conn, :show, 17, 12)  # → /users/17/posts/12
```

[Phoenix routing cheatsheet](./phoenix-routing)
{: .-crosslink}

### Conn

```elixir
conn.host          # → "example.com"
conn.method        # → "GET"
conn.path_info     # → ["posts", "1"]
conn.request_path  # → "/posts/1"
```

```elixir
conn
|> put_status(202)
|> html("<html><head>···")
|> json(%{ message: "Hello" })
|> text("Hello")
|> redirect(to: "/foo")
|> render("index.html")
|> render("index.html", hello: "world")
|> render(MyApp.ErrorView, "404.html")
```

[Phoenix conn cheatsheet](./phoenix-conn)
{: .-crosslink}

### Ecto

```bash
$ mix phx.gen.html \
    Accounts \       # domain
    Profile \        # schema
    profiles \       # table name
    email:string \
    age:integer
```

[Ecto cheatsheet](./phoenix-ecto)
{: .-crosslink}

### Also see

- [Phoenix framework site](http://phoenixframework.org/) _(phoenixframework.org)_
- [Phoenix: getting started](https://hexdocs.pm/phoenix/overview.html) _(hexdocs.pm)_
