---
title: Enzyme
category: React
layout: 2017/sheet
updated: 2017-09-14
weight: -1
---

## ReactWrapper

### ReactWrapper

```js
wrap = shallow(<MyComponent />) // => ReactWrapper (shallow)
```

```js
wrap = mount(<MyComponent />)   // => ReactWrapper (full)
```

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

- <https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md>
