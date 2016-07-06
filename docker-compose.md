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

## Command

```sh
docker-compose start
docker-compose stop

docker-compose pause
docker-compose unpause

docker-compose ps
docker-compose up
docker-compose down

```

## Reference

```yaml
web:
  # build from Dockerfile
  build: .

  # build from image
  image: ubuntu
  image: ubuntu:14.04
  image: tutum/influxdb
  image: example-registry:4000/postgresql
  image: a4bc65fd

  ports:
    - "3000"
    - "8000:80"  # guest:host

  # command to execute
  command: bundle exec thin -p 3000
  command: [bundle, exec, thin, -p, 3000]

  # override the entrypoint
  entrypoint: /app/start.sh
  entrypoint: [php, -d, vendor/bin/phpunit]

  # environment vars
  environment:
    RACK_ENV: development
  environment:
    - RACK_ENV=development

  # environment vars from file
  env_file: .env
  env_file: [.env, .development.env]

  # expose ports to linked services (not to host)
  expose: ["3000"]

  # make this service extend another
  extends:
    file: common.yml  # optional
    service: webapp

  # makes the `db` service available as the hostname `database`
  # (implies depends_on)
  links:
    - db:database
    - redis

  # make sure `db` is alive before starting
  depends_on:
    - db

  volumes:
    - /var/lib/mysql
    - ./_data:/var/lib/mysql
```

## Less-often used

```yaml
web:
  labels:
    com.example.description: "Accounting web app"

  # change dns servers
  dns: 8.8.8.8
  dns:
    - 8.8.8.8
    - 8.8.4.4

  devices:
  - "/dev/ttyUSB0:/dev/ttyUSB0"

  external_links:
    - redis_1
    - project_db_1:mysql

  extra_hosts:
    - "somehost:192.168.1.100"
```
