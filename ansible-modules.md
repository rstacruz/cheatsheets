---
title: Ansible modules
category: Ansible
layout: 2017/sheet
prism_languages: [yaml]
updated: 2017-10-03
---

{% raw %}

## Format

### Basic file

```yaml
---
- hosts: production
  remote_user: root
  tasks:
  - ···
```

Place your modules inside `tasks`.

### Task formats

#### One-line

```yaml
- apt: pkg=vim state=present
```

#### Map

```yaml
- apt:
    pkg: vim
    state: present
```

#### Foldable scalar

```yaml
- apt: >
    pkg=vim
    state=present
```

Define your tasks in any of these formats. One-line format is preferred for short declarations, while maps are preferred for longer.

## Modules

### Aptitude

#### Packages

```yaml
- apt:
    pkg: nodejs
    state: present # absent | latest
    update_cache: yes
    force: no
```

#### Deb files

```yaml
- apt:
    deb: "https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb"
```

#### Repositories

```yaml
- apt_repository:
    repo: "deb https://··· raring main"
    state: present
```

#### Repository keys

```yaml
- apt_key:
    id: AC40B2F7
    url: "http://···"
    state: present
```

### git

```yaml
- git:
    repo: git://github.com/
    dest: /srv/checkout
    version: master
    depth: 10
    bare: yes
```

See: [git module](http://devdocs.io/ansible/git_module)

### git_config

```yaml
- git_config:
    name: user.email
    scope: global # local | system
    value: hi@example.com
```

See: [git_config module](http://devdocs.io/ansible/git_config_module)

### user

```yaml
- user:
    state: present
    name: git
    system: yes
    shell: /bin/sh
    groups: admin
    comment: "Git Version Control"
```

See: [user module](http://devdocs.io/ansible/user_module)

### service

```yaml
- service:
    name: nginx
    state: started
    enabled: yes     # optional
```

See: [service module](http://devdocs.io/ansible/service_module)

## Shell

### shell

```yaml
- shell: apt-get install nginx -y
```

#### Extra options

```yaml
- shell: echo hello
  args:
    creates: /path/file  # skip if this exists
    removes: /path/file  # skip if this is missing
    chdir: /path         # cd here before running
```

#### Multiline example

```yaml
- shell: |
    echo "hello there"
    echo "multiple lines"
```

See: [shell module](http://devdocs.io/ansible/shell_module)

### script

```yaml
- script: /x/y/script.sh
  args:
    creates: /path/file  # skip if this exists
    removes: /path/file  # skip if this is missing
    chdir: /path         # cd here before running
```

See: [script module](http://devdocs.io/ansible/script_module)

## Files

### file

```yaml
- file:
    path: /etc/dir
    state: directory # file | link | hard | touch | absent

    # Optional:
    owner: bin
    group: wheel
    mode: 0644
    recurse: yes  # mkdir -p
    force: yes    # ln -nfs
```

See: [file module](http://devdocs.io/ansible/file_module)

### copy

```yaml
- copy:
    src: /app/config/nginx.conf
    dest: /etc/nginx/nginx.conf

    # Optional:
    owner: user
    group: user
    mode: 0644
    backup: yes
```

See: [copy module](http://devdocs.io/ansible/copy_module)

### template

```yaml
- template:
    src: config/redis.j2
    dest: /etc/redis.conf

    # Optional:
    owner: user
    group: user
    mode: 0644
    backup: yes
```

See: [template module](http://devdocs.io/ansible/template_module)

## Local actions

### local_action

```yaml
- name: do something locally
  local_action: shell echo hello
```

### debug

```yaml
- debug:
    msg: "Hello {{ var }}"
```

See: [debug module](http://devdocs.io/ansible/debug_module)
{% endraw %}

