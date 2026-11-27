---
title: "Phoenix: Routing"
subtitle: URL routing DSL
logo: { set: icon-park-outline, name: router }
category: Elixir
weight: -1
tier: t3
last_verified_with: "Phoenix 1.8.17."
updated: 2026-11-25
intro: |
  Phoenix routes map URLs to controller actions. This sheet covers single routes, resources and their options, path helpers, nested resources, and scopes.
links:
  - title: Phoenix routing guide
    url: https://hexdocs.pm/phoenix/routing.html
  - title: Phoenix.Router documentation
    url: https://hexdocs.pm/phoenix/Phoenix.Router.html
  - title: mix phx.routes
    url: https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Routes.html
---

### Showing routes

```sh
mix phx.routes        # 1.3+
mix phoenix.routes    # 1.2 and below
```
<!-- {: data-highlight="mix phx.routes"} -->

See: [mix phx.routes](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Routes.html) _(hexdocs.pm)_

### Single routes

```elixir
get "/", PageController, :index
```
<!-- {: data-highlight="get"} -->

Also: `put` `post` `patch` `options` `delete` `head`

See: [Routing](https://hexdocs.pm/phoenix/Phoenix.Router.html#module-routing)

### Resources

#### Routes

```elixir
resources "/users", UserController
resources "/users", UserController, only: [:index, :show]
resources "/users", UserController, except: [:delete]
```
<!-- {: data-highlight="resources"} -->

#### Options

```elixir
resources "/users", UserController,
  as: :person    # named helper (person_path)
  name: :person  # resource prefix (person_id)
  param: :id     # route parameter
```
<!-- {: data-highlight="as: :person; name: :person; param: :id"} -->

#### Generated routes

| Path | Method | Helper |
| --- | --- | --- |
| `/users` | GET | `user_path(:index)` |
| `/users/new` | GET | `user_path(:new)` |
| `/users/:id` | GET | `user_path(:show, user)` |
| `/users/:id/edit` | GET | `user_path(:edit, user)` |
| `/users` | POST | `user_path(:create, user)` |
| `/users/:id` | PATCH/PUT | `user_path(:update, user)` |
| `/users/:id` | DELETE | `user_path(:delete, user)` |
<!-- {: .-left-align} -->

See: [resources/4](https://hexdocs.pm/phoenix/Phoenix.Router.html#resources/4) _(hexdocs.pm)_

### Path helpers

#### Paths

```elixir
user_path(conn, :index)                 # → /users
user_path(conn, :show, 17)              # → /users/17
user_path(conn, :show, %User{id: 17})   # → /users/17
user_path(conn, :show, 17, admin: true) # → /users/17?admin=true
```
<!-- {: data-highlight="user_path"} -->

#### URLs

```elixir
user_url(conn, :index) # → "http://localhost:4000/users"
```
<!-- {: data-highlight="user_url"} -->

#### Module helpers

```elixir
MyApp.Router.Helpers.user_path(MyApp.Endpoint, :index)
```
<!-- {: data-highlight="MyApp.Router.Helpers.user_path"} -->

See: [Helpers (deprecated)](https://hexdocs.pm/phoenix/Phoenix.Router.html#module-helpers-deprecated) _(hexdocs.pm)_

### Nested resources

#### Routes

```elixir
resources "/users", UserController do
  resources "/posts", PostController
end
```

#### Helpers

```elixir
user_post_path(:index, 17)     # → /users/17/posts
user_post_path(:show, 17, 12)  # → /users/17/posts/12
```
<!-- {: data-highlight="user_post_path"} -->

See: [Scopes and resources](https://hexdocs.pm/phoenix/Phoenix.Router.html#module-scopes-and-resources) _(hexdocs.pm)_

### Scoped routes

#### Scope block

```elixir
scope "/admin" do
  pipe_through :browser
  resources "/reviews", MyApp.Admin.ReviewController
end
# reviews_path() -> /admin/reviews
```
<!-- {: data-highlight="pipe_through :browser"} -->

#### Inline scope

```elixir
scope "/admin", as: :admin do: ... end
# admin_reviews_path() -> /admin/reviews
```
<!-- {: data-highlight="scope"} -->

See: [scope/2](https://hexdocs.pm/phoenix/Phoenix.Router.html#scope/2) _(hexdocs.pm)_
