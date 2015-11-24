---
title: Vagrant
category: Devops
---

### Get started

Add some base boxes:

    $ vagrant box add precise32 http://files.vagrantup.com/precise32.box
    $ vagrant box add precise64 http://files.vagrantup.com/precise64.box

Work it:

    $ mkdir test_box
    $ cd test_box
    $ vagrant init precise64

Run it:

    $ vagrant up
    $ vagrant ssh

To stop, use one of the following:

    $ vagrant ssh        # then: sudo shutdown -h now
    $ vagrant suspend
    $ vagrant destroy    # !!

### Reference

 * [Vagrant](http://vagrantup.com)

