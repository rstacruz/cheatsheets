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
conn.peer         #=> {{127, 0, 0, 1}, 12345}
conn.remote_ip    #=> {151, 236, 219, 228}
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

## Session

```
conn = put_session(conn, :message, "new stuff we just set in the session")
get_session(conn, :message)
```
