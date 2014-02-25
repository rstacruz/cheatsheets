---
title: Ansible roles
layout: default
---

### Structure

    roles/
      common/
        tasks/
        handlers/
        files/              # 'copy' will refer to this
        templates/          # 'template' will refer to this
        meta/               # Role dependencies here
        vars/
        defaults/main.yml

### References

 * http://www.ansibleworks.com/docs/playbooks_roles.html
