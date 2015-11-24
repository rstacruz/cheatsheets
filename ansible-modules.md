---
title: Ansible modules
category: Ansible
---

### Aptitude

    - apt_key: id=AC40B2F7 url="http://..."
        state=present
        
    - apt: pkg=nodejs state=present
        state=present # absent | latest
        update_cache=yes
        force=no

    - apt_repository: repo='deb https://... raring main'
        state=present

### file

    - file:
        state=directory # file | link | hard | touch | absent
        path=/etc/dir
        owner=bin
        group=wheel
        mode=0644
        recurse=yes  # mkdir -p
        force=yes    # ln -nfs

    - copy:
        src=/app/config/nginx.conf
        dest=/etc/nginx/nginx.conf

    - template:
        src=config/redis.j2
        dest=/etc/redis.conf

### git

    - git: repo=git://github.com/
        dest=/srv/checkout
        version=master
        depth=10
        bare=yes

### user
    - user: state=present name=git
        system=yes
        shell=/bin/sh
        comment="Git Version Control"

### service

    - service: name=nginx state=started [enabled=yes]

### shell

    - shell: apt-get install nginx -y
    - script: /x/y/script.sh

