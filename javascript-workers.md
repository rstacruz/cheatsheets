---
title: JavaScript workers
category: JavaScript
---

## Web workers

    // Client code

    var worker = new Worker('worker.js');
    worker.onmessage = function(message) {
      alert(message.data);
    });
    worker.postMessage("");

### Worker code

    // worker.js

    self.onmessage = function(message) {
      alert(message.data);
    }
    self.postMessage("");

### Message data

    // [MessageEvent]
    bubbles: false
    cancelBubble: false
    cancelable: false
    clipboardData: undefined
    currentTarget: Worker
    data: "Hello"
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




