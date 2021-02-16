---
title: Stencil
category: JavaScript libraries
layout: 2017/sheet
updated: 2019-05-08
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
  [Stencil](https://github.com/ionic-team/stencil) is a compiler for web components made by the Ionic team. This guide targets Stencil v0.0.5.
---

## Quick-start guide
{: .-three-column}

### Getting started
{: .-prime}

#### JavaScript

```js
import { Component, Prop, State } from '@stencil/core'

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss'
})
export class MyComponent {
  @Prop() name: string
  @State() isVisible: boolean = true

  render () {
    return <p>I am {this.name}!</p>
    )
  }
}
```

#### HTML

```html
<my-component name='Groot' />
```

That's the same example in the [Readme](https://github.com/ionic-team/stencil), that's as simple as you can get! Just use `<my-component>` like you would use any other HTML tag.

### DOM events

```js
export class MyComponent {
  render () {
    return (
      <input
        onChange={(event: UIEvent) => this.inputChanged(event)}
      />
    )
  }

  inputChanged (event) {
    console.log('input changed:', event.target.value)
  }
}
```
{: data-line="5,10,11"}

Stencil uses DOM events.

See: [Handling user input](https://stenciljs.com/docs/templating/#handling-user-input)

### Multiple children

```js
render () {
  return [
    <h1>Hello there</h1>,
    <p>This component returns multiple nodes</p>
  ]
}
```
{: data-line="3,4"}

`render()` can return an array of elements.

See: [Complex template content](https://stenciljs.com/docs/templating#complex-template-content)

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
{: data-line="4,5"}

Just do assignments. You can't do mutations though, see next section.

See: [Managing component state](https://stenciljs.com/docs/decorators#managing-component-state)

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

See: [Updating arrays](https://stenciljs.com/docs/reactive-data/#updating-arrays)

## Slots

### Using slot

```html
<my-component>
  <span>Hello, friends</span>
</my-component>
```
{: data-line="2"}

#### Component

```js
render() {
  return <h1><slot /></h1>
}
```
{: data-line="2"}

You can pass JSX/HTML as child elements. Use the `slot` tag to use them inside your component.

See: [Slots](https://stenciljs.com/docs/templating#slots)

### Multiple slots

```html
<my-component>
  <p slot='my-header'>Hello</p>
  <p slot='my-footer'>Thanks</p>
</my-component>
```
{: data-line="2,3"}

#### Component

```js
render () {
  return <div>
    <header><slot name='my-header' /></header>
    <footer><slot name='my-footer' /></footer>
  </div>
}
```
{: data-line="3,4"}

See: [Slots](https://stenciljs.com/docs/templating#slots)

## Lifecycle

### Lifecycle hooks

| Event                   | Description      |
| ---                     | ---              |
| `componentWillLoad()`   | Before rendering |
| `componentDidLoad()`    | After rendering  |
| ---                     | ---              |
| `componentWillUpdate()` | Before updating  |
| `componentDidUpdate()`  | After updating   |
| ---                     | ---              |
| `componentDidUnload()`  | After unmounting |

See: [Component lifecycle](https://stenciljs.com/docs/component-lifecycle)

### Example

```js
export class MyComponent {
  componentWillUpdate () {
    console.log('updating')
  }
}
```

## References

- [Stencil docs](https://stenciljs.com/docs/) _(stenciljs.com)_
