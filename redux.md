---
title: Redux
category: React
updated: 2026-11-14
weight: -3
intro: |
  [Redux Toolkit](https://redux.js.org/toolkit/introduction/getting-started) is the standard way to write Redux. This reference targets Redux Toolkit 2.x and React-Redux 9.x, covering slices, thunks, RTK Query, and hooks.
links:
  - title: Redux Toolkit documentation
    url: https://redux.js.org/toolkit/introduction/getting-started
  - title: GitHub repository
    url: https://github.com/reduxjs/redux-toolkit
---

## Store

### Install

```bash
npm install @reduxjs/toolkit react-redux
```

`@reduxjs/toolkit` bundles Redux, Immer, and Reselect; `react-redux` provides the bindings.

See: [Getting started](https://redux.js.org/toolkit/introduction/getting-started)

### Creating a store

```ts
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})
```

`configureStore` combines slice reducers, adds thunk middleware, and enables DevTools and development checks.

See: [configureStore](https://redux.js.org/toolkit/api/configureStore)

### Middleware

```ts
import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})
```

`getDefaultMiddleware()` keeps the defaults typed; use `.concat()` or `.prepend()` rather than spreading.

See: [configureStore](https://redux.js.org/toolkit/api/configureStore)

## Slices

### Defining a slice

```ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    incremented: (state) => {
      state.value += 1
    },
    added: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

export const { incremented, added } = counterSlice.actions
export default counterSlice.reducer
```

`createSlice` generates the action creators and types. Reducers may mutate `state`; Immer keeps it immutable.

See: [createSlice](https://redux.js.org/toolkit/api/createSlice)

### Async thunks

```ts
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUser = createAsyncThunk(
  'users/fetch',
  async (id: number, { rejectWithValue }) => {
    const res = await fetch(`/api/users/${id}`)
    if (!res.ok) return rejectWithValue(await res.text())
    return (await res.json()) as User
  }
)
```

The thunk dispatches `pending`, `fulfilled`, and `rejected` actions; `rejectWithValue()` sets the rejected payload.

See: [createAsyncThunk](https://redux.js.org/toolkit/api/createAsyncThunk)

### Handling thunk results

```ts
extraReducers: (builder) => {
  builder
    .addCase(fetchUser.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.status = 'idle'
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.error = action.payload as string
    })
}
```

Handle lifecycle actions in `extraReducers`, one `builder.addCase()` per action creator.

See: [createAsyncThunk](https://redux.js.org/toolkit/api/createAsyncThunk)

### Selectors

```ts
import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from './store'

export const selectItems = (state: RootState) => state.cart.items

export const selectTotal = createSelector([selectItems], (items) =>
  items.reduce((total, item) => total + item.price, 0)
)
```

`createSelector` memoizes derived values, so components skip re-rendering when inputs are unchanged.

See: [createSelector](https://redux.js.org/toolkit/api/createSelector)

## RTK Query

### API slice

```ts
import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

type UserPatch = Partial<User> & { id: number }

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUser: build.query<User, number>({
      query: (id) => `users/${id}`,
      providesTags: ['User']
    }),
    updateUser: build.mutation<User, UserPatch>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: ['User']
    })
  })
})

export const { useGetUserQuery, useUpdateUserMutation } = api
```

One API slice per base URL. `tagTypes` powers cache invalidation after mutations.

See: [RTK Query overview](https://redux.js.org/toolkit/rtk-query/overview)

### Adding to the store

```ts
import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})
```

Both the reducer and the middleware are required; the middleware drives caching, invalidation, and polling.

See: [RTK Query overview](https://redux.js.org/toolkit/rtk-query/overview)

### Query hooks

```tsx
import { useGetUserQuery } from './api'

function User ({ id }: { id: number }) {
  const { data, isLoading, error } = useGetUserQuery(id)
  if (isLoading) return <p>Loading…</p>
  if (error) return <p>Failed</p>
  return <p>{data?.name}</p>
}
```

Hooks fetch on mount, refetch when the argument changes, and share one cache entry per argument.

See: [RTK Query overview](https://redux.js.org/toolkit/rtk-query/overview)

## React

### Provider

```tsx
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { store } from './store'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

`<Provider>` supplies the store to `useSelector` and `useDispatch`. Wrap the app once, at the root.

See: [Provider](https://redux.js.org/react-redux/api/provider)

### Typed hooks

```ts
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
```

`withTypes` is a no-op at runtime; it types both hooks for the whole app.

See: [Usage with TypeScript](https://redux.js.org/toolkit/usage/usage-with-typescript)

### Reading state

```tsx
import { useAppDispatch, useAppSelector } from './store'
import { incremented } from './counterSlice'

function Counter () {
  const value = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  return (
    <button onClick={() => dispatch(incremented())}>{value}</button>
  )
}
```

Select the smallest value you need; `useSelector` re-renders when the returned reference changes.

See: [Hooks](https://redux.js.org/react-redux/api/hooks)

## Legacy Redux

### createStore

```js
import { legacy_createStore as createStore } from 'redux'

const store = createStore(counter, { value: 0 })
```

`createStore` is deprecated: it renders with a strikethrough but still works. Use `configureStore` in new code.

See: [createStore](https://redux.js.org/api/createstore)

### connect

```js
import { connect } from 'react-redux'

export default connect(
  (state) => ({ message: state.message }),
  (dispatch) => ({
    onMessageClick: (message) => dispatch({ type: 'click', message })
  })
)(App)
```

`connect` is deprecated as of React-Redux 9.3.0. It still works, but the hooks above are simpler and type better.

See: [connect](https://redux.js.org/react-redux/api/connect)

## References
<!-- {: .-one-column} -->

* [Redux Toolkit docs](https://redux.js.org/toolkit/introduction/getting-started) _(redux.js.org)_
* [Migrating to modern Redux](https://redux.js.org/usage/migrating-to-modern-redux) _(redux.js.org)_
* [Redux Toolkit](https://www.npmjs.com/package/@reduxjs/toolkit) _(npmjs.com)_
* [React Redux](https://www.npmjs.com/package/react-redux) _(npmjs.com)_

<!-- {: .-also-see} -->
