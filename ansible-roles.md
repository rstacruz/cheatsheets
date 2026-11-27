---
title: Ansible roles
subtitle: Role directory structure
logo: { src: /assets/logos/ansible.svg }
category: Ansible
last_verified_with: "ansible-core 2.22."
updated: 2026-11-25
tier: t3
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

