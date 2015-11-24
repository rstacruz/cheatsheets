---
title: Q.js
category: JavaScript libraries
---

### Creating promises (Q.promise)

    Q.promise (ok, fail) =>
      asyncFunction ->
        if error
          fail new Error("Failure")
        else
          ok(data)

### For arrays

    promises = [saveDisk(), saveCloud()]

    # When all succeeds, or *at least one* error
    Q.all(promises).done ->
      alert "Saved"

    # Same, but get the values
    Q.all(promises).spread (a, b) ->
      alert "Result A:" + a
      alert "Result B:" + b

    # When all either succeeds or errors
    Q.allSettled(promises).done -> ...


### Creating promises from Node

    # Works like .call() or .apply()

    Q.nfcall(FS.readFile, 'foo.txt', 'utf-8')
    .then -> ...

    Q.nfapply(FS.readFile, ['foo.txt', 'utf-8'])
    .then -> ...

    Q.npost(FS, 'readFile', ['foo.txt, 'utf-8'])
    .then -> ...

    Q.npost(FS, 'readFile', 'foo.txt, 'utf-8')
    .then -> ...

    readFile = Q.denodeify(FS.readFile)
    readFile('foo.txt').then -> ...

### Promises to Node async

    createUser = (next) ->
      promiseMaker()
      .nodeify(next)

### Promise sugars

    # Shortcut for .then(ok, fail, progress)
    promise
    .then (data) ->
    .catch (err) ->
    .progress (percent) ->

### Try

  Q.try ->
    promise()

  .catch (e) ->
    console.error "Oh well", e

### Reference

 * https://github.com/kriskowal/q/wiki/API-Reference
