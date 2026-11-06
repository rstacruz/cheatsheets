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

  it('expands {% include %} and applies the include’s attributes', async () => {
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
})

describe('comment attributes', () => {
  it('applies an attribute comment to the heading above it', async () => {
    expect(
      (await renderMarkdown('## Hola\n\n<!-- {: .-two-column} -->')).html
    ).toBe('<h2 class="-two-column" id="hola">Hola</h2>')
  })

  it('applies one to the fence above it, keeping the language', async () => {
    expect(
      (
        await renderMarkdown(
          '```ruby\nx\n```\n<!-- {: .-setup data-line="1"} -->'
        )
      ).html
    ).toBe(
      '<pre class="-setup" data-line="1"><code class="language-ruby">x\n</code></pre>'
    )
  })

  it('applies one to the table above it', async () => {
    const input = [
      '| A | B |',
      '| --- | --- |',
      '| 1 | 2 |',
      '',
      '<!-- {: .-key-values} -->'
    ].join('\n')
    expect((await renderMarkdown(input)).html).toContain(
      '<table class="-key-values">'
    )
  })

  it('applies one to the list above it', async () => {
    const input = ['- [A](/a)', '- [B](/b)', '<!-- {: .-also-see} -->'].join(
      '\n'
    )
    expect((await renderMarkdown(input)).html).toBe(
      '<ul class="-also-see">\n<li><a href="/a">A</a></li>\n<li><a href="/b">B</a></li>\n</ul>'
    )
  })

  it('applies one to the paragraph above it', async () => {
    expect(
      (await renderMarkdown('[A](/a)\n\n<!-- {: .-crosslink} -->')).html
    ).toBe('<p class="-crosslink"><a href="/a">A</a></p>')
  })

  it('splits classes written without spaces', async () => {
    expect((await renderMarkdown('## H\n<!-- {: .a.b} -->')).html).toBe(
      '<h2 class="a b" id="h">H</h2>'
    )
  })

  it('reads single-quoted values', async () => {
    expect((await renderMarkdown("## H\n<!-- {: id='x'} -->")).html).toBe(
      '<h2 id="x">H</h2>'
    )
  })

  it('removes the comment from the output', async () => {
    const input = ['## H', '', '<!-- {: .a} -->', '', 'text'].join('\n')
    expect((await renderMarkdown(input)).html).not.toContain('<!--')
  })

  it('leaves an orphan comment alone without crashing', async () => {
    expect((await renderMarkdown('<!-- {: .a} -->')).html).toBe(
      '<!-- {: .a} -->'
    )
  })

  it('leaves a comment with no attributes in place', async () => {
    expect((await renderMarkdown('# H\n<!-- {: } -->')).html).toBe(
      '<h1 id="h">H</h1>\n<!-- {: } -->'
    )
  })

  it('leaves an inline comment alone', async () => {
    expect((await renderMarkdown('text <!-- {: .a} -->')).html).toBe(
      '<p>text <!-- {: .a} --></p>'
    )
  })

  it('applies one to the block inside a blockquote', async () => {
    expect((await renderMarkdown('> quote\n>\n> <!-- {: .a} -->')).html).toBe(
      '<blockquote>\n<p class="a">quote</p>\n</blockquote>'
    )
  })

  it('applies one inside a footnote definition', async () => {
    const input = ['Text[^a]', '', '[^a]: note', '    <!-- {: .a} -->'].join(
      '\n'
    )
    expect((await renderMarkdown(input)).html).toContain('<p class="a">note')
  })

  it('leaves a comment after a footnote definition alone', async () => {
    const input = ['Text[^a]', '', '[^a]: note', '<!-- {: .a} -->'].join('\n')
    expect((await renderMarkdown(input)).html).toContain('<!-- {: .a} -->')
  })

  it('leaves a comment after a link definition alone', async () => {
    expect((await renderMarkdown('[a]: /x\n<!-- {: .a} -->')).html).toBe(
      '<!-- {: .a} -->'
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
