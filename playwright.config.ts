import { defineConfig } from '@playwright/test'

const port = process.env.PORT ?? 4321

const isCI = Boolean(process.env.CI)

export default defineConfig({
  testMatch: /.*\.e2e\.[^.]*/,
  webServer: {
    // Astro 7 backgrounds `astro dev` when it detects an agent; --ignore-lock
    // keeps it in the foreground so Playwright can own its lifetime.
    command: `npm run dev -- --port ${port} --ignore-lock`,
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
    baseURL: `http://localhost:${port}/`,
    // NixOS: point at the system Chromium, since Playwright's build needs
    // libraries the Nix store doesn't expose.
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? {
          launchOptions: {
            executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
          }
        }
      : {})
  }
})
