---
title: nginx
category: Nginx
layout: default-ad
---

{% raw %}

### Basic

```shell
http {
server {
	location {}
  }
}
```

### Blocks: server


```shell
server {
    listen      80 default_server;
    server_name _;
    ...
}
```

### server_name

```shell

server {
    listen      80 default_server;
    server_name example.net www.example.net;
    ...
}

```


### Routes

```shell
server {
    listen      80 default_server;
    server_name example.net www.example.net;
    
    location / {
     # ...
    }
}
```


### Indexing

```shell
http{
autoindex on | off;
}
```

### Rewrite

```shell
rewrite ^/rewriteme/(.*)$ /$1 last;
```


### Directives: error_page

```shell
error_page 404             /404.html;
error_page 403             /403.html;
error_page 500 502 503 504 /50x.html;
```

### more_clear_headers
```shelll
http {
    more_clear_headers Server;
}

```

### Port forwarding
```shell
server {
    listen 80;
    server_name _;

    location / {
        proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header   Host $http_host;
        proxy_pass         "http://127.0.0.1:5000";
    }
}
```

### Load balance

```shell
upstream [name] {
   least_conn;
   server 10.1.0.101; 
   server 10.1.0.102;
   server 10.1.0.103;
}
```

```shell

http {
   upstream service {
      server 10.1.0.101; 
      server 10.1.0.102;
      server 10.1.0.103;
   }

   server {
      listen 80; 

      location / {
          proxy_pass http://service;
      }
   }
}

```


### Auth Basic
```shell
apt install apache2-utils
htpasswd -c /etc/nginx/myusers username
cat /etc/nginx/myusers
```

```shell
server {
    #...
    location /secret-folder  {
        auth_basic "What's the Password?" ;
        auth_basic_user_file /etc/nginx/myusers ;
    }
    #...
}
```


```shell
http {
    server {
        listen 80;
        root /var/www/website ;

        #...
        location /secret-folder {
            satisfy all ;

            allow 192.168.1.3/24;
            deny 127.0.0.1 ;

            auth_basic "What's the Password?" ;
            auth_basic_user_file /etc/nginx/myusers ;
        }
    }
}
```

### Hide Server Version

```shell
http{
server_tokens off;
}
```

{% endraw %}
