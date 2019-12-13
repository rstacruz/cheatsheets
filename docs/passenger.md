---
title: Phusion Passenger
---

    server {
       listen 80;
       server_name www.yourhost.com;
       root /somewhere/public;   # <--- be sure to point to 'public'!
       passenger_enabled on;
       autoindex on; # Show directory listings
    }

