title: Q.js
----

### Creating promises (Q.promise)

    Q.promise (resolve, reject) ->
      asyncFunction ->
        if error
          reject new Error("Failure")
        else
          resolve deferred

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
