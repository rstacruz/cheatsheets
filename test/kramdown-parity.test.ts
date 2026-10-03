import { createHash } from 'node:crypto'
import { decodeHTML } from 'entities'
import { expect, it } from 'vitest'
import { renderMarkdown } from '~/lib/markdown'
import { getPages } from '~/lib/page'

/**
 * Permanent parity gate for the kramdown → remark swap.
 *
 * Every sheet in the build's own glob (`~/lib/page`) is rendered with the new
 * pipeline and compared against the kramdown output committed under
 * `test/fixtures/kramdown-golden/`. Ruby is gone, so this is what keeps the
 * rendered contract honest.
 *
 * Comparison normalizes entity spelling and whitespace between tags; text and
 * `<pre>` content are compared exactly, so a real content diff cannot hide.
 */

const goldens = import.meta.glob('./fixtures/kramdown-golden/*.html', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

const manifest = JSON.parse(
  (
    import.meta.glob('./fixtures/kramdown-golden/manifest.json', {
      query: '?raw',
      import: 'default',
      eager: true
    }) as Record<string, string>
  )['./fixtures/kramdown-golden/manifest.json']
) as Record<string, string>

const normalize = (html: string) =>
  decodeHTML(html).replace(/>\s+</g, '><').trim()

/**
 * Sheets whose output still differs, with the measured difference. All six
 * are whitespace-only or `<p>`-wrapping differences that render identically
 * in a browser; none change visible content. Must stay in sync with the
 * actual residuals (the assertion below fails if it does not).
 */
const EXPECTED_DIFFS: Record<string, string> = {
  'backbone.md':
    'nested-list indentation: kramdown emits `Collection:\\n    <ul>`, we emit `Collection:\\n<ul>` (whitespace-only)',
  'goby.md':
    'nested-list indentation: kramdown emits `<code>fmt</code>,\\n    <ul>`, we emit `<code>fmt</code>,\\n<ul>` (whitespace-only)',
  'ios-provision.md':
    'nested-list indentation: kramdown emits `section\\n    <ul>`, we emit `section\\n<ul>` (whitespace-only)',
  'kramdown.md':
    'the indented `{::options …}` line makes kramdown treat the list item as loose (`<li><p>html_to_native…</p></li>`); we consume the extension so the item stays tight (no visual difference)',
  'rails-plugins.md':
    'link-label continuation: kramdown emits `blog \\npost`, we emit `blog \\n  post` (whitespace-only)',
  'rails-routes.md':
    'list-item continuation: kramdown emits `\\n (See included modules)`, we emit `\\n    (See included modules)` (whitespace-only)'
}

/** Files matched by the sheet glob that are documentation, not cheatsheets. */
const NO_FIXTURE: Record<string, string> = {
  'AGENTS.md': 'agent instructions, not a sheet',
  '_docs/writing-guidelines.md': 'documentation, not a sheet'
}

it('renders every sheet identically to kramdown (normalized)', async () => {
  const pages = await getPages()
  const sheets = Object.keys(pages).map((slug) => `${slug}.md`)

  let exact = 0
  let normalized = 0
  const differing: string[] = []
  const compared: string[] = []

  for (const sheet of sheets) {
    if (sheet in NO_FIXTURE) continue

    const fixture = manifest[sheet]
    expect(fixture, `no golden fixture for ${sheet}`).toBeDefined()

    const { markdown } = pages[sheet.replace(/\.md$/, '')]
    const digest = createHash('sha256').update(markdown.trim()).digest('hex')
    expect(digest, `golden fixture is stale for ${sheet}`).toBe(fixture)

    const golden = goldens[`./fixtures/kramdown-golden/${fixture}.html`]
    expect(golden, `missing golden html for ${sheet}`).toBeDefined()

    const { html } = await renderMarkdown(markdown)
    compared.push(sheet)

    if (html === golden) exact++
    else if (normalize(html) === normalize(golden)) normalized++
    else differing.push(sheet)
  }

  // No sheet may be skipped silently.
  expect(compared.length + Object.keys(NO_FIXTURE).length).toBe(sheets.length)
  expect(Object.keys(NO_FIXTURE).every((sheet) => sheets.includes(sheet))).toBe(
    true
  )
  // Every expected diff must still be real, and nothing else may differ.
  expect(differing.sort()).toEqual(Object.keys(EXPECTED_DIFFS).sort())

  console.log(
    `kramdown parity: ${compared.length} sheets compared, ${exact} byte-equal, ` +
      `${normalized} normalized-equal, ${differing.length} expected diffs`
  )
})
