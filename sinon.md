---
title: Sinon
category: JavaScript libraries
layout: default-ad
---

### Creating spies

    fn = sinon.spy();

    fn();
    fn.calledOnce == true
    fn.callCount == 1

### Spying/stubbing

    sinon.spy($, 'ajax')

    $.ajax();
    $.ajax.calledOnce == true

    sinon.stub($, 'ajax', function () { ... }); // function optional

    $.ajax.calledWithMatch({ url: '/x' });
    $.ajax.restore();

### Spy/stub properties

    spy
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

### Anonymous stub

    stub = sinon.stub().returns(42);
    stub() == 42

    stub
      .withArgs(42).returns(1);
      .withArgs(43).throws("TypeError");

    stub
      .returns(1);
      .throws("TypeError");
      .returnsArg(0); // Return 1st argument
      .callsArg(0);

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

    beforeEach(function() {
      global.sinon = require('sinon').sandbox.create();
    });

    afterEach(function() {
      global.sinon.restore();
    });
