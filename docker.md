---
title: Docker CLI
seo_title: Docker cheatsheet — commands, flags, examples
description: "Docker commands: flags, containers, images, volumes and logs. Copy-paste reference with examples."
subtitle: Container engine CLI
logo: { src: /assets/logos/docker.svg }
category: Containers
tier: t2
last_verified_with: "Docker 29.10.1."
fragments:
  - "docker pull"
  - "docker run -it"
  - "docker ps -a"
  - "docker logs -f"
  - "docker exec -it"
  - "docker build -t"
  - "docker images"
  - "docker rm -f"
  - "docker tag"
  - "system prune"
  - "docker ps -q"
  - "docker buildx"
  - "docker rmi"
  - "docker system df"
tags: [Featured]
created_at: 2013-08-24
updated: 2026-11-28
last_verified_at: 2026-11-28
keywords:
  - docker build
  - docker run
  - docker ps
  - docker logs
intro: |
  [Docker](https://docs.docker.com/) packages applications into images and runs them as containers. This reference covers the most commonly used Docker CLI commands.
links:
  - title: Docker CLI reference
    url: https://docs.docker.com/reference/cli/docker/
  - title: Dockerfile cheatsheet
    url: "./dockerfile"
  - title: Docker Compose cheatsheet
    url: "./docker-compose"
---

## Getting started

### `pull` - Download an image

```bash
docker pull debian:trixie-slim
docker pull redis:8
docker pull --platform linux/amd64 redis:8
```
<!-- {: data-highlight="docker pull"} -->

Downloads an image from a registry. `docker run` pulls missing images automatically. Use `--platform` to fetch a specific architecture.

See: [docker pull](https://docs.docker.com/reference/cli/docker/image/pull/)

### `run` - Start a container

```bash
docker run -it debian:trixie-slim /bin/bash
docker run -d --name web -p 5000:5000 myapp:1.0
docker run --rm -it -v "$PWD":/app -w /app node:24 npm test
```
<!-- {: data-highlight="docker run"} -->

#### Options

| Option                     | Description                          |
| -------------------------- | ------------------------------------ |
| `-a, --attach`             | Attach STDIN, STDOUT, and STDERR      |
| `-i, --interactive`        | Keep STDIN open                       |
| `-t, --tty`                | Allocate a pseudo-TTY                 |
| ---                        | ---                                  |
| `--name NAME`              | Set the container name                |
| `-d, --detach`             | Run in the background                 |
| `--rm`                     | Remove the container on exit          |
| ---                        | ---                                  |
| `-p, --publish 5000:5000`  | Map a host port to a container port   |
| `-P, --publish-all`        | Publish all exposed ports             |
| `--expose 5432`            | Expose a port without publishing      |
| `-v, --volume "$PWD":/app` | Bind-mount an absolute path           |
| `--env-file .env`          | Read environment variables from a file |
| `-e, --env NAME=hello`     | Set an environment variable           |
| ---                        | ---                                  |
| `--network NETWORK`        | Connect to a network                  |
| `--platform linux/amd64`   | Set the target platform               |
| `--pull always`            | `missing` (default), `always`, `never` |

Creates and starts a container from an image. Takes the same options as `docker create`, plus the detach options (`-d`, `--detach-keys`, `--sig-proxy`).

See: [docker run](https://docs.docker.com/reference/cli/docker/container/run/)

### `ps` - List containers

#### Running containers

```bash
docker ps
```
<!-- {: data-highlight="docker ps"} -->

#### Include stopped containers

```bash
docker ps -a
```

#### IDs only

```bash
docker ps -q
```

#### Custom format

```bash
docker ps --format 'table {{.Names}}\t{{.Status}}'
```

See: [docker ps](https://docs.docker.com/reference/cli/docker/container/ls/)

### `logs` - Show container logs

#### All logs

```bash
docker logs web
```
<!-- {: data-highlight="docker logs"} -->

#### Follow output

```bash
docker logs -f web
```

#### Last lines

```bash
docker logs --tail 100 web
```

#### Since a duration

```bash
docker logs --since 10m web
```

See: [docker logs](https://docs.docker.com/reference/cli/docker/container/logs/)

### `exec` - Run a command in a container

```bash
docker exec -it web /bin/bash
docker exec web tail -f log/development.log
```
<!-- {: data-highlight="docker exec"} -->

Runs a command in a running container. Use `-it` for interactive shells.

See: [docker exec](https://docs.docker.com/reference/cli/docker/container/exec/)

## Images

### `build` - Build an image

```bash
docker build -t myapp:1.0 .
docker build --platform linux/amd64 -t myapp:1.0 .
docker build --build-arg APP_HOME=/app -t myapp:1.0 .
```
<!-- {: data-highlight="docker build"} -->

Builds an image from a `Dockerfile` in the current directory.

See: [docker build](https://docs.docker.com/reference/cli/docker/image/build/)

### `buildx` - Multi-platform builds

```bash
docker buildx create --name multi --use
docker buildx build --platform linux/amd64,linux/arm64 \
  -t me/app:1.0 --push .
docker buildx ls
```
<!-- {: data-highlight="docker buildx"} -->

`docker build` is an alias for `docker buildx build`. Multi-platform output needs `--push` or `--output`.

See: [docker buildx](https://docs.docker.com/reference/cli/docker/buildx/)

### `images` - List images

```bash
docker images
docker images -a     # include intermediate and dangling images
docker image ls      # alias
```
<!-- {: data-highlight="docker images"} -->

See: [docker images](https://docs.docker.com/reference/cli/docker/image/ls/)

### `tag` - Tag an image

```bash
docker tag myapp:1.0 me/myapp:1.0
docker tag myapp:1.0 registry.example.com/myapp:1.0
```
<!-- {: data-highlight="docker tag"} -->

The tag defaults to `latest` when omitted.

See: [docker tag](https://docs.docker.com/reference/cli/docker/image/tag/)

### `push` - Upload an image

```bash
docker login registry.example.com
docker push registry.example.com/myapp:1.0
```
<!-- {: data-highlight="docker push"} -->

The image name determines which registry it is pushed to.

See: [docker push](https://docs.docker.com/reference/cli/docker/image/push/)

### `rmi` - Delete images

```bash
docker rmi myapp:1.0
docker rmi b750fe78269d
```
<!-- {: data-highlight="docker rmi"} -->

See: [docker rmi](https://docs.docker.com/reference/cli/docker/image/rm/)

## Containers

### `create` - Create a container

```bash
docker create --name cache --expose 6379 redis:8
```
<!-- {: data-highlight="docker create"} -->

Creates a container without starting it. Use `docker start` to run it.

See: [docker create](https://docs.docker.com/reference/cli/docker/container/create/)

### `start` / `stop` - Start and stop

#### Start

```bash
docker start web
```
<!-- {: data-highlight="docker start"} -->

#### Stop

```bash
docker stop web
```
<!-- {: data-highlight="docker stop"} -->

#### Restart

```bash
docker restart web
```
<!-- {: data-highlight="docker restart"} -->

#### Kill

```bash
docker kill web
```
<!-- {: data-highlight="docker kill"} -->

See: [docker start](https://docs.docker.com/reference/cli/docker/container/start/) and [docker stop](https://docs.docker.com/reference/cli/docker/container/stop/)

### `rm` - Delete containers

#### By name

```bash
docker rm web
```
<!-- {: data-highlight="docker rm"} -->

#### Force a running container

```bash
docker rm -f web
```

See: [docker rm](https://docs.docker.com/reference/cli/docker/container/rm/)

### `inspect` - Show container details

```bash
docker inspect web
docker inspect -f '{{.State.Status}}' web
```
<!-- {: data-highlight="docker inspect"} -->

See: [docker inspect](https://docs.docker.com/reference/cli/docker/container/inspect/)

### `cp` - Copy files to or from a container

```bash
docker cp ./app.js web:/app/app.js
docker cp web:/etc/nginx/nginx.conf ./nginx.conf
```
<!-- {: data-highlight="docker cp"} -->

See: [docker cp](https://docs.docker.com/reference/cli/docker/container/cp/)

## Clean up
<!-- {: .-three-column} -->

### `system prune`

#### Stopped containers and cache

```bash
docker system prune
```
<!-- {: data-highlight="docker system prune"} -->

#### Unused images and all cache

```bash
docker system prune -a
```

#### Include anonymous volumes

```bash
docker system prune --volumes
```

Removes stopped containers, unused networks, dangling images, and unused build cache. `-a` also removes all unused images and build cache; `--volumes` also removes anonymous volumes.

See: [docker system prune](https://docs.docker.com/reference/cli/docker/system/prune/)

### `container prune`

```bash
docker container prune
```
<!-- {: data-highlight="docker container prune"} -->

Removes all stopped containers.

See: [docker container prune](https://docs.docker.com/reference/cli/docker/container/prune/)

### `image prune`

#### Dangling images

```bash
docker image prune
```
<!-- {: data-highlight="docker image prune"} -->

#### All unused images

```bash
docker image prune -a
```

See: [docker image prune](https://docs.docker.com/reference/cli/docker/image/prune/)

### `builder prune`

#### Build cache

```bash
docker builder prune
```
<!-- {: data-highlight="docker builder prune"} -->

#### Include internal images

```bash
docker builder prune -a
```

See: [docker buildx prune](https://docs.docker.com/reference/cli/docker/buildx/prune/)

### `volume prune`

#### Anonymous volumes

```bash
docker volume prune
```
<!-- {: data-highlight="docker volume prune"} -->

#### All unused volumes

```bash
docker volume prune -a
```

See: [docker volume prune](https://docs.docker.com/reference/cli/docker/volume/prune/)

### `system df`

```bash
docker system df
```
<!-- {: data-highlight="docker system df"} -->

Shows disk usage by images, containers, volumes, and build cache.

See: [docker system df](https://docs.docker.com/reference/cli/docker/system/df/)

### `system events`

```bash
docker system events
```
<!-- {: data-highlight="docker system events"} -->

Streams real-time daemon events. Alias for `docker events`.

See: [docker system events](https://docs.docker.com/reference/cli/docker/system/events/)
