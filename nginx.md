---
title: Nginx
category: Nginx
layout: 2017/sheet
tags: [Featured]
updated: 2019-03-31
weight: 30
intro: |
 [Nginx](http://nginx.org/) nginx is an high performance HTTP and reverse proxy server.  
---

Configuring server blocks
---------------
{: .-three-column}

### Listening to ports
```nginx
server {
  # standard HTTP protocol
  listen 80;
  
  # standard HTTPS protocol
  # With http2 
  listen 443 ssl http2;
  
  # listen on 80 using IPv6
  listen [::]:80;
  
  # listen only on IPv6
  listen [::]:80 ipv6only=on;
}
```

### Configuring hostnames
```nginx
server {
  # Listen to specific domain
  server_name yourdomain.com;
  
  # Listen to multiple domains
  server_name yourdomain.com www.yourdomain.com;
  
  # Listen to all sub-domains
  server_name *.yourdomain.com;
  
  # Listen to all top-level domains
  server_name yourdomain.*;
}
```

### Access log
```nginx
server {
  # Relative or full path to log file
  access_log /path/to/file.log;
  
  # Turn 'on' or 'off'
  access_log on;
}
```

Gzip
------------
{: .-two-column}

### Enable Gzip
```nginx
server {
  gzip on;
  gzip_min_length 10240;
  gzip_comp_level 1;
  gzip_vary on;
  gzip_disable "msie6";
  gzip_proxied expired no-cache no-store private auth;
}
```

### Gzip default files
```nginx
server {
   gzip_types
      # text/html is always compressed by HttpGzipModule
      text/css
      text/javascript
      text/xml
      text/plain
      text/x-component
      application/javascript
      application/x-javascript
      application/json
      application/xml
      application/rss+xml
      application/atom+xml
      font/truetype
      font/opentype
      application/vnd.ms-fontobject
      image/svg+xml;
}
```

Serving Files
--------
{: .-three-column}

### Serving a static folder
```nginx
server {
  listen 443 ssl http2;
  server_name yourdomain.com;
  root /path/to/website;
  error_page  404 /404.html;
  index index.html;
  location / {
    try_files $uri $uri/ =404;
  }
}
```

### Single page application setup
Useful for Vue, React, Angular ...
```nginx
server {
  listen 443 ssl http2;
  server_name yourdomain.com;
  root /path/to/website;
  
  location / {
  	try_files $uri $uri/ /index.html;
  }

```

### STS
```nginx
server {
  add_header Strict-Transport-Security "max-age=31536000; includeSubdomains; preload";
}
```

### Common expires
```nginx
server {
  sl_session_cache shared:SSL:50m;
  ssl_session_tickets off;
  location ~*  \.(jpg|jpeg|png|gif|ico|css|js)$ {
      expires 15d;
  }
  
  location ~*  \.(pdf)$ {
      expires 30d;
  }
}
```

### Force HTTPS
```nginx
server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;
  location / {
    return 301 https://yourdomain.com$request_uri;
  }
}
```


Proxy server
--------
```nginx
upstream node_js {
  # 3000 is a node application
  server 0.0.0.0:3000;
}

server {
  listen 80;
  server_name yourdomain.com;
  
  location / {
    proxy_pass http://node_js;
    proxy_redirect off;
	proxy_set_header Host $host;
	proxy_read_timeout 80;
  }
}
```

Performance
--------
### Performance
```nginx
http {
  sendfile    on;
  tcp_nopush  on;
  tcp_nodelay on;
  client_body_timeout 12;
  client_header_timeout 12;
  send_timeout 10;
  keepalive_timeout 15;
  keepalive_requests 500;
  client_body_buffer_size 10K;
  client_header_buffer_size 1k;
  large_client_header_buffers 2 1k;
  client_max_body_size 0;
}
```

Security
--------
### Security
```nginx
http {
  server_tokens off;

  add_header X-Frame-Options SAMEORIGIN;
  add_header X-Content-Type-Options nosniff;
  add_header X-XSS-Protection "1; mode=block";
}
```
