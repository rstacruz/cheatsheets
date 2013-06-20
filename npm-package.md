title: Package JSON
---

### Basic

    {
      "name": "expo",
      "description": "",
      "keywords": [""],
      "author": "Rico Sta. Cruz <hi@ricostacruz.com>",
      "version": "0.1.0",
      "engines": {"node": ">=0.8.0"},
      "repository": {
         "type": "git",
         "url": "https://github.com/rstacruz/___.git"
       },
    }

### Dependencies

    "dependencies": {
      "colors"   :  "*",
      "flatiron" :  "0.1.x",
      "flatiron" :  "~0.1.0",
      "plates"   :  "https://github.com/:user/:project/tarball/:branch",
      "stuff":      "git://github.com/user/project.git#commit-ish"
    },
    "devDependencies": { ... },

### Scripts

   "scripts": {
     "start": "node ./bin/xxx",       /* npm start */
     "test": "vows --spec --isolate", /* npm test */
   }

### Git

    "repository": {
       "type": "git",
       "url": "https://github.com/nodejitsu/http-server.git"
     },

### Main entry point

    "main": "index",
    "main": "./lib/http-server",

### Bin

    "bin": {
      "command": "./bin/command"
    },

### Misc

    "private": true,
    "preferGlobal": true,
    "license": "MIT"


http://package.json.nodejitsu.com/
