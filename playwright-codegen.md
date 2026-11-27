---
title: How to generate Playwright tests
link_title: Playwright codegen
subtitle: Record tests and locators
logo: { src: /assets/logos/playwright.svg, mono: true }
category: JavaScript testing
layout: snippet
tier: t3
last_verified_with: "Playwright 1.65.1."
updated: 2026-11-28
links:
  - title: Test generator
    url: https://playwright.dev/docs/codegen
  - title: Playwright cheatsheet
    url: /playwright-js
---

## Codegen
<!-- {: .-snippets} -->

### Record a test
<!-- {: .-snippet} -->

```bash
npx playwright codegen \
  https://playwright.dev
```
<!-- {: data-highlight="npx playwright codegen"} -->

**Records clicks and fills as a test.** Stop recording and copy the code from the Inspector. See [test generator](https://playwright.dev/docs/codegen#running-codegen).

### Choose output language
<!-- {: .-snippet} -->

```bash
npx playwright codegen \
  --target=python \
  https://demo.playwright.dev/todomvc
```
<!-- {: data-highlight="--target="} -->

**Generates code in another language.** See [codegen options](https://playwright.dev/docs/codegen#running-codegen).

### Pick a locator
<!-- {: .-snippet} -->

```js
await page.pause()
```
<!-- {: data-highlight="page.pause("} -->

**Opens the Inspector in a running script.** Use Pick Locator to copy a generated locator. See [generating locators](https://playwright.dev/docs/codegen#generating-locators-1).

### Emulate a device
<!-- {: .-snippet} -->

```bash
npx playwright codegen \
  --device="iPhone 13" \
  playwright.dev
```
<!-- {: data-highlight="--device="} -->

**Records with a device's viewport and user agent.** See [emulation](https://playwright.dev/docs/codegen#emulate-devices).

### Reuse a login
<!-- {: .-snippet} -->

```bash
npx playwright codegen \
  --save-storage=auth.json \
  https://github.com
```
<!-- {: data-highlight="--save-storage="} -->

**Saves cookies and local storage after login.** Pass `--load-storage=auth.json` to resume that session; keep the file private. See [authenticated state](https://playwright.dev/docs/codegen#preserve-authenticated-state).
