import type { SheetFinding } from './sheets'
import { scanFences } from './utils'

/** Link-list footers are the only sections allowed to skip H3 cards */
const FOOTER =
  /^(?:also see|see also|read more|references?|links|sources|further reading|docs)$/i

/**
 * H2 sections that hold content without a single H3 before the next H2.
 * Keeps the "content lives in H3 cards" rule from `_docs/writing-guidelines.md`
 */
export function findH2WithoutH3(source: string): SheetFinding[] {
  const lines = source.split('\n')
  const { fenced } = scanFences(lines)
  const findings: SheetFinding[] = []
  let heading: { line: number; text: string } | null = null
  let hasH3 = false

  const flush = () => {
    if (heading && !hasH3 && !FOOTER.test(heading.text)) {
      findings.push({ line: heading.line, text: heading.text })
    }
  }

  lines.forEach((line, index) => {
    if (fenced[index]) return

    const h2 = /^## (?!#)(.*)$/.exec(line)
    if (h2) {
      flush()
      heading = { line: index + 1, text: h2[1].trim() }
      hasH3 = false
      return
    }

    if (/^### /.test(line)) {
      hasH3 = true
      return
    }
  })

  flush()
  return findings
}
