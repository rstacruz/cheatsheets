---
title: Mixpanel
subtitle: Product analytics service
category: Apps
updated: 2026-11-24
last_verified_with: "mixpanel-browser 2.86.0."
---

## Setup

### Initialize

```js
import mixpanel from 'mixpanel-browser'

mixpanel.init('YOUR_PROJECT_TOKEN', {
  track_pageview: true,
  autocapture: true
})
```

Call `init` once per page load with your project token.

### Init options

```js
mixpanel.init('YOUR_PROJECT_TOKEN', {
  persistence: 'localStorage',
  debug: true
})
```

#### Options

| Option | Description |
| --- | --- |
| `autocapture` | Clicks, inputs, scrolls and pageviews |
| `track_pageview` | `true`, or `'url-with-path'` |
| `persistence` | `'localStorage'` or `'cookie'` |
| `api_host` | `https://api-eu.mixpanel.com` for EU data |
| `debug` | Log SDK activity to the console |

## Track

### Track events

```js
mixpanel.track('Login success')
mixpanel.track('Search', { query: 'cheese', results: 12 })
```

Avoid event and property names that start with `$` or `mp`.

### Super properties

```js
mixpanel.register({ plan: 'Pro' })
mixpanel.register_once({ plan: 'Free' })  // keeps 'Pro'
```

Super properties ride along on every event, and `register_once` never overwrites. The SDK stores them in the browser for a year by default.

## Users

### Identify

```js
mixpanel.track('sign in')
mixpanel.identify('12345')
```

Call `identify` once you know who the user is, typically at sign-in.

### Profile properties

```js
mixpanel.identify('12345')
mixpanel.people.set({ $email: 'me@example.com', plan: 'Pro' })
```

`people.set` writes profile properties and needs an `identify` call first.

### Reset on logout

```js
mixpanel.track('log out')
mixpanel.reset()
```

`reset` clears the identity and starts a new anonymous visitor on the device.

## References

- <https://docs.mixpanel.com/docs/tracking-methods/sdks/javascript>
- <https://github.com/mixpanel/mixpanel-js>
