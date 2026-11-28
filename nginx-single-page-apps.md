---
title: How to serve a single-page app with nginx
link_title: nginx single-page apps
subtitle: Route client-side paths to index.html
logo: { src: /assets/logos/nginx.svg }
category: Devops
layout: snippet
last_verified_with: "nginx 1.30.8."
created_at: 2026-11-25
updated: 2026-11-28
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

**Serves `index.html` for unknown paths.** Existing files are served directly, so assets keep working. See [try_files](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files).

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

**Keeps API calls separate.** A longer prefix wins, so `/api/...` reaches the backend instead of the fallback. See [location](https://nginx.org/en/docs/http/ngx_http_core_module.html#location).

### 404 missing assets
<!-- {: .-snippet} -->

```nginx
location /assets/ {
    try_files $uri =404;
}
```
<!-- {: data-highlight="=404"} -->

**Returns 404 for missing assets.** A fallback here would return `index.html` as `text/html` for a `.js` URL instead. See [try_files](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files).
