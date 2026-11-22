import type { Properties } from 'hast'
import type { List, ListItem, Root, RootContent } from 'mdast'
import { commentAttributes } from '~/lib/markdown/comments'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { isSheetSlug } from './baseline'
import { scanHeadings } from './outline'
import { sheetSources } from './sheets'

export const MAX_WORDS = 8
export const MAX_CHARS = 13

export type EnumCheck = 'items' | 'width'
export type Finding = { line: number; heading: string; reason: string }
type EnumKind = 'compact' | 'wide'

type ItemInfo = {
  words: string[]
  chars: number
  linked: boolean
  singleParagraph: boolean
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(commentAttributes)

const ENUM_CLASSES: Record<string, true> = {
  '-enum': true,
  '-enum-wide': true,
  '-enum-lines': true
}

function enumKind(list: List): EnumKind | undefined {
  const properties = list.data?.hProperties as Properties | undefined
  const classes = String(properties?.className ?? '').split(/\s+/)
  if (!classes.some((name) => ENUM_CLASSES[name] === true)) return undefined
  return classes.includes('-enum-wide') ? 'wide' : 'compact'
}

function itemInfo(item: ListItem): ItemInfo {
  const words: string[] = []
  let linked = false
  visit(item, ['text', 'inlineCode'], (node) => {
    words.push(...node.value.trim().split(/\s+/).filter(Boolean))
  })
  visit(item, ['link', 'linkReference', 'image', 'imageReference'], () => {
    linked = true
  })
  return {
    words,
    chars: words.join(' ').length,
    linked,
    singleParagraph:
      item.children.length === 1 && item.children[0]?.type === 'paragraph'
  }
}

function qualifies(item: ItemInfo): boolean {
  return (
    item.singleParagraph &&
    !item.linked &&
    item.words.length >= 1 &&
    item.words.length <= MAX_WORDS &&
    item.chars <= MAX_CHARS &&
    !/[.!?]$/.test(item.words.at(-1) ?? '')
  )
}

/** Findings for one of the two `lists/enumeration-*` constraints */
export function findEnumerationIssues(
  source: string,
  check: EnumCheck
): Finding[] {
  const headings = scanHeadings(source)
  const found: Finding[] = []

  const report = (line: number, reason: string) => {
    const heading = headings.findLast((h) => h.level <= 3 && h.line < line)
    found.push({ line, heading: heading?.title ?? '', reason })
  }

  const walk = (nodes: RootContent[]) => {
    for (const node of nodes) {
      if (node.type === 'list') {
        const kind = enumKind(node)
        const line = node.position?.start.line ?? 1
        const infos = node.children.map(itemInfo)

        if (check === 'items') {
          if (kind) {
            if (node.children.length < 2)
              report(line, 'enumeration needs two or more items')

            node.children.forEach((item, index) => {
              const info = infos[index]
              if (!info) return
              const itemLine = item.position?.start.line ?? line
              if (!info.singleParagraph) {
                report(itemLine, 'enumeration item must hold one paragraph')
              } else if (info.linked) {
                report(
                  itemLine,
                  'enumeration item contains a link; use a table'
                )
              } else if (info.words.length > MAX_WORDS) {
                report(
                  itemLine,
                  `enumeration item has ${info.words.length} words`
                )
              } else if (/[.!?]$/.test(info.words.at(-1) ?? '')) {
                report(itemLine, 'enumeration item ends with punctuation')
              }
            })
          } else if (
            infos.length >= 2 &&
            infos.length <= 12 &&
            infos.every(qualifies)
          ) {
            report(line, 'short list should use .-enum')
          }
        } else if (kind === 'compact') {
          infos.forEach((info, index) => {
            if (info.chars > MAX_CHARS) {
              const itemLine =
                node.children[index]?.position?.start.line ?? line
              report(
                itemLine,
                `enumeration item has ${info.chars} characters (max ${MAX_CHARS})`
              )
            }
          })
        } else if (
          kind === 'wide' &&
          !infos.some((info) => info.chars >= MAX_CHARS + 1)
        ) {
          report(
            line,
            `wide enumeration needs an item of ${MAX_CHARS + 1}+ characters`
          )
        }
      }
      if ('children' in node) walk(node.children as RootContent[])
    }
  }

  const tree = processor.runSync(processor.parse(source)) as Root
  walk(tree.children)
  return found
}

/** `slug:line heading: reason` across every listed sheet */
export async function collectEnumerationFindings(
  check: EnumCheck
): Promise<string[]> {
  const findings: string[] = []
  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const { line, heading, reason } of findEnumerationIssues(
      source,
      check
    )) {
      findings.push(`${slug}:${line} ${heading}: ${reason}`)
    }
  }
  return findings
}
