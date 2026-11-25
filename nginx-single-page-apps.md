---
title: How to serve a single-page app with nginx
link_title: nginx single-page apps
subtitle: Route client-side paths to index.html
category: Devops
layout: snippet
last_verified_with: "nginx 1.30.8."
updated: 2026-11-25
links:
  - title: try_files
    url: https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files
  - title: location
    url: https://nginx.org/en/docs/http/ngx_http_core_module.html#location
---

## Serving
<!-- {: .-snippets} -->

### Fall back to index.html
<!-- {: .-snippet} -->

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
<!-- {: data-highlight="try_files $uri $uri/ /index.html"} -->

**Serves `index.html` for any unknown path.** Existing files are served directly, so assets keep working; see [try_files](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files).

### Exclude API routes
<!-- {: .-snippet} -->

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3000;
}

location / {
    try_files $uri $uri/ /index.html;
}
```
<!-- {: data-highlight="location /api/"} -->

**Keeps API calls away from the fallback.** A longer prefix wins, so `/api/...` reaches the backend; see [location](https://nginx.org/en/docs/http/ngx_http_core_module.html#location).

### 404 missing assets
<!-- {: .-snippet} -->

```nginx
location /assets/ {
    try_files $uri =404;
}
```
<!-- {: data-highlight="=404"} -->

**Returns 404 for missing assets instead of `index.html`.** A fallback here would return `index.html` as `text/html` for a `.js` URL; see [try_files](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files).
