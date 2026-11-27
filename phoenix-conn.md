---
title: "Phoenix: Plug.Conn"
subtitle: Plug connection struct
logo: { set: icon-park-outline, name: plug }
category: Elixir
weight: -5
tier: t3
last_verified_with: "Plug 1.20.4, Phoenix 1.8.17."
updated: 2026-11-25
intro: |
  `Plug.Conn` carries request data and the response being built in Phoenix. This sheet covers request fields, headers, response helpers, accepts, and connected fields.
links:
  - title: Plug.Conn documentation
    url: https://hexdocs.pm/plug/Plug.Conn.html
  - title: Plug documentation
    url: https://hexdocs.pm/plug/readme.html
---

## Request

### Request
<!-- {: .-prime} -->

```elixir
conn.host          # → "example.com"
conn.method        # → "GET"
conn.path_info     # → ["posts", "1"]
conn.request_path  # → "/posts/1"
conn.query_string  # → "utm_source=twitter"
conn.port          # → 80
conn.scheme        # → :http
conn.peer          # → {{127, 0, 0, 1}, 12345}
conn.remote_ip     # → {151, 236, 219, 228}
conn.req_headers   # → [{"content-type", "text/plain"}]
```
<!-- {: data-highlight="conn.host; conn.path_info; conn.query_string; conn.req_headers"} -->

#### Headers

```elixir
conn |> get_req_header("content-type")
# → ["text/plain"]
```
<!-- {: data-highlight="get_req_header"} -->

See: [Request fields](https://hexdocs.pm/plug/Plug.Conn.html#module-request-fields)

### Updating conn

```elixir
conn
|> put_req_header("accept", "application/json")
```
<!-- {: data-highlight="put_req_header"} -->

Usually only useful for tests.

See: [put_req_header/3](https://hexdocs.pm/plug/Plug.Conn.html#put_req_header/3)

## Response

### Response
<!-- {: .-prime} -->

```elixir
conn.resp_body     # → "..."
conn.resp_charset  # → "utf-8"
conn.resp_cookies  # → ...
conn.resp_headers  # → ...
conn.status        # → ...
```
<!-- {: data-highlight="conn.resp_body; conn.resp_headers; conn.status"} -->

See: [Response fields](https://hexdocs.pm/plug/Plug.Conn.html#module-response-fields)

### Sending responses

```elixir
# Plug.Conn
conn
|> html("<html><head>...")
|> json(%{message: "Hello"})
|> text("Hello")
```
<!-- {: data-highlight="html; json; text"} -->

#### Redirects

```elixir
|> redirect(to: "/foo")
|> redirect(external: "http://www.google.com/")
|> halt()
```
<!-- {: data-highlight="redirect"} -->

#### Headers

```elixir
|> put_resp_content_type("text/plain")
|> put_resp_cookie("abc", "def")
|> put_resp_header("X-Delivered-By", "myapp")
|> put_status(202)
|> put_status(:not_found)
```
<!-- {: data-highlight="put_resp_header"} -->

#### Private

```elixir
|> put_private(:plug_foo, "...")  # reserved for libraries
```
<!-- {: data-highlight="put_private"} -->

#### Raw response

```elixir
|> send_resp(201, "")
```
<!-- {: data-highlight="send_resp"} -->

See: [send_resp/3](https://hexdocs.pm/plug/Plug.Conn.html#send_resp/3)

### Phoenix views

```elixir
# Phoenix.Controller
conn
|> render("index.html")
|> render("index.html", hello: "world")
|> render(MyApp.ErrorView, "404.html")
```
<!-- {: data-highlight="render"} -->

#### Layouts

```elixir
|> put_layout(:foo)
|> put_layout(false)
|> put_view(ErrorView)
```
<!-- {: data-highlight="put_layout"} -->

#### Security

```elixir
|> put_secure_browser_headers()
# prevent clickjacking, nosniff, and xss protection
# x-frame-options, x-content-type-options, x-xss-protection
```
<!-- {: data-highlight="put_secure_browser_headers"} -->

#### Conditional

```elixir
|> put_new_view(ErrorView)  # if not set yet
|> put_new_layout(:foo)
```
<!-- {: data-highlight="put_new_view; put_new_layout"} -->

#### Layout helper

```elixir
layout(conn)
```
<!-- {: data-highlight="layout"} -->

See: [render/3](https://hexdocs.pm/phoenix/Phoenix.Controller.html#render/3)

## Other features

### Other fields
<!-- {: .-prime} -->

```elixir
conn.assigns          # storage of crap
conn.owner            # process
conn.halted           # if pipeline was halted
conn.secret_key_base  # ...
conn.state            # :unset, :set, :file, :sent, :chunked
```
<!-- {: data-highlight="conn.assigns; conn.halted; conn.state"} -->

See: [Connection fields](https://hexdocs.pm/plug/Plug.Conn.html#module-connection-fields)

### Accepts

```elixir
plug :accepts, ["html", "json"]
conn |> accepts(["html", "json"])
get_format(conn)  # → "html"
conn.accepts
```
<!-- {: data-highlight="accepts"} -->

See: [get_format/1](https://hexdocs.pm/phoenix/Phoenix.Controller.html#get_format/1)

### Assigns

```elixir
conn.assigns[:hello]
conn |> assign(:user_id, 100)
```
<!-- {: data-highlight="assign"} -->

#### Async

```elixir
conn = async_assign(conn, :location, fn -> geoip_lookup() end)
await_assign(conn, :location)
```
<!-- {: data-highlight="async_assign; await_assign"} -->

See: [assign/3](https://hexdocs.pm/plug/Plug.Conn.html#assign/3)

### Session

```elixir
conn = fetch_session(conn)   # or plug :fetch_session

conn = put_session(
  conn, :message, "new stuff we just set in the session"
)
get_session(conn, :message)
conn = clear_session(conn)
```
<!-- {: data-highlight="fetch_session; put_session; clear_session"} -->

#### Flash

```elixir
conn
|> put_flash(:info, "Success")
|> put_flash(:error, "Oh no")
```
<!-- {: data-highlight="put_flash"} -->

See: [fetch_session/1](https://hexdocs.pm/plug/Plug.Conn.html#fetch_session/1)

Also available: `flash` `cookie` `params`
