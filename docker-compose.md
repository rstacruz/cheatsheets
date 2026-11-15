---
title: docker-compose
category: Devops
prism_languages: [yaml]
weight: -1
updated: 2026-11-11
tier: t1
keywords:
  - docker compose
  - compose file
  - docker compose up
intro: |
  [Docker Compose](https://docs.docker.com/compose/) defines and runs multi-container applications from a Compose file. This reference covers the Compose file format and CLI.
links:
  - title: Compose file reference
    url: https://docs.docker.com/reference/compose-file/
  - title: Docker CLI cheatsheet
    url: "./docker"
---

## Getting started

### Basic example

```yaml
# compose.yaml
services:
  web:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - .:/code
    depends_on:
      - redis
  redis:
    image: redis:8
```

Compose reads `compose.yaml` by default; `docker-compose.yml` also works. The top-level `version` field is obsolete.

See: [Compose quickstart](https://docs.docker.com/compose/gettingstarted/)

### Compose versions

```sh
docker-compose up -d   # v1, retired
docker compose up -d   # current plugin
```

Compose v1 is retired; use the `docker compose` plugin (currently v5).

See: [Compose release notes](https://github.com/docker/compose/releases)

### Commands

| Command | Description |
| --- | --- |
| `docker compose up -d` | Create and start in background |
| `docker compose up --wait` | Wait for services to be running or healthy |
| `docker compose down` | Stop and remove containers and networks |
| `docker compose ps` | List project containers |
| `docker compose logs -f web` | Follow service logs |
| --- | --- |
| `docker compose exec web sh` | Run a command in a service |
| `docker compose run --rm web sh` | Run a one-off command |
| `docker compose build` | Build or rebuild images |
| `docker compose pull` | Pull service images |
| `docker compose push` | Push service images |
| --- | --- |
| `docker compose restart` | Restart services |
| `docker compose stop` / `start` | Stop or start services |
| `docker compose config` | Render the resolved configuration |
| `docker compose ls` | List running projects |
| `docker compose watch` | Sync or rebuild on changes |

Global flags: `-f FILE`, `-p NAME`, `--profile NAME`, `--env-file FILE`.

See: [docker compose CLI reference](https://docs.docker.com/reference/cli/docker/compose/)

## Services

### Building and images

```yaml
services:
  web:
    build: .
```

```yaml
services:
  web:
    build:
      context: ./dir
      dockerfile: Dockerfile.dev
      args:
        APP_HOME: app
```

A context path builds from `./Dockerfile`; the mapping form adds a Dockerfile and build arguments.

```yaml
services:
  web:
    image: ghcr.io/example/app:1.0
```

`image` accepts a registry path, tag, or digest.

See: [build](https://docs.docker.com/reference/compose-file/build/)

### Ports

```yaml
services:
  web:
    ports:
      - "3000"           # random host port
      - "8000:80"        # host:container
      - "127.0.0.1:8001:8001"
```

```yaml
services:
  web:
    expose:
      - "3000"
```

Quote mappings to avoid YAML base-60 parsing. `expose` opens ports to linked services without publishing them.

See: [ports](https://docs.docker.com/reference/compose-file/services/#ports) and [expose](https://docs.docker.com/reference/compose-file/services/#expose)

### Command and entrypoint

```yaml
services:
  web:
    command: bundle exec thin -p 3000
```

```yaml
services:
  web:
    entrypoint: ["/app/start.sh"]
```

`command` overrides the image's CMD; `entrypoint` overrides its ENTRYPOINT. Both accept a string or list.

See: [command](https://docs.docker.com/reference/compose-file/services/#command) and [entrypoint](https://docs.docker.com/reference/compose-file/services/#entrypoint)

### Environment

```yaml
services:
  web:
    environment:
      RACK_ENV: development
```

```yaml
services:
  web:
    env_file:
      - .env
      - .development.env
```

Environment values can use a mapping or a list. `env_file` loads variables from files.

See: [environment](https://docs.docker.com/reference/compose-file/services/#environment)

### Dependencies

```yaml
services:
  web:
    depends_on:
      - db
```

```yaml
services:
  web:
    depends_on:
      db:
        condition: service_healthy
        restart: true
```

Long syntax waits for health or successful completion and can restart dependents.

```yaml
services:
  web:
    links:
      - db:database
```

Links add an alias and implicit dependency; networks are preferred.

See: [depends_on](https://docs.docker.com/reference/compose-file/services/#depends_on) and [links](https://docs.docker.com/reference/compose-file/services/#links)

## Runtime

### Restart and resources

```yaml
services:
  web:
    restart: unless-stopped
```

```yaml
services:
  web:
    deploy:
      resources:
        limits:
          cpus: "0.50"
          memory: 512M
```

Policies: `no`, `always`, `on-failure`, `unless-stopped`. `deploy.resources.limits` caps CPUs and memory.

See: [restart](https://docs.docker.com/reference/compose-file/services/#restart) and [deploy resources](https://docs.docker.com/reference/compose-file/deploy/#resources)

### Healthcheck

```yaml
services:
  web:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
      start_interval: 5s
```

`test` accepts `CMD`, `CMD-SHELL`, or `NONE`; `start_interval` sets the probe rate during startup.

See: [healthcheck](https://docs.docker.com/reference/compose-file/services/#healthcheck)

### User

```yaml
services:
  web:
    user: "1000:1000"
```

Runs the container process as the given user and group.

See: [user](https://docs.docker.com/reference/compose-file/services/#user)

### Devices

```yaml
services:
  web:
    devices:
      - "/dev/ttyUSB0:/dev/ttyUSB0"
```

Maps host devices into the container.

See: [devices](https://docs.docker.com/reference/compose-file/services/#devices)

### Labels

```yaml
services:
  web:
    labels:
      com.example.description: "Accounting web app"
```

Labels add metadata to containers.

See: [labels](https://docs.docker.com/reference/compose-file/services/#labels)

## Networking and storage

### Networks

```yaml
services:
  web:
    networks:
      - frontend
networks:
  frontend:
```

Creates a `frontend` network and attaches `web` to it.

See: [networks](https://docs.docker.com/reference/compose-file/networks/)

### External networks

```yaml
networks:
  frontend:
    external: true
    name: shared_frontend
```

`external: true` uses a network Compose does not create; `name` is its actual name.

See: [external networks](https://docs.docker.com/reference/compose-file/networks/#external)

### DNS and hosts

```yaml
services:
  web:
    dns:
      - 8.8.8.8
      - 8.8.4.4
    extra_hosts:
      - "somehost=192.168.1.100"
```

`dns` sets resolvers; `extra_hosts` adds `/etc/hosts` entries.

See: [dns](https://docs.docker.com/reference/compose-file/services/#dns) and [extra_hosts](https://docs.docker.com/reference/compose-file/services/#extra_hosts)

### Volumes

```yaml
services:
  db:
    image: postgres:18
    volumes:
      - dbdata:/var/lib/postgresql
volumes:
  dbdata:
```

Named volumes persist data; bind mounts use a host path such as `./data:/data`.

See: [volumes](https://docs.docker.com/reference/compose-file/volumes/)

### Secrets

```yaml
services:
  web:
    secrets:
      - my_secret
secrets:
  my_secret:
    file: ./my_secret.txt
```

Secrets mount at `/run/secrets/<name>` and are read-only.

See: [secrets](https://docs.docker.com/reference/compose-file/secrets/)

### Configs

```yaml
services:
  web:
    configs:
      - http_config
configs:
  http_config:
    file: ./httpd.conf
```

Configs mount non-sensitive files at `/<name>` by default.

See: [configs](https://docs.docker.com/reference/compose-file/configs/)

### External links

```yaml
services:
  web:
    external_links:
      - redis_1
      - project_db_1:mysql
```

Links containers from another Compose application.

See: [external_links](https://docs.docker.com/reference/compose-file/services/#external_links)

## Composition

<!-- {: .-three-column} -->

### Profiles

```yaml
services:
  debug:
    image: busybox
    profiles: ["debug"]
```

Run with `docker compose --profile debug up`.

See: [profiles](https://docs.docker.com/reference/compose-file/services/#profiles)

### Watch

```yaml
services:
  web:
    develop:
      watch:
        - action: sync
          path: ./src
          target: /app/src
        - action: rebuild
          path: package.json
```

Syncs files and rebuilds on changes. Run `docker compose watch`.

See: [Compose Watch](https://docs.docker.com/compose/how-tos/file-watch/)

### Include

```yaml
include:
  - common.yaml
services:
  web:
    image: nginx:stable
```

Loads another Compose file into the project. Include can also fetch OCI or Git sources.

See: [include](https://docs.docker.com/reference/compose-file/include/)

### Extends

```yaml
services:
  web:
    extends:
      file: common.yml
      service: webapp
```

Reuses a service definition from another file.

See: [extends](https://docs.docker.com/reference/compose-file/services/#extends)

### Merge overrides

```yaml
# compose.override.yaml
services:
  app:
    ports: !override
      - "8443:443"
    environment:
      FOO: !reset null
```

The override file merges into the base; `!reset` clears a value
and `!override` replaces it instead of appending.

See: [Merge Compose files](https://docs.docker.com/reference/compose-file/merge/)
