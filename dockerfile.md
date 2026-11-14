---
title: Dockerfile
category: Devops
prism_languages: [docker]
updated: 2026-11-14
intro: |
  A Dockerfile lists the instructions that build a container image; BuildKit, the default builder since Docker 23, runs them in parallel. This reference covers multi-stage builds, cache mounts, secrets, and the instructions you reach for most.
links:
  - title: Dockerfile reference
    url: https://docs.docker.com/reference/dockerfile/
  - title: Build best practices
    url: https://docs.docker.com/build/building/best-practices/
---

## Getting started

### First image

```docker
FROM node:24-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

<!-- {: data-line="5,6,12,14"} -->

Dependencies are installed before the source lands, so editing code skips the install layer.

See: [Dockerfile reference](https://docs.docker.com/reference/dockerfile/)

### Build and run

```bash
docker build -t myapp .
docker run --rm -p 3000:3000 myapp
docker run --rm -it myapp sh
```

#### Common flags

| Flag | Effect |
| --- | --- |
| `-t name:tag` | Name and tag the image |
| `-f path` | Use another Dockerfile |
| `--build-arg KEY=value` | Set a build-time `ARG` |
| `--target stage` | Stop after a stage |
| `--platform linux/arm64` | Build for another architecture |
| `--no-cache` | Ignore the layer cache |
| `--progress plain` | Print full build output |

See: [docker build](https://docs.docker.com/reference/cli/docker/build/)

### .dockerignore

```text
node_modules
dist
.git
*.log
.env*
```

Everything in the build context is sent to the builder and can invalidate `COPY` layers, so keep the context small.

See: [.dockerignore](https://docs.docker.com/build/building/context/#dockerignore-files)

## Instructions

### FROM

```docker
FROM node:24-alpine
FROM node:24-alpine AS build
FROM scratch
```

Pin a tag: `latest` moves under you. `AS` names a stage, and `scratch` starts an empty image for static binaries.

See: [FROM](https://docs.docker.com/reference/dockerfile/#from)

### RUN

```docker
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl \
 && rm -rf /var/lib/apt/lists/*
```

One `RUN` per logical step, with cleanup in the same command. A later `RUN` cannot shrink a layer an earlier one created.

See: [RUN](https://docs.docker.com/reference/dockerfile/#run)

### COPY and ADD

```docker
COPY package.json pnpm-lock.yaml ./
COPY --chown=node:node --chmod=644 config.yml /app/
ADD https://example.com/file.tar.gz /tmp/
```

`COPY` is the default choice. `ADD` also unpacks local tarballs and fetches URLs, which is rarely what you want.

See: [COPY](https://docs.docker.com/reference/dockerfile/#copy)

### ENV and ARG

```docker
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ENV APP_HOME=/app
WORKDIR $APP_HOME
```

`ARG` exists only during the build and stays visible in image history, so never pass secrets that way. `ENV` persists into the container.

See: [ARG](https://docs.docker.com/reference/dockerfile/#arg)

### CMD and ENTRYPOINT

```docker
ENTRYPOINT ["node", "dist/server.js"]
CMD ["--port", "3000"]
```

Both use the exec form, so no shell wraps the process and signals reach it. `CMD` supplies default arguments that `docker run` can replace.

See: [ENTRYPOINT](https://docs.docker.com/reference/dockerfile/#entrypoint)

### EXPOSE and USER

```docker
EXPOSE 3000
USER node
```

`EXPOSE` documents the port; publish it with `-p`. Set `USER` before `CMD` so the process does not run as root.

See: [USER](https://docs.docker.com/reference/dockerfile/#user)

### HEALTHCHECK

```docker
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -fsS http://localhost:3000/health || exit 1
```

Exit `0` means healthy and `1` unhealthy. `--start-period=40s` gives a slow boot time before failures count.

See: [HEALTHCHECK](https://docs.docker.com/reference/dockerfile/#healthcheck)

## Multi-stage builds

### Build and runtime

```docker
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:24-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
USER node
CMD ["node", "dist/server.js"]
```

<!-- {: data-line="10,11"} -->

Only the last stage ships, so compilers, dev dependencies, and source stay out of the image.

See: [Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)

### Copy from a stage

```docker
COPY --from=build /app/dist ./dist
COPY --from=build --chown=node:node /app/static ./static
```

`--from` takes a stage name or an image, so you can lift a binary straight out of another image.

See: [COPY --from](https://docs.docker.com/reference/dockerfile/#copy---from)

### Target a stage

```bash
docker build --target build -t myapp:build .
```

Stopping at a stage is useful for debugging a failing build or for a CI image that runs tests.

See: [docker build --target](https://docs.docker.com/reference/cli/docker/build/#target)

## BuildKit

### Syntax directive

```docker
# syntax=docker/dockerfile:1

FROM alpine:3.22
```

The first line pulls the latest stable frontend, so new syntax works on an older daemon.

See: [Dockerfile frontend](https://docs.docker.com/build/buildkit/dockerfile-frontend/)

### Cache mounts

```docker
RUN --mount=type=cache,target=/root/.npm npm ci
```

A cache mount survives between builds even when the layer is invalidated, so only new packages download.

#### Cache paths

| Tool | Path |
| --- | --- |
| npm | `/root/.npm` |
| pnpm | `/root/.local/share/pnpm/store` |
| pip | `/root/.cache/pip` |
| Go | `/go/pkg/mod` |
| Cargo | `/usr/local/cargo/registry` |
| apt | `/var/cache/apt` and `/var/lib/apt` |

Apt needs `sharing=locked`, because concurrent builds must not touch the same index files.

See: [Cache mounts](https://docs.docker.com/build/cache/optimize/#use-cache-mounts)

### Bind mounts

```docker
RUN --mount=type=bind,target=. \
    go build -o /app/hello
```

A bind mount reads the build context for one instruction without copying it into a layer. Writes are discarded when the step ends.

See: [Bind mounts](https://docs.docker.com/build/cache/optimize/#use-bind-mounts)

### Secrets

```docker
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \
    npm ci
```

```bash
docker build --secret id=npmrc,src=$HOME/.npmrc .
```

The file is mounted for that one step only, so tokens never reach the image, the cache, or image history.

See: [Build secrets](https://docs.docker.com/build/building/secrets/)

## Best practices

### Layer order

```docker
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
```

Put rarely changing steps first. A source edit then rebuilds only the last two layers.

See: [Cache optimization](https://docs.docker.com/build/cache/optimize/#order-your-layers)

### Non-root user

#### Debian

```docker
RUN groupadd -r app && useradd -r -g app app
USER app
```

#### Alpine

```docker
RUN addgroup -S app && adduser -S app -G app
USER app
```

Containers run as root by default. Create an account, `chown` the directories it writes, and switch with `USER` before `CMD`.

See: [Best practices](https://docs.docker.com/build/building/best-practices/#user)

## See also

<!-- {: .-one-column} -->

- <https://docs.docker.com/reference/dockerfile/>
- <https://docs.docker.com/build/building/best-practices/>
- <https://docs.docker.com/build/buildkit/>
