import { execFileSync } from 'node:child_process'
import { isSheetPath } from '../../src/lib/sheetFiles'

export const DEFAULT_LABEL = 'sheet-refresh'

type GhRunner = (args: string[]) => string
type PullRequest = { number: number; files?: Array<{ path: string }> }

const runGh: GhRunner = (args) =>
  execFileSync('gh', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  })

function warn(label: string, error: unknown) {
  console.error(
    `warning: could not list open ${label} PRs; continuing without exclusions (${String(error)})`
  )
}

/** Sheet paths touched by open PRs labelled `label` */
export function openPrSheetPaths(
  label = DEFAULT_LABEL,
  gh: GhRunner = runGh
): Set<string> {
  let prs: PullRequest[]

  try {
    const args = [
      'pr',
      'list',
      '--state',
      'open',
      '--label',
      label,
      '--limit',
      '100',
      '--json',
      'number,files'
    ]
    prs = JSON.parse(gh(args)) as PullRequest[]
    if (!Array.isArray(prs)) throw new Error('unexpected gh output')
  } catch (error) {
    warn(label, error)
    return new Set()
  }

  const paths = new Set<string>()
  for (const pr of prs) {
    for (const file of pr.files ?? []) {
      if (isSheetPath(file.path)) paths.add(file.path)
    }
  }
  return paths
}
