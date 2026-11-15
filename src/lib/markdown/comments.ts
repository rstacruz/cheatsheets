import type { Root } from 'mdast'
import type { Properties } from 'hast'
import { visit } from 'unist-util-visit'

/** Attributes for the block above: `<!-- {: .-two-column} -->` */
export const ATTRIBUTE_COMMENT = /^<!--\s*\{:([^}]*)\}\s*-->$/s

/** Containers whose children are blocks; elsewhere the comment is left as text */
const BLOCK_PARENTS: Record<string, boolean> = Object.fromEntries(
  ['root', 'blockquote', 'listItem', 'footnoteDefinition'].map((type) => [
    type,
    true
  ])
)

/** Applies attributes to the preceding block and drops the comment */
export function commentAttributes() {
  return (tree: Root) => {
    visit(tree, 'html', (node, index, parent) => {
      if (!parent || index === undefined) return
      if (!BLOCK_PARENTS[parent.type]) return
      const match = ATTRIBUTE_COMMENT.exec(node.value.trim())
      if (!match) return

      const target = parent.children[index - 1]
      if (!target || target.type === 'html') return
      // These render nothing, so attributes would vanish with the comment
      if (target.type === 'definition' || target.type === 'footnoteDefinition')
        return

      const attributes = parseAttributes(match[1])
      if (!attributes) return

      const data = (target.data ??= {})
      mergeAttributes((data.hProperties ??= {}) as Properties, attributes)

      parent.children.splice(index, 1)
      return index
    })
  }
}

/** Appends classes, overwrites every other key */
export function mergeAttributes(
  properties: Properties,
  attributes: Properties
): void {
  for (const [key, value] of Object.entries(attributes)) {
    const existing = properties[key]
    properties[key] =
      key === 'className' && existing
        ? [existing, value].flat().join(' ')
        : value
  }
}

/** `.class`, `.a.b`, `key="value"` */
export function parseAttributes(input: string): Properties | undefined {
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
