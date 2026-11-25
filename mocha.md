---
title: Mocha.js
subtitle: BDD test runner
category: JavaScript testing
last_verified_with: "Mocha 12.0.3."
updated: 2026-11-25
tier: t3
---

### BDD

```
mocha.setup('bdd');

describe('something', function() {
  beforeEach(function() {
  });

  it('should work', function() {
  });
});
```

<!-- {: data-highlight="mocha.setup('bdd')"} -->

See: [BDD interface](https://mochajs.org/interfaces/bdd/)

### Async

```
it('should save', function(done) {
  var user = new User();
  user.save(function(err) {
    if (err) throw err;
    done();
  });
});
```

<!-- {: data-highlight="done"} -->

See: [Asynchronous code](https://mochajs.org/features/asynchronous-code/)

### Chai: Shoulds

```
chai.should();

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.length(3);
tea.should.have.property('flavors').with.length(3);
```

<!-- {: data-highlight="chai.should"} -->

See: [Chai BDD API](https://www.chaijs.com/api/bdd/#api)

### See also

 * [Mocha TDD](mocha-tdd.html)
 * [Mocha HTML](mocha-html.html)
 * [Chai](chai.html)
 * [Sinon](sinon.html)
 * [Sinon Chai](sinon-chai.html)

See: [Mocha interfaces](https://mochajs.org/interfaces/about/)
