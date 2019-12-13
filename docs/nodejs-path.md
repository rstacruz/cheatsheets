---
title: path
category: Node.js
---

    fs.realpath('/etc/passwd', function(err, path) { /* "/private/etc/passwd" */ 
    });

    dir = path.join('etc', 'passwd');
    dir = path.resolve('/etc', 'passwd', '..', 'var');

    path.dirname('/etc/passwd')       //=> "/etc"
    path.basename('/etc/passwd')      //=> "passwd"
    path.basename('/etc/rc.d', '.d')  //=> "rc"

### References

- http://nodejs.org/api/path.html
