---
title: process
subtitle: Process global reference
logo: { src: /assets/logos/nodejs.svg }
category: Node.js
last_verified_with: "Node.js 26.13.1."
updated: 2026-11-25
tier: t3
intro: |
  Node.js `process` exposes the current process, its arguments, environment, exit status, and standard streams. This sheet covers common properties and methods.
links:
  - title: Node.js process API
    url: https://nodejs.org/api/process.html
  - title: process I/O
    url: https://nodejs.org/api/process.html#processstdout
  - title: process.argv
    url: https://nodejs.org/api/process.html#processargv
---

### Streams

```
process.stdout.write('...');
process.stderr.write('...');

function stdin(fn) {
  var data = '';

  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if (chunk !== null) data += chunk;
  });

  process.stdin.on('end', function() {
    fn(null, data);
  });
}
```

<!-- {: data-highlight="process.stdout; process.stderr; process.stdin"} -->

See: [process I/O](https://nodejs.org/api/process.html#processstdout)

### stuff

```
process.argv; //=> ['node', 'file.js', 'one', 'two']
process.env; //=> {TERM: 'screen-256color', SHELL: '/bin/bash', ...}

process.exit();
process.exit(1);
```

<!-- {: data-highlight="process.argv; process.env; process.exit"} -->

See: [process.argv](https://nodejs.org/api/process.html#processargv)

### Directories

```
process.cwd(); //=> "/tmp"
process.chdir('dir');
```

<!-- {: data-highlight="process.cwd; process.chdir"} -->

See: [process.cwd()](https://nodejs.org/api/process.html#processcwd)

### References

See: [process API](https://nodejs.org/api/process.html)
