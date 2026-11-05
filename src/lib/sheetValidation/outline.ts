import { scanFences } from './utils'

export type Heading = {
  /** Heading level: 2 for `##`, 3 for `###` */
  level: number
  /** 1-based line number */
  line: number
  /** Heading text without the leading hashes */
  title: string
}

/** Headings outside fenced code, in document order */
export function scanHeadings(source: string): Heading[] {
  const lines = source.split('\n')
  const { fenced } = scanFences(lines)
  const found: Heading[] = []

  lines.forEach((line, index) => {
    if (fenced[index]) return
    const match = /^(#{1,6})\s+(.*)$/.exec(line)
    if (match) {
      found.push({
        level: match[1].length,
        line: index + 1,
        title: match[2].trim()
      })
    }
  })

  return found
}

export type CodeLine = {
  /** 1-based line number */
  line: number
  text: string
  /** Inside an H2 section that carries `.-three-column` */
  inThreeColumn: boolean
}

const ATTRIBUTE_COMMENT = /^<!--\s*\{:([^}]*)\}\s*-->$/

/** Inner attribute text of the attribute comment below `start`, past blanks */
function attributeComment(lines: string[], start: number): string | undefined {
  let index = start
  while (index < lines.length && lines[index].trim() === '') index++
  return ATTRIBUTE_COMMENT.exec(lines[index]?.trim() ?? '')?.[1]
}

/** Code-block content lines with their enclosing H2 section's layout */
export function scanCodeLines(source: string): CodeLine[] {
  const lines = source.split('\n')
  const { fenced } = scanFences(lines)
  const found: CodeLine[] = []
  let inThreeColumn = false

  lines.forEach((line, index) => {
    if (fenced[index]) {
      found.push({ line: index + 1, text: line, inThreeColumn })
      return
    }
    // An H2's layout comes from an attribute comment below it
    if (/^##\s/.test(line)) {
      inThreeColumn = /\.-three-column(?![\w-])/.test(
        attributeComment(lines, index + 1) ?? ''
      )
    }
  })

  return found
}
