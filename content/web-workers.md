---
title: Web workers
category: JavaScript
updated: 2017-10-30
layout: 2017/sheet
weight: -1
---

## Web workers

#### Client

```js
var worker = new Worker('worker.js')

worker.onmessage = function (message) {
  alert(JSON.stringify(message.data))
})

worker.postMessage('hello!')
```

Messages can be anything that can be serialized into JSON (objects, arrays, strings, numbers, booleans). See: [structured clone](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)

#### Worker

```js
self.onmessage = function (message) {
  ···
}

self.postMessage({ msg: 'hello' })
```

### Message data

#### [MessageEvent]

```js
bubbles: false
cancelBubble: false
cancelable: false
clipboardData: undefined
currentTarget: Worker
data: "Hello"             ← the data
defaultPrevented: false
eventPhase: 0
lastEventId: ""
origin: ""
ports: Array[0]
returnValue: true
source: null
srcElement: Worker
target: Worker
timeStamp: 1344821022383
type: "message"
```

These are the contents of `message` on onmessage.
