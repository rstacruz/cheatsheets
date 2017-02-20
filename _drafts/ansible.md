---
title: Ansible
category: Ruby
---

## Looping

### Array (with_items)

```yaml
vars:
  security_groups:
    - name: 'hello'
      desc: 'world'

    - name: 'hola'
      desc: 'mundo'

tasks:
  - name: Create required security groups
    ec2_group:
      name: "{{ item.name }}"
      description: "{{ item.desc }}"
    with_items: "{{ security_groups }}"
```

### Object (with_dict)

```yaml
tasks:
  - name: Print phone records
    debug: msg="User {{ item.key }} is {{ item.value.name }} ({{ item.value.telephone }})"
    with_dict: "{{ users }}"
```

## with_file

```yaml
- name: "Send key"
  ec2_key:
    key_material: "{{ item }}"
  with_file: ./keys/sshkey.pub

  # or
  with_fileglob: ./keys/*.pub
```

### Conditionals

```yml
- include: setup-debian.yml
  when: ansible_os_family == 'Debian'

  when: (ansible_distribution == "CentOS" and ansible_distribution_major_version == "6") or
        (ansible_distribution == "Debian" and ansible_distribution_major_version == "7")


  # Just like "and"
  when:
    - ansible_distribution == "CentOS"
    - ansible_distribution_major_version == "6"
```

## Expressions

```
{{ item }}
{{ item.name }}
{{ item[0].name }}

{{ item | default('latest') }}
```

## Includes

```
tasks:
  - include: wordpress.yml
    vars:
      wp_user: timmy
```
