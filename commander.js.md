---
title: Commander.js
subtitle: Node.js CLI framework
logo: { src: /assets/logos/javascript.svg }
category: Node.js libraries
last_verified_with: "Commander.js 15.1."
updated: 2026-11-25
tier: t3
links:
  - title: https://github.com/tj/commander.js/
    url: https://github.com/tj/commander.js/
---

### Initialize

```
var cli = require('commander');
```

See: [Quick start](https://github.com/tj/commander.js#quick-start)

### Options

```
cli
  .version(require('../package').version)
  .usage('[options] <command>')
  .option('-w, --words <n>', 'generate <n> words')
  .option('-i, --interval <n>', 'interval [1000]', 1000)
  .option('-s, --symbols', 'include symbols')
  .parse(process.argv);
```

See: [Options](https://github.com/tj/commander.js#options)

### Help

```
.on('--help', function() {
  console.log('');
})
```

See: [Automated help](https://github.com/tj/commander.js#automated-help)

### Commands

```
cli.outputHelp();
cli.args == ["hello"];
```

See: [Commands](https://github.com/tj/commander.js#commands)

### Other useful things

```
process.exit(0);
```

See: [process.exit()](https://nodejs.org/api/process.html#processexitcode)


