---
title: React.js
category: React
tags: [Featured]
updated: 2026-10-03
weight: -10
keywords:
  - useState
  - useEffect
  - useRef
  - useContext
  - hooks
  - function components
  - JSX
  - props/state
  - createRoot
intro: |
  [React](https://react.dev/) is a JavaScript library for building user interfaces. This guide targets React v18 to v19 (function components and hooks).
---

{%raw%}

## Quick start
{: .-two-column}

### Create a root

```sh
npm install react react-dom   # add @types/react, @types/react-dom for TypeScript
```

```jsx
import { createRoot } from 'react-dom/client'
createRoot(document.getElementById('root')).render(<App />)
```

The automatic JSX runtime (v17+) means no `import React`. See: [createRoot](https://react.dev/reference/react-dom/client/createRoot)

### StrictMode

```jsx
<StrictMode><App /></StrictMode>
```

Double-invokes renders and effects in development to surface impure logic; no effect in production. See: [StrictMode](https://react.dev/reference/react/StrictMode)

## Components
{: .-three-column}

### Function components
{: .-prime}

```jsx
function Hello({ name }) {
  return <h1 className="greeting">Hello {name}</h1>
}
```

Capitalised functions that return JSX. See: [Your first component](https://react.dev/learn/your-first-component)

### JSX and conditionals

```jsx
<label htmlFor="name">Name</label>
<p style={{ color: 'red' }}>{2 + 2}</p>
<>
  {isLoggedIn ? <AdminPanel /> : <LoginButton />}
  {unread > 0 && <Badge count={unread} />}
</>
```

`{}` embeds expressions, attributes are camelCase and `<>…</>` is a fragment; `null` and booleans render nothing. See: [Writing markup with JSX](https://react.dev/learn/writing-markup-with-jsx)

### Props

```jsx
function Avatar({ src, alt, size = 64 }) {
  return <img src={src} alt={alt} width={size} height={size} />
}
<Avatar src="/me.png" alt="Me" size={128} />
```

Defaults come from parameters (v19 removed `defaultProps`); spread extras with `{...props}`. See: [Passing props](https://react.dev/learn/passing-props-to-a-component)

### Lists and keys

```jsx
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

Keys must be stable and unique among siblings. See: [Rendering lists](https://react.dev/learn/rendering-lists)

### Events

```jsx
<button onClick={handleClick}>Save</button>
<button onClick={() => remove(id)}>Delete</button>
<form onSubmit={e => { e.preventDefault(); save() }}>…</form>
```

Pass the handler, not a call, and wrap arguments in an arrow; call `e.preventDefault()` to stop browser defaults. See: [Responding to events](https://react.dev/learn/responding-to-events)

## State
{: .-two-column}

### useState

```jsx
const [count, setCount] = useState(0)
setCount(count + 1)
setCount(c => c + 1)  // when the next value depends on the previous
```

```jsx
setUser({ ...user, name: 'Ana' })
setItems(items => [...items, item])
setItems(items => items.filter(i => i.id !== id))
```

State is a per-render snapshot and is immutable — replace it, never mutate in place. See: [useState](https://react.dev/reference/react/useState)

### Controlled inputs

```jsx
const [name, setName] = useState('')
<input value={name} onChange={e => setName(e.target.value)} />
```

React owns the value, so the input always reflects state. See: [input](https://react.dev/reference/react-dom/components/input)

### Lifting state up

```jsx
function Parent() {
  const [query, setQuery] = useState('')
  return <Search value={query} onChange={setQuery} />
}
```

Move shared state to the closest common parent and pass value + setter down. See: [Sharing state](https://react.dev/learn/sharing-state-between-components)

### useReducer

```jsx
function reducer(state, action) {
  return action.type === 'increment' ? { count: state.count + 1 } : state
}
const [state, dispatch] = useReducer(reducer, { count: 0 })
dispatch({ type: 'increment' })
```

Prefer a reducer when updates are complex or depend on several values. See: [useReducer](https://react.dev/reference/react/useReducer)

### Actions (v19)

```jsx
const [error, submitAction, isPending] = useActionState(async (prev, formData) => {
  return (await updateName(formData.get('name'))) ?? null
}, null)
<form action={submitAction}><input name="name" /><button disabled={isPending}>Update</button></form>
```

Actions are async functions in `action` props; `useOptimistic` shows an immediate value while the request runs. See: [useActionState](https://react.dev/reference/react/useActionState)

## Effects
{: .-two-column}

### useEffect

```jsx
useEffect(() => {
  const connection = createConnection(roomId)
  connection.connect()
  return () => connection.disconnect()   // cleanup
}, [roomId])                             // re-runs when roomId changes
```

```jsx
useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)
}, [])  // [] runs once on mount
```

Synchronises a component with an external system and cleans up timers, subscriptions and listeners. See: [useEffect](https://react.dev/reference/react/useEffect)

### Fetching data

```jsx
useEffect(() => {
  const controller = new AbortController()
  fetch(`/api/users/${id}`, { signal: controller.signal }).then(r => r.json()).then(setUser)
  return () => controller.abort()
}, [id])
```

Abort in the cleanup to drop stale responses. See: [Fetching data](https://react.dev/reference/react/useEffect#fetching-data-with-effects)

### useEffectEvent (v19.2+)

```jsx
const onConnected = useEffectEvent(() => showNotification('Connected!', theme))
useEffect(() => {
  const connection = createConnection(roomId)
  connection.on('connected', onConnected)
  connection.connect()
  return () => connection.disconnect()
}, [roomId])
```

Reads the latest props and state without re-running the effect, so it stays out of the deps. See: [useEffectEvent](https://react.dev/reference/react/useEffectEvent)

### You might not need an effect

```jsx
const fullName = first + ' ' + last                    // prefer: derive during render
useEffect(() => setFullName(first + ' ' + last))       // avoid: derived state in an effect
```

Don't use effects to transform data or to react to events. See: [You might not need an effect](https://react.dev/learn/you-might-not-need-an-effect)

## Refs
{: .-two-column}

### useRef

```jsx
const inputRef = useRef(null)
useEffect(() => inputRef.current.focus(), [])
return <input ref={inputRef} />
```

A mutable `.current` box that persists without re-rendering. See: [useRef](https://react.dev/reference/react/useRef)

### Ref as a prop (v19)

```jsx
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />
}
```

v19 passes `ref` as a normal prop; v18 uses `forwardRef`, no longer necessary in v19 and slated for deprecation. See: [forwardRef](https://react.dev/reference/react/forwardRef)

### useImperativeHandle

```jsx
useImperativeHandle(ref, () => ({ play: () => videoRef.current.play() }), [])
```

Exposes a custom imperative API instead of the DOM node; rarely needed. See: [useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)

### Portals and inner HTML

```jsx
import { createPortal } from 'react-dom'
createPortal(<Modal />, document.getElementById('modal-root'))
```

```jsx
<div dangerouslySetInnerHTML={{ __html: trustedHtml }} />
```

A portal renders elsewhere in the DOM while keeping the React tree; `dangerouslySetInnerHTML` injects raw HTML, so never pass untrusted input. See: [createPortal](https://react.dev/reference/react-dom/createPortal)

## Context
{: .-two-column}

### createContext and useContext

```jsx
const ThemeContext = createContext(null)
<ThemeContext value="dark"><Toolbar /></ThemeContext>

function Toolbar() {
  const theme = useContext(ThemeContext)
  return <button className={theme}>Hi</button>
}
```

```jsx
<ThemeContext value="dark">…</ThemeContext>                     // v19
<ThemeContext.Provider value="dark">…</ThemeContext.Provider>   // v18
```

```jsx
function useTheme() {
  const value = useContext(ThemeContext)
  if (value === null) throw new Error('useTheme needs a provider')
  return value
}
```

Context passes data down without prop drilling and v19 renders `<Context>` itself as the provider; wrapping `useContext` names the value and fails loudly outside a provider. See: [useContext](https://react.dev/reference/react/useContext) · [createContext](https://react.dev/reference/react/createContext)

## Custom hooks
{: .-two-column}

Call hooks at the top level of a component or hook — never in loops, conditions or nested functions. See: [Rules of hooks](https://react.dev/reference/rules/rules-of-hooks)

### useOnlineStatus

```jsx
function useOnlineStatus() {
  const [isOnline, setOnline] = useState(navigator.onLine)
  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])
  return isOnline
}
```

A custom hook is just a function that calls other hooks. See: [Custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

### useId and useDebugValue

```jsx
const id = useId()
<label htmlFor={id}>Name</label>
<input id={id} />
```

`useId` gives SSR-safe ids for accessibility; `useDebugValue(label)` labels a hook in DevTools. See: [useId](https://react.dev/reference/react/useId)

## Performance
{: .-two-column}

### memo, useMemo and useCallback

```jsx
const Row = memo(function Row({ item }) { return <li>{item.name}</li> })
const visible = useMemo(() => filter(items, query), [items, query])
const onSelect = useCallback(id => setSelected(id), [])
```

Cache components and values only when measurement shows a need — the React Compiler auto-memoises at build time and removes most manual calls. See: [memo](https://react.dev/reference/react/memo)

### useTransition and useDeferredValue

```jsx
const [isPending, startTransition] = useTransition()
startTransition(() => setQuery(input))
```

```jsx
const deferredQuery = useDeferredValue(query)
```

`useTransition` marks an update non-blocking so urgent ones (typing) stay responsive; `useDeferredValue` renders a stale value first, then catches up. See: [useTransition](https://react.dev/reference/react/useTransition) · [useDeferredValue](https://react.dev/reference/react/useDeferredValue)

### useSyncExternalStore

```jsx
const isOnline = useSyncExternalStore(subscribe, () => navigator.onLine)
```

Subscribes safely to an external store in concurrent rendering. See: [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)

## Suspense and lazy
{: .-two-column}

### lazy and Suspense

```jsx
const Chart = lazy(() => import('./Chart'))
<Suspense fallback={<Spinner />}><Chart /></Suspense>
```

Code-splits a component; the fallback shows while it loads. See: [Suspense](https://react.dev/reference/react/Suspense)

### use(promise) (v19)

```jsx
function Comments({ commentsPromise }) {
  const comments = use(commentsPromise)
  return comments.map(c => <p key={c.id}>{c.text}</p>)
}
```

Reads a promise or context during render and suspends; unlike hooks it may be conditional. See: [use](https://react.dev/reference/react/use)

## Rendering and SSR
{: .-two-column}

### Client rendering

```jsx
createRoot(document.getElementById('root')).render(<App />)   // fresh DOM
hydrateRoot(document.getElementById('root'), <App />)         // server HTML
```

Hydration markup must match the client render. See: [Client APIs](https://react.dev/reference/react-dom/client)

### Server rendering

```jsx
import { renderToString } from 'react-dom/server'
const html = renderToString(<App />)  // synchronous, blocks
```

`renderToPipeableStream` (Node) and `renderToReadableStream` (web) stream with Suspense; v19 adds `prerender`. See: [Server APIs](https://react.dev/reference/react-dom/server)

## Error handling
{: .-two-column}

### Error boundaries

```jsx
class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error, info) { logError(error, info) }
  render() { return this.state.error ? <h1>Something went wrong.</h1> : this.props.children }
}
```

Still the only built-in way to catch render errors, and still a class; [react-error-boundary](https://github.com/bvaughn/react-error-boundary) wraps it with a hooks-friendly API. See: [Error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

## Legacy APIs
{: .-two-column}

### Migration table

| Legacy | Modern |
| --- | --- |
| `ReactDOM.render(el, node)` | `createRoot(node).render(el)` |
| `ReactDOM.hydrate(el, node)` | `hydrateRoot(node, el)` |
| `componentDidMount` / `componentDidUpdate` | `useEffect` |
| `componentWillUnmount` | effect cleanup |
| String refs `ref="input"` | ref callback or `useRef` |
| `defaultProps` (function components) | default parameter values |
| `propTypes` | TypeScript |
| `forwardRef` (v18) | `ref` as a prop (v19) |
| `<Context.Provider value>` (v18) | `<Context value>` (v19) |
| Legacy context (`getChildContext`) | `createContext` |
| Class components | function components |
| `React.createElement` | JSX |

See: [Legacy APIs](https://react.dev/reference/react/legacy). Classes still work and are required only for error boundaries; see the [React v16 cheatsheet](react@16) for the class-era API.

## Also see
{: .-two-column}

- [React documentation](https://react.dev/) _(react.dev)_
- [React API reference](https://react.dev/reference/react) _(react.dev)_
- [TypeScript cheatsheet](typescript) — typed props and hooks
- [React v16 cheatsheet](react@16) — class components and legacy APIs
- [React v0.14 cheatsheet](react@0.14) — `React.createClass` era

{%endraw%}
