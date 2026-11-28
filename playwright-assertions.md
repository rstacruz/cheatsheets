---
title: How to assert in Playwright tests
link_title: Playwright assertions
subtitle: Retry web assertions
logo: { src: /assets/logos/playwright.svg, mono: true }
category: JavaScript testing
layout: snippet
tier: t3
last_verified_with: "Playwright 1.65.1."
updated: 2026-11-28
links:
  - title: Assertions
    url: https://playwright.dev/docs/test-assertions
  - title: Playwright cheatsheet
    url: /playwright-js
---

## Assertions
<!-- {: .-snippets} -->

### Visible and text
<!-- {: .-snippet} -->

```js
await expect(page.getByText('Saved'))
  .toBeVisible()
```
<!-- {: data-highlight="toBeVisible("} -->

**Retries until visible,** checking the element; web-first matchers are async, so always `await` them. See [auto-retrying assertions](https://playwright.dev/docs/test-assertions#auto-retrying-assertions).

### Page title and URL
<!-- {: .-snippet} -->

```js
await expect(page).toHaveTitle(/Docs/)
await expect(page).toHaveURL(/login/)
```
<!-- {: data-highlight="toHaveTitle(; toHaveURL("} -->

**Checks page title and URL,** not a single element. See [page assertions](https://playwright.dev/docs/api/class-pageassertions).

### Count and values
<!-- {: .-snippet} -->

```js
await expect(page.getByRole('listitem'))
  .toHaveCount(3)

await expect(page.getByLabel('Email'))
  .toHaveValue('a@b.com')
```
<!-- {: data-highlight="toHaveCount(; toHaveValue("} -->

**Checks count and input value,** retrying both assertions. See [locator assertions](https://playwright.dev/docs/api/class-locatorassertions).

### Poll an async value
<!-- {: .-snippet} -->

```js
await expect.poll(async () => {
  const res = await page.request.get(
    'https://api.example.com/status'
  )
  return res.status()
}).toBe(200)
```
<!-- {: data-highlight="expect.poll("} -->

**Polls an async value,** turning a synchronous matcher into a retried check. See [expect.poll](https://playwright.dev/docs/test-assertions#expectpoll).

### Soft assertions
<!-- {: .-snippet} -->

```js
await expect.soft(page.getByText('Saved'))
  .toBeVisible()
```
<!-- {: data-highlight="expect.soft("} -->

**Softly fails the test,** without stopping later steps. See [soft assertions](https://playwright.dev/docs/test-assertions#soft-assertions).
