---
title: React.js
category: React
layout: 2017/sheet
---

{%raw%}

Getting started
---------------

{:.-three-column}

<!-- .-three-column -->

### Getting started

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

Use the [React.js jsfiddle](http://jsfiddle.net/reactjs/69z2wepo/) to start hacking. (or the unofficial [jsbin](http://jsbin.com/yafixat/edit?js,output)).

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
this.isMounted()

this.setState({ ... })
this.replaceState({ ... })

this.state
this.props
```

These are methods available for `Component` instances. See [Component API](http://facebook.github.io/react/docs/component-api.html).


### Component specs

| Method | What |
| ---- | ---- |
| [`render()`](http://facebook.github.io/react/docs/component-specs.html#render) | |
| ---- | ---- |
| [`getInitialState()`](http://facebook.github.io/react/docs/component-specs.html#getinitialstate) | |
| [`getDefaultProps()`](http://facebook.github.io/react/docs/component-specs.html#getdefaultprops) |  |
| ---- | ---- |
| [`mixins: [ ... ]`](http://facebook.github.io/react/docs/component-specs.html#mixins) | Mixins ... [more](#mixins) |
| [`propTypes: { ... }`](http://facebook.github.io/react/docs/component-specs.html#proptypes) | Validation ... [more](#property-validation) |
| [`statics: { ... }`](http://facebook.github.io/react/docs/component-specs.html#statics) | Static methods |
| [`displayName: "..."`](http://facebook.github.io/react/docs/component-specs.html#displayname) | Automatically filled by JSX |
{:.greycode.no-head}

Methods and properties you can override. See [component specs](http://facebook.github.io/react/docs/component-specs.html).

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
this.replaceState({ ... })
```

```jsx
render () {
  this.state.username
  /* ... */
}
```

Use [states](https://facebook.github.io/react/docs/tutorial.html#reactive-state) (`this.state`) to manage dynamic data.

### Setting default props

```jsx
class Hello extends React.Component {
  constructor (props) {
    super({ shown: true, ...props })
  }
}
```

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

{:.-two-column}

### Mounting

| `componentWillMount()` | Before rendering (no DOM yet) |
| `componentDidMount()` | After rendering |
| `componentWillUnmount()` | Invoked before DOM removal |

Before initial rendering occurs. Add your DOM stuff on didMount (events, timers, etc). See [reference](http://facebook.github.io/react/docs/component-specs.html#mounting-componentwillmount).

Clear your DOM stuff in componentWillMount (probably done on didMount). See [reference](http://facebook.github.io/react/docs/component-specs.html#unmounting-componentwillunmount).

### Updating

| `componentWillReceiveProps`*(newProps={})* | Use `setState()` here |
| `shouldComponentUpdate`*(newProps={}, newState={})* | Skips `render()` if returns false |
| `componentWillUpdate`*(newProps={}, newState={})* | Can't use `setState()` here |
| `componentDidUpdate`*(prevProps={}, prevState={})* | Operate on the DOM here |

Called when parents change properties and `.setState()`. These are not called for initial renders. See [reference](http://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops).

DOM nodes
---------

{:.-two-column}

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

Allows access to DOM nodes. See [References](http://facebook.github.io/react/docs/more-about-refs.html).

### DOM Events

```html
<input type="text"
    value={this.state.value}
    onChange={this.handleChange} />
```
{:.light}

```jsx
handleChange: function(event) {
  this.setState({ value: event.target.value });
}
```

Add attributes like `onChange`. See [events](https://facebook.github.io/react/docs/events.html).

Property validation
-------------------

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

See [propTypes](http://facebook.github.io/react/docs/reusable-components.html#prop-validation).

### Required types

```jsx
MyComponent.propTypes = {
  requiredFunc:  React.PropTypes.func.isRequired,
  requiredAny:   React.PropTypes.any.isRequired
}
```

Add `.isRequired`.

### React elements

```jsx
MyComponent.propTypes = {
  // React element
  element:  React.PropTypes.element,

  // num, string, element, or an array of those
  node:     React.PropTypes.node
}
```

Use `.element`, `.node`.

### Enumerables

```
propTypes: {
  enum:     React.PropTypes.oneOf(['M','F']),  // enum
  union:    React.PropTypes.oneOfType([        // any
              React.PropTypes.string,
              React.PropTypes.number ]),
```

Use `.oneOf`, `.oneOfType`.

### Arrays and objects

```jsx
propTypes: {
  array:    React.PropTypes.array,
  arrayOf:  React.PropTypes.arrayOf(React.PropTypes.number),
  object:   React.PropTypes.object,
  objectOf: React.PropTypes.objectOf(React.PropTypes.number),

  message:  React.PropTypes.instanceOf(Message),

  object2:  React.PropTypes.shape({
    color:  React.PropTypes.string,
    size:   React.PropTypes.number
  }),
```

Use `.array[Of]`, `.object[Of]`, `.instanceOf`, `.shape`.

### Custom validation

```jsx
propTypes: {
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error('Validation failed!');
    }
  }
}
```

Supply your own function.

## Other features

### Propagating properties

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

ReactDOM.findDOMNode(c) // 0.14+
ReactDOM.render(<Component />, domnode, [callback]) // 0.14+
ReactDOM.unmountComponentAtNode(domnode) // 0.14+

ReactDOMServer.renderToString(<Component />) // 0.14+
ReactDOMServer.renderToStaticMarkup(<Component />) // 0.14+
```

JSX patterns
------------

### Style shorthand

```jsx
var style = { backgroundImage: 'url(x.jpg)', height: 10 };
return <div style={style}></div>;
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
var TodoList = React.createClass({
  render: function() {
    function item(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(item)}</ul>;
  }
});
```

See also
--------

{:.-two-column}

### Also see

* [Animations](http://facebook.github.io/react/docs/animation.html)

{%endraw%}
