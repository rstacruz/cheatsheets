import { readdirSync } from 'node:fs'
import { join } from 'node:path'

const NON_PAGE_FILES =
  /^(?:README|AGENTS|CONTRIBUTING|404|index|index@2016)\.md$/
const NON_PAGE_DIRS = /^(?:_docs|artefacts)\//
const SKIP_DIRS: Record<string, true> = { node_modules: true, dist: true }

/** Markdown files published by `getPages()`: root sheets plus one directory */
export function isSheetPath(path: string): boolean {
  if (!/^[^/]+(?:\/[^/]+)?\.md$/.test(path)) return false
  if (NON_PAGE_FILES.test(path)) return false
  if (NON_PAGE_DIRS.test(path)) return false
  return true
}

/** Sheet paths under `root`, matching the set discovered by `getPages()` */
export function listSheetFiles(root = process.cwd()): string[] {
  const paths: string[] = []

  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (entry.isFile() && isSheetPath(entry.name)) paths.push(entry.name)
    if (
      !entry.isDirectory() ||
      entry.name.startsWith('.') ||
      SKIP_DIRS[entry.name] === true
    ) {
      continue
    }

    for (const child of readdirSync(join(root, entry.name))) {
      const path = `${entry.name}/${child}`
      if (isSheetPath(path)) paths.push(path)
    }
  }

  return paths.sort()
}
