---
title: Chai.js
seo_title: Chai cheatsheet — expect, should, assert
subtitle: JavaScript assertion library
logo: { src: /assets/logos/chai.svg, mono: true }
category: JavaScript testing
weight: -3
updated: 2026-11-22
tier: t3
last_verified_with: "Chai 6.3.0 ESM; verified on Node 26.13.1 with chai-jquery 2.1.0 and jQuery 3.7.1 in a browser-like jsdom harness."
intro: |
  [Chai](https://www.chaijs.com/) is a JavaScript assertion library with expect, should, and assert styles. Examples target Chai 6 and use ESM imports.
links:
  - title: Chai documentation
    url: https://www.chaijs.com/
  - title: Assertion API
    url: https://www.chaijs.com/api/
description: "Chai assertions: expect, should and assert styles for Node and browser tests. Reference."
---

## Expect
<!-- {: .-three-column} -->

### Equality

```js
import { expect } from 'chai'

expect(2).to.equal(2)  // strict equality
expect('2').not.to.equal(2)
expect({ a: 1 })
  .to.eql({ a: 1 })  // deep equality
expect([1, 2]).to.deep.equal([1, 2])
```

`eql` and `deep.equal` compare values recursively.

See: [equal](https://www.chaijs.com/api/bdd/#equalval-msg), [eql](https://www.chaijs.com/api/bdd/#eqlobj-msg)

### Types

```js
import { expect } from 'chai'

expect('tea').to.be.a('string')
expect([1, 2]).to.be.an('array')
expect(new Error())
  .to.be.instanceOf(Error)
expect(() => {}).to.be.a('function')
```

See: [a(type)](https://www.chaijs.com/api/bdd/#atype-msg), [instanceof](https://www.chaijs.com/api/bdd/#instanceofconstructor-msg)

### Truthiness

```js
import { expect } from 'chai'

expect('green').to.be.ok
expect(true).to.be.true
expect(false).to.be.false
expect(null).to.be.null
expect(undefined).to.be.undefined
expect({}).to.exist
```

These assertions are getters: leave off the parentheses.

See: [ok](https://www.chaijs.com/api/bdd/#ok), [exist](https://www.chaijs.com/api/bdd/#exist)

### Collections

```js
import { expect } from 'chai'

expect([1, 2, 3]).to.include(2)
expect({ a: 1, b: 2 })
  .to.include({ a: 1 })
expect([1, 2]).to.have.members([2, 1])
expect({ a: 1, b: 2 })
  .to.have.all.keys('a', 'b')
expect([1, 2, 3]).to.have.lengthOf(3)
expect([]).to.be.empty
```

See: [include](https://www.chaijs.com/api/bdd/#includeval-msg), [members](https://www.chaijs.com/api/bdd/#membersset-msg)

### Properties

```js
import { expect } from 'chai'

const user = {
  name: 'Ada',
  address: { city: 'London' }
}

expect(user)
  .to.have.property('name', 'Ada')
expect(user)
  .to.have.nested
  .property('address.city', 'London')
expect({ x: { a: 1 } })
  .to.have.deep
  .property('x', { a: 1 })
```

See: [property](https://www.chaijs.com/api/bdd/#propertyname-val-msg), [nested](https://www.chaijs.com/api/bdd/#nested)

### Numbers

```js
import { expect } from 'chai'

expect(5).to.be.above(3)
expect(5).to.be.at.least(5)
expect(5).to.be.below(7)
expect(5).to.be.at.most(5)
expect(5).to.be.within(1, 10)
expect(1.5).to.be.closeTo(1.52, 0.1)
```

See: [within](https://www.chaijs.com/api/bdd/#withinstart-finish-msg), [closeTo](https://www.chaijs.com/api/bdd/#closetoexpected-delta-msg)

### Errors

```js
import { expect } from 'chai'

expect(() => {
  throw new TypeError('oops')
})
  .to.throw(TypeError, 'oops')
expect(() => JSON.parse('bad'))
  .to.throw(SyntaxError)
expect(() => 1 + 1).to.not.throw()
```

See: [throw](https://www.chaijs.com/api/bdd/#throwerrorlike-errmsgmatcher-msg)

## Assert
<!-- {: .-three-column} -->

### Equality

```js
import { assert } from 'chai'

assert(1 === 1, 'one is one')
assert.equal(3, '3')              // ==
assert.strictEqual(3, 3)          // ===
assert.deepEqual({ a: 1 }, { a: 1 })
assert.notEqual(3, 4)
```

See: [equal](https://www.chaijs.com/api/assert/#equalactual-expected-message), [deepEqual](https://www.chaijs.com/api/assert/#deepequalactual-expected-message)

### Types

```js
import { assert } from 'chai'

assert.typeOf(/tea/, 'regexp')
assert.instanceOf(new Error(), Error)
assert.isArray([])
assert.isString('tea')
assert.isNumber(3)
assert.isBoolean(true)
assert.isObject({})
```

See: [typeOf](https://www.chaijs.com/api/assert/#typeofvalue-name-message), [instanceOf](https://www.chaijs.com/api/assert/#instanceofobject-constructor-message)

### Truthiness

```js
import { assert } from 'chai'

assert.isOk('tea')
assert.isNotOk(null)
assert.isTrue(true)
assert.isFalse(false)
assert.isNull(null)
assert.isUndefined(undefined)
assert.exists(0)
assert.isDefined(null)
```

See: [isOk](https://www.chaijs.com/api/assert/#isokobject-message), [exists](https://www.chaijs.com/api/assert/#exists)

### Collections

```js
import { assert } from 'chai'

assert.include([1, 2], 2)
assert.deepInclude([{ a: 1 }], { a: 1 })
assert.lengthOf([1, 2], 2)
```

See: [include](https://www.chaijs.com/api/assert/#includehaystack-needle-message)

### Properties

```js
import { assert } from 'chai'

assert.property({ a: 1 }, 'a')
assert.propertyVal({ a: 1 }, 'a', 1)
assert.nestedProperty(
  { a: { b: 2 } }, 'a.b'
)
assert.hasAllKeys(
  { a: 1, b: 2 }, ['a', 'b']
)
```

See: [property](https://www.chaijs.com/api/assert/#propertyobject-property-message)

### Numbers

```js
import { assert } from 'chai'

assert.isAbove(5, 3)
assert.isAtLeast(5, 5)
assert.isBelow(3, 5)
assert.isAtMost(5, 5)
assert.closeTo(1.5, 1.52, 0.1)
```

See: [isAbove](https://www.chaijs.com/api/assert/#isabovevaluetocheck-valuetobeabove-message), [closeTo](https://www.chaijs.com/api/assert/#closetoactual-expected-delta-message)

### Errors

```js
import { assert } from 'chai'

assert.throws(
  () => JSON.parse('bad'), SyntaxError
)
assert.doesNotThrow(() => 1 + 1)
```

See: [throws](https://www.chaijs.com/api/assert/#throwsfn-errorlikestringregexp-stringregexp-message)

## Chaining

### Language chains

```
.to .be .been .is .that .which .and .has .have
.with .at .of .same .but .does .still .also
```

These words do nothing; they make assertions read like sentences.

See: [language chains](https://www.chaijs.com/api/bdd/#language-chains)

### Modifiers

```js
import { expect } from 'chai'

expect({ a: 1 }).to.not.have.property('b')
expect({ a: 1 }).to.have.own.property('a')
expect([1, 2]).to.have.ordered.members([1, 2])
expect([{ a: 1 }]).to.deep.include({ a: 1 })
```

`not` negates the assertion; the others change how values are compared.

See: [not](https://www.chaijs.com/api/bdd/#not), [deep](https://www.chaijs.com/api/bdd/#deep)

## Should

### Enable should

```js
import { should } from 'chai'

should()
```

Call once to add a `should` getter to every object.

See: [should style](https://www.chaijs.com/guide/styles/#should)

### Using should

```js
import { should } from 'chai'

should()

const tea = 'green'
const nums = [1, 2]
const cup = { tea: 'green' }

tea.should.equal('green')
nums.should.have.lengthOf(2)
cup.should.have.property('tea')
```

See: [expect / should API](https://www.chaijs.com/api/bdd/)

## Plugins

### Register chai-jquery

```js
import { use } from 'chai'
import $ from 'jquery'
import chaiJquery from 'chai-jquery'

globalThis.jQuery = $
use(chaiJquery)
```

Browser setup: `chai-jquery` reads jQuery from the global scope.

See: [plugins guide](https://www.chaijs.com/guide/plugins/)

### jQuery assertions

```js
import { expect, use } from 'chai'
import $ from 'jquery'
import chaiJquery from 'chai-jquery'

globalThis.jQuery = $
use(chaiJquery)

const $el = $(
  '<a class="tea active" href="/tea" ' +
    'style="display:none">Buy tea</a>'
)

expect($el).to.have.class('active')
expect($el).to.have.attr('href', '/tea')
expect($el).to.have.css('display', 'none')
expect($el).to.contain('tea')
expect($el).to.have.text('Buy tea')
```

Browser only. The element is built in memory, so no page markup is needed.

See: [chai-jquery](https://github.com/chaijs/chai-jquery)
