---
title: Commander.js
category: JavaScript libraries
---

### Initialize

    var cli = require('commander');

### Options

    cli
      .version(require('../package').version)
      .usage('[options] <command>')
      .option('-w, --words <n>', 'generate <n> words')
      .option('-i, --interval <n>', 'interval [1000]', 1000)
      .option('-s, --symbols', 'include symbols')
      .parse(process.argv);

### Help

    .on('--help', function() {
      console.log('');
    })

### Commands

    cli.outputHelp();
    cli.args == ["hello"];

### Other useful things

    process.exit(0);


