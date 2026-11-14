---
title: Sinon
category: JavaScript libraries
weight: -1
updated: 2017-10-27
---

### Creating spies

```js
fn = sinon.spy()
fn()
```

```js
fn.calledOnce == true
fn.callCount == 1
```

### Spying/stubbing

```js
sinon.spy($, 'ajax')
```

```js
$.ajax();
$.ajax.calledOnce == true
```

```js
sinon.stub($, 'ajax', function () { ... }) // function optional
```

```js
$.ajax.calledWithMatch({ url: '/x' })
$.ajax.restore()
```

### Spy/stub properties

```js
spy
  .args        //=> [ [..], [..] ] one per call
  .thisValues
  .returnValues
```

```js
  .called      //=> true
  .notCalled
  .callCount
  .calledOnce
  .calledTwice
  .calledThrice
```

```js
  .getCalls()   //=> Array
  .getCall(0)
  .firstCall
```

### Anonymous stub

```js
stub = sinon.stub().returns(42)
stub() == 42
```

```js
stub
  .withArgs(42).returns(1)
  .withArgs(43).throws("TypeError")
```

```js
stub
  .returns(1)
  .throws("TypeError")
  .returnsArg(0) // Return 1st argument
  .callsArg(0)
```

### Fake date

```js
sinon.useFakeTimers(+new Date(2011,9,1));
```

### Fake server

```js
server = sinon.fakeServer.create()
```

```js
$.get('/file.json', ...)
server.requests[0].respond(
  200,
  { 'Content-Type': 'application/json' },
  JSON.stringify({ hello: 'world' })
)
```

```js
server.restore()
```

### Fake XHR

```js
xhr = sinon.useFakeXMLHttpRequest()
xhr.restore()
```

### Sandbox

```js
beforeEach(function() {
  global.sinon = require('sinon').sandbox.create()
})
```

```js
afterEach(function() {
  global.sinon.restore()
})
```
