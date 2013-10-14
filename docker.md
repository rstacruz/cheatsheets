---
title: docker
layout: default
---

Command line interface
----------------------

Quick install on a server:

    $ curl get.docker.io | sudo sh -x

To pull from docker's registry:

    $ docker pull "ubuntu"

To build from your own `Dockerfile`:

    $ docker build -t "app/container_name" .

To run:

    $ docker run "app/container_name" [command and args]
      -i -t                # Interactive mode + pseudo-TTY
      -e ENVVAR=value      # Environment vars
      -p 4444              # Expose a port (??)
      -d                   # Detached mode

    $ docker run -t "ubuntu" -i bash

OSX Install
-----------

Prerequisites:

  - Install Virtualbox (`brew install virtualbox`)
  - Install Vagrant (http://vagrantup.com)
  - Install go (`brew install go`)

Then make the Docker executable (v0.5.1?):

    $ git clone https://github.com/dotcloud/docker.git ~/src/docker
    $ cd ~/src/docker
    $ make
    $ mv ./bin/docker /usr/local/bin/docker

Then run docker:

    $ cd ~/src/docker
    $ vagrant up


Managing
--------

Manage images:

    # List images
    $ docker images
    REPOSITORY   TAG        ID
    ubuntu       12.10      b750fe78269d
    me/myapp     latest     7b2431a8d968

    # Delete an image
    $ docker rmi b750fe78269d

Manage processes:

    $ docker ps
    $ docker kill $ID
    $ docker rmi $ID

Manage containers:

Updating containers
-------------------

    $ docker commit "app/container_name" -m "Change stuff"

More
----

Start a worker

    # Start a very useful long-running process
    JOB=$(docker run -d ubuntu /bin/sh -c "while true; do echo Hello world; sleep 1; 
        done")

    # Collect the output of the job so far
    docker logs $JOB

    # Kill the job
    docker kill $JOB

Resources
---------

 * http://www.docker.io/gettingstarted/
