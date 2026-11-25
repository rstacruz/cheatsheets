---
title: Phusion Passenger
category: Rails
subtitle: Ruby application server
tags: [WIP]
tier: t3
last_verified_with: "Passenger 6.2.2."
updated: 2026-11-25
---

### Enabling Phusion Passenger

```nginx
server {
    listen 80;
    server_name www.yourhost.com;
    root /somewhere/public;  # point this at 'public'!
    passenger_enabled on;
    autoindex on;  # show directory listings
}
```
<!-- {: data-highlight="passenger_enabled on"} -->

See: [passenger_enabled](https://www.phusionpassenger.com/library/config/nginx/reference/#passenger_enabled)
