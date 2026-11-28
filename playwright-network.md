---
title: How to mock network requests in Playwright
link_title: Playwright network mocking
subtitle: Stub and inspect traffic
logo: { src: /assets/logos/playwright.svg, mono: true }
category: JavaScript testing
layout: snippet
tier: t3
last_verified_with: "Playwright 1.65.1."
updated: 2026-11-28
links:
  - title: Network mocking
    url: https://playwright.dev/docs/network
  - title: Playwright cheatsheet
    url: /playwright-js
---

## Network
<!-- {: .-snippets} -->

### Stub a response
<!-- {: .-snippet} -->

```js
await page.route('**/api/user', route => (
  route.fulfill({ json: { name: 'Ada' } })
))
```
<!-- {: data-highlight="route.fulfill("} -->

**Answers a request directly.** The server is never called. See [network mocking](https://playwright.dev/docs/network#network-mocking).

### Block requests
<!-- {: .-snippet} -->

```js
await page.route('**/*.{png,jpg}', route => (
  route.abort()
))
```
<!-- {: data-highlight="route.abort("} -->

**Fails matching requests.** Matching requests never load. See [abort requests](https://playwright.dev/docs/network#abort-requests).

### Modify a request
<!-- {: .-snippet} -->

```js
await page.route('**/*', async route => {
  const headers = route.request().headers()
  delete headers['x-secret']
  await route.continue({ headers })
})
```
<!-- {: data-highlight="route.continue("} -->

**Changes request headers.** `route.continue()` sends the modified headers. See [modify requests](https://playwright.dev/docs/network#modify-requests).

### Modify a response
<!-- {: .-snippet} -->

```js
await page.route('**/api/user', async route => {
  const res = await route.fetch()
  const body = await res.text()
  await route.fulfill({
    response: res,
    body: body.replace('Ada', 'Grace')
  })
})
```
<!-- {: data-highlight="route.fetch("} -->

**Rewrites a response body.** Fetch the real response first, then replace its body. See [modify responses](https://playwright.dev/docs/network#modify-responses).

### Wait for a response
<!-- {: .-snippet} -->

```js
const pending = page.waitForResponse(
  '**/api/save'
)

await page.getByRole('button', {
  name: 'Save'
}).click()
await pending
```
<!-- {: data-highlight="waitForResponse("} -->

**Starts waiting early.** Set up the promise before the click that triggers the request. See [network events](https://playwright.dev/docs/network#network-events).
