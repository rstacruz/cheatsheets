---
title: Enzyme v2
category: React
layout: 2017/sheet
updated: 2017-10-12
weight: -1
deprecated_by: /enzyme
---

## Getting started
{: .-three-column}

### Introduction
{: .-intro}

**(Deprecated)** [Enzyme](http://airbnb.io/enzyme) lets you write unit tests for React components. This guide covers a previous version (v2.x).

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
See: [Shallow rendering](http://airbnb.io/enzyme/docs/api/shallow.html),
[Full rendering](http://airbnb.io/enzyme/docs/api/mount.html)

### Jest

```js
import toJson from 'enzyme-to-json'
```
{: .-setup}

```js
it('works', () => {
  wrap = mount(<MyComponent />)
  expect(toJson(wrap)).toMatchSnapshot()
})
```

Converts an Enzyme wrapper to a format compatible with Jest snapshots. See: [enzyme-to-json](https://www.npmjs.com/package/enzyme-to-json)

### Debugging

```js
console.log(wrap.debug())
```

Shows HTML for debugging purposes. See: [debug()](http://airbnb.io/enzyme/docs/api/ReactWrapper/debug.html)

## ReactWrapper

### Traversing

```js
wrap.find('button')   // => ReactWrapper
wrap.filter('button') // => ReactWrapper
wrap.not('span')      // => ReactWrapper (inverse of filter())
wrap.children()       // => ReactWrapper
wrap.parent()         // => ReactWrapper
wrap.closest('div')   // => ReactWrapper
wrap.childAt(0)       // => ReactWrapper
wrap.at(0)            // => ReactWrapper
wrap.first()          // => ReactWrapper
wrap.last()           // => ReactWrapper
```

```js
wrap.get(0)           // => ReactElement
wrap.getNode()        // => ReactElement
wrap.getNodes()       // => Array<ReactElement>
wrap.getDOMNode()     // => DOMComponent
```

See: [Full rendering API](http://airbnb.io/enzyme/docs/api/mount.html)

### Actions

```js
wrap.simulate('click')
```

### React components

```js
wrap.setState({ ... })
wrap.setProps({ ... })
wrap.setContext({ ... })

wrap.state()            // => Any (get state)
wrap.props()            // => object (get props)
wrap.context()          // => Any (get context)

wrap.instance()         // => ReactComponent
```

### Mount

```js
wrap.mount()
wrap.unmount()
wrap.update()      // calls forceUpdate()
```

### Tests

```js
wrap.debug()               // => string
wrap.html()                // => string
wrap.text()                // => string
wrap.type()                // => string | function
wrap.name()                // => string
wrap.is('.classname')      // => boolean
wrap.hasClass('class')     // => boolean
wrap.exists()              // => boolean
wrap.contains(<div />)     // => boolean
wrap.contains([ <div /> ]) // => boolean

wrap.containsMatchingElement(<div />)         // => boolean
wrap.containsAllMatchingElements([ <div /> ]) // => boolean
wrap.containsAnyMatchingElements([ <div /> ]) // => boolean
```

## References

- <https://airbnb.io/enzyme>
