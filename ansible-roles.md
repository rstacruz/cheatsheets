---
title: Ansible roles
subtitle: Role directory structure
category: Ansible
---

### Structure

```
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
```

### References

 * <https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_reuse_roles.html>
