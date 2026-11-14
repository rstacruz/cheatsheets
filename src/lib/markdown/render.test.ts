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

it('keeps link rows out of a list that ends the intro', async () => {
  const { html } = await render('### One\nx', {
    intro: '- one\n- two',
    links: [{ title: 'Docs', url: './docs' }]
  })
  expect(html.match(/<ul>/g)).toHaveLength(2)
  expect(html).not.toContain('<li><p>one')
  expect(html).toContain('<li><a href="./docs">Docs</a>')
})
