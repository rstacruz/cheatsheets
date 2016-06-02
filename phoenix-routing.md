---
title: "Phoenix: Routing"
category: Elixir
---

```sh
mix phoenix.routes
```

## Single routes

```elixir
get "/", PageController, :index
```

## Resources

```elixir
resources "/users", UserController
resources "/users", UserController, only: [:index, :show]
resources "/users", UserController, except: [:delete]
```

| Method    | Path              | Helper                     |
| ----      | ----              | ----                       |
| GET       | `/users`          | `user_path(:index)`        |
| GET       | `/users/new`      | `user_path(:new)`          |
| GET       | `/users/:id`      | `user_path(:show, user)`   |
| GET       | `/users/:id/edit` | `user_path(:edit, user)`   |
| POST      | `/users`          | `user_path(:create, user)` |
| PATCH/PUT | `/users/:id`      | `user_path(:update, user)` |
| DELETE    | `/users/:id`      | `user_path(:delete, user)` |

## Path helpers

```elixir
user_path(Endpoint, :index)                 #=> /users
user_path(Endpoint, :show, 17)              #=> /users/17
user_path(Endpoint, :show, %User{id: 17})   #=> /users/17
user_path(Endpoint, :show, 17, admin: true) #=> /users/17?admin=true

user_path(Endpoint, :index) #=> "http://localhost:4000/users"
```

```elixir
MyApp.Router.Helpers.user_path(MyApp.Endpoint, :index)
```

## Nested resources

```elixir
resources "/users", UserController do
  resources "/posts", PostController
end

user_post_path(:index, 17)     #=> /users/17/posts
user_post_path(:show, 17, 12)  #=> /users/17/posts/12
```

## Scoped routes

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
