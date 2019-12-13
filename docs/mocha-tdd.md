---
title: Mocha.js TDD interface
category: JavaScript libraries
---

### TDD

    mocha.setup('tdd');

    suite('something', function() {
      setup(function() {
      });

      test('should work', function() {
      });

      teardown(function() {
      });
    });

### Async

    test('should save', function(done) {
      var user = new User();
      user.save(function(err) {
        if (err) throw err;
        done();
      });
    });

### Chai: Expect

    var expect = chai.expect;

    expect(foo).to.be.a('string');
    expect(foo).to.equal('bar');
    expect(foo).to.have.length(3);
    expect(tea).to.have.property('flavors').with.length(3);

### See also

 * [Mocha BDD](mocha.html)
 * [Mocha HTML](mocha-html.html)
 * [Chai](chai.html)
 * [Sinon](sinon.html)
 * [Sinon Chai](sinon-chai.html)
