---
title: React.js
category: React
layout: 2017/sheet
ads: true
tags: [Featured]
updated: 2017-10-10
weight: -10
keywords:
  - React.Component
  - render()
  - componentDidMount()
  - props/state
  - dangerouslySetInnerHTML
intro: |
  [React](https://reactjs.org/) is a JavaScript library for building user interfaces. This guide targets React v15 to v16.
---

{%raw%}

Components
----------
{: .-three-column}

### Components
{: .-prime}

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
```
{: .-setup}

```jsx
class Hello extends React.Component {
  render () {
    return <div className='message-box'>
      Hello {this.props.name}
    </div>
  }
}
```

```jsx
const el = document.body
ReactDOM.render(<Hello name='John' />, el)
```

Use the [React.js jsfiddle](http://jsfiddle.net/reactjs/69z2wepo/) to start hacking. (or the unofficial [jsbin](http://jsbin.com/yafixat/edit?js,output))

### Properties

```html
<Video fullscreen={true} />
```
{: .-setup}

```jsx
render () {
  this.props.fullscreen
  ···
}
```
{: data-line="2"}

Use `this.props` to access properties passed to the component.

See: [Properties](https://reactjs.org/docs/tutorial.html#using-props)

### States

```jsx
constructor(props) {
  super(props)
  this.state = {}
}
```

```jsx
this.setState({ username: 'rstacruz' })
```

```jsx
render () {
  this.state.username
  ···
}
```
{: data-line="2"}

Use states (`this.state`) to manage dynamic data.

See: [States](https://reactjs.org/docs/tutorial.html#reactive-state)

### Nesting

```jsx
class Info extends React.Component {
  render () {
    const { avatar, username } = this.props

    return <div>
      <UserAvatar src={avatar} />
      <UserProfile username={username} />
    </div>
  }
}
```
As of React v16.2.0, fragments can be used to return multiple children without adding extra wrapping nodes to the DOM.

```jsx
class Info extends React.Component {
  render () {
    const { avatar, username } = this.props

    return (
      <React.Fragment>
        <UserAvatar src={avatar} />
        <UserProfile username={username} />
      </React.Fragment>
    )
  }
}
```


{: data-line="5,6,7,8,9,10"}

Nest components to separate concerns.

See: [Composing Components](https://reactjs.org/docs/components-and-props.html#composing-components)

### Children

```jsx
<AlertBox>
  <h1>You have pending notifications</h1>
</AlertBox>
```
{: data-line="2"}

```jsx
class AlertBox extends React.Component {
  render () {
    return <div className='alert-box'>
      {this.props.children}
    </div>
  }
}
```
{: data-line="4"}

Children are passed as the `children` property.

Defaults
--------

### Setting default props

```jsx
Hello.defaultProps = {
  color: 'blue'
}
```
{: data-line="1"}

See: [defaultProps](https://reactjs.org/docs/react-component.html#defaultprops)

### Setting default state

```jsx
class Hello extends React.Component {
  constructor (props) {
    super(props)
    this.state = { visible: true }
  }
}
```
{: data-line="4"}

Set the default state in the `constructor()`.

See: [Setting the default state](https://reactjs.org/docs/react-without-es6.html#setting-the-initial-state)

Other components
----------------
{: .-three-column}

### Function components

```jsx
function MyComponent ({ name }) {
  return <div className='message-box'>
    Hello {name}
  </div>
}
```
{: data-line="1"}

Functional components have no state. Also, their `props` are passed as the first parameter to a function.

See: [Function and Class Components](https://reactjs.org/docs/components-and-props.html#functional-and-class-components)

### Pure components

```jsx
class MessageBox extends React.PureComponent {
  ···
}
```
{: data-line="1"}

Performance-optimized version of `React.Component`. Doesn't rerender if props/state hasn't changed.

See: [Pure components](https://reactjs.org/docs/react-api.html#react.purecomponent)

### Component API

```jsx
this.forceUpdate()
```

```jsx
this.setState({ ... })
```

```jsx
this.state
this.props
```

These methods and properties are available for `Component` instances.

See: [Component API](http://facebook.github.io/react/docs/component-api.html)

Lifecycle
---------
{: .-two-column}

### Mounting

| Method | Description |
| --- | --- |
| `constructor` _(props)_ | Before rendering [#](https://reactjs.org/docs/react-component.html#constructor) |
| `componentWillMount()` | _Don't use this_ [#](https://reactjs.org/docs/react-component.html#componentwillmount) |
| `render()` | Render  [#](https://reactjs.org/docs/react-component.html#render) |
| `componentDidMount()` | After rendering (DOM available) [#](https://reactjs.org/docs/react-component.html#componentdidmount) |
| --- | --- |
| `componentWillUnmount()` | Before DOM removal [#](https://reactjs.org/docs/react-component.html#componentwillunmount) |
| --- | --- |
| `componentDidCatch()` | Catch errors (16+) [#](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html) |

Set initial the state on `constructor()`.
Add DOM event handlers, timers (etc) on `componentDidMount()`, then remove them on `componentWillUnmount()`.

### Updating

| Method | Description |
| --- | --- |
| `componentWillReceiveProps` *(newProps)* | Use `setState()` here |
| `shouldComponentUpdate` *(newProps, newState)* | Skips `render()` if returns false |
| `componentWillUpdate` *(newProps, newState)* | Can't use `setState()` here |
| `render()` | Render |
| `componentDidUpdate` *(prevProps, prevState)* | Operate on the DOM here |

Called when parents change properties and `.setState()`. These are not called for initial renders.

See: [Component specs](http://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops)

DOM nodes
---------
{: .-two-column}

### References

```jsx
class MyComponent extends React.Component {
  render () {
    return <div>
      <input ref={el => this.input = el} />
    </div>
  }

  componentDidMount () {
    this.input.focus()
  }
}
```
{: data-line="4,9"}

Allows access to DOM nodes.

See: [Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)

### DOM Events

```jsx
class MyComponent extends React.Component {
  render () {
    <input type="text"
        value={this.state.value}
        onChange={event => this.onChange(event)} />
  }

  onChange (event) {
    this.setState({ value: event.target.value })
  }
}
```
{: data-line="5,9"}

Pass functions to attributes like `onChange`.

See: [Events](https://reactjs.org/docs/events.html)

## Other features

### Transferring props

```html
<VideoPlayer src="video.mp4" />
```
{: .-setup}

```jsx
class VideoPlayer extends React.Component {
  render () {
    return <VideoEmbed {...this.props} />
  }
}
```
{: data-line="3"}

Propagates `src="..."` down to the sub-component.

See [Transferring props](http://facebook.github.io/react/docs/transferring-props.html)

### Top-level API

```jsx
React.createClass({ ... })
React.isValidElement(c)
```

```jsx
ReactDOM.render(<Component />, domnode, [callback])
ReactDOM.unmountComponentAtNode(domnode)
```

```jsx
ReactDOMServer.renderToString(<Component />)
ReactDOMServer.renderToStaticMarkup(<Component />)
```

There are more, but these are most common.

See: [React top-level API](https://reactjs.org/docs/react-api.html)

JSX patterns
------------
{: .-two-column}

### Style shorthand

```jsx
var style = { height: 10 }
return <div style={style}></div>
```

```jsx
return <div style={{ margin: 0, padding: 0 }}></div>
```

See: [Inline styles](https://reactjs.org/tips/inline-styles.html)

### Inner HTML

```jsx
function markdownify() { return "<p>...</p>"; }
<div dangerouslySetInnerHTML={{__html: markdownify()}} />
```

See: [Dangerously set innerHTML](https://reactjs.org/tips/dangerously-set-inner-html.html)

### Lists

```jsx
class TodoList extends React.Component {
  render () {
    const { items } = this.props

    return <ul>
      {items.map(item =>
        <TodoItem item={item} key={item.key} />)}
    </ul>
  }
}
```
{: data-line="6,7"}

Always supply a `key` property.

### Conditionals

```jsx
<div>
  {showMyComponent
    ? <MyComponent />
    : <OtherComponent />}
</div>
```

### Short-circuit evaluation

```jsx
<div>
  {showPopup && <Popup />}
</div>
```

New features
------------
{: .-three-column}

### Returning multiple elements

You can return multiple elements as arrays or fragments.

#### Arrays

```js
render () {
  // Don't forget the keys!
  return [
    <li key="A">First item</li>,
    <li key="B">Second item</li>
  ]
}
```
{: data-line="3,4,5,6"}

#### Fragments
```js
render () {
  // Fragments don't require keys!
  return (
    <React.Fragment>
      <li>First item</li>
      <li>Second item</li>
    </React.Fragment>
  )
}
```
{: data-line="3,4,5,6,7,8"}

See: [Fragments and strings](https://reactjs.org/blog/2017/09/26/react-v16.0.html#new-render-return-types-fragments-and-strings)

### Returning strings

```js
render() {
  return 'Look ma, no spans!';
}
```
{: data-line="2"}

You can return just a string.

See: [Fragments and strings](https://reactjs.org/blog/2017/09/26/react-v16.0.html#new-render-return-types-fragments-and-strings)

### Errors

```js
class MyComponent extends React.Component {
  ···
  componentDidCatch (error, info) {
    this.setState({ error })
  }
}
```
{: data-line="3,4,5"}

Catch errors via `componentDidCatch`. (React 16+)

See: [Error handling in React 16](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)

### Portals

```js
render () {
  return React.createPortal(
    this.props.children,
    document.getElementById('menu')
  )
}
```
{: data-line="2,3,4,5"}

This renders `this.props.children` into any location in the DOM.

See: [Portals](https://reactjs.org/docs/portals.html)

### Hydration

```js
const el = document.getElementById('app')
ReactDOM.hydrate(<App />, el)
```
{: data-line="2"}

Use `ReactDOM.hydrate` instead of using `ReactDOM.render` if you're rendering over the output of [ReactDOMServer](https://reactjs.org/docs/react-dom-server.html).

See: [Hydrate](https://reactjs.org/docs/react-dom.html#hydrate)

Property validation
-------------------
{: .-three-column}

### PropTypes

```js
import PropTypes from 'prop-types'
```
{: .-setup}

See: [Typechecking with PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

| `any`                     | Anything                             |

#### Basic

| `string`                  |                                      |
| `number`                  |                                      |
| `func`                    | Function                             |
| `bool`                    | True or false                        |

#### Enum

| `oneOf`_(any)_            | Enum types                           |
| `oneOfType`_(type array)_ | Union                                |

#### Array

| `array`                   |                                      |
| `arrayOf`_(...)_          |                                      |

#### Object

| `object`                  |                                      |
| `objectOf`_(...)_         | Object with values of a certain type |
| `instanceOf`_(...)_       | Instance of a class                  |
| `shape`_(...)_            |                                      |

#### Elements

| `element`                 | React element                        |
| `node`                    | DOM node                             |

#### Required

| `(···).isRequired`        | Required                             |

### Basic types

```jsx
MyComponent.propTypes = {
  email:      PropTypes.string,
  seats:      PropTypes.number,
  callback:   PropTypes.func,
  isClosed:   PropTypes.bool,
  any:        PropTypes.any
}
```

### Required types

```jsx
MyCo.propTypes = {
  name:  PropTypes.string.isRequired
}
```

### Elements

```jsx
MyCo.propTypes = {
  // React element
  element: PropTypes.element,

  // num, string, element, or an array of those
  node: PropTypes.node
}
```

### Enumerables (oneOf)

```jsx
MyCo.propTypes = {
  direction: PropTypes.oneOf([
    'left', 'right'
  ])
}
```

### Arrays and objects

```jsx
MyCo.propTypes = {
  list: PropTypes.array,
  ages: PropTypes.arrayOf(PropTypes.number),
  user: PropTypes.object,
  user: PropTypes.objectOf(PropTypes.number),
  message: PropTypes.instanceOf(Message)
}
```

```jsx
MyCo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    age:  PropTypes.number
  })
}
```

Use `.array[Of]`, `.object[Of]`, `.instanceOf`, `.shape`.

### Custom validation

```jsx
MyCo.propTypes = {
  customProp: (props, key, componentName) => {
    if (!/matchme/.test(props[key])) {
      return new Error('Validation failed!')
    }
  }
}
```

Also see
--------

* [React website](https://reactjs.org) _(reactjs.org)_
* [React cheatsheet](https://reactcheatsheet.com/) _(reactcheatsheet.com)_
* [Awesome React](https://github.com/enaqx/awesome-react) _(github.com)_
* [React v0.14 cheatsheet](react@0.14) _Legacy version_

{%endraw%}
