import type { Properties } from 'hast'
import {
  ATTRIBUTE_COMMENT,
  mergeAttributes,
  parseAttributes
} from '~/lib/markdown/comments'
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

/** Merges the attribute comments below `start` */
function attributesBelow(
  lines: string[],
  start: number
): Properties | undefined {
  const properties: Properties = {}

  let index = firstContent(lines, start)
  for (;;) {
    const comment = commentAt(lines, index)
    const attributes = comment && parseAttributes(comment.text)
    if (!comment || !attributes) break
    mergeAttributes(properties, attributes)
    index = firstContent(lines, comment.end)
  }

  return Object.keys(properties).length > 0 ? properties : undefined
}

/** Whether the attributes below an H2 ask for `.-three-column` */
function isThreeColumn(lines: string[], start: number): boolean {
  const classes = String(attributesBelow(lines, start)?.className ?? '').split(
    /\s+/
  )
  return classes.includes('-three-column')
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
      inThreeColumn = isThreeColumn(lines, index + 1)
    }
  })

  return found
}
