---
title: Docker CLI
category: Devops
---

Manage images
-------------

Create an `image` from a Dockerfile:

```yml
docker build [options] .
  -t "app/container_name"    # name
```

Run a command in an `image`:

```yml
docker run [options] IMAGE
  # see `docker create` for options
```

Manage containers
-----------------

Create a `container` from an `image`:

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

```
$ docker create --name app_redis_1 \
  --expose 6379 \
  redis:3.0.2
```

Run in a `container`:

```yml
docker exec [options] CONTAINER COMMAND
  -d, --detach        # run in background
  -i, --interactive   # stdin
  -t, --tty           # interactive
```

```
$ docker exec app_web_1 tail logs/development.log
$ docker exec -t -i app_web_1 rails c
```

Start/stop a `container`:

```yml
docker start [options] CONTAINER
  -a, --attach        # attach stdout/err
  -i, --interactive   # attach stdin

docker stop [options] CONTAINER
```

Manage `container`s:

```
$ docker ps
$ docker ps -a
$ docker kill $ID
```

Managing
--------

Manage `image`s:

```sh
$ docker images
  REPOSITORY   TAG        ID
  ubuntu       12.10      b750fe78269d
  me/myapp     latest     7b2431a8d968

$ docker images -a   # also show intermediate
```

Delete `image`s:

```yml
docker rmi b750fe78269d
```

Resources
---------

 * http://www.docker.io/gettingstarted/
