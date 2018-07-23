---
title: docker-compose
category: Devops
layout: 2017/sheet
prism_languages: [yaml]
weight: -1
updated: 2018-07-23
---

### Basic example

```yaml
# docker-compose.yml
version: '2'

services:
  web:
    container_name: my_builded_container # Optionnal
    build: .
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

### Commands


```sh
# List the containers and their status of the containers in your compose file
# Almost same as Docker ps
docker-compose ps

# Pull the images of the concerned file from the registry.
# Usefull when using "latest" tag
docker-compose pull

# Build, create or recreate, start containers.
docker-compose up
# This command will run attached mode. To detach add -d parameter
# Example: docker-compose up -d
# Note by default it will create a project with the name of the current folder
# add --project-name <foobar> to create your service with custom name

# Stop containers and removes containers, networks and images created by UP.
docker-compose down
```

```sh
# Start the targeted service
docker-compose start <service>
# Stop the targeted service
docker-compose stop <service>
```

```sh
docker-compose pause
docker-compose unpause
```

## Reference
{: .-three-column}

### Building

```yaml
web:
  # build from Dockerfile
  build: .
```

```yaml
web:
  # build from Dockerfile in custom Path
  build: ./Path
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
    - "8000:80"  # guest:host
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
# Force the DNS server adress within the services
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

### Hosts

```yaml
# Force the DNS resolution
services:
  web:
    extra_hosts:
      - "somehost:192.168.1.100"
```
