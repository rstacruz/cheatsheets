---
title: Playwright
subtitle: Browser automation and testing
logo: { src: /assets/logos/playwright.svg, mono: true }
category: JavaScript testing
tier: t2
fragments:
  - "npx playwright"
  - "playwright test"
  - "defineConfig("
  - "getByRole("
  - "getByLabel("
  - "getByTestId("
  - "toBeVisible()"
  - "toHaveURL("
  - "page.route("
  - "route.fulfill("
  - "webServer"
  - "expect.soft("
  - "--project="
  - "test("
  - "page.goto("
  - "devices["
keywords:
  - Playwright JavaScript
  - Playwright locators
  - Playwright assertions
  - Playwright config
  - Playwright network mocking
updated: 2026-11-28
last_verified_with: "Playwright 1.65.1."
intro: |
  [Playwright](https://playwright.dev/) is a browser automation library and test runner for Chromium, Firefox, and WebKit. This covers the JavaScript and TypeScript API.
links:
  - title: Playwright documentation
    url: https://playwright.dev/docs/intro
  - title: API reference
    url: https://playwright.dev/docs/api/class-page
---

## First test

### Install

```bash
npm init -y
npm install --save-dev @playwright/test
npx playwright install chromium
```
<!-- {: data-highlight="npm install"} -->

Running `npx playwright install` downloads browser binaries; on Linux, add `--with-deps` for system libraries.

See: [Installation](https://playwright.dev/docs/intro#installing-playwright)

### Write a test

```js
import { test, expect } from '@playwright/test'

test('has a title', async ({ page }) => {
  await page.goto('https://playwright.dev/')
  await expect(page).toHaveTitle(/Playwright/)
})
```
<!-- {: data-highlight="test("} -->

Tests live in `tests/` by default and each gets an isolated page.

See: [First test](https://playwright.dev/docs/intro#running-the-example-test)

### Run tests

```bash
npx playwright test
npx playwright test --ui
npx playwright test login.spec.ts
npx playwright test --project=chromium
npx playwright test --headed
```
<!-- {: data-highlight="npx playwright test"} -->

UI mode shows a time-travel view of each step. Add `--headed` to watch the browser run. To record actions as test code, use `npx playwright codegen`.

See: [Command line](https://playwright.dev/docs/test-cli)

## Locators

<!-- {: .-three-column} -->

### By role

```js
await page.getByRole('button', {
  name: 'Sign in'
}).click()
```
<!-- {: data-highlight="getByRole("} -->

Role locators match how users and assistive technology see the page.

See: [Locators](https://playwright.dev/docs/locators#locate-by-role)

### By label

```js
await page.getByLabel('Email')
  .fill('a@b.com')
```
<!-- {: data-highlight="getByLabel("} -->

Matches a form control through its associated label.

See: [Locators](https://playwright.dev/docs/locators#locate-by-label)

### By text

```js
await expect(page.getByText('Saved', {
  exact: true
})).toBeVisible()
```
<!-- {: data-highlight="getByText("} -->

Use text for static elements; prefer roles for interactive ones.

See: [Locators](https://playwright.dev/docs/locators#locate-by-text)

### By test id

```js
await page.getByTestId('save')
  .click()
```
<!-- {: data-highlight="getByTestId("} -->

Reads `data-testid` by default; set `testIdAttribute` to change it.

See: [Locators](https://playwright.dev/docs/locators#locate-by-test-id)

### Filter a list

```js
const row = page.getByRole('row')
  .filter({ hasText: 'Alice' })

await row.getByText('Edit').click()
```
<!-- {: data-highlight=".filter("} -->

Filtering narrows a locator that matches several elements.

See: [Locators](https://playwright.dev/docs/locators#filter-by-text)

### Frames

```js
await page.frameLocator('#checkout')
  .getByLabel('Card number')
  .fill('4242')
```
<!-- {: data-highlight="frameLocator("} -->

Frame locators pierce iframes and can be chained with other locators.

See: [FrameLocator](https://playwright.dev/docs/api/class-framelocator)

## Assertions

<!-- {: .-three-column} -->

### Visible and text

```js
await expect(page.getByText('Saved'))
  .toBeVisible()
```
<!-- {: data-highlight="toBeVisible("} -->

Web-first assertions retry until the condition holds or the timeout ends.

See: [Assertions](https://playwright.dev/docs/test-assertions)

### Page title and URL

```js
await expect(page).toHaveTitle(/Docs/)
await expect(page).toHaveURL(/login/)
```
<!-- {: data-highlight="toHaveTitle(; toHaveURL("} -->

Both matchers apply to the page rather than one element.

See: [Page assertions](https://playwright.dev/docs/api/class-pageassertions)

### Count and attributes

```js
await expect(page.getByRole('listitem'))
  .toHaveCount(3)

await expect(page.getByRole('link', {
  name: 'Docs'
})).toHaveAttribute('href', '/docs')
```
<!-- {: data-highlight="toHaveCount(; toHaveAttribute("} -->

Counts and attributes are checked against the live DOM, with retries.

See: [Locator assertions](https://playwright.dev/docs/api/class-locatorassertions)

### Poll a value

```js
await expect.poll(async () => {
  const res = await page.request.get(
    'https://api.example.com/status'
  )
  return res.status()
}).toBe(200)
```
<!-- {: data-highlight="expect.poll("} -->

Poll turns a synchronous matcher into a retried check over an async value.

See: [Assertions](https://playwright.dev/docs/test-assertions#expectpoll)

### Soft assertions

```js
await expect.soft(page.getByText('Saved'))
  .toBeVisible()
```
<!-- {: data-highlight="expect.soft("} -->

Failures mark the test failed but let later steps run.

See: [Assertions](https://playwright.dev/docs/test-assertions#soft-assertions)

## Configuration

### Basic config

```js
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry'
  }
})
```
<!-- {: data-highlight="defineConfig("} -->

Runner options sit at the top level; browser options go under `use`.

See: [Configuration](https://playwright.dev/docs/test-configuration)

### Projects

```js
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
})
```
<!-- {: data-highlight="projects:"} -->

Select one with `npx playwright test --project=webkit`.

See: [Projects](https://playwright.dev/docs/test-projects)

### Web server

```js
export default defineConfig({
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  }
})
```
<!-- {: data-highlight="webServer:"} -->

Playwright starts the server before the run and stops it afterwards.

See: [Web server](https://playwright.dev/docs/test-webserver)

### Timeouts and retries

```js
export default defineConfig({
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  expect: { timeout: 5_000 }
})
```
<!-- {: data-highlight="timeout:; retries:"} -->

The test timeout covers the test, fixtures, and hooks; `expect` has its own.

See: [Timeouts](https://playwright.dev/docs/test-timeouts)

## Fixtures

### Built-in fixtures

```js
import { test, expect } from '@playwright/test'

test('health check', async ({ page, request }) => {
  await page.goto('/')
  const res = await request.get('/api/health')
  expect(res.status()).toBe(200)
})
```
<!-- {: data-highlight="{ page, request }"} -->

The argument names the fixtures Playwright sets up for that test.

See: [Fixtures](https://playwright.dev/docs/test-fixtures)

### Custom fixture

```js
import { test as base } from '@playwright/test'
import type { Page } from '@playwright/test'

export const test = base.extend<{ loggedIn: Page }>({
  loggedIn: async ({ page }, use) => {
    await page.goto('/login')
    await page.getByLabel('Email').fill('ada@example.com')
    await page.getByRole('button', { name: 'Sign in' }).click()
    await use(page)
    await page.getByRole('button', { name: 'Sign out' }).click()
  }
})
```
<!-- {: data-highlight="base.extend<{ loggedIn: Page }>("} -->

Setup runs before `use()` and teardown after it, so both stay in one place.

See: [Fixtures](https://playwright.dev/docs/test-fixtures#creating-a-fixture)

### Reuse login state

```js
export default defineConfig({
  use: {
    storageState: 'playwright/.auth/user.json'
  }
})
```
<!-- {: data-highlight="storageState:"} -->

Save cookies and local storage once, then load them for every test.

See: [Authentication](https://playwright.dev/docs/auth)

## Network mocking

<!-- {: .-three-column} -->

### Fulfill a response

```js
await page.route('**/api/user', route => (
  route.fulfill({ json: { name: 'Ada' } })
))
```
<!-- {: data-highlight="route.fulfill("} -->

The request never reaches the server; the route answers it directly.

See: [Network mocking](https://playwright.dev/docs/network#network-mocking)

### Block requests

```js
await page.route('**/*.{png,jpg}',
  route => route.abort())
```
<!-- {: data-highlight="route.abort("} -->

Abort by URL pattern or by request type to keep a test focused.

See: [Abort requests](https://playwright.dev/docs/network#abort-requests)

### Modify a response

```js
await page.route('**/title',
  async route => {
    const res = await route.fetch()
    const body = (await res.text())
      .replace('Hi', 'Hello')
    await route.fulfill({
      response: res,
      body
    })
  })
```
<!-- {: data-highlight="route.fetch("} -->

Fetch the real response, edit it, then fulfill with the original headers.

See: [Modify responses](https://playwright.dev/docs/network#modify-responses)

### Wait for a response

```js
const responsePromise =
  page.waitForResponse('**/api/save')

await page.getByRole('button', {
  name: 'Save'
}).click()
const response = await responsePromise
```
<!-- {: data-highlight="waitForResponse("} -->

Start the promise before the click so the response is not missed.

See: [Network events](https://playwright.dev/docs/network#network-events)

### Inspect traffic

```js
page.on('request', req =>
  console.log(req.url()))
page.on('response', res =>
  console.log(res.status()))
```
<!-- {: data-highlight="page.on("} -->

Events see every request and response, including XHR and fetch calls.

See: [Network events](https://playwright.dev/docs/network#network-events)

## CI

<!-- {: .-three-column} -->

### Install browsers

```bash
npm ci
npx playwright install --with-deps
npx playwright test
```
<!-- {: data-highlight="npx playwright install"} -->

CI needs browser binaries and their system dependencies before the run.

See: [Continuous integration](https://playwright.dev/docs/ci)

### Configure for CI

```js
export default defineConfig({
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['line'],
    ['html', { open: 'never' }]
  ]
})
```
<!-- {: data-highlight="forbidOnly:"} -->

One worker gives each test the whole machine; `forbidOnly` blocks stray focused tests.

See: [CI configuration](https://playwright.dev/docs/ci#workers)

### Shard tests

```bash
npx playwright test --shard=1/4
npx playwright test --shard=2/4
```
<!-- {: data-highlight="--shard="} -->

Sharding splits the suite across jobs; upload each HTML report as an artifact.

See: [Sharding](https://playwright.dev/docs/test-sharding)

## Also see

- [Playwright locators](./playwright-locators)
- [Playwright assertions](./playwright-assertions)
- [Playwright config](./playwright-config)
- [Playwright network mocking](./playwright-network)
- [Playwright codegen](./playwright-codegen)
- [Jest cheatsheet](./jest)
- [Selenium cheatsheet](./selenium)
