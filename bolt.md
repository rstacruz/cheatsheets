---
title: Bolt Quickstart
category: Bolt
updated: 2018-12-25
authors:
  - github: lucywyman
keywords:
    - Puppet
    - tasks
    - modules
description: |
  A quick guide to getting started writing Bolt tasks
---

### Install Bolt

```bash
# On MacOS
brew cask install puppetlabs/puppet/puppet-bolt
# On Windows
choco install puppet-bolt
```

Bolt is available as a package for most platforms. See [installing bolt](https://puppet.com/docs/bolt/latest/bolt_installing.html)

### Create a module with a task

```bash
mkdir -p ~/.puppetlabs/bolt/modules/mymodule/tasks
cp myscript.sh ~/.puppetlabs/bolt/modules/mymodule/tasks/
```

Tasks can be written in any language your targets can run. See [writing tasks](https://puppet.com/docs/bolt/latest/writing_tasks.html) for more details.

### Run Bolt

```bash
bolt task run mymodule::myscript -n node1.example.com,node2.example.com --private-key ~/.ssh/id_rsa-private
```

See `bolt task run --help` for more information and command line options.
