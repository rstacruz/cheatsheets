---
title: "Phoenix: Plug.Conn"
category: Elixir
---

## Request

```elixir
conn.host         #=> "example.com"
conn.method       #=> "GET"
conn.path_info    #=> ["posts", "1"]
conn.request_path #=> "/posts/1"
conn.query_string #=> "utm_source=twitter"
conn.port         #=> 80
conn.scheme       #=> :http
conn.peer         #=> { {127, 0, 0, 1}, 12345 }
conn.remote_ip    #=> { 151, 236, 219, 228 }
conn.req_headers  #=> [{"content-type", "text/plain"}]
```

## Response

```elixir
conn.resp_body    #=> "..."
conn.resp_charset #=> "utf-8"
conn.resp_cookies #=> ...
conn.resp_headers #=> ...
conn.status       #=> ...
```

## Misc

```elixir
conn.assigns         # storage of crap
conn.owner           # process
conn.halted          # if pipeline was halted
conn.secret_key_base # ...
conn.state           # :unset, :set, :file, :sent, :chunked
```

## Assigns

```elixir
conn = assign(conn, :user_id, 100)
conn.assigns[:hello]
```

```elixir
conn = async_assign(conn, :location, fn -> geoip_lookup() end)
await_assign(conn, :location)
```

## Fetchables

```elixir
conn = fetch_session(conn)   # or plug :fetch_session

conn = put_session(conn, :message, "new stuff we just set in the session")
get_session(conn, :message)
conn = clear_session(conn)
```

Also: `flash` `cookie` `params`

```elixir
conn
|> put_flash(:info, "Success")
|> put_flash(:error, "Oh no")
```

```elixir
|> halt

|> put_resp_content_type("text/plain")
|> put_layout(false)
|> put_status(202)
|> put_status(:not_found)

|> render "index.html"
|> render "index.html", hello: "world"
|> render MyApp.ErrorView, "404.html"

|> redirect to: "/foo"
|> redirect external: "http://www.google.com/"
|> text "Hello"

|> send_resp(201, "")
```
