---
title: Ansible modules
category: Ansible
layout: 2017/sheet
prism_languages: [yaml]
updated: 2017-10-03
---

{% raw %}

### Aptitude

#### Packages

```yaml
- apt: pkg=nodejs state=present
    state=present # absent | latest
    update_cache=yes
    force=no
```

#### Deb files

```yaml
- apt: deb=https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb
```

#### Repositories

```yaml
- apt_repository: repo='deb https://... raring main'
    state=present
```

#### Repository keys

```yaml
- apt_key: id=AC40B2F7 url="http://..."
    state=present
```

### file

#### File

```yaml
- file:
    state=directory # file | link | hard | touch | absent
    path=/etc/dir
    owner=bin
    group=wheel
    mode=0644
    recurse=yes  # mkdir -p
    force=yes    # ln -nfs
```

#### Copy

```yaml
- copy:
    src=/app/config/nginx.conf
    dest=/etc/nginx/nginx.conf
```

#### Templates

```yaml
- template:
    src=config/redis.j2
    dest=/etc/redis.conf
```

### git

```yaml
- git: repo=git://github.com/
    dest=/srv/checkout
    version=master
    depth=10
    bare=yes
```

### user
```yaml
- user: state=present name=git
    system=yes
    shell=/bin/sh
    groups=admin
    comment="Git Version Control"
```

### service

```yaml
- service: name=nginx state=started [enabled=yes]
```

### shell

```yaml
- shell: apt-get install nginx -y
- script: /x/y/script.sh
```

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

{% endraw %}
