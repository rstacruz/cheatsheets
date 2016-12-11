---
title: Mobx
category: JavaScript libraries
---

### Properties

```js
import {observable, computed} from 'mobx'

class Page {
  @observable title = ''
  @observable published = false

  @computed get authorName () {
    return this.author || 'Anonymous'
  }
}
```

## Actions

```js
class Page {
  @action publish () {
    this.published = true
    // do ajax/async here if you like
  }
}
```

## Plain objects

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

## React

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
