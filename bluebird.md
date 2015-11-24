---
title: bluebird.js
category: JavaScript libraries
---

Also see the [promise cheatsheet](promise.html) and [Bluebird.js API](https://github.com/petkaantonov/bluebird/blob/master/API.md) (github.com).
{:.center.brief-intro}

```js
promise
  .then(okFn, errFn)
  .spread(okFn, errFn) //*
  .catch(errFn)
  .catch(TypeError, errFn) //*
  .finally(fn) //*
  .map(function (e) { ... })
  .each(function (e) { ... })
```

----

### Multiple return values
Use [Promise.spread](https://github.com/petkaantonov/bluebird/blob/master/API.md#spreadfunction-fulfilledhandler--function-rejectedhandler----promise).

```js
.then(function () {
  return [ 'abc', 'def' ];
})
.spread(function (abc, def) {
  ...
});
```

### Multiple promises
Use [Promise.join](https://github.com/petkaantonov/bluebird/blob/master/API.md#promisejoinpromisethenablevalue-promises-function-handler---promise) for fixed number of multiple promises.

```js
Promise.join(
  getPictures(),
  getMessages(),
  getTweets(),
  function (pics, msgs, tweets) {
    return ...;
  }
)
```

### Multiple promises (array)
Use `.all`, `.any`, `.race`, or `.some`.

```js
Promise.all([ promise1, promise2 ])
  .then(function (results) {
    results[0]
    results[1]
  })

// succeeds if one succeeds first
Promise.any(promises)
  .then(function (result) {
  })
```

### Object
Usually it's better to use `.join`, but whatever.

```js
Promise.props({
  photos: get('photos'),
  posts: get('posts')
})
.then(function (res) {
  res.photos
  res.posts
})
```

### Chain of promises
Use [Promise.try](https://github.com/petkaantonov/bluebird/blob/master/API.md#promisetryfunction-fn--arraydynamicdynamic-arguments--dynamic-ctx----promise) to start a chain.

```js
function getPhotos() {
  return Promise.try(function () {
    if (err) throw new Error("boo");
    return result;
  });
}

getPhotos().then(...)
```

### Using Node-style functions
See [Promisification](https://github.com/petkaantonov/bluebird/blob/master/API.md#promisification) API.

```js
var readFile = Promise.promisify(fs.readFile);
var fs = Promise.promisifyAll(require('fs'));
```

### Promise-returning methods
See [Promise.method](https://github.com/petkaantonov/bluebird/blob/master/API.md#promisemethodfunction-fn---function) to allow `return`ing values that will be promise resolutions.

```js
User.login = Promise.method(function(email, password) {
  if (!valid)
    throw new Error("Email not valid");

  return /* promise */;
});
```

### Generators
See [Promise.coroutine](https://github.com/petkaantonov/bluebird/blob/master/API.md#promisecoroutinegeneratorfunction-generatorfunction---function).

```
User.login = Promise.coroutine(function* (email, password) {
  let user = yield User.find({email: email}).fetch();
  return user;
});
```
