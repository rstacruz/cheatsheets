---
title: Getting started
category: Ansible
---

### Install Ansible

```sh
$ brew install ansible            # OSX
$ [sudo] pip install ansible      # elsewhere
```

### Start your project

```sh
~$ mkdir setup
~$ cd setup
```

### Create an inventory file

This is a list of hosts you want to manage, grouped into groups. (Hint: try
using 127.0.0.1 to deploy to your local machine)

```dosini
; ~/setup/hosts
[sites]
127.0.0.1
192.168.0.1
192.168.0.2
192.168.0.3
```

### Create your first Playbook

```yaml
# ~/setup/playbook.yml

- hosts: 127.0.0.1
  user: root
  tasks:
    - name: install nginx
      apt: pkg=nginx state=present

    - name: start nginx every bootup
      service: name=nginx state=started enabled=yes

    - name: do something in the shell
      shell: echo hello > /tmp/abc.txt

    - name: install bundler
      gem: name=bundler state=latest
```

### Run it

    ~/setup$ ls
    hosts
    playbook.yml

    ~/setup$ ansible-playbook -i hosts playbook.yml
    PLAY [all] ********************************************************************

    GATHERING FACTS ***************************************************************
    ok: [127.0.0.1]

    TASK: [install nginx] *********************************************************
    ok: [127.0.0.1]

    TASK: start nginx every bootup] ***********************************************
    ok: [127.0.0.1]
    ...

### Read more

  * http://lowendbox.com/blog/getting-started-with-ansible/
  * http://www.ansibleworks.com/docs/modules.html
