---
title: Mobx
category: JavaScript libraries
updated: 2018-05-14
---

### Properties

```js
import {observable, computed} from 'mobx'

class Page {
  @observable title = ''
  @observable published = false
  @observable author = null

  @computed get authorName () {
    return this.author || 'Anonymous'
  }
}
```

### Actions

```js
class Page {
  @action publish () {
    this.published = true
    // do ajax/async here if you like
  }
}
```

### Plain objects

```js
const person = observable({
  name: 'Ella Fitzgerald'
})
```

```js
const temp = observable(23)
temp.get()
temp.set(25)
temp.observe(...)
```

## Reactions

### Importing

```js
import {autorun, autorunAsync, when} from 'mobx'
```

### autorun()

```js
// Runs it, finds out what it accessed, then observe those
autorun(() => {
  console.log(page.title)
})
```

### when()

```js
class Foo {
  constructor () {
    when(
      () => !this.isVisible,
      () => this.doSomething())
  }
}
```

### expr()

```js
// A temporary computed value. Its result is cached.
render () {
  const isPublished = expr(() => page.published === true)
  if (isPublished) { ... }
}
```

## [Modifiers](http://mobxjs.github.io/mobx/refguide/modifiers.html)

- `asMap(obj)` - JS map (dynamic keys)
- `asReference(fn)` - don't observe me
- `asStructure(obj)` - JS object (observe as deepEqual)
- `asFlat(array)` - JS array (observe its children)

## React

### mobx-react

```js
import { observer } from 'mobx-react'

@observer
class PageView extends React.Component {
  render () {
    return <div>{this.props.page.title}</div>
  }
}

<PageView page={page} />
```

### Functional components

```js
import { observer } from 'mobx-react'

const PageView = observer(({page}) => {
  <div>{page.title}</div>
})

<PageView page={page} />
```

## References

- <https://github.com/mobxjs/mobx>
