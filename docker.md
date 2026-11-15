---
title: Docker CLI
category: Devops
tier: t2
tags: [Featured]
updated: 2026-11-11
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

Downloads an image from a registry. `docker run` pulls missing images automatically. Use `--platform` to fetch a specific architecture.

See: [docker pull](https://docs.docker.com/reference/cli/docker/image/pull/)

### `run` - Start a container

```bash
docker run -it debian:trixie-slim /bin/bash
docker run -d --name web -p 5000:5000 myapp:1.0
docker run --rm -it -v "$PWD":/app -w /app node:24 npm test
```

#### Options

```bash
docker run [options] IMAGE [COMMAND] [ARG...]
  -a, --attach               # attach STDIN/STDOUT/STDERR
  -i, --interactive          # keep STDIN open
  -t, --tty                  # allocate a pseudo-TTY
      --name NAME            # container name
  -d, --detach               # run in the background
      --rm                   # remove when it exits
  -p, --publish 5000:5000    # host:container port map
  -P, --publish-all          # publish all exposed ports
      --expose 5432          # expose without publishing
  -v, --volume "$PWD":/app   # bind mount (absolute path)
      --env-file .env        # read env vars from a file
  -e, --env NAME=hello       # set an env var
      --network NETWORK      # connect to a network
      --platform linux/amd64 # set target platform
      --pull always          # missing (default), always, never
```

Creates and starts a container from an image. Takes the same options
as `docker create`, plus the detach options (`-d`, `--detach-keys`,
`--sig-proxy`).

See: [docker run](https://docs.docker.com/reference/cli/docker/container/run/)

### `ps` - List containers

```bash
docker ps                 # running containers
docker ps -a              # include stopped containers
docker ps -q              # IDs only
docker ps --format 'table {{.Names}}\t{{.Status}}'
```

See: [docker ps](https://docs.docker.com/reference/cli/docker/container/ls/)

### `logs` - Show container logs

```bash
docker logs web
docker logs -f web              # follow output
docker logs --tail 100 web      # last 100 lines
docker logs --since 10m web     # since a duration
```

See: [docker logs](https://docs.docker.com/reference/cli/docker/container/logs/)

### `exec` - Run a command in a container

```bash
docker exec -it web /bin/bash
docker exec web tail -f log/development.log
```

Runs a command in a running container. Use `-it` for interactive shells.

See: [docker exec](https://docs.docker.com/reference/cli/docker/container/exec/)

## Images

### `build` - Build an image

```bash
docker build -t myapp:1.0 .
docker build --platform linux/amd64 -t myapp:1.0 .
docker build --build-arg APP_HOME=/app -t myapp:1.0 .
```

Builds an image from a `Dockerfile` in the current directory.

See: [docker build](https://docs.docker.com/reference/cli/docker/image/build/)

### `buildx` - Multi-platform builds

```bash
docker buildx create --name multi --use
docker buildx build --platform linux/amd64,linux/arm64 \
  -t me/app:1.0 --push .
docker buildx ls
```

`docker build` is an alias for `docker buildx build`. Multi-platform
output needs `--push` or `--output`.

See: [docker buildx](https://docs.docker.com/reference/cli/docker/buildx/)

### `images` - List images

```bash
docker images
docker images -a     # include intermediate and dangling images
docker image ls      # alias
```

See: [docker images](https://docs.docker.com/reference/cli/docker/image/ls/)

### `tag` - Tag an image

```bash
docker tag myapp:1.0 me/myapp:1.0
docker tag myapp:1.0 registry.example.com/myapp:1.0
```

The tag defaults to `latest` when omitted.

See: [docker tag](https://docs.docker.com/reference/cli/docker/image/tag/)

### `push` - Upload an image

```bash
docker login registry.example.com
docker push registry.example.com/myapp:1.0
```

The image name determines which registry it is pushed to.

See: [docker push](https://docs.docker.com/reference/cli/docker/image/push/)

### `rmi` - Delete images

```bash
docker rmi myapp:1.0
docker rmi b750fe78269d
```

See: [docker rmi](https://docs.docker.com/reference/cli/docker/image/rm/)

## Containers

### `create` - Create a container

```bash
docker create --name cache --expose 6379 redis:8
```

Creates a container without starting it. Use `docker start` to run it.

See: [docker create](https://docs.docker.com/reference/cli/docker/container/create/)

### `start` / `stop` - Start and stop

```bash
docker start web
docker stop web
docker restart web
docker kill web          # stop immediately (SIGKILL)
```

See: [docker start](https://docs.docker.com/reference/cli/docker/container/start/) and [docker stop](https://docs.docker.com/reference/cli/docker/container/stop/)

### `rm` - Delete containers

```bash
docker rm web
docker rm -f web         # force-remove a running container
```

See: [docker rm](https://docs.docker.com/reference/cli/docker/container/rm/)

## Clean up

### `system prune`

```bash
docker system prune            # stopped containers, networks, cache
docker system prune -a         # also unused images, all build cache
docker system prune --volumes  # also anonymous volumes
```

Removes stopped containers, unused networks, dangling images, and unused build cache. `-a` also removes all unused images and build cache; `--volumes` also removes anonymous volumes.

See: [docker system prune](https://docs.docker.com/reference/cli/docker/system/prune/)

### `container prune`

```bash
docker container prune
```

Removes all stopped containers.

See: [docker container prune](https://docs.docker.com/reference/cli/docker/container/prune/)

### `image prune`

```bash
docker image prune        # dangling images
docker image prune -a     # all unused images
```

See: [docker image prune](https://docs.docker.com/reference/cli/docker/image/prune/)

### `builder prune`

```bash
docker builder prune        # remove build cache
docker builder prune -a     # also internal/frontend images
```

See: [docker buildx prune](https://docs.docker.com/reference/cli/docker/buildx/prune/)

### `volume prune`

```bash
docker volume prune       # anonymous volumes
docker volume prune -a    # all unused volumes
```

See: [docker volume prune](https://docs.docker.com/reference/cli/docker/volume/prune/)

### `system df`

```bash
docker system df
```

Shows disk usage by images, containers, volumes, and build cache.

See: [docker system df](https://docs.docker.com/reference/cli/docker/system/df/)

### `system events`

```bash
docker system events
```

Streams real-time daemon events. Alias for `docker events`.

See: [docker system events](https://docs.docker.com/reference/cli/docker/system/events/)
