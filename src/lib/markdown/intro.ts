import type { SheetLink } from '~/types/SheetFrontmatter'
import { renderMarkdown } from './index'

export type IntroOptions = {
  intro?: string
  links?: SheetLink[]
  /** Put the card after the last section instead of before the first */
  atEnd?: boolean
  /** Render only the links, under this title */
  linksTitle?: string
}

/** Renders the generated Introduction or Related links card */
export async function insertIntroCard(
  html: string,
  { intro, links, atEnd, linksTitle }: IntroOptions
): Promise<string> {
  const parts: string[] = []
  if (!linksTitle && intro?.trim()) {
    parts.push((await renderMarkdown(intro.trim())).html)
  }
  if (links?.length) {
    /* Rendered apart from `intro` so a trailing list cannot absorb the rows */
    parts.push((await renderMarkdown(links.map(formatLink).join('\n'))).html)
  }
  if (!parts.length) return html

  const title = linksTitle ?? 'Introduction'
  const id = uniqueId(
    html,
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  )
  const card =
    `<section class="h3-section -intro">` +
    `<h3 class="-intro" id="${id}">${title}</h3>` +
    `<div class="body -intro">${parts.join('')}</div>` +
    `</section>`

  if (atEnd) {
    const closes = [...html.matchAll(/<\/div>\s*<\/section>/g)]
    const close = closes.at(-1)
    if (!close || close.index === undefined) return html + card
    return html.slice(0, close.index) + card + html.slice(close.index)
  }

  const marker = '<div class="body h3-section-list'
  const at = html.indexOf(marker)
  if (at === -1) return card + html

  const end = html.indexOf('>', at) + 1
  return html.slice(0, end) + card + html.slice(end)
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
