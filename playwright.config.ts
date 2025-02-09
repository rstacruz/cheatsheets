import { defineConfig } from '@playwright/test'

const port = process.env.PORT ?? 4321

const isCI = Boolean(process.env.CI)

export default defineConfig({
  testMatch: /.*\.e2e\.[^.]*/,
  webServer: {
    command: `npm run dev -- --port ${port}`,
    url: `http://localhost:${port}/`,
    reuseExistingServer: !isCI /* Spawn dev server on CI */
  },
  expect: {
    timeout: isCI ? 5000 : 2500 /* default: 5000 */
  },
  use: {
    baseURL: `http://localhost:${port}/`
  }
})
