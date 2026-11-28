import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import grayMatter from 'gray-matter'
import { isListed } from '../src/lib/page/accessors'
import { listSheetFiles } from '../src/lib/sheetFiles'
import {
  SheetFrontmatterSchema,
  type SheetFrontmatter
} from '../src/types/SheetFrontmatter'
import { DEFAULT_LABEL, openPrSheetPaths } from './lib/openPrFiles'

const DAY_MS = 86_400_000
const USAGE =
  'Usage: sheets:due --tier <t1|t2> [--date YYYY-MM-DD] [--limit N] [--json] [--exclude-label <label>]'

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(`${value}T00:00:00Z`)
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  )
}
export const AGE_DAYS = { t1: 14, t2: 28 } as const
export type Tier = keyof typeof AGE_DAYS
export type DueSheet = {
  slug: string
  tier: Tier
  verifiedAt: string | null
  ageDays: number | null
}

export type Options = {
  tier: Tier
  date: string
  limit?: number
  json: boolean
  label: string
}

type Sheet = { slug: string; frontmatter: SheetFrontmatter }
type Dependencies = {
  root?: string
  excludedPaths?: Set<string>
  openPrPaths?: (label: string) => Set<string>
  print?: (text: string) => void
}

export function parseOptions(args: string[]): Options {
  let tier: Tier | undefined
  let date = new Date().toISOString().slice(0, 10)
  let limit: number | undefined
  let json = false
  let label = DEFAULT_LABEL

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]

    if (arg === '--json') {
      json = true
      continue
    }
    if (arg === '--tier') {
      const value = args[++index]
      if (value !== 't1' && value !== 't2') {
        throw new Error('--tier must be t1 or t2')
      }
      tier = value
      continue
    }
    if (arg === '--date') {
      date = args[++index]
      continue
    }
    if (arg === '--limit') {
      limit = Number(args[++index])
      if (!Number.isInteger(limit) || limit < 1) {
        throw new Error('--limit must be a positive integer')
      }
      continue
    }
    if (arg === '--exclude-label') {
      label = args[++index]
      if (!label) throw new Error('--exclude-label needs a label')
      continue
    }
    throw new Error(`unknown option: ${arg}`)
  }

  if (!tier) throw new Error('--tier is required')
  if (!isIsoDate(date)) throw new Error('--date must be YYYY-MM-DD')
  return { tier, date, limit, json, label }
}

/** Frontmatter straight from disk; Node cannot use `getPages()`' Vite glob */
export function loadSheets(root = process.cwd()): Sheet[] {
  return listSheetFiles(root).map((path) => {
    const source = readFileSync(join(root, path), 'utf8')
    return {
      slug: path.replace(/\.md$/, ''),
      frontmatter: SheetFrontmatterSchema.parse(grayMatter(source).data)
    }
  })
}

export function findDueSheets(
  sheets: Sheet[],
  options: Pick<Options, 'tier' | 'date' | 'limit'>,
  excluded: Set<string> = new Set()
): DueSheet[] {
  const asOf = Date.parse(`${options.date}T00:00:00Z`)
  const cutoff = asOf - AGE_DAYS[options.tier] * DAY_MS

  const rows = sheets.flatMap(({ slug, frontmatter }) => {
    if (frontmatter.tier !== options.tier || !isListed({ frontmatter })) {
      return []
    }
    if (excluded.has(`${slug}.md`)) return []

    const stamp = frontmatter.last_verified_at
    if (stamp && stamp.getTime() > cutoff) return []

    return [
      {
        slug,
        tier: options.tier,
        verifiedAt: stamp ? stamp.toISOString().slice(0, 10) : null,
        ageDays: stamp ? Math.floor((asOf - stamp.getTime()) / DAY_MS) : null
      }
    ]
  })

  rows.sort(
    (a, b) =>
      (a.verifiedAt ?? '').localeCompare(b.verifiedAt ?? '') ||
      a.slug.localeCompare(b.slug)
  )
  return options.limit ? rows.slice(0, options.limit) : rows
}

function summary(count: number, tier: Tier, label: string): string {
  if (count === 0) {
    return `No ${tier} sheets are due for verification; sheets in open ${label} PRs are excluded.`
  }
  if (count === 1) {
    return `1 ${tier} sheet is due for verification, oldest first; sheets in open ${label} PRs are excluded.`
  }
  return `${count} ${tier} sheets are due for verification, oldest first; sheets in open ${label} PRs are excluded.`
}

export function formatReport(
  rows: DueSheet[],
  tier: Tier,
  label: string
): string {
  const lines = [
    summary(rows.length, tier, label),
    '',
    'slug\tlast_verified_at\tage',
    ...rows.map((row) =>
      [
        row.slug,
        row.verifiedAt ?? '-',
        row.ageDays === null ? '-' : `${row.ageDays}d`
      ].join('\t')
    )
  ]
  return lines.join('\n')
}

export function run(args: string[], deps: Dependencies = {}): string {
  const options = parseOptions(args)
  const sheets = loadSheets(deps.root ?? process.cwd())
  const excluded =
    deps.excludedPaths ?? (deps.openPrPaths ?? openPrSheetPaths)(options.label)
  const due = findDueSheets(sheets, options, excluded)
  const output = options.json
    ? JSON.stringify(due, null, 2)
    : formatReport(due, options.tier, options.label)

  const print = deps.print ?? ((text: string) => console.log(text))
  print(output)
  return output
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    run(process.argv.slice(2))
  } catch (error) {
    console.error(String(error))
    console.error(USAGE)
    process.exitCode = 1
  }
}
