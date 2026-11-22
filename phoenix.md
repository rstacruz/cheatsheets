---
title: Phoenix
subtitle: Web framework for Elixir
category: Elixir
weight: -1
intro: |
  Phoenix builds server-rendered pages, JSON APIs, and real-time features in Elixir.
links:
  - title: Phoenix guides
    url: https://hexdocs.pm/phoenix/overview.html
  - title: Phoenix source
    url: https://github.com/phoenixframework/phoenix
updated: 2026-11-22
---

## Getting started

### Install the generator

```sh
mix archive.install hex phx_new
```

Requires Elixir 1.17+ and Erlang 25+. PostgreSQL is the default database; pass `--database` for another adapter or `--no-ecto` to skip it.

See: [Installation](https://hexdocs.pm/phoenix/installation.html)

### Create and run

```sh
mix phx.new hello
cd hello
mix ecto.create
mix phx.server
```

Open http://localhost:4000; use `iex -S mix phx.server` for an IEx session.

See: [Up and running](https://hexdocs.pm/phoenix/up_and_running.html)

### Generator options

```sh
mix phx.new hello --database sqlite3
mix phx.new hello --no-ecto
mix phx.new hello --no-html
mix phx.new hello --no-assets
mix phx.new hello --no-live
mix phx.new hello --umbrella
```

`--no-assets` skips esbuild and Tailwind; APIs often use `--no-html --no-assets`.

See: [mix phx.new](https://phx-new.hexdocs.pm/Mix.Tasks.Phx.New.html)

### Project layout

```text
hello/
├── assets/        # JS and CSS sources
├── config/        # config.exs, dev.exs, runtime.exs
├── lib/
│   ├── hello/     # repo.ex, application.ex
│   └── hello_web/ # controllers/, components/, router.ex
├── priv/          # static/, repo/migrations/
└── test/
```
<!-- {: .-box-chars} -->

`lib/hello` holds the domain; `lib/hello_web` exposes it over HTTP.

See: [Directory structure](https://hexdocs.pm/phoenix/directory_structure.html)

## Routing

### Define routes

```elixir
get "/", PageController, :home
post "/sessions", SessionController, :create
resources "/users", UserController, only: [:index, :show]
resources "/posts", PostController, except: [:delete]
resources "/users", UserController do
  resources "/posts", PostController
end
```

Nested routes receive `"user_id"` in `params`.

See: [Routing guide](https://hexdocs.pm/phoenix/routing.html)

### Verified paths

```elixir
~p"/"                            # → "/"
~p"/users"                       # → "/users"
~p"/users/17"                    # → "/users/17"
~p"/users/17?admin=true"         # → "/users/17?admin=true"
~p"/users/17?#{[admin: true]}"   # → "/users/17?admin=true"
url(~p"/users")                  # → "http://localhost:4000/users"
```

`~p` paths are checked against the router at compile time.

See: [Phoenix.VerifiedRoutes](https://hexdocs.pm/phoenix/Phoenix.VerifiedRoutes.html)

[Phoenix routing cheatsheet](./phoenix-routing)
<!-- {: .-crosslink} -->

### Pipelines and scopes

```elixir
pipeline :browser do
  plug :accepts, ["html"]
  plug :fetch_session
  plug :protect_from_forgery
end

scope "/api", HelloWeb, as: :api do
  pipe_through :api
  resources "/users", UserController
end
```

Pipelines apply plugs to the routes in their scope.

See: [Scoped routes](https://hexdocs.pm/phoenix/routing.html#scoped-routes)

### Inspect routes

```sh
$ mix phx.routes
GET  /users     HelloWeb.UserController :index
GET  /users/:id HelloWeb.UserController :show
GET  /users/:user_id/posts HelloWeb.PostController :index
```

The output lists each verb, path, controller, and action.

See: [mix phx.routes](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Routes.html)

## Controllers

### Actions

```elixir
defmodule HelloWeb.HelloController do
  use HelloWeb, :controller

  def index(conn, _params) do
    render(conn, :index)
  end

  def show(conn, %{"id" => id}) do
    render(conn, :show, id: id)
  end
end
```

Actions receive `conn` and request `params`; `render/2` finds `HelloHTML`.

See: [Controllers](https://hexdocs.pm/phoenix/controllers.html)

### Response helpers

| Helper                                  | Response                 |
| --------------------------------------- | ------------------------ |
| `text(conn, "Hello")`                   | 200, `text/plain`        |
| `json(conn, %{message: "Hello"})`        | 200, `{"message":"Hello"}` |
| `html(conn, "<h1>Hello</h1>")`           | 200, raw HTML            |
| `redirect(conn, to: ~p"/users")`         | 302, `Location: /users`  |
| `render(conn, :show, post: post)`        | HTML via `HelloHTML`     |
| `Plug.Conn.put_status(conn, :created)`   | 201 status               |
| `Plug.Conn.send_resp(conn, 204, "")`     | 204, no body             |

`text/2`, `json/2`, and `html/2` set the body and content type together.

See: [Phoenix.Controller](https://hexdocs.pm/phoenix/Phoenix.Controller.html)

### Templates

```html
<Layouts.app flash={@flash}>
  <h1>Hello {@name}</h1>
  <a href={~p"/users"}>Users</a>
</Layouts.app>
```

HEEx escapes values and compiles templates into function components.

See: [Request life-cycle](https://hexdocs.pm/phoenix/request_lifecycle.html)

### Conn fields

```elixir
conn.host          # → "www.example.com"
conn.method        # → "GET"
conn.path_info     # → ["posts", "1"]
conn.request_path  # → "/posts/1"
conn.query_string  # → "utm_source=twitter"
conn.scheme        # → :http
conn.port          # → 80
```

Values from `Plug.Test.conn("GET", "/posts/1?utm_source=twitter")`.

[Phoenix conn cheatsheet](./phoenix-conn)
<!-- {: .-crosslink} -->

## Data

### Generators

```sh
mix phx.gen.html Accounts User users name:string age:integer
mix phx.gen.json Accounts User users name:string age:integer
mix phx.gen.live Accounts User users name:string
mix phx.gen.context Accounts User users name:string
mix phx.gen.schema User users name:string
```

HTML, JSON, LiveView, and context generators create tests; `phx.gen.schema` creates only a schema and migration.

See: [mix phx.gen.html](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Html.html)

### Changesets

```elixir
def changeset(user, attrs) do
  user
  |> cast(attrs, [:name, :email])
  |> validate_required([:name, :email])
  |> validate_format(:email, ~r/@/)
  |> unique_constraint(:email)
end
```

`email: "bad"` gives `valid?: false` with `{"has invalid format", [validation: :format]}`.

See: [Ecto.Changeset](https://hexdocs.pm/ecto/Ecto.Changeset.html)

### Repo queries

```elixir
Repo.all(User)
Repo.get!(User, 17)
Repo.get_by(User, email: "ada@example.com")
Repo.insert!(%User{name: "Ada"})
Repo.update!(changeset)
Repo.delete!(user)
```

`Repo` takes a schema or query and returns structs, lists, or changesets.

[Phoenix Ecto cheatsheet](./phoenix-ecto)
<!-- {: .-crosslink} -->

### Ecto tasks

```sh
mix ecto.create
mix ecto.gen.migration add_posts
mix ecto.migrate
mix ecto.rollback
mix ecto.setup
mix ecto.reset
```

Migrations live in `priv/repo/migrations/`.

[Phoenix migrations cheatsheet](./phoenix-migrations)
<!-- {: .-crosslink} -->

## Real-time features

### PubSub

```elixir
Phoenix.PubSub.subscribe(Hello.PubSub, "room:lobby")
Phoenix.PubSub.broadcast(
  Hello.PubSub,
  "room:lobby",
  {:new_message, msg}
)
Phoenix.PubSub.unsubscribe(Hello.PubSub, "room:lobby")
```

The application supervisor starts PubSub; subscribers receive broadcasts as messages.

See: [Channels](https://hexdocs.pm/phoenix/channels.html)

### Channels

```elixir
defmodule HelloWeb.RoomChannel do
  use HelloWeb, :channel

  def join("room:lobby", _payload, socket) do
    {:ok, socket}
  end

  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end
end
```

Clients join topics over the socket declared in `lib/hello_web/endpoint.ex`.

See: [mix phx.gen.channel](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Channel.html)

### LiveView

```elixir
defmodule HelloWeb.CounterLive do
  use Phoenix.LiveView

  def mount(_params, _session, socket) do
    {:ok, assign(socket, count: 0)}
  end

  def handle_event("inc", _params, socket) do
    {:noreply, update(socket, :count, &(&1 + 1))}
  end

  def render(assigns) do
    ~H"""
    <button phx-click="inc">{@count}</button>
    """
  end
end
```

`phx-click` sends events over the LiveView socket; `assign/2` updates state.

See: [Phoenix.LiveView](https://phoenix-live-view.hexdocs.pm/Phoenix.LiveView.html)

## Testing

### Controller tests

```elixir
defmodule HelloWeb.PageControllerTest do
  use HelloWeb.ConnCase, async: true

  test "GET /", %{conn: conn} do
    conn = get(conn, ~p"/")
    assert html_response(conn, 200) =~
      "Peace of mind from prototype to production"
  end
end
```

`ConnCase` builds the conn and imports response helpers.

See: [Testing](https://hexdocs.pm/phoenix/testing.html)

### Running tests

```sh
mix test
mix test test/hello_web/controllers/
mix test test/hello_web/controllers/page_controller_test.exs:8
mix test --only slow
```

Line numbers and tags select subsets of the suite.

See: [Running tests](https://hexdocs.pm/phoenix/testing.html#running-tests)

## Also see

- [Phoenix framework site](https://www.phoenixframework.org/)
- [Phoenix guides](https://hexdocs.pm/phoenix/overview.html)
