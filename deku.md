---
title: Deku v2
category: JavaScript libraries
intro: |
  Quick reference for [Deku](https://www.npmjs.com/package/deku), a minimal virtual DOM library.
---

### Components

```js
/** @jsx element */
import { element } from 'deku'

function render ({ props, children, context, path }) {
  // props    = properties object
  // children = children array
  // path     = path to current component (like 0.1.5.2)
  // context  = common properties in all components
  return (
    <div class='App' hidden={props.hidden} color={context.theme.color}>
      {children}
    </div>
  }
}

function onCreate ({ props, dispatch, path }) { ... }
function onUpdate ({ props, dispatch, path }) { ... }
function onRemove ({ props, dispatch, path }) { ... }
// actually { children, props, path, context }

export default { render, onCreate, onRemove }
```

### Rendering

```js
import { createStore } from 'redux'
import { dom, element } from 'deku'

// Create a Redux store to handle all UI actions and side-effects
let store = createStore(reducer)

// Create a renderer that can turn vnodes into real DOM elements
let render = createRenderer(document.body, store.dispatch)

// Update the page and add redux state to the context
render(<MyButton>Hello World!</MyButton>, store.getState())
```
