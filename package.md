---
title: package.json
category: Node.js
---

### Basic

    {
      "name": "expo",
      "description": "",
      "keywords": [""],
      "author": "Rico Sta. Cruz <hi@ricostacruz.com>",
      "version": "0.1.0",
      "engines": {"node": ">=0.8.0"},
      "main": "index",
      "bin": {
        "command": "./bin/command"
      },
      "repository": {
        "type": "git",
        "url": "https://github.com/rstacruz/___.git"
      },
      "license": "MIT"
    }

### Dependencies

    "dependencies": {
      "colors"   : "*",
      "flatiron" : "0.1.x",
      "flatiron" : "~0.1.0",
      "plates"   : "https://github.com/user/project/tarball/branch",
      "stuff"    : "git://github.com/user/project.git#commit-ish"
    },
    "devDependencies": {
      ...
    },

### Scripts

    "scripts": {
      "start": "node ./bin/xxx",       /* npm start */
      "test": "vows --spec --isolate", /* npm test */
      "postinstall": "...",
      "prepublish": "grunt build",     /* after 'npm install' and before 'npm 
                                          publish' */
    }

### Misc

    "private": true,
    "preferGlobal": true

### References
    
 * http://package.json.nodejitsu.com/
 * `npm help package.json`
