---
title: Docker on OSX
category: Devops
---

You'll need these:

 * [boot2docker] - bootstraps a Virtualbox VM to run a docker daemon
 * [docker] - docker client

### Install

    $ brew install boot2docker
    $ brew install docker
    $ boot2docker init

### Turning on

    $ boot2docker start

      Waiting for VM to be started...... Started.
      To connect the Docker client to the Docker daemon, please set:
   
          export DOCKER_HOST=tcp://192.168.59.103:2375

    $ export DOCKER_HOST=tcp://192.168.59.103:2375

### Try it

    $ docker search ubuntu

    $ docker pull ubuntu
    $ docker start ubuntu

### Turning off

    $ boot2docker save
    # save state to disk

### Vagrant

[boot2docker]: https://github.com/boot2docker/boot2docker
[docker]: https://www.docker.com/
