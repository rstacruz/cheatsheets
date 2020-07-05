---
title: Deku v1
category: JavaScript libraries
layout: 2017/sheet
intro: |
  Quick reference for [Deku](https://www.npmjs.com/package/deku), a minimal virtual DOM library. **Deprecated:** This is for Deku v1. See [deku](./deku) for a more updated cheatsheet.
---

### Example

```js
/** @jsx element */
import element from 'virtual-element' // replacement for React.createElement
import { render, tree } from 'deku'

var app = <div class='my-app'>Hello World!</div>

render(tree(app), document.body)
```

### Components

```js
Button = {
  render() {
    return <button>Submit</button>
  }
}

App = {
  render() {
    return (
      <div>
        <Button />
      </div>
    )
  }
}

render(tree(<App />), document.body)
render(tree(element(App)), document.body)
```

### Component props/state

```js
App = {
  render ({ props, state }) {
    return <div>{ /*...use state.store here*/ }</div>
  }

  initialState (props) {
    return { store: store.getState() }
  },

  afterMount (comp, el, setState) {
    store.subscribe(() => setState({ store: store.getState() }))
  }
}

render(tree(<App />), document.body)
```

### Events

```js
<a onClick={onClick}>{props.text}</a>
```

### Magic virtual element

Use [magic-virtual-element](https://github.com/dekujs/magic-virtual-element) to enable nice classnames.

```
import element from 'magic-virtual-element'
<div style={style} class={[ 'button', '-active' ]}>
```

### Reference

```
name = 'MyComponent'

// Defaults
initialState (props) {...} // return initial state
defaultProps = { hi: 'hello' }

// Render
render ({props, state}, setState) {...}

// Lifecycle
beforeUpdate  ({props, state, id}, nextProps, nextState) {}
afterRender   ({props, state, id}, el) {}
afterUpdate   ({props, state, id}, prevProps, prevState, setState) {}
afterMount    ({props, state, id}, el, setState) {}
beforeUnmount ({props, state, id}, el) {}
```

See: <https://www.npmjs.com/package/deku>
