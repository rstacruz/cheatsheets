---
title: How to configure Playwright tests
link_title: Playwright config
subtitle: Configure the test runner
logo: { src: /assets/logos/playwright.svg, mono: true }
category: JavaScript testing
layout: snippet
tier: t3
last_verified_with: "Playwright 1.65.1."
created_at: 2026-11-28
updated: 2026-11-28
links:
  - title: Configuration
    url: https://playwright.dev/docs/test-configuration
  - title: Playwright cheatsheet
    url: /playwright-js
---

## Configuration
<!-- {: .-snippets} -->

### Basic config
<!-- {: .-snippet} -->

```js
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: { baseURL: 'http://localhost:3000' }
})
```
<!-- {: data-highlight="defineConfig("} -->

**Sets runner options.** They go at the top level; browser options go under `use`. See [configuration](https://playwright.dev/docs/test-configuration).

### Browsers as projects
<!-- {: .-snippet} -->

```js
import {
  defineConfig,
  devices
} from '@playwright/test'

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    }
  ]
})
```
<!-- {: data-highlight="projects:"} -->

**Runs a suite per project.** Select one with `--project=firefox`. See [projects](https://playwright.dev/docs/test-projects).

### Start a server
<!-- {: .-snippet} -->

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

**Starts the app early.** It launches before tests and reuses a running server locally. See [web server](https://playwright.dev/docs/test-webserver).

### Retries and timeouts
<!-- {: .-snippet} -->

```js
export default defineConfig({
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  expect: { timeout: 5_000 }
})
```
<!-- {: data-highlight="timeout:; retries:"} -->

**Limits retries and timeouts.** Keep flaky retries to CI and cap each test. See [timeouts](https://playwright.dev/docs/test-timeouts).
