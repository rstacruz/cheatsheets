import type { Root } from 'mdast'
import type { Properties } from 'hast'
import { visit } from 'unist-util-visit'

/** `<!-- {: .-two-column} -->` — attributes for the block above it */
const ATTRIBUTE_COMMENT = /^<!--\s*\{:([^}]*)\}\s*-->$/s

/**
 * Applies an attribute comment to the block above it, then drops the comment
 * node so later passes see the block directly. Replaces the kramdown IAL.
 */
export function commentAttributes() {
  return (tree: Root) => {
    visit(tree, 'html', (node, index, parent) => {
      if (!parent || index === undefined) return
      const match = ATTRIBUTE_COMMENT.exec(node.value.trim())
      if (!match) return

      const target = parent.children[index - 1]
      if (!target || target.type === 'html') return

      const attributes = parseAttributes(match[1])
      if (!attributes) return

      const data = (target.data ??= {})
      const properties = (data.hProperties ??= {}) as Properties
      for (const [key, value] of Object.entries(attributes)) {
        const existing = properties[key]
        properties[key] =
          key === 'className' && existing
            ? [existing, value].flat().join(' ')
            : value
      }

      parent.children.splice(index, 1)
      return index
    })
  }
}

/** The subset used by the sheets: `.class`, `.a.b`, `key="value"` */
function parseAttributes(input: string): Properties | undefined {
  const tokens = input.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) ?? []
  const properties: Properties = {}
  const classes: string[] = []

  for (const token of tokens) {
    if (token.startsWith('.')) {
      classes.push(...token.split('.').filter(Boolean))
      continue
    }
    const pair = /^([^\s=]+)=(.*)$/.exec(token)
    if (pair) properties[pair[1]] = pair[2].replace(/^["']|["']$/g, '')
  }

  if (classes.length > 0) properties.className = classes.join(' ')
  return Object.keys(properties).length > 0 ? properties : undefined
}
