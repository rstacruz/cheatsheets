---
title: Stencil
subtitle: Web component compiler
category: Build tools
updated: 2026-11-26
last_verified_with: "Stencil 4.45.5."
tier: t3
keywords:
  - "@Component"
  - "@Prop()"
  - "@State()"
  - "render()"
  - "componentWillLoad()"
  - "componentWillUpdate()"
  - "Templating"
  - "Lifecycle"
intro: |
  [Stencil](https://github.com/ionic-team/stencil) is a compiler
  for web components made by the Ionic team. This guide targets
  Stencil v4.
links:
  - title: Handling user input
    url: https://stenciljs.com/docs/templating-jsx#handling-user-input
---

## Quick-start guide

<!-- {: .-three-column} -->

### Getting started

<!-- {: .-prime} -->

#### JavaScript

```js
import {
  Component, Prop, State, h
} from '@stencil/core'

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss'
})
export class MyComponent {
  @Prop() name: string
  @State() isVisible: boolean = true

  render () {
    return <p>I am {this.name}!</p>
  }
}
```

#### HTML

```html
<my-component name='Groot' />
```

Same as the [Readme](https://github.com/ionic-team/stencil) example: use `<my-component>` like any other tag.

### DOM events

```js
export class MyComponent {
  render () {
    return (
      <input
        onChange={this.inputChanged}
      />
    )
  }

  inputChanged = (event: Event) => {
    const el =
      event.target as HTMLInputElement
    console.log('changed:', el.value)
  }
}
```

<!-- {: data-highlight="onChange"} -->

Stencil uses DOM events.

See: [Handling user input](https://stenciljs.com/docs/templating-jsx#handling-user-input)

### Multiple children

```js
render () {
  return [
    <h1>Hello there</h1>,
    <p>Returns multiple nodes</p>
  ]
}
```

<!-- {: data-highlight="return ["} -->

`render()` can return an array of elements.

See: [Complex template content](https://stenciljs.com/docs/templating-jsx#complex-template-content)

## State

### Managing state

```js
export class MyComponent {
  @State() isVisible: boolean

  show () {
    this.isVisible = true
  }
}
```

<!-- {: data-highlight="@State()"} -->

Just do assignments. You can't do mutations though, see next section.

See: [Managing component state](https://stenciljs.com/docs/state)

### Updating arrays and objects

#### ✗ Bad
```js
this.names.push('Larry')  // ⚠️
this.options.show = true  // ⚠️
```

#### ✓ OK

```js
this.names = [ ...this.names, 'Larry' ]
this.options = { ...this.options, show: true }
```

Mutable operations such as `push()` won't work. You'll need to assign a new copy.

See: [Updating arrays](https://stenciljs.com/docs/reactive-data#updating-arrays)

## Slots

### Using slot

#### HTML

```html
<my-component>
  <span>Hello, friends</span>
</my-component>
```

#### Component

```js
render() {
  return <h1><slot /></h1>
}
```

<!-- {: data-highlight="slot"} -->

You can pass JSX/HTML as child elements. Use the `slot` tag to use them inside your component.

See: [Slots](https://stenciljs.com/docs/templating-jsx#slots)

### Multiple slots

#### HTML

```html
<my-component>
  <p slot='my-header'>Hello</p>
  <p slot='my-footer'>Thanks</p>
</my-component>
```

<!-- {: data-highlight="slot='my-header'; slot='my-footer'"} -->

#### Component

```js
render () {
  return <div>
    <header><slot name='my-header' /></header>
    <footer><slot name='my-footer' /></footer>
  </div>
}
```

<!-- {: data-highlight="name='my-header'; name='my-footer'"} -->

See: [Slots](https://stenciljs.com/docs/templating-jsx#slots)

## Lifecycle

### Lifecycle hooks

| Event                    | Description      |
| ------------------------ | ---------------- |
| `componentWillLoad()`    | Before rendering |
| `componentDidLoad()`     | After rendering  |
| ---                      | ---              |
| `componentWillUpdate()`  | Before updating  |
| `componentDidUpdate()`   | After updating   |
| ---                      | ---              |
| `connectedCallback()`    | On DOM attach    |
| `disconnectedCallback()` | On DOM detach    |

See: [Component lifecycle](https://stenciljs.com/docs/component-lifecycle)

### Example

```js
export class MyComponent {
  componentWillUpdate () {
    console.log('updating')
  }
}
```

See: [componentWillUpdate()](https://stenciljs.com/docs/component-lifecycle#componentwillupdate)

## References

- [Stencil docs](https://stenciljs.com/docs/) _(stenciljs.com)_
