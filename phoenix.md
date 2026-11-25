---
title: Phoenix
subtitle: Web framework for Elixir
category: Elixir
weight: -1
intro: |
  Phoenix builds server-rendered pages, JSON APIs, and real-time features in Elixir. Sections link to fuller `phoenix-*` cheatsheets.
links:
  - title: Phoenix guides
    url: https://hexdocs.pm/phoenix/overview.html
  - title: Phoenix source
    url: https://github.com/phoenixframework/phoenix
updated: 2026-11-22
last_verified_with: "Phoenix 1.8.17, Phoenix LiveView 1.2.15, Elixir 1.19.7, Erlang/OTP 28."
tier: t3
---

## Getting started
<!-- {: .-three-column} -->

### Install the generator

```sh
mix archive.install hex phx_new
```
<!-- {: data-highlight="mix archive.install"} -->

Elixir 1.17+ and Erlang/OTP 25+ are required. PostgreSQL is the default database.

See: [Installation](https://hexdocs.pm/phoenix/installation.html)

### Create and run

```sh
mix phx.new hello
cd hello
mix ecto.create
mix phx.server
```
<!-- {: data-highlight="mix phx.new; mix phx.server"} -->

Open http://localhost:4000. Use `iex -S mix phx.server` to keep an IEx session.

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
<!-- {: data-highlight="--database sqlite3; --no-ecto; --no-html; --no-assets"} -->

`--no-assets` skips esbuild and Tailwind; APIs often use `--no-html --no-assets`.

See: [mix phx.new](https://phx-new.hexdocs.pm/Mix.Tasks.Phx.New.html)

### Project layout

```text
hello/
├── assets/        # JS and CSS
├── config/        # config.exs
├── lib/
│   ├── hello/     # domain
│   └── hello_web/ # controllers, web
├── priv/          # static, migrations
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
live "/counter", CounterLive
resources "/users", UserController, only: [:index, :show]
resources "/posts", PostController, except: [:delete]
resources "/users", UserController do
  resources "/posts", PostController
end
```
<!-- {: data-highlight="get; live; resources"} -->

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
<!-- {: data-highlight="~p"} -->

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
<!-- {: data-highlight="pipeline :browser; pipe_through :api"} -->

Pipelines apply plugs to the routes in their scope.

See: [Scoped routes](https://hexdocs.pm/phoenix/routing.html#scoped-routes)

### Inspect routes

```sh
mix phx.routes
GET  /users     HelloWeb.UserController :index
GET  /users/:id HelloWeb.UserController :show
GET  /users/:user_id/posts HelloWeb.PostController :index
```
<!-- {: data-highlight="mix phx.routes"} -->

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

  def health(conn, _params) do
    json(conn, %{status: "ok"})
  end

  def created(conn, _params) do
    conn
    |> put_status(:created)
    |> text("created")
  end

end
```
<!-- {: data-highlight="render"} -->

Actions receive `conn` and request `params`; `render/2` renders through `HelloWeb.HelloHTML`.

See: [Controllers](https://hexdocs.pm/phoenix/controllers.html)

### Response helpers

| Helper                                 | Effect                     |
| -------------------------------------- | -------------------------- |
| `text(conn, "Hello")`                  | 200, `text/plain`          |
| `json(conn, %{message: "Hello"})`      | 200, `{"message":"Hello"}` |
| `html(conn, "<h1>Hello</h1>")`         | 200, raw HTML              |
| `redirect(conn, to: ~p"/users")`       | 302, `Location: /users`    |
| `render(conn, :show, post: post)`      | HTML via `HelloHTML`       |
| `Plug.Conn.put_status(conn, :created)` | 201 status                 |
| `Plug.Conn.send_resp(conn, 204, "")`   | 204, no body               |

Controller helpers render or redirect; `Plug.Conn` calls set status or send bytes directly.

See: [Phoenix.Controller](https://hexdocs.pm/phoenix/Phoenix.Controller.html)

### Templates

```html
<Layouts.app flash={@flash}>
  <h1>Hello {@name}</h1>
  <a href={~p"/users"}>Users</a>
</Layouts.app>
```
<!-- {: data-highlight="Layouts.app"} -->

HEEx escapes values and compiles templates into function components.

See: [Phoenix.Component](https://phoenix-live-view.hexdocs.pm/Phoenix.Component.html#sigil_H/2)

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
<!-- {: data-highlight="conn.host; conn.path_info; conn.query_string"} -->

Sample `conn` from `Plug.Test.conn("GET", "/posts/1?utm_source=twitter")`.

[Phoenix conn cheatsheet](./phoenix-conn)
<!-- {: .-crosslink} -->

## Ecto
<!-- {: .-three-column} -->

### Generators

```sh
mix phx.gen.html Accounts User users \
  name:string age:integer
mix phx.gen.auth Accounts User users
mix phx.gen.json Accounts User users \
  name:string age:integer
mix phx.gen.live Accounts User users \
  name:string
mix phx.gen.context Accounts User users \
  name:string
mix phx.gen.schema User users name:string
```
<!-- {: data-highlight="mix phx.gen.html; mix phx.gen.auth; mix phx.gen.live"} -->

Generators create contexts and tests; `phx.gen.schema` creates only a schema and migration.

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
<!-- {: data-highlight="cast; validate_required; unique_constraint"} -->

`email: "bad"` gives `valid?: false`, with `errors: [email: {"has invalid format", [validation: :format]}]`.

See: [Ecto.Changeset](https://hexdocs.pm/ecto/Ecto.Changeset.html)

### Repo queries

```elixir
Repo.all(User)
Repo.get!(User, 17)
Repo.get_by(User,
  email: "ada@example.com")
Repo.insert!(%User{name: "Ada"})
Repo.update!(changeset)
Repo.delete!(user)
```
<!-- {: data-highlight="Repo.all; Repo.get!; Repo.insert!"} -->

`Repo` queries return structs or lists; bang variants raise on failure.

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
<!-- {: data-highlight="mix ecto.create; mix ecto.gen.migration; mix ecto.migrate"} -->

Migrations live in `priv/repo/migrations/`.

[Phoenix migrations cheatsheet](./phoenix-migrations)
<!-- {: .-crosslink} -->

## LiveView and real time
<!-- {: .-three-column} -->

### LiveView

```elixir
defmodule HelloWeb.CounterLive do
  use Phoenix.LiveView

  def mount(_params, _session, socket) do
    {:ok, assign(socket, count: 0)}
  end

  def handle_event("inc", _p, socket) do
    {:noreply,
      update(socket, :count, &(&1 + 1))}
  end

  def render(assigns) do
    ~H"""
    <button phx-click="inc">
      {@count}
    </button>
    """
  end
end
```
<!-- {: data-highlight="phx-click; assign; update"} -->

`phx-click` sends events over the LiveView socket; `assign/2` updates state.

See: [Phoenix.LiveView](https://phoenix-live-view.hexdocs.pm/Phoenix.LiveView.html)

### Channels

```elixir
defmodule HelloWeb.RoomChannel do
  use HelloWeb, :channel

  def join("room:lobby", _p, socket) do
    {:ok, socket}
  end

  def handle_in("shout", msg, socket) do
    broadcast(socket, "shout", msg)
    {:noreply, socket}
  end
end
```
<!-- {: data-highlight="broadcast"} -->

Clients join topics over the socket declared in `lib/hello_web/endpoint.ex`.

See: [Phoenix.Channel](https://hexdocs.pm/phoenix/Phoenix.Channel.html)

### PubSub

```elixir
Phoenix.PubSub.subscribe(
  Hello.PubSub,
  "room:lobby"
)
Phoenix.PubSub.broadcast(
  Hello.PubSub,
  "room:lobby",
  {:new_message, msg}
)
Phoenix.PubSub.broadcast_from!(
  Hello.PubSub,
  self(),
  "room:lobby",
  {:new_message, msg}
)
Phoenix.PubSub.unsubscribe(
  Hello.PubSub,
  "room:lobby"
)
```
<!-- {: data-highlight="Phoenix.PubSub.subscribe; Phoenix.PubSub.broadcast"} -->

The app supervisor starts PubSub; `broadcast_from!/4` excludes the sender.

See: [Phoenix.PubSub](https://phoenix-pubsub.hexdocs.pm/Phoenix.PubSub.html)

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
<!-- {: data-highlight="html_response"} -->

`ConnCase` builds the conn and imports response helpers.

See: [Testing](https://hexdocs.pm/phoenix/testing.html)

### LiveView tests

```elixir
defmodule HelloWeb.CounterLiveTest do
  use HelloWeb.ConnCase, async: true
  import Phoenix.LiveViewTest

  test "increments", %{conn: conn} do
    {:ok, view, html} = live(conn, ~p"/counter")
    assert html =~ "0"
    assert render_click(view, "inc") =~ "1"
  end
end
```
<!-- {: data-highlight="render_click; assert html"} -->

`live/2` mounts a connected view; `render_click/2` sends events to it.

See: [Phoenix.LiveViewTest](https://phoenix-live-view.hexdocs.pm/Phoenix.LiveViewTest.html)

### Running tests

```sh
mix test
mix test test/hello_web/controllers/
mix test test/hello_web/controllers/page_controller_test.exs:8
mix test --only slow
mix test --failed
mix test --stale
```
<!-- {: data-highlight="mix test --stale; mix test --failed"} -->

Line numbers, tags, and flags select subsets of the suite.

See: [Running tests](https://hexdocs.pm/phoenix/testing.html#running-tests)

## Also see

- [Phoenix framework site](https://www.phoenixframework.org/)
- [Phoenix changelog](https://hexdocs.pm/phoenix/changelog.html)
