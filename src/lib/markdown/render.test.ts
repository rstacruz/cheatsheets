import { findMatches, parseHighlightSpec } from './inlineHighlight'
import { render } from './render'

it('h3 only', async () => {
  const input = ['### H3', '', 'This is some h3'].join('\n')
  const { html } = await render(input)
  expect(html).toMatchInlineSnapshot(`
    "<section class="h2-section"><div class="body h3-section-list">
    <section class="h3-section"><h3 id="h3">H3</h3><div class="body">
    <p>This is some h3</p></div></section></div></section>"
  `)
})

it('multiple h3s', async () => {
  const input = ['### One', 'x', '### Two', 'y'].join('\n')
  const { html } = await render(input)
  expect(html).toMatchInlineSnapshot(`
    "<section class="h2-section"><div class="body h3-section-list">
    <section class="h3-section"><h3 id="one">One</h3><div class="body">
    <p>x</p>
    </div></section><section class="h3-section"><h3 id="two">Two</h3><div class="body">
    <p>y</p></div></section></div></section>"
  `)
})

it('multiple h2s and h3s', async () => {
  const input = [
    '## Sun',
    '### One',
    'x',
    '### Two',
    'y',
    '## Moon',
    '### Three',
    'x',
    '### Four',
    'y'
  ].join('\n')
  const { html } = await render(input)
  expect(html).toMatchInlineSnapshot(`
    "<section class="h2-section"><h2 id="sun">Sun</h2><div class="body h3-section-list">
    <section class="h3-section"><h3 id="one">One</h3><div class="body">
    <p>x</p>
    </div></section><section class="h3-section"><h3 id="two">Two</h3><div class="body">
    <p>y</p>
    </div></section></div></section><section class="h2-section"><h2 id="moon">Moon</h2><div class="body h3-section-list">
    <section class="h3-section"><h3 id="three">Three</h3><div class="body">
    <p>x</p>
    </div></section><section class="h3-section"><h3 id="four">Four</h3><div class="body">
    <p>y</p></div></section></div></section>"
  `)
})

it('nothing', async () => {
  const input = ['Nothing'].join('\n')
  const { html } = await render(input)
  expect(html).toMatchInlineSnapshot(`
    "<section class="h2-section"><div class="body h3-section-list">
    <section class="h3-section"><div class="body"><p>Nothing</p></div></section></div></section>"
  `)
})

it('h3s with a class', async () => {
  const input = ['### One', 'x', '### Two', '<!-- {: .-prime} -->', 'y'].join(
    '\n'
  )
  const { html } = await render(input)
  expect(html).toMatchInlineSnapshot(`
    "<section class="h2-section"><div class="body h3-section-list">
    <section class="h3-section"><h3 id="one">One</h3><div class="body">
    <p>x</p>
    </div></section><section class="h3-section -prime"><h3 class="-prime" id="two">Two</h3><div class="body -prime">
    <p>y</p></div></section></div></section>"
  `)
})

it('h2 class', async () => {
  const input = [
    '## Intro',
    '<!-- {: .-three-column} -->',
    '### One',
    'x'
  ].join('\n')
  const { html } = await render(input)
  expect(html).toMatchInlineSnapshot(`
    "<section class="h2-section -three-column"><h2 class="-three-column" id="intro">Intro</h2><div class="body h3-section-list -three-column">
    <section class="h3-section"><h3 id="one">One</h3><div class="body">
    <p>x</p></div></section></div></section>"
  `)
})

describe('intro card', () => {
  it('renders nothing without intro or links', async () => {
    const { html } = await render('### One', {})
    expect(html).not.toContain('-intro')
  })

  it('inserts the card at the end when asked', async () => {
    const { html } = await render(
      '## Sun\n\n### One\nx\n\n## Moon\n\n### Two\ny',
      { intro: 'Hello', atEnd: true }
    )
    expect(html.indexOf('id="two"')).toBeLessThan(
      html.indexOf('id="introduction"')
    )
    expect(html).toContain(
      '<p>y</p></div></section><section class="h3-section -intro">'
    )
  })

  it('renders only related links when linksTitle is set', async () => {
    const { html } = await render('### One\nx', {
      intro: 'Hidden intro',
      links: [{ title: 'Docs', url: './docs' }],
      atEnd: true,
      linksTitle: 'Related links'
    })
    expect(html).not.toContain('Hidden intro')
    expect(html).toContain(
      '<h3 class="-intro" id="related-links">Related links</h3>'
    )
    expect(html).toContain('<a href="./docs">Docs</a>')
  })

  it('renders no links card without links', async () => {
    const { html } = await render('### One\nx', {
      intro: 'Hidden intro',
      linksTitle: 'Related links'
    })
    expect(html).not.toContain('Hidden intro')
    expect(html).not.toContain('Related links')
  })

  it('inserts the card in the first section list', async () => {
    const { html } = await render('### One\nx', {
      intro: 'Hello **world**',
      links: [
        { title: 'Docs', url: 'https://example.com/docs' },
        { title: 'Repo', url: 'https://www.github.com/me/repo' }
      ]
    })
    expect(html).toMatchInlineSnapshot(`
      "<section class="h2-section"><div class="body h3-section-list"><section class="h3-section -intro"><h3 class="-intro" id="introduction">Introduction</h3><div class="body -intro"><p>Hello <strong>world</strong></p><ul>
      <li><a href="https://example.com/docs">Docs</a> <em>(example.com)</em></li>
      <li><a href="https://www.github.com/me/repo">Repo</a> <em>(github.com)</em></li>
      </ul></div></section>
      <section class="h3-section"><h3 id="one">One</h3><div class="body">
      <p>x</p></div></section></div></section>"
    `)
  })

  it('inserts the card before a prelude heading', async () => {
    const { html } = await render('A preamble.\n\n### One\nx', {
      intro: 'Hello'
    })
    expect(html).toMatchInlineSnapshot(`
      "<section class="h2-section"><div class="body h3-section-list"><section class="h3-section -intro"><h3 class="-intro" id="introduction">Introduction</h3><div class="body -intro"><p>Hello</p></div></section>
      <section class="h3-section"><div class="body"><p>A preamble.</p>
      </div></section><section class="h3-section"><h3 id="one">One</h3><div class="body">
      <p>x</p></div></section></div></section>"
    `)
  })

  it('keeps leading code out of the card', async () => {
    const { html } = await render('```js\nx()\n```\n\n### One\nx', {
      intro: 'Hello'
    })
    expect(html).toMatchInlineSnapshot(`
      "<section class="h2-section"><div class="body h3-section-list"><section class="h3-section -intro"><h3 class="-intro" id="introduction">Introduction</h3><div class="body -intro"><p>Hello</p></div></section>
      <section class="h3-section"><div class="body"><pre class="language-js"><code class="language-js"><span class="token function">x</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      </code></pre>
      </div></section><section class="h3-section"><h3 id="one">One</h3><div class="body">
      <p>x</p></div></section></div></section>"
    `)
  })

  it('renders a links-only card', async () => {
    const { html } = await render('### One\nx', {
      links: [{ title: 'Guide', url: './guide' }]
    })
    expect(html).toMatchInlineSnapshot(`
      "<section class="h2-section"><div class="body h3-section-list"><section class="h3-section -intro"><h3 class="-intro" id="introduction">Introduction</h3><div class="body -intro"><ul>
      <li><a href="./guide">Guide</a> <em>(devhints.io)</em></li>
      </ul></div></section>
      <section class="h3-section"><h3 id="one">One</h3><div class="body">
      <p>x</p></div></section></div></section>"
    `)
  })

  it('omits the label when the title is the URL or the host', async () => {
    const { html } = await render('### One\nx', {
      links: [
        { title: 'https://go.dev/play/', url: 'https://go.dev/play/' },
        { title: 'browsersync.io', url: 'https://browsersync.io' },
        { title: 'MDN', url: 'https://developer.mozilla.org/x' }
      ]
    })
    expect(html).toContain('>https://go.dev/play/</a>')
    expect(html).toContain('>browsersync.io</a>')
    expect(html).toContain('>MDN</a> <em>(developer.mozilla.org)</em>')
  })

  it('dedupes the introduction id', async () => {
    const { html } = await render('### Introduction\nx', {
      intro: 'Hello'
    })
    expect(html).toContain('<h3 id="introduction">Introduction</h3>')
    expect(html).toContain('<h3 class="-intro" id="introduction-1">')
  })
})

it('inserts the intro card inside the first h2 section', async () => {
  const { html } = await render('## Sun\n\n### One\nx', {
    intro: 'Hello',
    links: [{ title: 'Docs', url: './docs' }]
  })
  expect(html).toMatchInlineSnapshot(`
    "<section class="h2-section"><h2 id="sun">Sun</h2><div class="body h3-section-list"><section class="h3-section -intro"><h3 class="-intro" id="introduction">Introduction</h3><div class="body -intro"><p>Hello</p><ul>
    <li><a href="./docs">Docs</a> <em>(devhints.io)</em></li>
    </ul></div></section>
    <section class="h3-section"><h3 id="one">One</h3><div class="body">
    <p>x</p></div></section></div></section>"
  `)
})

it('keeps a mermaid diagram through post-processing', async () => {
  const input = [
    '### Diagram',
    '',
    '```mermaid',
    'flowchart LR',
    '  accTitle: Hook anatomy',
    '  A["A"] --> B["B"]',
    '```'
  ].join('\n')
  const { html } = await render(input)
  expect(html).toContain('<figure class="MermaidDiagram"')
  expect(html).toContain('<pre class="mermaid MermaidDiagram__source">')
  expect(html).toContain('Hook anatomy</figcaption>')
  expect(html).not.toContain('language-mermaid')
  expect(html).not.toContain('class="token')
})

it('keeps link rows out of a list that ends the intro', async () => {
  const { html } = await render('### One\nx', {
    intro: '- one\n- two',
    links: [{ title: 'Docs', url: './docs' }]
  })
  expect(html.match(/<ul>/g)).toHaveLength(2)
  expect(html).not.toContain('<li><p>one')
  expect(html).toContain('<li><a href="./docs">Docs</a>')
})

describe('inline highlights', () => {
  const fenced = (code: string[], spec: string) =>
    [
      '```python',
      ...code,
      '```',
      '',
      `<!-- {: data-highlight="${spec}"} -->`
    ].join('\n')

  it('wraps the matching text, not the whole line', async () => {
    const { html } = await render(
      fenced(['driver.save_screenshot("page.png")'], 'save_screenshot')
    )
    expect(html).toContain(
      '<span class="inline-highlight inline-highlight--start inline-highlight--end">save_screenshot</span>'
    )
    expect(html).not.toContain(
      '<span class="inline-highlight inline-highlight--start inline-highlight--end">driver'
    )
  })

  it('pads only the outer fragments of a match crossing Prism tokens', async () => {
    const { html } = await render(
      fenced(['driver.save_screenshot("page.png")'], 'driver.save_screenshot')
    )
    expect(html).toContain(
      '<span class="inline-highlight inline-highlight--start">driver</span>'
    )
    expect(html).toContain('<span class="inline-highlight">.</span>')
    expect(html).toContain(
      '<span class="inline-highlight inline-highlight--end">save_screenshot</span>'
    )
  })

  it('accepts several semicolon-separated tokens', async () => {
    const { html } = await render(
      fenced(
        ['driver.save_screenshot("page.png")', 'pdf = driver.print_page()'],
        'save_screenshot; print_page'
      )
    )
    expect(html).toContain(
      '<span class="inline-highlight inline-highlight--start inline-highlight--end">save_screenshot</span>'
    )
    expect(html).toContain(
      '<span class="inline-highlight inline-highlight--start inline-highlight--end">print_page</span>'
    )
  })
  it('highlights a token containing braces', async () => {
    const { html } = await render(
      [
        '```jsx',
        '<li key={item.id}>{item.name}</li>',
        '```',
        '<!-- {: data-highlight="key={item.id}"} -->'
      ].join('\n')
    )
    expect(html).toContain('inline-highlight')
    expect(html).not.toContain('<!-- {:')
  })

  it('highlights a token containing double quotes', async () => {
    const { html } = await render(
      [
        '```bash',
        'resource "aws_instance" "web"',
        '```',
        `<!-- {: data-highlight='resource "aws_instance" "web"'} -->`
      ].join('\n')
    )
    expect(html).toContain('inline-highlight')
    expect(html).not.toContain('<!-- {:')
  })

  it('leaves a block alone when no text matches', async () => {
    const { html } = await render(
      fenced(['driver.save_screenshot("page.png")'], 'wait_for')
    )
    expect(html).not.toContain('inline-highlight')
  })

  it('splits only on semicolons, so commas stay in a token', () => {
    expect(parseHighlightSpec('save_screenshot; print_page, flush')).toEqual([
      'save_screenshot',
      'print_page, flush'
    ])
  })

  it('matches on identifier boundaries', () => {
    expect(findMatches('bat -d --diff-context=1', ['-d'])).toEqual([
      { start: 4, end: 6 }
    ])
    expect(findMatches('myfield.text context', ['text'])).toEqual([
      { start: 8, end: 12 }
    ])
    expect(findMatches('find_elements', ['find_element'])).toEqual([])
  })
})
