---
title: How to rate limit requests in nginx
link_title: nginx rate limit
subtitle: Throttle requests per client
category: Devops
layout: snippet
last_verified_with: "nginx 1.30.8."
updated: 2026-11-25
links:
  - title: ngx_http_limit_req_module
    url: https://nginx.org/en/docs/http/ngx_http_limit_req_module.html
---

## Limiting
<!-- {: .-snippets} -->

### Limit by IP
<!-- {: .-snippet} -->

```nginx
limit_req_zone $binary_remote_addr
  zone=api:10m rate=10r/s;

server {
    location /api/ {
        limit_req zone=api burst=20 nodelay;
    }
}
```
<!-- {: data-highlight="$binary_remote_addr"} -->

**Caps each client IP at 10 requests per second.** The zone takes 10 MB of shared memory; `burst=20 nodelay` serves short spikes and rejects the rest with 503; see [limit_req_zone](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html#limit_req_zone).

### Queue bursts
<!-- {: .-snippet} -->

```nginx
limit_req zone=api burst=20;
```
<!-- {: data-highlight="burst=20"} -->

**Queues excess requests instead of rejecting them.** Without `nodelay`, nginx delays up to `burst` requests to smooth spikes; see [limit_req](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html#limit_req).

### Return 429
<!-- {: .-snippet} -->

```nginx
limit_req_status 429;
```
<!-- {: data-highlight="429"} -->

**Returns 429 instead of 503.** Clients can tell throttling apart from a server fault; see [limit_req_status](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html#limit_req_status).

### Limit by API key
<!-- {: .-snippet} -->

```nginx
limit_req_zone $http_x_api_key
  zone=key:10m rate=5r/s;
```
<!-- {: data-highlight="$http_x_api_key"} -->

**Limits each API key separately.** Any variable works as the key; requests without the header share one empty key; see [limit_req_zone](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html#limit_req_zone).

### Log without enforcing
<!-- {: .-snippet} -->

```nginx
limit_req_dry_run on;
limit_req_log_level info;
```
<!-- {: data-highlight="limit_req_dry_run on; limit_req_log_level info"} -->

**Logs excess requests without rejecting them.** The dry-run message appears at `info` level; use it to tune a limit before enforcing it; see [limit_req_dry_run](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html#limit_req_dry_run).
