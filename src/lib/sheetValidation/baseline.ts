import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Style rules here are aspirational for legacy sheets: baselines hold the
 * violations still to clean up, and CI fails on anything new. Regenerate with
 * `UPDATE_SHEET_BASELINE=1 pnpm vitest run src/lib/sheetValidation`
 */
export const updatingBaseline = process.env.UPDATE_SHEET_BASELINE === '1'

const BASELINE_DIR = join(dirname(fileURLToPath(import.meta.url)), 'baseline')

/** Current violations tolerated until the sheet is cleaned up */
export function loadBaseline<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(readFileSync(join(BASELINE_DIR, file), 'utf8')) as T
  } catch {
    return fallback
  }
}

export function saveBaseline(file: string, value: unknown) {
  writeFileSync(join(BASELINE_DIR, file), `${JSON.stringify(value, null, 2)}\n`)
}

/** Markdown pages that are not cheatsheets: repo docs, includes, fixtures, WIP */
export function isSheetSlug(slug: string) {
  return !/^(?:AGENTS$|_docs\/|_includes\/|tests\/|wip\/)/.test(slug)
}
