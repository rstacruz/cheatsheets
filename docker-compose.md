---
title: docker-compose
category: Devops
prism_languages: [yaml]
weight: -1
updated: 2024-04-03 
---

### Basic example

```yaml
# docker-compose.yml
version: '2'

services:
  web:
    build:
    # build from Dockerfile
      context: ./Path
      dockerfile: Dockerfile
    ports:
     - "5000:5000"
    volumes:
     - .:/code
  redis:
    image: redis
```


### Version 1 to 2

Docker compose is now integrated into the official Docker installation. The functionality only improved over that change, and the simple syntax change is : V1 : `docker-compose ARG` to V2 `docker compose ARG`
More on that here : [Docker Compose](https://docs.docker.com/compose/) [Migrate to V2](https://docs.docker.com/compose/migrate/)

### Commands


```sh
docker compose version 
docker compose config    
```

```sh
docker compose start
docker compose stop
docker compose restart
docker compose run    
```

```sh
docker compose create  
docker compose attach      
docker compose pause
docker compose unpause
```

```sh
docker compose wait   
docker compose up
docker compose down
```

```sh 
docker compose ps
docker compose top 
docker compose events   
docker compose logs
```


```sh
docker compose images
docker compose build      
docker compose push  
docker compose cp       
docker compose exec 
```

## Reference
{: .-three-column}

### Building

```yaml
web:
  # build from Dockerfile
  build: .
  args:     # Add build arguments
    APP_HOME: app
```

```yaml
  # build from custom Dockerfile
  build:
    context: ./dir
    dockerfile: Dockerfile.dev
```

```yaml
  # build from image
  image: ubuntu
  image: ubuntu:14.04
  image: tutum/influxdb
  image: example-registry:4000/postgresql
  image: a4bc65fd
```

### Ports

```yaml
  ports:
    - "3000"
    - "8000:80"  # host:container
```

```yaml
  # expose ports to linked services (not to host)
  expose: ["3000"]
```

### Commands

```yaml
  # command to execute
  command: bundle exec thin -p 3000
  command: [bundle, exec, thin, -p, 3000]
```

```yaml
  # override the entrypoint
  entrypoint: /app/start.sh
  entrypoint: [php, -d, vendor/bin/phpunit]
```

### Environment variables

```yaml
  # environment vars
  environment:
    RACK_ENV: development
  environment:
    - RACK_ENV=development
```

```yaml
  # environment vars from file
  env_file: .env
  env_file: [.env, .development.env]
```

### Dependencies

```yaml
  # makes the `db` service available as the hostname `database`
  # (implies depends_on)
  links:
    - db:database
    - redis
```

```yaml
  # make sure `db` is alive before starting
  depends_on:
    - db
```

```yaml
  # make sure `db` is healty before starting
  # and db-init completed without failure
  depends_on:
    db:
      condition: service_healthy
    db-init:
      condition: service_completed_successfully
```

### Other options

```yaml
  # make this service extend another
  extends:
    file: common.yml  # optional
    service: webapp
```

```yaml
  volumes:
    - /var/lib/mysql
    - ./_data:/var/lib/mysql
```

```yaml
  # automatically restart container
  restart: unless-stopped
  # always, on-failure, no (default)
```

## Advanced features
{: .-three-column}

### Labels

```yaml
services:
  web:
    labels:
      com.example.description: "Accounting web app"
```

### DNS servers

```yaml
services:
  web:
    dns: 8.8.8.8
    dns:
      - 8.8.8.8
      - 8.8.4.4
```

### Devices

```yaml
services:
  web:
    devices:
    - "/dev/ttyUSB0:/dev/ttyUSB0"
```

### External links

```yaml
services:
  web:
    external_links:
      - redis_1
      - project_db_1:mysql
```

### Healthcheck

```yaml
    # declare service healthy when `test` command succeed
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 1m30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Hosts

```yaml
services:
  web:
    extra_hosts:
      - "somehost:192.168.1.100"
```

### Network

```yaml
# creates a custom network called `frontend`
networks:
  frontend:
```

### External network

```yaml
# join a pre-existing network
networks:
  default:
    external:
      name: frontend
```

### Volume

```yaml
# mount host paths or named volumes, specified as sub-options to a service
  db:
    image: postgres:latest
    volumes:
      - "/var/run/postgres/postgres.sock:/var/run/postgres/postgres.sock"
      - "dbdata:/var/lib/postgresql/data"

volumes:
  dbdata:
```

### User

```yaml
# specifying user
user: root
```

```yaml
# specifying both user and group with ids
user: 0:0
```
