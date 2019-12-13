---
title: Sinon-chai
category: JavaScript libraries
layout: default-ad
---

  * [Sinon-chai](https://github.com/domenic/sinon-chai)


### Initialization

```js
var sinon = require('sinon');
require('chai').use(require('sinon-chai'));
```

### Assert

    expect(spy).called
    expect(spy).calledOnce
    expect(spy).calledTwice
    expect(spy).calledThrice
    expect(spy).calledBefore
    expect(spy).calledAfter
    expect(spy).calledWithNew
    expect(spy).alwaysCalledWithNew
    expect(spy).calledOn
    expect(spy).alwaysCalledOn
    expect(spy).calledWith
    expect(spy).alwaysCalledWith
    expect(spy).calledWithExactly
    expect(spy).alwaysCalledWithExactly
    expect(spy).calledWithMatch
    expect(spy).alwaysCalledWithMatch
    expect(spy).returned
    expect(spy).alwaysReturned
    expect(spy).threw
    expect(spy).alwaysThrew

### Should

    spy.should.have.been.called
    spy.should.have.been.calledOnce
    spy.should.have.been.calledTwice
    spy.should.have.been.calledThrice
    spy1.should.have.been.calledBefore(spy2)
    spy1.should.have.been.calledAfter(spy2)
    spy.should.have.been.calledWithNew
    spy.should.always.have.been.calledWithNew
    spy.should.have.been.calledOn(context)
    spy.should.always.have.been.calledOn(context)
    spy.should.have.been.calledWith(...args)
    spy.should.always.have.been.calledWith(...args)
    spy.should.always.have.been.calledWithExactly(...args)
    spy.should.always.have.been.calledWithExactly(...args)
    spy.should.have.been.calledWithMatch(...args)
    spy.should.always.have.been.calledWithMatch(...args)
    spy.should.have.returned(returnVal)
    spy.should.have.always.returned(returnVal)
    spy.should.have.thrown(errorObjOrErrorTypeStringOrNothing)
    spy.should.have.always.thrown(errorObjOrErrorTypeStringOrNothing)
