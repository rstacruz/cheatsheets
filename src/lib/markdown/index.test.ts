import { readFileSync } from 'node:fs'
import matter from 'gray-matter'
import { describe, expect, it } from 'vitest'
import { renderMarkdown } from './index'
import { TABLE_SENTINEL_LANG } from './tables'

describe('renderMarkdown', () => {
  it('renders a paragraph', async () => {
    expect((await renderMarkdown('hola mundo')).html).toBe('<p>hola mundo</p>')
  })

  it('renders an H1 with a slug id', async () => {
    expect((await renderMarkdown('# hola mundo')).html).toBe(
      '<h1 id="hola-mundo">hola mundo</h1>'
    )
  })

  it('applies an own-line IAL to the previous heading', async () => {
    expect((await renderMarkdown('# hola mundo\n{: .heading}')).html).toBe(
      '<h1 class="heading" id="hola-mundo">hola mundo</h1>'
    )
  })

  it('splits a multi-class IAL written without spaces', async () => {
    expect((await renderMarkdown('# hola\n{: .a.b}')).html).toBe(
      '<h1 class="a b" id="hola">hola</h1>'
    )
  })

  it('strips {% raw %} tags', async () => {
    const input = ['{% raw %}', 'This is some text', '{% endraw %}'].join('\n')
    expect((await renderMarkdown(input)).html).toBe('<p>This is some text</p>')
  })

  it('strips {%raw%} tags without spaces', async () => {
    const input = ['{%raw%}', 'This is some text', '{%endraw%}'].join('\n')
    expect((await renderMarkdown(input)).html).toBe('<p>This is some text</p>')
  })

  it('keeps following lines inside the paragraph after {% raw %}', async () => {
    const input = [
      '{% raw %}',
      'This is some text',
      '{% endraw %}',
      'next line'
    ].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<p>This is some text\nnext line</p>'
    )
  })

  it('separates paragraphs after {% raw %}', async () => {
    const input = [
      '{% raw %}',
      'This is some text',
      '{% endraw %}',
      '',
      'next paragraph'
    ].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<p>This is some text</p>\n<p>next paragraph</p>'
    )
  })

  it('expands {% include %} and applies the include’s IAL', async () => {
    const input = [
      '{% include common/moment_format.md title="Moment" %}',
      'This is some text'
    ].join('\n')
    const { html } = await renderMarkdown(input)
    expect(html).toContain('<h2 class="-three-column" id="moment">Moment</h2>')
    expect(html).toContain('<p>This is some text</p>')
  })

  it('removes {% raw %} from react.md', async () => {
    const content = matter(readFileSync('react.md', 'utf8')).content
    const { html } = await renderMarkdown(content)
    expect(html).not.toContain('%raw%')
    expect(html).not.toContain('% raw %')
  })

  it('keeps language-* on <code> when a fence has an IAL', async () => {
    expect(
      (await renderMarkdown('```ruby\nx\n```\n{: .-setup data-line="1"}')).html
    ).toBe(
      '<pre class="-setup" data-line="1"><code class="language-ruby">x\n</code></pre>'
    )
  })

  it('moves IAL classes to <pre> for a fence without a language', async () => {
    expect((await renderMarkdown('```\nx\n```\n{: .-setup}')).html).toBe(
      '<pre class="-setup"><code>x\n</code></pre>'
    )
  })
})

describe('compat transforms', () => {
  it('autolinks a bare URL', async () => {
    expect((await renderMarkdown('see http://example.com now')).html).toBe(
      '<p>see <a href="http://example.com">http://example.com</a> now</p>'
    )
  })

  it('autolinks an explicit <url> the same way', async () => {
    expect((await renderMarkdown('see <http://example.com> now')).html).toBe(
      '<p>see <a href="http://example.com">http://example.com</a> now</p>'
    )
  })

  it('rejects include paths that climb out of _includes', async () => {
    await expect(
      renderMarkdown('{% include common/../../../secret.md title="X" %}')
    ).rejects.toThrow('Invalid include')
  })
})

describe('kramdown tables', () => {
  it('splits a new <tbody> on every extra separator row', async () => {
    const input = [
      '| H1 | H2 |',
      '| --- | --- |',
      '| a | b |',
      '| --- | --- |',
      '| c | d |'
    ].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<table><thead><tr><th>H1</th><th>H2</th></tr></thead>' +
        '<tbody><tr><td>a</td><td>b</td></tr></tbody>' +
        '<tbody><tr><td>c</td><td>d</td></tr></tbody></table>'
    )
  })

  it('unescapes \\| without splitting the cell', async () => {
    const input = ['| H1 | H2 |', '| --- | --- |', '| a \\| b | c |'].join('\n')
    expect((await renderMarkdown(input)).html).toContain('<td>a | b</td>')
  })

  it('keeps pipes inside code spans in one cell', async () => {
    const input = ['| `a|b` | c |', '| --- | --- |', '| d | e |'].join('\n')
    expect((await renderMarkdown(input)).html).toContain(
      '<th><code>a|b</code></th><th>c</th>'
    )
  })

  it('applies an own-line IAL to the table', async () => {
    const input = [
      '| H1 | H2 |',
      '| --- | --- |',
      '| a | b |',
      '{: .-shortcuts}'
    ].join('\n')
    expect((await renderMarkdown(input)).html).toContain(
      '<table class="-shortcuts">'
    )
  })

  it('does not treat a line whose only pipe is in a code span as a table', async () => {
    expect((await renderMarkdown('foo `a|b` bar')).html).toBe(
      '<p>foo <code>a|b</code> bar</p>'
    )
  })

  it('pads a short row to the widest row with nbsp', async () => {
    const input = ['| H1 | H2 | H3 |', '| --- | --- | --- |', '| a | b |'].join(
      '\n'
    )
    expect((await renderMarkdown(input)).html).toBe(
      '<table><thead><tr><th>H1</th><th>H2</th><th>H3</th></tr></thead>' +
        '<tbody><tr><td>a</td><td>b</td><td>\u00a0</td></tr></tbody></table>'
    )
  })

  it('widens the table to the longest row', async () => {
    const input = ['| H1 | H2 |', '| --- | --- |', '| a | b | c |'].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<table><thead><tr><th>H1</th><th>H2</th><th>\u00a0</th></tr></thead>' +
        '<tbody><tr><td>a</td><td>b</td><td>c</td></tr></tbody></table>'
    )
  })

  it('renders an empty cell as nbsp', async () => {
    const input = ['| H1 | H2 |', '| --- | --- |', '| a |  |'].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<table><thead><tr><th>H1</th><th>H2</th></tr></thead>' +
        '<tbody><tr><td>a</td><td>\u00a0</td></tr></tbody></table>'
    )
  })

  it('does not require leading or trailing pipes', async () => {
    const input = ['H1 | H2', '--- | ---', 'a | b'].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<table><thead><tr><th>H1</th><th>H2</th></tr></thead>' +
        '<tbody><tr><td>a</td><td>b</td></tr></tbody></table>'
    )
  })

  it('keeps an escaped pipe inside a code span verbatim', async () => {
    const input = ['| H1 | H2 |', '| --- | --- |', '| `a\\|b` | c |'].join('\n')
    expect((await renderMarkdown(input)).html).toContain(
      '<td><code>a\\|b</code></td><td>c</td>'
    )
  })

  it('does not table-ify pipes inside span-level HTML', async () => {
    expect((await renderMarkdown('<span>a | b</span>')).html).toBe(
      '<p><span>a | b</span></p>'
    )
    expect((await renderMarkdown('<img src="a|b.png">')).html).toBe(
      '<img src="a|b.png" />'
    )
    expect((await renderMarkdown('<!-- a | b -->')).html).toBe('<!-- a | b -->')
  })

  it('still tables a bare pipe beside inline HTML', async () => {
    const input = ['| H1 | H2 |', '| --- | --- |', 'x<br> | y'].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<table><thead><tr><th>H1</th><th>H2</th></tr></thead>' +
        '<tbody><tr><td>x<br /></td><td>y</td></tr></tbody></table>'
    )
  })

  it('leaves table-like rows inside a longer code fence untouched', async () => {
    const input = ['````', '```', '', '| a | b |', '````'].join('\n')
    const { html } = await renderMarkdown(input)
    expect(html).not.toContain(TABLE_SENTINEL_LANG)
    expect(html).toBe('<pre><code>```\n\n| a | b |\n</code></pre>')
  })
})

describe('typography', () => {
  it('leaves punctuation as written', async () => {
    expect((await renderMarkdown('a -- b --- c ... "q" \'s\'')).html).toBe(
      '<p>a -- b --- c ... "q" \'s\'</p>'
    )
  })

  it('leaves code spans, fences and raw <code> alone', async () => {
    expect((await renderMarkdown('`x -- y "q"`')).html).toBe(
      '<p><code>x -- y "q"</code></p>'
    )
    expect((await renderMarkdown('```\nx -- y "q"\n```')).html).toBe(
      '<pre><code>x -- y "q"\n</code></pre>'
    )
    expect((await renderMarkdown('<code>x -- y "q"</code>')).html).toBe(
      '<p><code>x -- y "q"</code></p>'
    )
  })
})

describe('list tightness', () => {
  it('wraps a blank-separated item in <p>', async () => {
    const { html } = await renderMarkdown('* a\n\n* b')
    expect(html).toMatch(/<li>\s*<p>a<\/p>/)
    expect(html).toMatch(/<li>\s*<p>b<\/p>/)
  })

  it('wraps a paragraph separated from a following block by a blank line', async () => {
    const { html } = await renderMarkdown('- a\n\n  ```\n  x\n  ```\n- b')
    expect(html).toBe(
      '<ul>\n<li>\n<p>a</p>\n<pre><code>x\n</code></pre>\n</li>\n' +
        '<li>\n<p>b</p>\n</li>\n</ul>'
    )
  })
})
