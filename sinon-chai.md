---
title: Sinon-chai
subtitle: Sinon assertions for Chai
logo: { src: /assets/logos/sinon.svg }
category: JavaScript testing
tier: t3
last_verified_with: "Sinon-chai 4.0.1, Sinon 22.1.0."
created_at: 2013-08-24
updated: 2026-11-26
intro: |
  Sinon-chai provides Chai assertions for Sinon spies, stubs, and mocks.
links:
  - title: Sinon-chai
    url: https://github.com/chaijs/sinon-chai
---

## Assertions

### Initialization

```js
import * as chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)
```
<!-- {: data-highlight="chai.use"} -->

See: [Installation and usage](https://github.com/chaijs/sinon-chai#installation-and-usage)

### Assert

```js
expect(spy).to.have.been.called
expect(spy).to.have.been.calledOnce
expect(spy).to.have.been.calledTwice
expect(spy).to.have.been.calledThrice
expect(spy).to.have.been.calledBefore(other)
expect(spy).to.have.been.calledAfter(other)
expect(spy).to.have.been.calledWithNew
expect(spy).to.always.have.been.calledWithNew
expect(spy).to.have.been.calledOn(context)
expect(spy).to.always.have.been.calledOn(context)
expect(spy).to.have.been.calledWith(...args)
expect(spy).to.always.have.been.calledWith(...args)
expect(spy).to.have.been.calledWithExactly(...args)
expect(spy).to.always.have.been.calledWithExactly(...args)
expect(spy).to.have.been.calledWithMatch(...args)
expect(spy).to.always.have.been.calledWithMatch(...args)
expect(spy).to.have.returned(value)
expect(spy).to.have.always.returned(value)
expect(spy).to.have.thrown(error)
expect(spy).to.have.always.thrown(error)
```

See: [Assertions table](https://github.com/chaijs/sinon-chai#assertions)

### Should

```js
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
spy.should.have.been.calledWithExactly(...args)
spy.should.always.have.been.calledWithExactly(...args)
spy.should.have.been.calledWithMatch(...args)
spy.should.always.have.been.calledWithMatch(...args)
spy.should.have.returned(returnVal)
spy.should.have.always.returned(returnVal)
spy.should.have.thrown(errorObjOrErrorTypeStringOrNothing)
spy.should.have.always.thrown(errorObjOrErrorTypeStringOrNothing)
```

See: [Chai should examples](https://github.com/chaijs/sinon-chai#examples)
