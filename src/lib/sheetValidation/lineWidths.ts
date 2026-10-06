import type { SheetFinding } from './sheets'
import { scanFences } from './utils'

export const CODE_LIMIT = 70
export const THREE_COLUMN_LIMIT = 42

/**
 * Code lines wider than the sheet's limit. Sections marked `.-three-column`
 * get the narrower limit from `_docs/writing-guidelines.md`
 */
export function findOverlongCodeLines(source: string): SheetFinding[] {
  const lines = source.split('\n')
  const { fenced } = scanFences(lines)
  const findings: SheetFinding[] = []
  let threeColumn = false

  lines.forEach((line, index) => {
    if (!fenced[index]) {
      if (/^## /.test(line)) threeColumn = false
      else if (/^\{:[^}]*\.-three-column/.test(line)) threeColumn = true
      return
    }

    const limit = threeColumn ? THREE_COLUMN_LIMIT : CODE_LIMIT
    if (line.length > limit) {
      findings.push({ line: index + 1, text: `${line.length} chars: ${line}` })
    }
  })

  return findings
}
