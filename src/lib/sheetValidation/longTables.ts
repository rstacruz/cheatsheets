import type { SheetFinding } from './sheets'
import { scanFences } from './utils'

export const TABLE_SPLIT_THRESHOLD = 8

/**
 * Tables with 8+ body rows that carry no separator row. `_docs/writing-guidelines.md`
 * asks for separator rows (or H4 groups) once a table reaches 8 rows
 */
export function findUnsplitTables(source: string): SheetFinding[] {
  const lines = source.split('\n')
  const { fenced } = scanFences(lines)
  const findings: SheetFinding[] = []
  let table: { line: number; rows: number; separators: number } | null = null

  const flush = () => {
    if (table && table.rows >= TABLE_SPLIT_THRESHOLD && table.separators <= 1) {
      findings.push({ line: table.line, text: `${table.rows}-row table` })
    }
    table = null
  }

  lines.forEach((line, index) => {
    if (!fenced[index] && /^\s*\|/.test(line)) {
      // The first row is the header, so start counting body rows at -1
      if (!table) table = { line: index + 1, rows: -1, separators: 0 }
      if (/^\s*\|[\s\-:|]+\|\s*$/.test(line)) table.separators++
      else table.rows++
      return
    }

    flush()
  })

  flush()
  return findings
}
