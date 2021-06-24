---
title: fs
category: Node.js
---

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

### References

- https://nodejs.org/api/fs.html
