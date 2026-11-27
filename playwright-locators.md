---
title: How to find elements with Playwright locators
link_title: Playwright locators
subtitle: Locate elements reliably
logo: { src: /assets/logos/playwright.svg, mono: true }
category: JavaScript testing
layout: snippet
tier: t3
last_verified_with: "Playwright 1.65.1."
updated: 2026-11-28
links:
  - title: Locators
    url: https://playwright.dev/docs/locators
  - title: Playwright cheatsheet
    url: /playwright-js
---

## Locators
<!-- {: .-snippets} -->

### By role
<!-- {: .-snippet} -->

```js
await page.getByRole('button', {
  name: 'Sign in'
}).click()
```
<!-- {: data-highlight="getByRole("} -->

**Matches the accessible role and name.** Prefer it for buttons, links, and headings. See [role locators](https://playwright.dev/docs/locators#locate-by-role).

### By label
<!-- {: .-snippet} -->

```js
await page.getByLabel('Password')
  .fill('secret')
```
<!-- {: data-highlight="getByLabel("} -->

**Finds a form control by its label.** See [label locators](https://playwright.dev/docs/locators#locate-by-label).

### By text
<!-- {: .-snippet} -->

```js
await expect(page.getByText('Saved', {
  exact: true
})).toBeVisible()
```
<!-- {: data-highlight="getByText("} -->

**Matches visible text, with whitespace normalised.** Use `exact` to disable substring matching. See [text locators](https://playwright.dev/docs/locators#locate-by-text).

### Filter a list
<!-- {: .-snippet} -->

```js
await page.getByRole('row')
  .filter({ hasText: 'Ada' })
  .getByText('Edit')
  .click()
```
<!-- {: data-highlight=".filter("} -->

**Narrows a locator that matches several elements.** See [filtering](https://playwright.dev/docs/locators#filter-by-text).

### Chain locators
<!-- {: .-snippet} -->

```js
await page.getByTestId('cart')
  .getByRole('button', { name: 'Buy' })
  .click()
```
<!-- {: data-highlight=".getByRole("} -->

**Scopes a search to the first locator.** Every locator method is chainable. See [locators](https://playwright.dev/docs/locators#locating-elements).

### Inside frames
<!-- {: .-snippet} -->

```js
await page.frameLocator('#checkout')
  .getByLabel('Card number')
  .fill('4242')
```
<!-- {: data-highlight="frameLocator("} -->

**Searches inside an iframe.** See [FrameLocator](https://playwright.dev/docs/api/class-framelocator).
