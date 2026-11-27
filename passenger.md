---
title: Phusion Passenger
category: Hidden
subtitle: Ruby application server
logo: { set: icon-park-outline, name: server }
# Unfinished stub: one Nginx server block, no installation or app setup.
tags: [Archived]
archived: |
  This unfinished page shows only `passenger_enabled` in a sample Nginx
  server block. Use
  [Passenger's documentation](https://www.phusionpassenger.com/docs/).
last_verified_with: "Passenger 6.2.2."
updated: 2026-11-25
intro: |
  Phusion Passenger serves Ruby applications through Nginx. This sheet shows the minimal server block that enables Passenger for an app's public directory.
links:
  - title: Passenger documentation
    url: https://www.phusionpassenger.com/docs/
  - title: Nginx config reference
    url: https://www.phusionpassenger.com/library/config/nginx/reference/#passenger_enabled
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
