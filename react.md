---
title: React.js
layout: default
---

Use the [React.js jsfiddle](http://jsfiddle.net/reactjs/69z2wepo/) to start hacking.
{:.brief-intro.center}

```js
var Component = React.createClass({
  render: function () {
    return <div>Hello {this.props.name}</div>;
  }
});
```

```js
var c = React.render(<Component name="John" />, document.body);
```

## Nesting
Nest components to separate concerns. See [multiple components](http://facebook.github.io/react/docs/multiple-components.html).
{:.center}

```js
var UserAvatar  = React.createClass({...});
var UserProfile = React.createClass({...});
```

```js
var Info = React.createClass({
  render() {
    return <div>
      <UserAvatar  username={this.props.username} />
      <UserProfile username={this.props.username} />
    </div>;
  }
});
```

## States & Properties

```js
this.setState({ editing: true });
this.state.editing === true

this.replaceState({ ... });
```

```js
this.setProps({ fullscreen: true });
this.props.fullscreen === true

this.replaceProps({ ... });
```

### Initial data

```js
React.createClass({
  // Pre-populates `this.state.data`
  getInitialState: function () {
    return {data: []};
  },

  // Pre-populates `this.props.name`
  getDefaultProps: function () {
    return {name: ''};
  }
);
```

## Component API

These are methods available for `Component` instances. See [Component API](http://facebook.github.io/react/docs/component-api.html).
{:.center}

```js
React.findDOMNode(c) // 0.13+
```

```js
c.forceUpdate()
c.isMounted()

c.state
c.props

c.setState({ ... })
c.setProps({ ... })
c.replaceState({ ... })
c.replaceProps({ ... })

c.refs
```

### Component specs
Methods and properties you can override. See [component specs](http://facebook.github.io/react/docs/component-specs.html).

| Method | What |
| ---- | ---- |
| [`render()`](http://facebook.github.io/react/docs/component-specs.html#render) | |
| [`getInitialState()`](http://facebook.github.io/react/docs/component-specs.html#getinitialstate) | |
| [`getDefaultProps()`](http://facebook.github.io/react/docs/component-specs.html#getdefaultprops) |  |
| [`mixins: [ ... ]`](http://facebook.github.io/react/docs/component-specs.html#mixins) | Mixins |
| [`propTypes: { ... }`](http://facebook.github.io/react/docs/component-specs.html#proptypes) | Validation ... [more](#property-validation) |
| [`statics: { ... }`](http://facebook.github.io/react/docs/component-specs.html#statics) | Static methods |
| [`displayName: "..."`](http://facebook.github.io/react/docs/component-specs.html#displayname) | Automatically filled by JSX |
{:.greycode.no-head}

## [Lifecycle](http://facebook.github.io/react/docs/component-specs.html)

### Mounting

| `componentWillMount()` | Before rendering (no DOM yet) |
| `componentDidMount()` | After rendering |
{:.greycode.no-head.lc}

### Updating

| `componentWillReceiveProps`*(newProps={})* | Use `setState()` here; not on initial |
| `shouldComponentUpdate`*(newProps={}, newState={})* | Skips `render()` if returns false |
| `componentWillUpdate`*(newProps={}, newState={})* | Can't use `setState()` here |
| `componentDidUpdate`*(prevProps={}, prevState={})* | Operate on the DOM here |
{:.greycode.no-head.lc}

### Cleanup

| `componentWillUnmount()` | Invoked before DOM removal |
{:.greycode.no-head.lc}

<style>
table.lc { table-layout: fixed; }
table.lc tr>:nth-child(1) { width: 50%; }
table.lc tr>:nth-child(2) { text-align: right; }
</style>

### Example: before rendering

```js
React.createClass({
  componentWillMount: function () {
    $.get(this.props.url, function (data) {
      this.setState(data);
    });
  },

  render: function () {
    return (
      <CommentList data={this.state.data} />
    );
  }
});
```

## DOM nodes

### References
Allows access to DOM nodes. See [References](http://facebook.github.io/react/docs/more-about-refs.html).

```html
<input ref="myInput">
```
{:.light}

```js
this.refs.myInput
React.findDOMNode(this.refs.myInput).focus()
React.findDOMNode(this.refs.myInput).value
```

### DOM Events
Add attributes like `onChange`. See [events](https://facebook.github.io/react/docs/events.html).

```html
<input type="text"
    value={this.state.value}
    onChange={this.handleChange} />
```
{:.light}

```js
handleChange: function(event) {
  this.setState({ value: event.target.value });
}
```

### Two-way binding
Use [LinkedStateMixin](http://facebook.github.io/react/docs/two-way-binding-helpers.html) for easier two-way binding.

```html
Email: <input type="text" valueLink={this.linkState('email')} />
```
{:.light}

```js
React.createClass({
  mixins: [React.addons.LinkedStateMixin]
});
```

```js
this.state.email
```

## Property validation

### Basic types
Primitive types: `.string`, `.number`, `.func`, and `.bool`. See [propTypes](http://facebook.github.io/react/docs/reusable-components.html#prop-validation).

```js
React.createClass({
  propTypes: {
    email:      React.PropTypes.string,
    seats:      React.PropTypes.number,
    callback:   React.PropTypes.func,
    isClosed:   React.PropTypes.bool,
    any:        React.PropTYpes.any,
  }
});
```

### Required types
Add `.isRequired`.

```js
propTypes: {
  requiredFunc:  React.PropTypes.func.isRequired,
  requiredAny:   React.PropTypes.any.isRequired,
```

### React elements
Use `.element`, `.node`.

```js
propTypes: {
  element:  React.PropTypes.element,  // react element
  node:     React.PropTypes.node,     // num, string, element
                                      // ...or array of those
```

### Enumerables
Use `.oneOf`, `.oneOfType`.

```
propTypes: {
  enum:     React.PropTypes.oneOf(['M','F']),  // enum
  union:    React.PropTypes.oneOfType([        // any
              React.PropTypes.string,
              React.PropTypes.number ]),
```

### Arrays and objects
Use `.array[Of]`, `.object[Of]`, `.instanceOf`, `.shape`.

```js
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

### Custom validation
Supply your own function.

```js
propTypes: {
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error('Validation failed!');
    }
  }
}
```

## Other features

### Class set
Easily manipulate DOM classes. See [Class set](http://facebook.github.io/react/docs/class-name-manipulation.html).

```js
render: function() {
  var cx = React.addons.classSet;
  var classes = cx({
    'message': true,
    'message-important': this.props.isImportant,
    'message-read': this.props.isRead
  });
  // same final string, but much cleaner
  return <div className={classes}>Great Scott!</div>;
}
```

### Propagating properties
See [Transferring props](http://facebook.github.io/react/docs/transferring-props.html).

```html
<VideoPlayer src="video.mp4" />
```

{:.light}
```js
var VideoPlayer = React.createClass({
  render: function() {
    /* propagates src="..." down to this sub component */
    return <VideoEmbed {...this.props} controls='false' />;
  }
});
```

### Mixins

    var TickTock = React.createClass({
      mixins: [SetIntervalMixin]
    }

    SetIntervalMixin = {
      componentWillMount: function() { .. }
    }

## [Top level API](https://facebook.github.io/react/docs/top-level-api.html)

```js
React.findDOMNode(c)
React.createClass({ ... })

React.render(<Component />, domnode, [callback])
React.unmountComponentAtNode(domnode)

React.renderToString(<Component />)
React.renderToStaticMarkup(<Component />)

React.isValidElement(c)
```

## JSX patterns

### Style shorthand
See [inline styles](https://facebook.github.io/react/tips/inline-styles.html).

```js
var style = { backgroundImage: 'url(x.jpg)', height: 10 };
return <div style={style}></div>;
```

### InnerHTML
See [dangerously set innerHTML](https://facebook.github.io/react/tips/dangerously-set-inner-html.html).

```js
function createMarkup() { return {__html: 'First &middot; Second'}; };
<div dangerouslySetInnerHTML={createMarkup()} />
```

### Lists

```js
var TodoList = React.createClass({
  render: function() {
    function item(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(item)}</ul>;
  }
});
```

## See also

* [Animations](http://facebook.github.io/react/docs/animation.html)
