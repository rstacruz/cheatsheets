---
title: "Ansible quickstart"
subtitle: First-playbook walkthrough
logo: { src: /assets/logos/ansible.svg }
category: Ansible
last_verified_with: "ansible-core 2.22."
updated: 2026-11-25
tier: t3
description: |
  A quick guide to getting started with your first Ansible playbook.
---

### Install Ansible

```bash
$ brew install ansible            # OSX
$ [sudo] apt install ansible      # elsewhere
```

Ansible is available as a package in most OS's.

See: [Installation](https://docs.ansible.com/projects/ansible/latest/installation_guide/intro_installation.html)

### Start your project

```bash
~$ mkdir setup
~$ cd setup
```

Make a folder for your Ansible files.

See: [Getting started](https://docs.ansible.com/projects/ansible/latest/getting_started/index.html)

## Creating your files

### Inventory file

#### ~/setup/hosts

```dosini
[sites]
127.0.0.1
192.168.0.1
192.168.0.2
192.168.0.3
```

This is a list of hosts you want to manage, grouped into groups. (Hint: try
using `localhost ansible_connection=local` to deploy to your local machine.)

See: [Intro to Inventory](https://docs.ansible.com/projects/ansible/latest/inventory_guide/intro_inventory.html)

### Playbook

#### ~/setup/playbook.yml

```yaml
- hosts: 127.0.0.1
  remote_user: root
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

See: [Intro to Playbooks](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_intro.html)

## Running

### List the project files

```
~/setup$ ls
hosts
playbook.yml
```

See: [Getting started](https://docs.ansible.com/projects/ansible/latest/getting_started/index.html)

### Running ansible-playbook

```
~/setup$ ansible-playbook -i hosts playbook.yml
PLAY [all] **************************************************

GATHERING FACTS *********************************************
ok: [127.0.0.1]

TASK: [install nginx] ****************************************
ok: [127.0.0.1]

TASK: start nginx every bootup] ******************************
ok: [127.0.0.1]
...
```

See: [Running playbooks](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_intro.html#running-playbooks)

## Read more

* [Getting started with Ansible](http://lowendbox.com/blog/getting-started-with-ansible/) _(lowendbox.com)_
* [Getting started](https://docs.ansible.com/projects/ansible/latest/getting_started/index.html) _(docs.ansible.com)_
* [Intro to Inventory](https://docs.ansible.com/projects/ansible/latest/inventory_guide/intro_inventory.html) _(docs.ansible.com)_
* [Intro to Playbooks](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_intro.html) _(docs.ansible.com)_
* [Ansible Tutorial for Beginners: Playbook & Examples](https://spacelift.io/blog/ansible-tutorial) _(spacelift.io)_
* [Working with Ansible Playbooks – Tips & Tricks with Examples](https://spacelift.io/blog/ansible-playbooks) _(spacelift.io)_
