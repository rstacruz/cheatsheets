---
title: Vagrant
category: Devops
intro: |
 [Vagrant](http://vagrantup.com) lets you build isolated virtual environments for your apps.
---

### Get started

Add some base boxes:
{: .-setup}

```bash
vagrant box add precise64 http://files.vagrantup.com/precise64.box
```

Work it:

```bash
mkdir test_box
cd test_box
vagrant init precise64
```

Run it:

```bash
vagrant up
vagrant ssh
```

To stop, use one of the following:

```bash
vagrant ssh        # then: sudo shutdown -h now
vagrant suspend
vagrant destroy    # !!
```

### Also see

* [Vagrant website](http://vagrantup.com) _(vagrantup.com)_
* [Vagrantfile cheatsheet](./vagrantfile)
