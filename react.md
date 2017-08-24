---
title: React.js
category: React
layout: 2017/sheet
---

{%raw%}

Example
-------
{: .-left-reference}

### Basic example

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

Use the [React.js jsfiddle](http://jsfiddle.net/reactjs/69z2wepo/) to start hacking. (or the unofficial [jsbin](http://jsbin.com/yafixat/edit?js,output)).

### Try it

<iframe src="http://jsbin.com/yafixat/edit?js,output" height="400"></iframe>

[Open in jsbin](http://jsbin.com/yafixat/edit?js,output)
{: target="_blank"}

Components
----------
{: .-three-column}

### Class components

```jsx
class MyComponent extends React.Component {
  render () {
    return <div className='message-box'>
      Hello {this.props.name}
    </div>
  }
}
```

```jsx
const el = document.body
ReactDOM.render(<MyComponent name='John' />, el)
```

### Functional components

```jsx
function MyComponent ({ name }) {
  return <div className='message-box'>
    Hello {name}
  </div>
}
```

Functional components have no state. Also, their `props` are passed as the first parameter to a function.

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

Nest components to separate concerns. See: [multiple components](http://facebook.github.io/react/docs/multiple-components.html)


### Component API

```jsx
this.forceUpdate()
```

```jsx
this.setState({ ... })
this.replaceState({ ... })
```

```jsx
this.state
this.props
```

These methods and properies are available for `Component` instances. See [Component API](http://facebook.github.io/react/docs/component-api.html).

### Properties

```html
<Video fullscreen={true} />
```

```jsx
class Video extends React.Component {
  render () {
    this.props.fullscreen
    /* ... */
  }
}
```

Use [props](https://facebook.github.io/react/docs/tutorial.html#using-props) (`this.props`) to access parameters passed from the parent.

### States

```jsx
this.setState({ username: 'rstacruz' })
```

```jsx
render () {
  this.state.username
  /* ... */
}
```

Use states (`this.state`) to manage dynamic data.
See [States](https://facebook.github.io/react/docs/tutorial.html#reactive-state).

### Setting default props

```jsx
Hello.defaultProps = {
  color: 'blue'
}
```

See [defaultProps](https://facebook.github.io/react/docs/react-component.html#defaultprops).

### Setting default state

```jsx
class Hello extends React.Component {
  constructor (props) {
    super(props)
    this.state = { visible: true }
  }
}
```

Lifecycle
---------
{: .-two-column}

### Mounting

| `constructor` _(props)_ | Before rendering [#](https://facebook.github.io/react/docs/react-component.html#constructor) |
| `componentWillMount()` | _Don't use this_ [#](https://facebook.github.io/react/docs/react-component.html#componentwillmount) |
| `render()` | Render  [#](https://facebook.github.io/react/docs/react-component.html#render) |
| `componentDidMount()` | After rendering (DOM available) [#](https://facebook.github.io/react/docs/react-component.html#componentdidmount) |
| `componentWillUnmount()` | Before DOM removal [#](https://facebook.github.io/react/docs/react-component.html#componentwillunmount) |

Set initial the state on `constructor()`.
Add DOM event handlers, timers (etc) on `componentDidMount()`, then remove them on `componentWillUnmount()`.

### Updating

| `componentWillReceiveProps` *(newProps)* | Use `setState()` here |
| `shouldComponentUpdate` *(newProps, newState)* | Skips `render()` if returns false |
| `componentWillUpdate` *(newProps, newState)* | Can't use `setState()` here |
| `render()` | Render |
| `componentDidUpdate` *(prevProps, prevState)* | Operate on the DOM here |

Called when parents change properties and `.setState()`. These are not called for initial renders. See [reference](http://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops).

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
}
```

```jsx
this.input.focus()
this.input.value()
```

Allows access to DOM nodes. See [Refs and the DOM](https://facebook.github.io/react/docs/refs-and-the-dom.html).

### DOM Events

```html
<input type="text"
    value={this.state.value}
    onChange={this.handleChange} />
```

```jsx
handleChange: function(event) {
  this.setState({ value: event.target.value });
}
```

Add attributes like `onChange`. See [events](https://facebook.github.io/react/docs/events.html).

Property validation
-------------------
{: .-three-column}

### React.PropTypes

| PropType                  | Description   |
| ---                       | ---           |
| `any`                     | Anything      |
| ---                       | ---           |
| `string`                  |               |
| `number`                  |               |
| `func`                    | Function      |
| `bool`                    | True or false |
| ---                       | ---           |
| `oneOf`_(any)_            | Enum types    |
| `oneOfType`_(type array)_ | Union         |
| ---                       | ---           |
| `array`                   |               |
| `arrayOf`_(...)_          |               |
| ---                       | ---           |
| `object`                  |               |
| `objectOf`_(...)_         |               |
| `instanceOf`_(...)_       |               |
| `shape`_(...)_            |               |
| ---                       | ---           |
| `element`                 | React element |
| `node`                    | DOM node      |
| ---                       | ---           |
| `.isRequired`             | Required      |

See [propTypes](http://facebook.github.io/react/docs/reusable-components.html#prop-validation).

### Basic types

```jsx
MyComponent.propTypes = {
  email:      React.PropTypes.string,
  seats:      React.PropTypes.number,
  callback:   React.PropTypes.func,
  isClosed:   React.PropTypes.bool,
  any:        React.PropTypes.any
}
```

### Required types

```jsx
MyCo.propTypes = {
  name:  React.PropTypes.string.isRequired
}
```

### Elements

```jsx
MyCo.propTypes = {
  // React element
  element: React.PropTypes.element,

  // num, string, element, or an array of those
  node: React.PropTypes.node
}
```

### Enumerables (oneOf)

```jsx
MyCo.propTypes = {
  direction: React.PropTypes.oneOf([
    'left', 'right'
  ])
}
```

### Arrays and objects

```jsx
MyCo.propTypes = {
  array:    React.PropTypes.array,
  arrayOf:  React.PropTypes.arrayOf(React.PropTypes.number),
  object:   React.PropTypes.object,
  objectOf: React.PropTypes.objectOf(React.PropTypes.number),
  message:  React.PropTypes.instanceOf(Message),

  object2:  React.PropTypes.shape({
    color:  React.PropTypes.string,
    size:   React.PropTypes.number
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

## Other features

### Transfering props

```html
<VideoPlayer src="video.mp4" />
```

```jsx
class VideoPlayer extends React.Component {
  render () {
    return <VideoEmbed {...this.props} />
  }
}
```

Propagates `src="..."` down to the sub-component.
See [Transferring props](http://facebook.github.io/react/docs/transferring-props.html).

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

JSX patterns
------------
{: .-two-column}

### Style shorthand

```jsx
var style = { height: 10 }
return <div style={style}></div>
```

See [inline styles](https://facebook.github.io/react/tips/inline-styles.html).

### Inner HTML

```jsx
function markdownify() { return "<p>...</p>"; }
<div dangerouslySetInnerHTML={{__html: markdownify()}} />
```

See [dangerously set innerHTML](https://facebook.github.io/react/tips/dangerously-set-inner-html.html).

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

Always supply a `key` property.

### Conditionals

```jsx
<div>
{showPopup
  ? <Popup />
  : null}
</div>
```

Also see
--------
{: .-one-column}

This reference was made for React v15.

* [React website](http://facebook.github.io/react) _(facebook.github.io)_
* [Animations](http://facebook.github.io/react/docs/animation.html) _(facebook.github.io)_

{%endraw%}
