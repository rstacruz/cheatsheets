---
title: How to increase the nginx upload size limit
link_title: Increase nginx upload size
subtitle: Allow larger request bodies
category: Devops
layout: snippet
last_verified_with: "nginx 1.30.8."
updated: 2026-11-25
links:
  - title: client_max_body_size
    url: https://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size
---

## Raising the limit
<!-- {: .-snippets} -->

### Raise the limit
<!-- {: .-snippet} -->

```nginx
server {
    client_max_body_size 20m;
}
```
<!-- {: data-highlight="client_max_body_size 20m"} -->

**Allows request bodies up to 20 MB.** The default is 1 MB, and larger uploads get `413`; see [client_max_body_size](https://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size).

### Scope it to a route
<!-- {: .-snippet} -->

```nginx
location /upload/ {
    client_max_body_size 100m;
}
```
<!-- {: data-highlight="location /upload/"} -->

**Raises the limit only for uploads.** A location value overrides the server and `http` levels; see [client_max_body_size](https://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size).

### Check the effective limit
<!-- {: .-snippet} -->

```bash
sudo nginx -T | grep client_max_body_size
```
<!-- {: data-highlight="-T"} -->

**Shows every configured limit.** `-T` prints included files, so a limit hidden in a snippet still appears; see [command-line parameters](https://nginx.org/en/docs/switches.html).
