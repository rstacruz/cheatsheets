import { defineConfig } from '@playwright/test'
import { isCI, launchOptions, port } from './playwright.shared'

export default defineConfig({
  testMatch: /.*\.e2e\.[^.]*/,
  testIgnore: /search-edge\.e2e\./,
  webServer: {
    // Astro 7 backgrounds `astro dev` when it detects an agent; --ignore-lock
    // keeps it in the foreground so Playwright can own its lifetime.
    command: `npm run dev -- --port ${port} --ignore-lock`,
    url: `http://localhost:${port}/`,
    reuseExistingServer: !isCI,
    // astro build clears node_modules/.vite, so keep the test server's cache
    // out of its way (it runs concurrently with the build in `pnpm run ci`).
    env: { ASTRO_VITE_CACHE_DIR: 'node_modules/.vite-e2e' }
  },
  expect: {
    timeout: isCI ? 5000 : 2500 /* default: 5000 */
  },
  use: {
    baseURL: `http://localhost:${port}/`,
    launchOptions
  }
})
