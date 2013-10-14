title: NodeJS api
----

## Globals

    __filename
    __dirname

## [fs]

### Reading

    fs.readFile('file.txt', function(err, data) { .. });
    fs.readFile('file.txt', {encoding: 'utf-8'}, function(err, data) { .. });

### Writing

    fs.writeFile('output.txt', function(err) { .. });
    fs.appendFile('output.txt', function(err) { .. });

### Watch

    fs.watch('dir OR file.txt', { persistent: true }, function(event, file) {
      event; /* rename | change */
    });

### Getting info

    fs.exists('file.txt', function(exists /*bool*/) { ... });

    fs.stat('file.txt', function(stats) {
      stats.isFile();
      stats.isDirectory();
      stats.isSymbolicLink();
    });

### File operations

    fs.rename('old.txt', 'new.txt', function(){});
    fs.chown('file.txt', uid, gid, function(){});
    fs.symlink('src', 'dest', function(){});
    fs.unlink('path', function(){});
    fs.rmdir('path', function(){});

    fs.readdir('path', function(err, files) { .. }); /* `files` = array of names */

### Path

    fs.realpath('/etc/passwd', function(err, path) { /* "/private/etc/passwd" */ });

### Sync

    data = fs.readFileSync('input.txt');
    fs.writeFileSync('output.txt', data);
    fs.appendFileSync('output.txt', data);
    fs.existsSync('file.txt');

## [process]

### Streams

    process.stdin.resume(); /* paused by default */
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(chunk) { ... });
    process.stdin.on('end', function() { ... });

    process.stdout.write('...');
    process.stderr.write('...');

### stuff

    process.argv; //=> ['node', 'file.js', 'one', 'two']
    process.env; //=> {TERM: 'screen-256color', SHELL: '/bin/bash', ...}

    process.exit();
    process.exit(1);

### Directories
    
    process.cwd(); //=> "/tmp"
    process.chdir('dir');

## [path]

    fs.realpath('/etc/passwd', function(err, path) { /* "/private/etc/passwd" */ });

    dir = path.join('etc', 'passwd');
    dir = path.resolve('/etc', 'passwd', '..', 'var');

    path.dirname('/etc/passwd')       //=> "/etc"
    path.basename('/etc/passwd')      //=> "passwd"
    path.basename('/etc/rc.d', '.d')  //=> "rc"

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

## [assert]

    assert(val)
    assert.equal(actual, expected)
    assert.notEqual(a, e)

    assert.deepEqual(a, e)
    assert.notDeepEqual(a, e)

    assert.throws(fn)

[all]: http://nodejs.org/api/all.html
[process]: http://nodejs.org/api/process.html
[fs]: http://nodejs.org/api/fs.html

## Snippets

    info = require('../package.json')
    info.version

    process.stdout.write(util.inspect(objekt, false, Infinity, true) + '\n');

## Spawn

    var spawn = require('child_process').spawn;
    var proc = spawn(bin, argv, { stdio: 'inherit' });
    proc.on('error', function(err) {
      if (err.code == "ENOENT") { "does not exist" }
      if (err.code == "EACCES") { "not executable" }
    });
    proc.on('exit', function(code) { ... });

    // also { stdio: [process.stdin, process.stderr, process.stdout] }

