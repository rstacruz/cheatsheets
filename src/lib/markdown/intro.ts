import type { SheetLink } from '~/types/SheetFrontmatter'
import { renderMarkdown } from './index'

export type IntroOptions = {
  intro?: string
  links?: SheetLink[]
}

/**
 * Renders the Introduction card and inserts it as the first card in the
 * first section list. Sectionize has already grouped pre-H3 content into its
 * own card, so the insertion cannot swallow following blocks.
 */
export async function insertIntroCard(
  html: string,
  options: IntroOptions
): Promise<string> {
  const markdown = introCardMarkdown(options)
  if (!markdown) return html

  const id = uniqueId(html, 'introduction')
  const body = (await renderMarkdown(markdown)).html
  const card =
    `<section class="h3-section -intro">` +
    `<h3 class="-intro" id="${id}">Introduction</h3>` +
    `<div class="body -intro">${body}</div>` +
    `</section>`

  const marker = '<div class="body h3-section-list'
  const at = html.indexOf(marker)
  if (at === -1) return card + html

  const end = html.indexOf('>', at) + 1
  return html.slice(0, end) + card + html.slice(end)
}

export function introCardMarkdown({
  intro,
  links
}: IntroOptions): string | null {
  const parts: string[] = []
  if (intro?.trim()) parts.push(intro.trim())
  if (links?.length) parts.push(links.map(formatLink).join('\n'))
  return parts.length > 0 ? parts.join('\n\n') : null
}

function formatLink({ title, url }: SheetLink) {
  const label = title.replace(/([\\[\]])/g, '\\$1')
  const source = sourceLabel(url)
  const labelled = source !== null && title !== url && title !== source
  return `- [${label}](<${url}>)${labelled ? ` _(${source})_` : ''}`
}

/** Muted label shown after a link, inferred from where it points */
function sourceLabel(url: string): string | null {
  if (/^(?:\.{0,2}\/|#)/.test(url)) return 'devhints.io'
  try {
    return new URL(url).hostname.replace(/^www\./, '') || null
  } catch {
    return null
  }
}

function uniqueId(html: string, base: string) {
  if (!html.includes(`id="${base}"`)) return base
  let n = 1
  while (html.includes(`id="${base}-${n}"`)) n++
  return `${base}-${n}`
}
