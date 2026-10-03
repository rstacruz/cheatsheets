import { defineConfig } from '@playwright/test'

const port = process.env.PORT ?? 4321

const isCI = Boolean(process.env.CI)

export default defineConfig({
  testMatch: /.*\.e2e\.[^.]*/,
  webServer: {
    command: `npm run dev -- --port ${port}`,
    url: `http://localhost:${port}/`,
    reuseExistingServer: !isCI /* Spawn dev server on CI */,
    // astro build clears node_modules/.vite, so keep the test server's cache
    // out of its way (it runs concurrently with the build in `pnpm run ci`).
    env: { ASTRO_VITE_CACHE_DIR: 'node_modules/.vite-e2e' }
  },
  expect: {
    timeout: isCI ? 5000 : 2500 /* default: 5000 */
  },
  use: {
    baseURL: `http://localhost:${port}/`
  }
})
