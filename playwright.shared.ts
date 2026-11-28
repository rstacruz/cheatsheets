import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const PORT_BASE = 10000
const PORT_RANGE = 10000

export function worktreePort(projectDir: string): number {
  const digest = createHash('sha256').update(projectDir).digest('hex')
  return PORT_BASE + (parseInt(digest.slice(0, 4), 16) % PORT_RANGE)
}

export const isCI = Boolean(process.env.CI)
export const port =
  process.env.PORT ?? worktreePort(fileURLToPath(new URL('.', import.meta.url)))

// NixOS: point at the system Chromium, since Playwright's build needs
// libraries the Nix store doesn't expose.
export const launchOptions = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
  ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
  : {}
