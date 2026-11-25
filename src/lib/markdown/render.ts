import rehypePrism from '@mapbox/rehype-prism'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'
import type { SheetLayout } from '~/types/SheetFrontmatter'
import { rehypeInlineHighlight } from './inlineHighlight'
import { renderMarkdown } from './index'
import { insertIntroCard, type IntroOptions } from './intro'
import { plugin as rehypeSectionize } from '@rstacruz/rehype-sectionize'

const PRISM_CONFIG = {
  // For a list of languages Prism supports:
  // https://github.com/PrismJS/prism/tree/master/components
  alias: {
    bash: ['sh', 'fish'],
    ini: ['dosini'],
    pug: ['jade'],
    // "ignore" actually is for gitignore files, but it's closest to a
    // neutral highlighting that I can find
    ignore: [
      // "nohighlight" was a Jekyll thing to prevent syntax highlighting
      'nohighlight',
      'org'
    ]
  }
}

const REHYPE_SECTIONIZE_CONFIG = [
  {
    level: 'h2',
    prelude: {
      enabled: true,
      tagName: 'section',
      properties: { className: 'h3-section-list' }
    },
    section: {
      addHeadingClass: true,
      tagName: 'section',
      properties: { className: 'h2-section' }
    },
    body: {
      addHeadingClass: true,
      enabled: true,
      tagName: 'div',
      properties: { className: 'body h3-section-list' }
    }
  },
  {
    level: 'h3',
    prelude: {
      enabled: false
    },
    section: {
      addHeadingClass: true,
      properties: { className: 'h3-section' },
      tagName: 'section'
    },
    body: {
      addHeadingClass: true,
      enabled: true,
      properties: { className: 'body' },
      tagName: 'div'
    }
  }
]

/**
 * Versus layout: each H4 starts a column inside its H3 card.
 */

const VERSUS_H4_CONFIG = {
  level: 'h4',
  prelude: { enabled: false },
  section: {
    addHeadingClass: true,
    properties: { className: 'h4-section' },
    tagName: 'div'
  }
}

/**
 * Renders Markdown to HTML and applies some post-processing.
 */

export type RenderOptions = IntroOptions & {
  /** Frontmatter layout; `versus` wraps each H4 block into a column. */
  layout?: SheetLayout
}

export async function render(
  input: string,
  options: RenderOptions = {}
): Promise<{ html: string }> {
  let { html } = await renderMarkdown(input)
  html = addInitialH2(html)
  html = addH3s(html)
  html = await processRehype(html, options.layout)
  html = removeBlankHeadings(html)
  html = await insertIntroCard(html, options)
  return { html }
}

// Inject extra H2 if needed. This fixes layout issues
function addInitialH2(html: string): string {
  if (html.trim().startsWith('<h2')) return html
  return `<h2></h2>\n${html}`
}

// Add extra H3's in cases of `h2 + (ul|p|ol)`
// Fixes layout issues in "Also see" sections (eg, /awscli)
// The blank H3's will be removed later
function addH3s(html: string): string {
  html = html.replace(
    /(\/h2>[\s\r\n]*)(<(?:ul|p|ol))/g,
    (_, closing, opening) => {
      return `${closing}<h3></h3>${opening}`
    }
  )
  return html
}

function removeBlankHeadings(html: string): string {
  return html.replace(/<h3><\/h3>/g, '').replace(/<h2><\/h2>/g, '')
}

/**
 * Runs through Rehype to add syntax highlighting and more.
 */

async function processRehype(
  inputHtml: string,
  layout?: RenderOptions['layout']
): Promise<string> {
  const sectionizeConfig =
    layout === 'versus'
      ? [...REHYPE_SECTIONIZE_CONFIG, VERSUS_H4_CONFIG]
      : REHYPE_SECTIONIZE_CONFIG

  const processResult = await unified()
    .use(rehypeParse)
    // @ts-expect-error dunno how to fix this
    .use(rehypePrism, PRISM_CONFIG)
    .use(rehypeInlineHighlight)
    .use(rehypeStringify)
    // @ts-expect-error dunno how to fix this
    .use(rehypeSectionize, sectionizeConfig)
    .process(inputHtml)

  let html = String(processResult)
  html = html
    .replace('<html><head></head><body>', '')
    .replace('</body></html>', '')
  return html
}
