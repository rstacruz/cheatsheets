---
title: Mocha.js TDD interface
subtitle: Suite and test API
category: JavaScript testing
last_verified_with: "Mocha 12.0.3."
updated: 2026-11-25
tier: t3
---

### TDD

```
mocha.setup('tdd');

suite('something', function() {
  setup(function() {
  });

  test('should work', function() {
  });

  teardown(function() {
  });
});
```

<!-- {: data-highlight="mocha.setup('tdd')"} -->

See: [TDD interface](https://mochajs.org/interfaces/tdd/)

### Async

```
test('should save', function(done) {
  var user = new User();
  user.save(function(err) {
    if (err) throw err;
    done();
  });
});
```

<!-- {: data-highlight="done"} -->

See: [Asynchronous code](https://mochajs.org/features/asynchronous-code/)

### Chai: Expect

```
var expect = chai.expect;

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.length(3);
expect(tea).to.have.property('flavors').with.length(3);
```

<!-- {: data-highlight="expect"} -->

See: [Chai BDD API](https://www.chaijs.com/api/bdd/)

### See also

 * [Mocha BDD](mocha.html)
 * [Mocha HTML](mocha-html.html)
 * [Chai](chai.html)
 * [Sinon](sinon.html)
 * [Sinon Chai](sinon-chai.html)

See: [Mocha interfaces](https://mochajs.org/interfaces/about/)
