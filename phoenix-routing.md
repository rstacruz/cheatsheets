---
title: "Phoenix: Routing"
category: Elixir
weight: -1
---

### Showing routes

```sh
mix phx.routes        # 1.3+
mix phoenix.routes    # 1.2 and below
```

See: [Mix.Tasks.Phoenix.Routes](https://hexdocs.pm/phoenix/Mix.Tasks.Phoenix.Routes.html) _(hexdocs.pm)_

### Single routes

```elixir
get "/", PageController, :index
```

Also: `put` `post` `patch` `options` `delete` `head`

### Resources

```elixir
resources "/users", UserController
resources "/users", UserController, only: [:index, :show]
resources "/users", UserController, except: [:delete]
```

```elixir
resources "/users", UserController,
  as: :person    # helper name (person_path)
  name: :person  # ...?
  param: :id     # name of parameter for this resource
```

Generates these routes:

| Method    | Path              | Helper                     |
| ----      | ----              | ----                       |
| GET       | `/users`          | `user_path(:index)`        |
| GET       | `/users/new`      | `user_path(:new)`          |
| GET       | `/users/:id`      | `user_path(:show, user)`   |
| GET       | `/users/:id/edit` | `user_path(:edit, user)`   |
| POST      | `/users`          | `user_path(:create, user)` |
| PATCH/PUT | `/users/:id`      | `user_path(:update, user)` |
| DELETE    | `/users/:id`      | `user_path(:delete, user)` |
{: .-left-align}

See: [resources/4](https://hexdocs.pm/phoenix/Phoenix.Router.html#resources/4) _(hexdocs.pm)_

### Path helpers

```elixir
user_path(conn, :index)                 # → /users
user_path(conn, :show, 17)              # → /users/17
user_path(conn, :show, %User{id: 17})   # → /users/17
user_path(conn, :show, 17, admin: true) # → /users/17?admin=true
```

```elixir
user_url(conn, :index) # → "http://localhost:4000/users"
```

```elixir
MyApp.Router.Helpers.user_path(MyApp.Endpoint, :index)
```

See: [Helpers](https://hexdocs.pm/phoenix/Phoenix.Router.html#module-helpers) _(hexdocs.pm)_

### Nested resources

```elixir
resources "/users", UserController do
  resources "/posts", PostController
end
```

```elixir
user_post_path(:index, 17)     # → /users/17/posts
user_post_path(:show, 17, 12)  # → /users/17/posts/12
```

See: [Scopes and resources](https://hexdocs.pm/phoenix/Phoenix.Router.html#module-scopes-and-resources) _(hexdocs.pm)_

### Scoped routes

```elixir
scope "/admin" do
  pipe_through :browser
  resources "/reviews", MyApp.Admin.ReviewController
end
# reviews_path() -> /admin/reviews
```

```elixir
scope "/admin", as: :admin do: ... end
# admin_reviews_path() -> /admin/reviews
```

See: [scope/2](https://hexdocs.pm/phoenix/Phoenix.Router.html#scope/2) _(hexdocs.pm)_
