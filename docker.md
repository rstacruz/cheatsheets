---
title: Docker CLI
category: Devops
layout: 2017/sheet
---

Manage images
-------------

### `docker build`

```yml
docker build [options] .
  -t "app/container_name"    # name
```

Create an `image` from a Dockerfile.


### `docker run`

```yml
docker run [options] IMAGE
  # see `docker create` for options
```

Run a command in an `image`.

Manage containers
-----------------

### `docker create`

```yml
docker create [options] IMAGE
  -a, --attach               # attach stdout/err
  -i, --interactive          # attach stdin (interactive)
  -t, --tty                  # pseudo-tty
      --name NAME            # name your image
  -p, --publish 5000:5000    # port map
      --expose 5432          # expose a port to linked containers
  -P, --publish-all          # publish all ports
      --link container:alias # linking
  -v, --volume `pwd`:/app    # mount (absolute paths needed)
  -e, --env NAME=hello       # env vars
```

#### Example

```
$ docker create --name app_redis_1 \
  --expose 6379 \
  redis:3.0.2
```

Create a `container` from an `image`.

### `docker exec`

```yml
docker exec [options] CONTAINER COMMAND
  -d, --detach        # run in background
  -i, --interactive   # stdin
  -t, --tty           # interactive
```

#### Example

```
$ docker exec app_web_1 tail logs/development.log
$ docker exec -t -i app_web_1 rails c
```

Run commands in a `container`.


### `docker start`

```yml
docker start [options] CONTAINER
  -a, --attach        # attach stdout/err
  -i, --interactive   # attach stdin

docker stop [options] CONTAINER
```

Start/stop a `container`.


### `docker ps`

```
$ docker ps
$ docker ps -a
$ docker kill $ID
```

Manage `container`s using ps/kill.

Images
------

### `docker images`

```sh
$ docker images
  REPOSITORY   TAG        ID
  ubuntu       12.10      b750fe78269d
  me/myapp     latest     7b2431a8d968
```

```sh
$ docker images -a   # also show intermediate
```

Manages `image`s.

### `docker rmi`

```yml
docker rmi b750fe78269d
```

Deletes `image`s.

Clean up
------

### `clean All`
```sh
docker system prune
```
will clean up any resources — images, containers, volumes, and networks — that are dangling (not associated with a container)

```sh
docker system prune -a
```
additionally remove any stopped containers and all unused images (not just dangling images)

### `docker containers`

```sh
docker stop $(docker ps -a -q)
```

stop all the running containers.

```sh
docker rm $(docker ps -a -q)
```

delete all the containers

### `Images`
```sh
docker rmi $(docker images -a -q)
```
delte all the images

### `Volumes`
```sh
docker volume prune
```
delete all the volumes

Also see
--------

 * [Getting Started](http://www.docker.io/gettingstarted/) _(docker.io)_
