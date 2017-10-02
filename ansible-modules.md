---
title: Ansible modules
category: Ansible
layout: 2017/s##heet
---

### Aptitude

```yml
- apt_key: id=AC40B2F7 url="http://..."
    state=present
```

```yml
- apt: pkg=nodejs state=present
    state=present # absent | latest
    update_cache=yes
    force=no
```

```yml
- apt: deb=https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb
```

```yml
- apt_repository: repo='deb https://... raring main'
    state=present
```

### file

```yml
- file:
    state=directory # file | link | hard | touch | absent
    path=/etc/dir
    owner=bin
    group=wheel
    mode=0644
    recurse=yes  # mkdir -p
    force=yes    # ln -nfs
```

```yml
- copy:
    src=/app/config/nginx.conf
    dest=/etc/nginx/nginx.conf
```

```yml
- template:
    src=config/redis.j2
    dest=/etc/redis.conf
```

### git

```yml
- git: repo=git://github.com/
    dest=/srv/checkout
    version=master
    depth=10
    bare=yes
```

### user
```yml
- user: state=present name=git
    system=yes
    shell=/bin/sh
    groups=admin
    comment="Git Version Control"
```

### service

```yml
- service: name=nginx state=started [enabled=yes]
```

### shell

```yml
- shell: apt-get install nginx -y
- script: /x/y/script.sh
```

### local_action

```yml
- name: do something locally
  local_action: shell echo hello
```

### debug

```yml
- debug:
    msg: "Hello {{ var }}"
```
