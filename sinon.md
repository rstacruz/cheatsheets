title: Sinon
---

### Spy

    var fn = sinon.spy();
    fn();
    fn.calledOnce == true
    fn.calledCount == 1

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
