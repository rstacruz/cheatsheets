---
title: Docker CLI
category: Devops
tier: t2
tags: [Featured]
updated: 2026-10-31
keywords:
  - docker build
  - docker run
  - docker ps
  - docker logs
intro: |
  [Docker](https://docs.docker.com/) packages applications into images and runs them as containers. This reference covers the most commonly used Docker CLI commands.
---

## Getting started

### About
{: .-intro}

[Docker](https://docs.docker.com/) packages applications into images and runs them as containers. This reference covers the most commonly used Docker CLI commands.

- [Docker CLI reference](https://docs.docker.com/reference/cli/docker/) _(docs.docker.com)_
- [Dockerfile cheatsheet](./dockerfile) _(devhints.io)_
- [Docker Compose cheatsheet](./docker-compose) _(devhints.io)_

### `pull` - Download an image

```bash
docker pull debian:bookworm-slim
docker pull redis:7
```

Downloads an image from a registry. `docker run` pulls missing images automatically.

### `run` - Start a container

```bash
docker run -it debian:bookworm-slim /bin/bash
docker run -d --name web -p 5000:5000 myapp:1.0
docker run --rm -it -v "$PWD":/app -w /app node:22 npm test
```

Creates and starts a container from an image.

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
```

`docker create` takes the same options except `-d`/`--detach`, and doesn't start the container.

### `ps` - List containers

```bash
docker ps                 # running containers
docker ps -a              # include stopped containers
docker ps -q              # IDs only
docker ps --format 'table {{.Names}}\t{{.Status}}'
```

### `logs` - Show container logs

```bash
docker logs web
docker logs -f web              # follow output
docker logs --tail 100 web      # last 100 lines
docker logs --since 10m web     # since a duration
```

### `exec` - Run a command in a container

```bash
docker exec -it web /bin/bash
docker exec web tail -f log/development.log
```

Runs a command in a running container. Use `-it` for interactive shells.

## Images

### `build` - Build an image

```bash
docker build -t myapp:1.0 .
docker build --build-arg APP_HOME=/app -t myapp:1.0 .
```

Builds an image from a `Dockerfile` in the current directory.

### `images` - List images

```bash
docker images
docker images -a     # include intermediate and dangling images
docker image ls      # alias
```

### `tag` - Tag an image

```bash
docker tag myapp:1.0 me/myapp:1.0
docker tag myapp:1.0 registry.example.com/myapp:1.0
```

The part after the colon is the tag (defaults to `latest`).

### `push` - Upload an image

```bash
docker login registry.example.com
docker push registry.example.com/myapp:1.0
```

The image name determines which registry it is pushed to.

### `rmi` - Delete images

```bash
docker rmi myapp:1.0
docker rmi b750fe78269d
```

## Containers

### `create` - Create a container

```bash
docker create --name cache --expose 6379 redis:7
```

Creates a container without starting it. Use `docker start` to run it.

### `start` / `stop` - Start and stop

```bash
docker start web
docker stop web
docker restart web
docker kill web          # stop immediately (SIGKILL)
```

### `rm` - Delete containers

```bash
docker rm web
docker rm -f web         # stop and remove
```

## Clean up

### `system prune`

```bash
docker system prune
```

Removes stopped containers, unused networks, dangling images, and unused build cache.

```bash
docker system prune -a
```

Also removes all unused images (not just dangling ones) and all build cache.

```bash
docker system prune --volumes
```

Also removes anonymous volumes.

### `container prune`

```bash
docker container prune
```

Removes all stopped containers.

### `image prune`

```bash
docker image prune        # dangling images
docker image prune -a     # all unused images
```

### `volume prune`

```bash
docker volume prune       # anonymous volumes
docker volume prune -a    # all unused volumes
```

### `system df`

```bash
docker system df
```

Shows disk usage by images, containers, volumes, and build cache.

### `system events`

```bash
docker system events
```

Streams real-time daemon events. Alias for `docker events`.
