---
title: How to run Redis with Docker
link_title: Redis in Docker
subtitle: Containers, volumes, and Compose
logo: { src: /assets/logos/redis.svg }
category: Databases
layout: snippet
last_verified_with: "Redis 8.10.3, Docker 29.9.3."
updated: 2026-11-27
tier: t3
links:
  - title: Redis cheatsheet
    url: /redis
  - title: Redis Docker image
    url: https://hub.docker.com/_/redis
---

## Docker
<!-- {: .-snippets} -->

### Start a container
<!-- {: .-snippet} -->

```bash
docker run -d --name redis \
  -p 6379:6379 \
  redis:8.10.3
```
<!-- {: data-highlight="docker run"} -->

**Runs Redis in the background on the default port.** See [Redis on Docker Hub](https://hub.docker.com/_/redis).

### Connect to the container
<!-- {: .-snippet} -->

#### Interactive shell

```bash
docker exec -it redis redis-cli
```

#### One-shot command

```bash
docker exec redis redis-cli PING
# PONG
```
<!-- {: data-highlight="docker exec"} -->

**Opens a client inside the running container.** See [docker exec](https://docs.docker.com/reference/cli/docker/container/exec/).

### Persist data
<!-- {: .-snippet} -->

```bash
docker run -d --name redis \
  -p 6379:6379 \
  -v redis-data:/data \
  redis:8.10.3 \
  redis-server --appendonly yes
```
<!-- {: data-highlight="redis-data:/data; --appendonly yes"} -->

**Keeps writes in a named volume across container restarts.** See [Redis persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/).

### Docker Compose
<!-- {: .-snippet} -->

```yaml
services:
  redis:
    image: redis:8.10.3
    ports: ["6379:6379"]
    volumes: [redis-data:/data]
    command: redis-server --appendonly yes

volumes:
  redis-data:
```

**Defines the service, port, and volume in one file.** See [Compose services](https://docs.docker.com/reference/compose-file/services/).

### Stop and restart
<!-- {: .-snippet} -->

```bash
docker stop redis
docker start redis
```
<!-- {: data-highlight="docker stop; docker start"} -->

**Restarts the same container and its volume.** `docker rm` removes the container but keeps the volume. See [docker stop](https://docs.docker.com/reference/cli/docker/container/stop/).
