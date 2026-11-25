---
title: nginx
subtitle: Web server and reverse proxy
category: Devops
updated: 2026-11-25
last_verified_with: "nginx 1.30.8."
tier: t2
fragments:
  - "nginx -t"
  - "server {"
  - "location /"
  - "proxy_pass"
  - "server_name"
  - "try_files"
  - "-s reload"
  - "return 301"
  - "rewrite"
  - "Upgrade"
  - "listen 443 ssl"
  - "http2 on"
  - "gzip on"
  - "expires 30d"
  - "limit_req"
  - "default_server"
keywords:
  - nginx
  - nginx.conf
  - server block
  - location block
  - reverse proxy
  - try_files
intro: |
  [nginx](https://nginx.org/en/docs/) is a web server and reverse proxy. This reference covers configuration files, server and location blocks, proxying, TLS, and caching.
links:
  - title: nginx documentation
    url: https://nginx.org/en/docs/
  - title: Beginner's guide
    url: https://nginx.org/en/docs/beginners_guide.html
  - title: ngx_http_proxy_module
    url: https://nginx.org/en/docs/http/ngx_http_proxy_module.html
---

## Getting started
<!-- {: .-three-column} -->

### Test the config

```bash
sudo nginx -t
```
<!-- {: data-highlight="-t"} -->

Prints `syntax is ok` and `test is successful` when the file parses. See the [command-line parameters](https://nginx.org/en/docs/switches.html).

### Reload the config

```bash
sudo nginx -s reload
```
<!-- {: data-highlight="-s reload"} -->

Applies a new config without dropping connections: the master starts new workers and drains the old ones. See [controlling nginx](https://nginx.org/en/docs/control.html).

### Config layout

```nginx
http {
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```
<!-- {: data-highlight="include"} -->

The main file holds `http`-level settings and includes site configs. Debian packages keep available sites in `sites-available` and link them into `sites-enabled`. See the [beginner's guide](https://nginx.org/en/docs/beginners_guide.html).

## Server blocks
<!-- {: .-three-column} -->

### Serve a domain

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/example;
    index index.html;
}
```
<!-- {: data-highlight="server_name example.com"} -->

Serves `example.com` from `/var/www/example` and returns `index.html` for `/`. See [server_name](https://nginx.org/en/docs/http/ngx_http_core_module.html#server_name).

### Wildcard hostnames

```nginx
server {
    listen 80;
    server_name example.com *.example.com;
}
```
<!-- {: data-highlight="*.example.com"} -->

Matches every subdomain with one block. A leading `*.` matches one or more labels. See [server_name](https://nginx.org/en/docs/http/ngx_http_core_module.html#server_name).

### Default server

```nginx
server {
    listen 80 default_server;
    return 404;
}
```
<!-- {: data-highlight="default_server"} -->

Answers requests whose `Host` matches no other block. Without it, the first server block on the port is the default. See [listen](https://nginx.org/en/docs/http/ngx_http_core_module.html#listen).

## Locations
<!-- {: .-three-column} -->

### Prefix match

```nginx
location /images/ {
    root /var/www;
}
```
<!-- {: data-highlight="location /images/"} -->

Matches any URI starting with `/images/`. nginx remembers the longest prefix, then checks regexes; a regex match wins unless the prefix uses `^~`. See [location](https://nginx.org/en/docs/http/ngx_http_core_module.html#location).

### Exact match

```nginx
location = /favicon.ico {
    access_log off;
}
```
<!-- {: data-highlight="location = /favicon.ico"} -->

Matches only `/favicon.ico`. `=` skips the usual prefix and regex search. See [location](https://nginx.org/en/docs/http/ngx_http_core_module.html#location).

### Case-insensitive regex

```nginx
location ~* \.(jpg|png|gif)$ {
    expires 30d;
}
```
<!-- {: data-highlight="~*"} -->

Matches image requests regardless of case. `~` is case-sensitive and `~*` is not. See [location](https://nginx.org/en/docs/http/ngx_http_core_module.html#location).

## Serve files
<!-- {: .-three-column} -->

### Single-page app

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
<!-- {: data-highlight="try_files $uri $uri/ /index.html"} -->

Falls back to `index.html` when no file matches, so client-side routes survive a refresh. See [try_files](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files).

### Alias a directory

```nginx
location /downloads/ {
    alias /srv/files/;
}
```
<!-- {: data-highlight="alias /srv/files/;"} -->

Maps `/downloads/a.zip` to `/srv/files/a.zip`. Unlike `root`, `alias` replaces the matched prefix. See [alias](https://nginx.org/en/docs/http/ngx_http_core_module.html#alias).

### Block dotfiles

```nginx
location ~ /\.(?!well-known/) {
    deny all;
}
```
<!-- {: data-highlight="deny all"} -->

Rejects paths like `/.env` and `/.git/config`, while leaving `/.well-known/` for ACME challenges. The regex matches a dot anywhere after a slash. See [deny](https://nginx.org/en/docs/http/ngx_http_access_module.html#deny).

## Proxy

### Forward to an app

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
}
```
<!-- {: data-highlight="proxy_pass http://127.0.0.1:3000"} -->

Sends every request to the app. The app sees the upstream address in `Host` and the proxy's IP unless headers are set. See [proxy_pass](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass).

### Forward client headers

```nginx
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```
<!-- {: data-highlight="Host; X-Real-IP; X-Forwarded-For; X-Forwarded-Proto"} -->

Gives the app the original host, client IP, and proxy chain. `X-Forwarded-For` appends to the incoming header. See [proxy_set_header](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header).

### Proxy WebSockets

```nginx
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
```
<!-- {: data-highlight="proxy_http_version 1.1; Upgrade; Connection"} -->

Passes the hop-by-hop upgrade headers. `proxy_http_version 1.1` is required before nginx 1.29.7. See [WebSocket proxying](https://nginx.org/en/docs/http/websocket.html).

### Stream responses

```nginx
proxy_buffering off;
proxy_read_timeout 1h;
```
<!-- {: data-highlight="proxy_buffering off; proxy_read_timeout 1h"} -->

Sends each chunk as it arrives, for server-sent events or long polls. Buffering is on by default. See [proxy_buffering](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_buffering).

### Strip a path prefix

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3000/;
}
```
<!-- {: data-highlight="http://127.0.0.1:3000/"} -->

Replaces `/api/` with `/`, so `/api/users` reaches the app as `/users`. Drop the trailing slash to keep the prefix. See [proxy_pass](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass).

## Redirects

### Force HTTPS

```nginx
server {
    listen 80;
    return 301 https://$host$request_uri;
}
```
<!-- {: data-highlight="https://$host$request_uri"} -->

Sends every HTTP request to the same path over HTTPS. `$request_uri` keeps the query string. See [return](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#return).

### Move an old path

```nginx
rewrite ^/old/(.*)$ /new/$1 permanent;
```
<!-- {: data-highlight="rewrite"} -->

Redirects `/old/a` to `/new/a` with a `301`. `permanent` returns 301; `redirect` returns 302. See [rewrite](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite).

### Redirect a host

```nginx
server {
    listen 80;
    server_name old.example.com;
    return 301 https://example.com$request_uri;
}
```
<!-- {: data-highlight="return 301 https://example.com$request_uri"} -->

Moves an old domain to the new one. An exact `server_name` beats a wildcard, so block order does not matter. See [return](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#return).

## TLS

### Enable HTTPS

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate     /etc/ssl/example.com.pem;
    ssl_certificate_key /etc/ssl/example.com.key;
}
```
<!-- {: data-highlight="listen 443 ssl"} -->

Terminates TLS for the site. The certificate file must hold the full chain. See [ssl_certificate](https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_certificate).

### Enable HTTP/2

```nginx
listen 443 ssl;
http2 on;
```
<!-- {: data-highlight="http2 on"} -->

Turns on HTTP/2 for the listener. `http2 on` replaced the `listen ... http2` parameter in 1.25.1. See [http2](https://nginx.org/en/docs/http/ngx_http_v2_module.html#http2).

### Restrict TLS versions

```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers off;
```
<!-- {: data-highlight="TLSv1.2 TLSv1.3"} -->

Allows only TLS 1.2 and 1.3. With `off`, the client picks the cipher order, which suits modern clients. See [ssl_protocols](https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_protocols).

## Compression and caching

### Gzip responses

```nginx
gzip on;
gzip_types text/css application/javascript
  application/json image/svg+xml;
```
<!-- {: data-highlight="gzip on; gzip_types"} -->

Compresses the listed types when the client sends `Accept-Encoding: gzip`. `text/html` is always included, whatever `gzip_types` says. See [gzip_types](https://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_types).

### Cache assets

```nginx
location /assets/ {
    expires 30d;
    add_header Cache-Control "public";
}
```
<!-- {: data-highlight="expires 30d"} -->

Adds `Expires` and `Cache-Control` for a month. `add_header` applies to 200, 201, 204, 206, and the 301/302/303/304/307/308 redirects by default; add `always` to cover other statuses. See [expires](https://nginx.org/en/docs/http/ngx_http_headers_module.html#expires).

### Revalidate HTML

```nginx
location = /index.html {
    add_header Cache-Control "no-cache";
}
```
<!-- {: data-highlight="no-cache"} -->

Forces browsers to revalidate the entry document on every load. `no-cache` still allows a cached copy after validation. See [add_header](https://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header).

## Logs and limits

### Log requests

```nginx
access_log /var/log/nginx/access.log;
error_log /var/log/nginx/error.log warn;
```
<!-- {: data-highlight="access_log; error_log"} -->

Writes each request and warnings to the distro log paths. `error_log` accepts `debug` on builds with `--with-debug`. See [access_log](https://nginx.org/en/docs/http/ngx_http_log_module.html#access_log) and [error_log](https://nginx.org/en/docs/ngx_core_module.html#error_log).

### Limit uploads

```nginx
client_max_body_size 20m;
```
<!-- {: data-highlight="client_max_body_size 20m"} -->

Rejects larger request bodies with `413`. The default is `1m`, which catches file uploads. See [client_max_body_size](https://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size).

### Rate limit

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

server {
    location /api/ {
        limit_req zone=api burst=20 nodelay;
    }
}
```
<!-- {: data-highlight="limit_req_zone; limit_req zone=api burst=20 nodelay"} -->

Allows 10 requests per second per IP, with a burst of 20. Excess requests get `503`. See [limit_req](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html#limit_req).

### Set timeouts

```nginx
client_body_timeout 12s;
client_header_timeout 12s;
keepalive_timeout 15s;
```
<!-- {: data-highlight="client_body_timeout 12s; client_header_timeout 12s; keepalive_timeout 15s"} -->

Cuts off clients that stall between reads and closes idle keep-alive connections. `keepalive_timeout` is how long an idle connection stays open. See [keepalive_timeout](https://nginx.org/en/docs/http/ngx_http_core_module.html#keepalive_timeout).

## Also see

[nginx reverse proxy cheatsheet](./nginx-reverse-proxy)
<!-- {: .-crosslink} -->

[Restart nginx cheatsheet](./nginx-restart)
<!-- {: .-crosslink} -->
