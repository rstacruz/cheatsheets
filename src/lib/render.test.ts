import { render } from './render'

it('h3 only', async () => {
  const input = ['### H3', '', 'This is some h3'].join('\n')
  const { html } = await render(input)
  expect(html).toMatchInlineSnapshot(`
    "<section class="h2-section"><div class="body h3-section-list">
    <section class="h3-section"><h3 id="h3">H3</h3><div class="body">

    <p>This is some h3</p>
    </div></section></div></section>"
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
    <p>y</p>
    </div></section></div></section>"
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
    <p>y</p>
    </div></section></div></section>"
  `)
})

it('nothing', async () => {
  const input = ['Nothing'].join('\n')
  const { html } = await render(input)
  expect(html).toMatchInlineSnapshot(`
    "<section class="h2-section"><div class="body h3-section-list">
    <section class="h3-section"><div class="body"><p>Nothing</p>
    </div></section></div></section>"
  `)
})

it('h3s with a class', async () => {
  const input = ['### One', 'x', '### Two', '{: .-prime}', 'y'].join('\n')
  const { html } = await render(input)
  expect(html).toMatchInlineSnapshot(`
    "<section class="h2-section"><div class="body h3-section-list">
    <section class="h3-section"><h3 id="one">One</h3><div class="body">
    <p>x</p>
    </div></section><section class="h3-section -prime"><h3 class="-prime" id="two">Two</h3><div class="body -prime">
    <p>y</p>
    </div></section></div></section>"
  `)
})

it('h2 class', async () => {
  const input = ['## Intro', '{: .-three-column}', '### One', 'x'].join('\n')
  const { html } = await render(input)
  expect(html).toMatchInlineSnapshot(`
    "<section class="h2-section -three-column"><h2 class="-three-column" id="intro">Intro</h2><div class="body h3-section-list -three-column">
    <section class="h3-section"><h3 id="one">One</h3><div class="body">
    <p>x</p>
    </div></section></div></section>"
  `)
})
