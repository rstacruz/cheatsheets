---
title: Ansible roles
category: Ansible
layout: 2017/sheet
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
        defaults/
          main.yml

### References

 * http://www.ansibleworks.com/docs/playbooks_roles.html
