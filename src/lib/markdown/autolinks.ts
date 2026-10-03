import type { Link, Root } from 'mdast'
import { visit } from 'unist-util-visit'

/**
 * remark-gfm autolinks bare URLs (`http://x.com`, `me@x.com`), kramdown does
 * not. An autolinked literal's only child spans the same source range as the
 * link; angle autolinks (`<http://x>`) and `[text](url)` keep their brackets
 * and are left alone
 */
export function stripGfmAutolinks() {
  return (tree: Root) => {
    visit(tree, 'link', (node: Link, index, parent) => {
      const child = node.children[0]
      if (index === undefined || !parent) return
      if (node.children.length !== 1 || child.type !== 'text') return
      const position = node.position
      const childPosition = child.position
      if (!position || !childPosition) return
      if (
        position.start.offset !== childPosition.start.offset ||
        position.end.offset !== childPosition.end.offset
      ) {
        return
      }
      parent.children[index] = child
    })
  }
}
