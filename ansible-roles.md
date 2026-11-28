---
title: Ansible roles
subtitle: Role directory structure
logo: { set: icon-park-outline, name: user-business }
category: Ansible
last_verified_with: "ansible-core 2.22."
created_at: 2014-02-25
updated: 2026-11-25
tier: t3
intro: |
  Reference for Ansible role directory structure and reusable roles, including tasks, handlers, templates, vars, and defaults.
links:
  - title: Role directory structure
    url: https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_reuse_roles.html#role-directory-structure
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

See: [Role directory structure](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_reuse_roles.html#role-directory-structure)

### References

 * [Reusing roles](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_reuse_roles.html)

