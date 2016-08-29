---
title: npm
category: JavaScript
---

    npm install
    npm shrinkwrap

### Adding owners

    # Add someone as an owner
      npm owner add USERNAME PACKAGENAME

    # list packages
      npm ls

    # Remove duplicates down the dep tree
      npm dedupe

    # Adds warning to those that install a package of old versions
      npm deprecate PACKAGE@"< 0.2.0" "critical bug fixed in v0.2.0"

    # Add a package as a git submodule
      npm submodule PACKAGE

    # update all packages, or selected packages
      npm update [-g] PACKAGE

    # Check for outdated packages
      npm outdated [PACKAGE]

npm owner add josefrancisco.verdu@gmail.com docpress
npm owner add josefrancisco.verdu@gmail.com docpress-core
npm owner add josefrancisco.verdu@gmail.com docpress-base
npm owner add josefrancisco.verdu@gmail.com docpress-search
npm owner add ilya@burstcreations.com docpress
npm owner add ilya@burstcreations.com docpress-core
npm owner add ilya@burstcreations.com docpress-base
npm owner add ilya@burstcreations.com docpress-search
