---
title: Ansible modules
subtitle: Module reference for playbooks
category: Ansible
prism_languages: [yaml]
updated: 2026-11-22
keywords:
  - "ansible.builtin.apt"
  - "ansible.builtin.copy"
  - "ansible.builtin.debug"
  - "ansible.builtin.template"
intro: |
  Modules are the units of work in a playbook. Use fully qualified names such as `ansible.builtin.apt` so tasks resolve to the intended collection.
links:
  - title: Ansible playbooks
    url: https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_intro.html
  - title: Module index
    url: https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/index.html
  - title: Delegation and local actions
    url: https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_delegation.html
  - title: Installing Ansible
    url: https://docs.ansible.com/projects/ansible/latest/installation_guide/intro_installation.html
---

{% raw %}

## Playbook basics

### First play

```yaml
---
- name: Configure web servers
  hosts: web
  become: true
  tasks:
    - name: Install nginx
      ansible.builtin.apt:
        name: nginx
        state: present
```

Modules run under `tasks`; `become` escalates privileges.

See: [Ansible playbooks](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_intro.html)

### Task keywords

```yaml
- name: Write nginx config
  ansible.builtin.template:
    src: nginx.conf.j2
    dest: /etc/nginx/nginx.conf
  notify: Restart nginx
  tags: [config]

- name: Start nginx
  ansible.builtin.service:
    name: nginx
    state: started
  when: ansible_facts['distribution'] == 'Debian'
```

Use `when` for conditions, `tags` for selection, and `notify` for handlers.

See: [Playbook keywords](https://docs.ansible.com/projects/ansible/latest/reference_appendices/playbooks_keywords.html)

### Module arguments

#### Short form

```yaml
- ansible.builtin.debug: msg=hello
```

#### Mapping form

```yaml
- ansible.builtin.debug:
    msg: hello
```

Prefer the mapping form: it handles lists and nested options cleanly.

See: [Ansible playbooks](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_intro.html)

## Packages

### Install packages

```yaml
- name: Install packages
  ansible.builtin.apt:
    name: [nginx, curl]
    state: present
    update_cache: true
```

Pass a list to `name` so apt handles it in one transaction.

See: [apt module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/apt_module.html)

### Remove and upgrade

#### Remove

```yaml
- name: Remove a package
  ansible.builtin.apt:
    name: curl
    state: absent
```

#### Upgrade

```yaml
- name: Upgrade installed packages
  ansible.builtin.apt:
    upgrade: dist
    update_cache: true
```

See: [apt module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/apt_module.html)

### Local package files

```yaml
- name: Install a downloaded deb
  ansible.builtin.apt:
    deb: /tmp/nginx.deb
```

See: [apt module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/apt_module.html)

### APT repositories

```yaml
- name: Add a signed APT repository
  ansible.builtin.deb822_repository:
    name: example
    types: deb
    uris: https://repo.example.com/debian
    suites: stable
    components: [main]
    signed_by: https://repo.example.com/key.asc
```

`deb822_repository` manages the key and source together; `apt_key` and `apt_repository` are deprecated and removed in core 2.25.

See: [deb822_repository module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/deb822_repository_module.html)

## Source control

### Clone a repository

```yaml
- name: Clone a repository
  ansible.builtin.git:
    repo: https://github.com/example/app.git
    dest: /srv/app
    version: main
    depth: 1
```

Use HTTPS or SSH URLs; GitHub disabled unauthenticated `git://` in 2022.

See: [git module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/git_module.html)

### Configure git

```yaml
- name: Set a global git option
  community.general.git_config:
    name: user.email
    scope: global
    value: hi@example.com
```

`git_config` lives in `community.general`, not `ansible-core`; `scope` defaults to `system`.

See: [git_config module](https://docs.ansible.com/projects/ansible/latest/collections/community/general/git_config_module.html)

## Users and services

### User account

```yaml
- name: Create a service account
  ansible.builtin.user:
    name: git
    system: true
    shell: /bin/sh
    groups: [wheel]
    append: true
    comment: Git Version Control
```

`append` is required with `groups` in core 2.21+ and keeps existing memberships.

See: [user module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/user_module.html)

### Service state

```yaml
- name: Start and enable nginx
  ansible.builtin.service:
    name: nginx
    state: started
    enabled: true
```

`service` is portable; use `ansible.builtin.systemd_service` for masking or daemon reloads.

See: [service module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/service_module.html)

## Shell and scripts

### Shell command

```yaml
- name: Append a line once
  ansible.builtin.shell:
    cmd: "echo hello >> /tmp/hello.txt"
    creates: /tmp/hello.txt
```

Prefer `ansible.builtin.command` when pipes and redirects are not needed.

See: [shell module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/shell_module.html)

### Multiline shell

```yaml
- name: Run several commands
  ansible.builtin.shell: |
    echo "hello there"
    echo "multiple lines"
```

See: [shell module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/shell_module.html)

### Script file

```yaml
- name: Run a local script on the target
  ansible.builtin.script:
    cmd: files/setup.sh
    creates: /tmp/setup.done
```

The script is read from the controller; `creates` is checked on the target.

See: [script module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/script_module.html)

## Files

### Directories

```yaml
- name: Create a directory
  ansible.builtin.file:
    path: /etc/myapp
    state: directory
    mode: "0755"
```

See: [file module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/file_module.html)

### Recursive attributes and links

#### Apply attributes recursively

```yaml
- name: Set ownership recursively
  ansible.builtin.file:
    path: /etc/myapp
    state: directory
    owner: root
    group: root
    recurse: true
```

#### Create a link

```yaml
- name: Link the active config
  ansible.builtin.file:
    src: /etc/myapp/config.yml
    dest: /etc/myapp/current.yml
    state: link
    force: true
```

`state: directory` creates missing parents; `recurse` applies attributes to contents and `force: true` replaces a file with a link.

See: [file module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/file_module.html)

### Copy files

```yaml
- name: Copy a config file
  ansible.builtin.copy:
    src: files/nginx.conf
    dest: /etc/nginx/nginx.conf
    mode: "0644"
    backup: true
```

See: [copy module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/copy_module.html)

### Render templates

```yaml
- name: Render a config file
  ansible.builtin.template:
    src: redis.conf.j2
    dest: /etc/redis.conf
    mode: "0644"
```

Use `template` for Jinja variables; `copy` for static files.

See: [template module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/template_module.html)

## Delegation and output

### Run on the controller

```yaml
- name: Read the controller hostname
  ansible.builtin.command: hostname
  delegate_to: localhost
```

The `local_action:` shorthand still works, but `delegate_to` is preferred.

See: [Delegation and local actions](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_delegation.html)

### Print messages

#### Fact

```yaml
- name: Show a fact
  ansible.builtin.debug:
    var: "ansible_facts['distribution']"
```

#### Message

```yaml
- name: Show the target
  ansible.builtin.debug:
    msg: "Deploying {{ inventory_hostname }}"
```

`debug` always runs on the control node.

See: [debug module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/debug_module.html)

{% endraw %}
