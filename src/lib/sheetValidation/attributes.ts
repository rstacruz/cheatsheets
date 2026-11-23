import { ATTRIBUTE_COMMENT } from '~/lib/markdown/comments'

export type AttributeComment = { line: number; attributes: string }

/** Attribute comments directly after a fence's closer, blank lines allowed */
export function commentsAfter(
  lines: string[],
  closeLine: number
): AttributeComment[] {
  const comments: AttributeComment[] = []
  let index = closeLine
  while (index < lines.length && lines[index].trim() === '') index++

  while (index < lines.length) {
    const comment = ATTRIBUTE_COMMENT.exec(lines[index].trim())
    if (!comment) break
    comments.push({ line: index + 1, attributes: comment[1] ?? '' })
    index++
    while (index < lines.length && lines[index].trim() === '') index++
  }

  return comments
}
