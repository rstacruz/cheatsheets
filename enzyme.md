---
title: Enzyme
category: React
updated: 2020-02-12
tags: [Featured]
weight: -1
keywords:
  - shallow()
  - mount()
  - wrap.setProps()
  - "wrap.find().simulate('click')"
  - "wrap.contains(<div/>)"
---

## Getting started

### Introduction
{: .-intro}

[Enzyme](https://airbnb.io/enzyme) lets you write unit tests for React components. This guide covers Enzyme 3.x.

- [Enzyme website](https://enzymejs.github.io/enzyme/) _(enzymejs.github.io)_

### Mounting
{: .-prime}

```js
import {shallow, mount} from 'enzyme'
```
{: .-setup}

```js
wrap = shallow(<MyComponent />)
```

```js
wrap = mount(<MyComponent />)
```

Shallow wrapping doesn't descend down to sub-components.
A full mount also mounts sub-components.

See: [Shallow rendering](https://airbnb.io/enzyme/docs/api/shallow.html),
[Full rendering](https://airbnb.io/enzyme/docs/api/mount.html)

### Debugging

```js
console.log(wrap.debug())
```

Shows HTML for debugging purposes.

See: [debug()](https://airbnb.io/enzyme/docs/api/ReactWrapper/debug.html)

## Examples
{: .-three-column}

### Basic example
{: .-prime}

```js
import { shallow } from 'enzyme'
import MyComponent from '../MyComponent'
```
{: .-setup}

```js
it('works', () => {
  const wrap = shallow(
    <MyComponent name='Groot' />
  )

  expect(wrap.text()).toEqual('I am Groot')
})
```

### Props and state

#### Setting

```js
wrap.setProps({ name: 'Moe' })
wrap.setState({ show: true })
```

#### Asserting

```js
expect(wrap.prop('name')).toEqual('Moe')
expect(wrap.state('show')).toEqual(true)
```

```js
expect('name' in wrap.props()).toEqual('Moe')
expect('show' in wrap.state()).toEqual(true)
```

### Matching elements

```js
expect(
  wrap.containsMatchingElement(
    <span>I am groot</span>
  )
).toBeTruthy()
```

`containsMatchingElement()` is probably the most useful assertion in Jest.

### Snapshots

```js
expect(wrap).toMatchSnapshot()
```

Be sure you've set up enzyme-to-json for snapshots (see [Installing](#installing) below).

### Traversions

```js
expect(
  wrap.find('button').text()
).toEqual('Submit')
```

Use `.find()` to traverse down to nodes. It will return wrapper objects, too.

### Simulating events

```js
wrap.find('input').simulate('click')
```

#### With event object props

```js
wrap.find('input').simulate('change', {
  target: { value: 'hello' }
})
```

## Installing

### Initial setup

```
npm install --save-dev enzyme \
  enzyme-adapter-react-16 \
  react-test-renderer
```
{: .-setup}

#### test/setup.js

```js
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
```

#### package.json

```js
"jest": {
  "setupFiles": [
    "test/setup.js"
  ]
}
```

This configures Enzyme for React v16, and Jest to automatically configure Enzyme for you. There are other adapters in Enzyme's installation instructions.

See: [Installation](https://airbnb.io/enzyme/#installation)

### Jest snapshots

```
npm install --save-dev enzyme-to-json
```
{: .-setup}

#### package.json

```js
"jest": {
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ]
}
```

#### Test

```js
it('works', () => {
  wrap = mount(<MyComponent />)
  expect(wrap).toMatchSnapshot()
})
```

Optional, but recommended: This allows you to use Enzyme wrappers with Jest snapshots.

See: [enzyme-to-json](https://www.npmjs.com/package/enzyme-to-json)

## ReactWrapper

### Traversing

```js
wrap.find('button')   // → ReactWrapper
wrap.filter('button') // → ReactWrapper
wrap.not('span')      // → ReactWrapper (inverse of filter())
wrap.children()       // → ReactWrapper
wrap.parent()         // → ReactWrapper
wrap.closest('div')   // → ReactWrapper
wrap.childAt(0)       // → ReactWrapper
wrap.at(0)            // → ReactWrapper
wrap.first()          // → ReactWrapper
wrap.last()           // → ReactWrapper
```

```js
wrap.get(0)           // → ReactElement
wrap.getElement()     // → ReactElement
wrap.getElements()    // → Array<ReactElement>
wrap.getDOMNode()     // → DOMComponent
```

See: [Full rendering API](https://airbnb.io/enzyme/docs/api/mount.html)

### Actions

```js
wrap.simulate('click')
```

### React components

```js
wrap.setState({ ··· })
wrap.setProps({ ··· })
wrap.setContext({ ··· })
```

```js
wrap.state()         // get full state
wrap.props()         // get full props
wrap.context()       // get full context
```

```js
wrap.state('key')    // → any
wrap.prop('key')     // → any
wrap.context('key')  // → any
```

```js
wrap.instance()      // → ReactComponent
```

### Mount

```js
wrap.mount()
wrap.unmount()
wrap.update()      // calls forceUpdate()
```

### Tests

```js
wrap.debug()               // → string
wrap.html()                // → string
wrap.text()                // → string
wrap.type()                // → string | function
wrap.name()                // → string
wrap.is('.classname')      // → boolean
wrap.hasClass('class')     // → boolean
wrap.exists()              // → boolean
wrap.contains(<div />)     // → boolean
wrap.contains([ <div /> ]) // → boolean
wrap.some('.child')        // → boolean

wrap.someWhere(n => n.hasClass('foo'))

wrap.containsMatchingElement(<div />)         // → boolean
wrap.containsAllMatchingElements([ <div /> ]) // → boolean
wrap.containsAnyMatchingElements([ <div /> ]) // → boolean
```

## References

- [Enzyme website](https://airbnb.io/enzyme) _(airbnb.io)_
- [Enzyme v2 cheatsheet](./enzyme@2) _(devhints.io)_ (old version)
