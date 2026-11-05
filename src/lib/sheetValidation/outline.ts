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

/** Attribute text of the comment opening at `start`, and the line after it */
function commentAt(lines: string[], start: number) {
  if (!(lines[start] ?? '').trim().startsWith('<!--')) return undefined

  const parts: string[] = []
  for (let index = start; index < lines.length; index++) {
    const line = lines[index].trim()
    const end = line.indexOf('-->')
    // The renderer leaves `<!-- … --> text` literal, so it is not a match
    if (end !== -1 && end + 3 !== line.length) return undefined
    parts.push(line)
    if (end === -1) continue

    const text = ATTRIBUTE_COMMENT.exec(parts.join(' '))?.[1]
    return text === undefined ? undefined : { text, end: index + 1 }
  }
  return undefined
}

/** Merges a legacy IAL with the comments below, as the plugin does */
function attributesBelow(lines: string[], start: number): string | undefined {
  const parts: string[] = []
  const ial = BLOCK_IAL.exec(lines[start]?.trim() ?? '')
  if (ial) parts.push(ial[1])

  let index = firstContent(lines, ial ? start + 1 : start)
  for (;;) {
    const comment = commentAt(lines, index)
    if (!comment?.text) break
    parts.push(comment.text)
    index = firstContent(lines, comment.end)
  }

  return parts.length ? parts.join(' ') : undefined
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
