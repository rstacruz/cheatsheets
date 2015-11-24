---
title: Shell.js
category: JavaScript libraries
---

### Require

    require 'shelljs/global'

### Paths

    cd 'dir'

    mkdir 'dir'
    mkdir '-p', 'dir'

### File manip

    cp 'src', 'dest'
    cp '-rf', 'src', 'dest'

    rm 'file'
    rm '-rf', 'file'

    mv 'src', 'dest'
    mv ['src1','src2'], 'dest'

    chmod '644', 'file'
    chmod 755, 'file'
    chmod 'u+x', 'file'

### Tests

    test '-b', 'path'  # block device
    test '-d', 'path'  # dir
    test '-e', 'path'  # exists
    test '-f', 'path'  # file
    test '-L', 'path'  # symlink

### Cat and output

    src = cat('file*.txt')

    "hello".to('output.txt');
    "hello".toEnd('append.txt');

    cat('input.txt').to('output.txt');

### Utils

    which('x')
    pwd()

    echo 'hi'

    exec('node --version').code
    exec('node --version').output
    exec('node --version', {silent:true}).output

    exec 'node --version', (code, output) ->
      echo "exit code #{code}"

    tempdir()

    error()  # null if no error

### Make

    require 'shelljs/make'

    target.all = ->
      target.bundle()
      target.docs()

    target.bundle = ->
      cd __dirname
      mkdir 'build'
      cd 'lib'
      (cat '*.js').to '../build/output.js'

    target.docs = ->
      cd __dirname
      mkdir 'docs'
      cd 'lib'
      for file in ls '*.js'
        text = grep '//@', file     # extract special comments
        text.replace '//@', ''      # remove comment tags
        text.to 'docs/my_docs.md'

### References

  * https://github.com/arturadib/shelljs
