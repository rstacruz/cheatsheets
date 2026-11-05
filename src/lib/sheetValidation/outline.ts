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

const BLOCK_IAL = /^\{:([^}]*)\}$/
/** Plugin parity: newlines allowed inside the comment */
const ATTRIBUTE_COMMENT = /^<!--\s*\{:([^}]*)\}\s*-->$/s

function firstContent(lines: string[], start: number): number {
  let index = start
  while (index < lines.length && lines[index].trim() === '') index++
  return index
}

function commentAt(lines: string[], start: number): string | undefined {
  if (!(lines[start] ?? '').trim().startsWith('<!--')) return undefined

  const parts: string[] = []
  for (let index = start; index < lines.length; index++) {
    const line = lines[index].trim()
    const end = line.indexOf('-->')
    parts.push(end === -1 ? line : line.slice(0, end + 3))
    if (end !== -1) break
  }
  return ATTRIBUTE_COMMENT.exec(parts.join(' '))?.[1]
}

/** Merges a legacy IAL with its comment, as the plugin does */
function attributesBelow(lines: string[], start: number): string | undefined {
  const ial = BLOCK_IAL.exec(lines[start]?.trim() ?? '')
  const comment = commentAt(lines, firstContent(lines, ial ? start + 1 : start))

  if (ial) return comment ? `${ial[1]} ${comment}` : ial[1]
  return comment
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
    if (/^##\s/.test(line)) {
      inThreeColumn = /\.-three-column(?![\w-])/.test(
        attributesBelow(lines, index + 1) ?? ''
      )
    }
  })

  return found
}
