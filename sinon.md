---
title: Sinon
layout: default
---

### Spy

    var fn = sinon.spy();
    fn();
    fn.calledOnce == true
    fn.callCount == 1

### Spy something

    sinon.spy($, 'ajax')

### Stub

    var fn = sinon.stub().returns(42);
    fn() == 42

    fn.withArgs(42).returns(1);
    fn.withArgs(43).throws("TypeError");
    stub.returnsArg(0); // Return 1st argument
    stub.callsArg(0);

### Stub something

    sinon.stub($, 'ajax');
    $.ajax.calledWithMatch({ url: '/x' });
    $.ajax.restore();

    sinon.stub($, 'ajax', function() { return 'x' });

### Fake date

    sinon.useFakeTimers(+new Date(2011,9,1));

### Fake server

    server = sinon.fakeServer.create();

    $.get('/file.json', ...);
    server.requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify([{ id: 1, text: "Provide examples", done: true }])
    );

    server.restore();

### Fake XHR

    xhr = sinon.useFakeXMLHttpRequest();
    xhr.restore();

### Sandbox

    beforeEach -> global.sinon = require('sinon').sandbox.create()
    afterEach  -> global.sinon.restore()

###

    .args        //=> [ [..], [..] ] one per call
    .thisValues
    .returnValues

    .called      //=> true
    .notCalled
    .callCount
    .calledOnce
    .calledTwice
    .calledThrice

    .getCalls()   //=> Array
    .getCall(0)
    .firstCall


