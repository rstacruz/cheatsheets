---
title: React hooks
subtitle: State and effects in components
category: JavaScript libraries
updated: 2026-11-24
last_verified_with: "React 19.3.1 hooks APIs."
tier: t2
fragments:
  - "useState"
  - "useEffect"
  - "useRef"
  - "useContext"
  - "useReducer"
  - "useMemo"
  - "useCallback"
  - "useTransition"
  - "useLayoutEffect"
  - "useActionState"
  - "useOptimistic"
  - "useEffectEvent"
  - "useFormStatus"
  - "use(promise)"
  - "setCount(c =>"
  - "[]"
keywords: [React hooks, useState, useEffect, useReducer, custom hooks]
intro: |
  [React](https://react.dev/reference/react/hooks) hooks add state, effects, context and refs to function components. This reference targets React 19.
links:
  - title: Hooks reference
    url: https://react.dev/reference/react/hooks
  - title: Rules of hooks
    url: https://react.dev/reference/rules/rules-of-hooks
---

{%raw%}

## State

### useState

```jsx
const [count, setCount] = useState(0)

<button onClick={() => setCount(count + 1)}>
  Clicked {count} times
</button>
```
<!-- {: data-highlight="useState"} -->

The setter schedules a re-render; `count` stays fixed for the current render.

See: [useState](https://react.dev/reference/react/useState)

### Updater functions

```jsx
setCount(c => c + 1)
setCount(c => c + 1)  // both updates apply
setUser(u => ({ ...u, name }))
```
<!-- {: data-highlight="c => c + 1"} -->

Pass a function when the next value depends on the previous one; React queues each updater and applies them in order.

See: [Updating state based on the previous state](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state)

### Lazy initial state

```jsx
const [items, setItems] = useState(() => loadItems())
```
<!-- {: data-highlight="() => loadItems()"} -->

The initializer runs once on mount; `useState(loadItems())` calls it on every render and discards the result.

See: [Avoiding recreating the initial state](https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state)

### useReducer

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return { todos: [...state.todos, action.todo] }
    case 'clear':
      return { todos: [] }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

const [state, dispatch] = useReducer(reducer, { todos: [] })
dispatch({ type: 'add', todo })
```
<!-- {: data-highlight="useReducer"} -->

Prefer a reducer for related fields or updates that depend on several values. A third argument initialises lazily: `useReducer(reducer, props, init)`.

See: [useReducer](https://react.dev/reference/react/useReducer)

### State is a snapshot

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
    setCount(count + 1)  // still 0 + 1
  }

  return <button onClick={handleClick}>{count}</button>
}
```
<!-- {: data-highlight="setCount(count + 1)"} -->

Both calls read the same snapshot, so the counter adds one. Use an updater to add twice; handlers keep the values from the render that created them.

See: [State as a snapshot](https://react.dev/reference/react/useState#state-as-a-snapshot)

## Effects

### Effect anatomy

```jsx
useEffect(() => {
  const connection = createConnection(roomId)
  connection.connect()
  return () => connection.disconnect()
}, [roomId])
```
<!-- {: data-highlight="connection.disconnect"} -->

Setup runs after the commit; cleanup runs before the next setup and on unmount.

See: [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)

### Dependency array

#### Once on mount

```jsx
useEffect(() => {
  logPageView()
}, [])
```

#### Every render

```jsx
useEffect(() => {
  logPageView()
})
```

#### On change

```jsx
useEffect(() => {
  logPageView(userId, pageId)
}, [userId, pageId])
```

`[]` runs once after mount, no array runs after every commit, and the list re-runs when a value changes (`Object.is`). Keep values used inside the effect in the list.

See: [Dependencies](https://react.dev/reference/react/useEffect#specifying-reactive-dependencies)

### Cleanup

```jsx
useEffect(() => {
  window.addEventListener('resize', onResize)
  return () => {
    window.removeEventListener('resize', onResize)
  }
}, [onResize])
```
<!-- {: data-highlight="removeEventListener"} -->

Every subscription, timer and listener needs a matching cleanup; React runs it before the next setup and on unmount.

See: [Cleaning up an effect](https://react.dev/reference/react/useEffect#cleaning-up-an-effect)

### Fetching data

```jsx
useEffect(() => {
  const controller = new AbortController()
  fetch(`/api/users/${id}`, { signal: controller.signal })
    .then(res => res.json())
    .then(setUser)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err)
    })
  return () => controller.abort()
}, [id])
```
<!-- {: data-highlight="controller.abort"} -->

Abort drops stale responses when `id` changes; ignore the expected `AbortError`. Prefer a framework or query library for real apps.

See: [Fetching data with Effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects)

### useEffectEvent

```jsx
const onConnected = useEffectEvent(() => {
  showNotification(`Connected to ${roomId}`, theme)
})

useEffect(() => {
  const connection = createConnection(roomId)
  connection.on('connected', onConnected)
  connection.connect()
  return () => connection.disconnect()
}, [roomId])
```
<!-- {: data-highlight="useEffectEvent"} -->

Reads the latest props and state without re-running the effect. Call it only from an effect; added in 19.2.

See: [useEffectEvent](https://react.dev/reference/react/useEffectEvent)

### useLayoutEffect

```jsx
const ref = useRef(null)
const [height, setHeight] = useState(0)

useLayoutEffect(() => {
  const box = ref.current.getBoundingClientRect()
  setHeight(box.height)
}, [])
```
<!-- {: data-highlight="useLayoutEffect"} -->

Runs before paint, so measurements can update the DOM without a flicker. Reach for `useEffect` otherwise.

See: [useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)

### When not to use an effect

#### Derive during render

```jsx
const fullName = first + ' ' + last
const visible = items.filter(item => item.active)
```

#### Reset with a key

```jsx
<Profile key={userId} user={user} />
```
<!-- {: data-highlight="key={userId}"} -->

Don't use effects for derived values, event responses or state resets.

See: [You might not need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

## Context

### useContext

```jsx
const ThemeContext = createContext('light')

function Toolbar() {
  const theme = useContext(ThemeContext)
  return <div className={theme}>Toolbar</div>
}
```
<!-- {: data-highlight="useContext"} -->

Reads the closest provider above the component; the default value applies when there is none.

See: [useContext](https://react.dev/reference/react/useContext)

### Provider shorthand

```jsx
<ThemeContext value="dark">
  <Toolbar />
</ThemeContext>
```
<!-- {: data-highlight="ThemeContext value"} -->

v19 renders the context object itself as the provider. `<ThemeContext.Provider>` still works.

See: [createContext](https://react.dev/reference/react/createContext#provider)

### use with context

```jsx
function Rule({ show }) {
  if (!show) return null
  const theme = use(ThemeContext)
  return <hr className={theme} />
}
```
<!-- {: data-highlight="use(ThemeContext)"} -->

Unlike `useContext`, `use(context)` may be called conditionally and inside loops.

See: [Reading context with use](https://react.dev/reference/react/use#reading-context-with-use)

### Custom context hook

```jsx
const ThemeContext = createContext(null)

function useTheme() {
  const theme = useContext(ThemeContext)
  if (theme === null) throw new Error('No ThemeProvider')
  return theme
}
```
<!-- {: data-highlight="throw new Error('No ThemeProvider')"} -->

A named hook with a guard fails loudly when the provider is missing.

See: [Building a context provider](https://react.dev/reference/react/useContext#building-a-context-provider)

## Refs and DOM

### useRef

```jsx
function Search() {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return <input ref={inputRef} />
}
```
<!-- {: data-highlight="useRef"} -->

`.current` persists across renders without causing one; use it for DOM nodes and mutable values.

See: [useRef](https://react.dev/reference/react/useRef)

### Mutable values

```jsx
const clicks = useRef(0)

function onClick() {
  clicks.current += 1  // no re-render
}
```
<!-- {: data-highlight="clicks.current += 1"} -->

Don't read or write refs during render; keep the render output pure.

See: [Referencing values with refs](https://react.dev/learn/referencing-values-with-refs)

### Ref callbacks

```jsx
<div
  ref={node => {
    const observer = new ResizeObserver(onResize)
    observer.observe(node)
    return () => observer.disconnect()
  }}
/>
```
<!-- {: data-highlight="observer.disconnect"} -->

A ref callback may return a cleanup that runs when the node detaches (v19).

See: [Ref callbacks](https://react.dev/reference/react-dom/components/common#ref-callback)

### useImperativeHandle

```jsx
function Player({ ref }) {
  const videoRef = useRef(null)

  useImperativeHandle(ref, () => ({
    play: () => videoRef.current.play()
  }), [])

  return <video ref={videoRef} />
}
```
<!-- {: data-highlight="useImperativeHandle"} -->

Exposes a small imperative API instead of the DOM node; v19 also accepts `ref` as a prop.

See: [useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)

### useId

```jsx
function Field() {
  const id = useId()

  return (
    <>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </>
  )
}
```
<!-- {: data-highlight="useId"} -->

SSR-safe and unique; don't use it for list keys.

See: [useId](https://react.dev/reference/react/useId)

## Performance

### useMemo

```jsx
const visible = useMemo(
  () => items.filter(item => item.active),
  [items]
)
```
<!-- {: data-highlight="useMemo"} -->

Caches a value between renders while the dependencies are equal; it is a performance hint, not a guarantee.

See: [useMemo](https://react.dev/reference/react/useMemo)

### useCallback

```jsx
const onSelect = useCallback(
  id => setSelected(id),
  []
)
```
<!-- {: data-highlight="useCallback"} -->

`useCallback(fn, deps)` is `useMemo(() => fn, deps)`; it matters for memoised children and effect dependencies. React Compiler 1.0 (stable since Oct 2025) handles most cases.

See: [useCallback](https://react.dev/reference/react/useCallback)

### useTransition

```jsx
const [isPending, startTransition] = useTransition()

function onChange(e) {
  const value = e.target.value
  setQuery(value)
  startTransition(() => setResults(search(value)))
}
```
<!-- {: data-highlight="startTransition"} -->

Marks updates as non-urgent so typing stays responsive; `isPending` lets you dim stale results. Async functions are allowed in 19.

See: [useTransition](https://react.dev/reference/react/useTransition)

### useDeferredValue

```jsx
const deferredQuery = useDeferredValue(query)
const isStale = query !== deferredQuery

<List query={deferredQuery} dimmed={isStale} />
```
<!-- {: data-highlight="useDeferredValue"} -->

Renders the old value first and catches up in the background; an update inside a transition skips the deferred render.

See: [useDeferredValue](https://react.dev/reference/react/useDeferredValue)

### useSyncExternalStore

```jsx
function subscribe(callback) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true  // server snapshot
  )
}
```
<!-- {: data-highlight="useSyncExternalStore"} -->

Subscribes to an external store in concurrent rendering; the third argument is the server snapshot.

See: [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)

## Actions and promises (v19)

### useActionState

```jsx
const [error, submitAction, isPending] = useActionState(
  async (_prev, formData) => {
    const name = formData.get('name')
    if (!name) return 'Name is required'
    const result = await updateName(name)
    return result.error ?? null
  },
  null
)

return (
  <form action={submitAction}>
    <input name="name" />
    <button disabled={isPending}>Save</button>
    {error && <p>{error}</p>}
  </form>
)
```
<!-- {: data-highlight="useActionState"} -->

The action receives the previous state and the submitted `FormData`; React queues calls and exposes `isPending`.

See: [useActionState](https://react.dev/reference/react/useActionState)

### useFormStatus

```jsx
import { useFormStatus } from 'react-dom'

function Submit() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>Save</button>
}

function Form({ action }) {
  return (
    <form action={action}>
      <Submit />
    </form>
  )
}
```
<!-- {: data-highlight="useFormStatus"} -->

Must be called from a component rendered inside the `<form>`; it tracks the parent form, not one in the same component.

See: [useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus)

### useOptimistic

```jsx
function NameForm() {
  const [name, setName] = useState('Ana')
  const [optimisticName, setOptimisticName] = useOptimistic(name)

  async function action(formData) {
    const next = formData.get('name')
    setOptimisticName(next)
    const saved = await saveName(next)
    startTransition(() => setName(saved))
  }

  return (
    <form action={action}>
      <p>Your name is {optimisticName}</p>
      <input name="name" defaultValue={name} />
    </form>
  )
}
```
<!-- {: data-highlight="useOptimistic"} -->

Shows the next value while the action runs, then reconciles with the real state; call the setter inside an action or transition.

See: [useOptimistic](https://react.dev/reference/react/useOptimistic)

### use with a promise

```jsx
function Comments({ commentsPromise }) {
  const comments = use(commentsPromise)
  return comments.map(c => <p key={c.id}>{c.text}</p>)
}

function Page({ commentsPromise }) {
  return (
    <Suspense fallback={<Spinner />}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  )
}
```
<!-- {: data-highlight="use(commentsPromise)"} -->

Suspends until the promise resolves; cache the promise outside render so the same instance survives re-renders. `use` may be called conditionally.

See: [use](https://react.dev/reference/react/use#reading-a-promise-with-use)

## Custom hooks

### Extract a hook

```jsx
function useDebounced(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}

function Search({ input }) {
  const query = useDebounced(input)
  return <Results query={query} />
}
```
<!-- {: data-highlight="useDebounced"} -->

A custom hook is a function named `use…` that calls other hooks; every call gets its own state.

See: [Reusing logic with custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

### Share state with context

```jsx
const CartContext = createContext(null)

function CartProvider({ children }) {
  const [items, setItems] = useState([])
  return (
    <CartContext value={{ items, setItems }}>
      {children}
    </CartContext>
  )
}

function useCart() {
  const cart = useContext(CartContext)
  if (!cart) throw new Error('No CartProvider')
  return cart
}
```
<!-- {: data-highlight="useCart"} -->

Wrap state and its setter in a context, then read it through a named hook.

See: [Scaling up with context and a reducer](https://react.dev/learn/scaling-up-with-reducer-and-context)

### Testing hooks

```jsx
import { renderHook, act } from '@testing-library/react'

function useCounter() {
  const [count, setCount] = useState(0)
  return { count, increment: () => setCount(c => c + 1) }
}

const { result } = renderHook(() => useCounter())
act(() => result.current.increment())
expect(result.current.count).toBe(1)
```
<!-- {: data-highlight="renderHook"} -->

`renderHook` mounts a wrapper component; wrap updates in `act` so React flushes them.

See: [renderHook](https://testing-library.com/docs/react-testing-library/api#renderhook)

## Rules and tooling

### Rules of hooks

| Rule | Why |
| --- | --- |
| Call hooks at the top level | Order identifies each hook's state |
| Call them from components or hooks | React needs a render context |
| Name custom hooks `use…` | The linter recognises them |
| Never call them conditionally | Order must stay stable |

See: [Rules of hooks](https://react.dev/reference/rules/rules-of-hooks)

### ESLint

#### eslint.config.js

```js
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  reactHooks.configs.flat.recommended
]
```
<!-- {: data-highlight="reactHooks.configs.flat.recommended"} -->

Catches conditional hooks, missing effect dependencies and stale Effect Events; add it alongside your JSX or TypeScript config.

See: [eslint-plugin-react-hooks](https://react.dev/reference/eslint-plugin-react-hooks)

### Debugging with useDebugValue

```jsx
function useDiscount(user) {
  const discount = user.tier === 'pro' ? 0.2 : 0
  useDebugValue(discount, d => `${d * 100}% off`)
  return discount
}
```
<!-- {: data-highlight="useDebugValue"} -->

Labels the hook in React DevTools; the formatter runs only when the hook is inspected.

See: [useDebugValue](https://react.dev/reference/react/useDebugValue)

## Also see

- [React cheatsheet](./react) — components, JSX and the wider API
- [Hooks reference](https://react.dev/reference/react/hooks) _(react.dev)_
- [Rules of hooks](https://react.dev/reference/rules/rules-of-hooks) _(react.dev)_
- [React v16 cheatsheet](react@16) — class lifecycle equivalents

{%endraw%}
