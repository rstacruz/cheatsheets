import { defineConfig } from '@playwright/test'
import { isCI, launchOptions, port } from './playwright.shared'

export default defineConfig({
  testMatch: /search-edge\.e2e\./,
  webServer: {
    command: `pnpm exec wrangler pages dev dist --port ${port}`,
    url: `http://localhost:${port}/`,
    reuseExistingServer: !isCI
  },
  expect: {
    timeout: isCI ? 5000 : 2500
  },
  use: {
    baseURL: `http://localhost:${port}/`,
    launchOptions
  }
})
