---
title: docker-compose
category: Devops
---

```yaml
# docker-compose.yml
version: '2'

services:
  web:
    build: .
    ports:
     - "5000:5000"
    volumes:
     - .:/code
  redis:
    image: redis
```

```sh
docker-compose up
```
