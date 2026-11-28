---
title: How to set up an nginx reverse proxy
link_title: nginx reverse proxy
subtitle: Proxy requests to an app
logo: { src: /assets/logos/nginx.svg }
category: Networking
layout: snippet
last_verified_with: "nginx 1.30.8."
updated: 2026-11-28
links:
  - title: ngx_http_proxy_module
    url: https://nginx.org/en/docs/http/ngx_http_proxy_module.html
  - title: WebSocket proxying
    url: https://nginx.org/en/docs/http/websocket.html
---

## Proxying
<!-- {: .-snippets} -->

### Basic proxy
<!-- {: .-snippet} -->

```nginx
server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}
```
<!-- {: data-highlight="proxy_pass http://127.0.0.1:3000"} -->

**Passes requests upstream.** By default the app sees the upstream address in `Host` and the proxy's IP, unless headers are forwarded. See [proxy_pass](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass).

### Forward client headers
<!-- {: .-snippet} -->

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For
      $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```
<!-- {: data-highlight="Host; X-Real-IP; X-Forwarded-For; X-Forwarded-Proto"} -->

**Forwards client details.** By default the app sees the proxy's address; these headers pass the original host, client IP, and protocol, and `X-Forwarded-For` appends to the chain. See [proxy_set_header](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header).

### Proxy WebSockets
<!-- {: .-snippet} -->

```nginx
location /ws/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```
<!-- {: data-highlight="proxy_http_version 1.1; Upgrade; Connection"} -->

**Upgrades the connection for WebSockets.** `proxy_http_version 1.1` is the default since nginx 1.29.7; keep it for older versions. The upgrade headers are hop-by-hop, so nginx must set them; see [WebSocket proxying](https://nginx.org/en/docs/http/websocket.html).

### Stream responses
<!-- {: .-snippet} -->

```nginx
location /events/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_buffering off;
    proxy_read_timeout 1h;
}
```
<!-- {: data-highlight="proxy_buffering off; proxy_read_timeout 1h"} -->

**Sends chunks as they arrive.** Buffering is on by default and holds server-sent events until the buffer fills; the timeout closes idle streams. See [proxy_buffering](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_buffering).

### Strip the path prefix
<!-- {: .-snippet} -->

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3000/;
}
```
<!-- {: data-highlight="http://127.0.0.1:3000/"} -->

**Drops `/api/` before forwarding.** A URI in `proxy_pass` replaces the matched prefix, so `/api/users` reaches the app as `/users`; remove the trailing slash to keep the prefix; see [proxy_pass](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass).
