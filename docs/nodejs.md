---
title: Node.js API
category: Node.js
---

## Globals

    __filename
    __dirname

### exec

    var exec = require('child_process').exec,

    var child = exec('cat *.js bad_file | wc -l',
      function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });

## Snippets

    info = require('../package.json')
    info.version

    process.stdout.write(util.inspect(objekt, false, Infinity, true) + '\n');

## Spawn - passthru the in/out

    var spawn = require('child_process').spawn;
    var proc = spawn(bin, argv, { stdio: 'inherit' });
    proc.on('error', function(err) {
      if (err.code == "ENOENT") { "does not exist" }
      if (err.code == "EACCES") { "not executable" }
    });
    proc.on('exit', function(code) { ... });

    // also { stdio: ['pipe', 'pipe', process.stdout] }
    // also { stdio: [process.stdin, process.stderr, process.stdout] }

    proc.stdout.on('data', function (data) {
    });
    proc.stderr.on('data', function (data) {
    });

[all]: http://nodejs.org/api/all.html
