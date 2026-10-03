import { readFileSync } from 'node:fs'
import matter from 'gray-matter'
import { describe, expect, it } from 'vitest'
import {
  dropUnterminatedIALs,
  escapeWhitespaceCodeSpans,
  refloatIALs
} from './ial'
import { renderMarkdown } from './index'

// kramdown emits a newline per block, plus one per blank line
describe('renderMarkdown', () => {
  it('renders a paragraph', async () => {
    expect((await renderMarkdown('hola mundo')).html).toBe(
      '<p>hola mundo</p>\n'
    )
  })

  it('renders an H1 with a slug id', async () => {
    expect((await renderMarkdown('# hola mundo')).html).toBe(
      '<h1 id="hola-mundo">hola mundo</h1>\n'
    )
  })

  it('applies an own-line IAL to the previous heading', async () => {
    expect((await renderMarkdown('# hola mundo\n{: .heading}')).html).toBe(
      '<h1 class="heading" id="hola-mundo">hola mundo</h1>\n'
    )
  })

  it('splits a multi-class IAL written without spaces', async () => {
    expect((await renderMarkdown('# hola\n{: .a.b}')).html).toBe(
      '<h1 class="a b" id="hola">hola</h1>\n'
    )
  })

  it('strips {% raw %} tags', async () => {
    const input = ['{% raw %}', 'This is some text', '{% endraw %}'].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<p>This is some text</p>\n'
    )
  })

  it('strips {%raw%} tags without spaces', async () => {
    const input = ['{%raw%}', 'This is some text', '{%endraw%}'].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<p>This is some text</p>\n'
    )
  })

  it('keeps following lines inside the paragraph after {% raw %}', async () => {
    const input = [
      '{% raw %}',
      'This is some text',
      '{% endraw %}',
      'next line'
    ].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<p>This is some text\nnext line</p>\n'
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
      '<p>This is some text</p>\n\n<p>next paragraph</p>\n'
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
      '<pre class="-setup" data-line="1"><code class="language-ruby">x\n</code></pre>\n'
    )
  })

  it('moves IAL classes to <pre> for a fence without a language', async () => {
    expect((await renderMarkdown('```\nx\n```\n{: .-setup}')).html).toBe(
      '<pre class="-setup"><code>x\n</code></pre>\n'
    )
  })

  it('emits no id for headings with an empty slug', async () => {
    expect((await renderMarkdown('### ⌘')).html).toBe('<h3>⌘</h3>\n')
  })
})

describe('compat transforms', () => {
  it('leaves a bare URL as literal text', async () => {
    expect((await renderMarkdown('see http://example.com now')).html).toBe(
      '<p>see http://example.com now</p>\n'
    )
  })

  it('rewrites remark-gfm task lists into kramdown markup', async () => {
    expect((await renderMarkdown('- [ ] todo\n- [x] done')).html).toBe(
      '<ul class="task-list">\n' +
        '<li class="task-list-item">' +
        '<input type="checkbox" class="task-list-item-checkbox" disabled="disabled" /> todo</li>\n' +
        '<li class="task-list-item">' +
        '<input type="checkbox" class="task-list-item-checkbox" disabled="disabled" checked="checked" /> done</li>\n' +
        '</ul>\n'
    )
  })

  it('wraps a lone <br /> block in a paragraph', async () => {
    expect((await renderMarkdown('a\n\n<br />\n\nb')).html).toBe(
      '<p>a</p>\n\n<p><br /></p>\n\n<p>b</p>\n'
    )
  })

  it('drops a {::options ... /} block extension', async () => {
    expect(
      (await renderMarkdown('{::options parse_block_html="true" /}\n\n# Hi'))
        .html
    ).toBe('<h1 id="hi">Hi</h1>\n')
  })

  it('trims whitespace-only lines from an indented code block', async () => {
    expect((await renderMarkdown('    code\n    \n\nafter')).html).toBe(
      '<pre><code>code\n</code></pre>\n<p>after</p>\n'
    )
  })

  it('rejects include paths that climb out of _includes', async () => {
    await expect(
      renderMarkdown('{% include common/../../../secret.md title="X" %}')
    ).rejects.toThrow('Invalid include')
  })
})

describe('kramdown tables', () => {
  it('renders a headerless table', async () => {
    expect((await renderMarkdown('| a | b |\n| c | d |')).html).toBe(
      '<table><tbody><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></tbody></table>\n'
    )
  })

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
        '<tbody><tr><td>c</td><td>d</td></tr></tbody></table>\n'
    )
  })

  it('renders a <tfoot> for an `=` separator row', async () => {
    const input = [
      '| H1 | H2 |',
      '| --- | --- |',
      '| a | b |',
      '| === | === |',
      '| f | g |'
    ].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<table><thead><tr><th>H1</th><th>H2</th></tr></thead>' +
        '<tbody><tr><td>a</td><td>b</td></tr></tbody>' +
        '<tfoot><tr><td>f</td><td>g</td></tr></tfoot></table>\n'
    )
  })

  it('renders alignment as inline styles', async () => {
    const input = [
      '| H1 | H2 | H3 | H4 |',
      '|:---|:---:|---:|---|',
      '| a | b | c | d |'
    ].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<table><thead><tr><th style="text-align: left">H1</th>' +
        '<th style="text-align: center">H2</th>' +
        '<th style="text-align: right">H3</th><th>H4</th></tr></thead>' +
        '<tbody><tr><td style="text-align: left">a</td>' +
        '<td style="text-align: center">b</td>' +
        '<td style="text-align: right">c</td><td>d</td></tr></tbody></table>\n'
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
      '<p>foo <code>a|b</code> bar</p>\n'
    )
  })

  it('pads a short row to the widest row with nbsp', async () => {
    const input = ['| H1 | H2 | H3 |', '| --- | --- | --- |', '| a | b |'].join(
      '\n'
    )
    expect((await renderMarkdown(input)).html).toBe(
      '<table><thead><tr><th>H1</th><th>H2</th><th>H3</th></tr></thead>' +
        '<tbody><tr><td>a</td><td>b</td><td>\u00a0</td></tr></tbody></table>\n'
    )
  })

  it('widens the table to the longest row', async () => {
    const input = ['| H1 | H2 |', '| --- | --- |', '| a | b | c |'].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<table><thead><tr><th>H1</th><th>H2</th><th>\u00a0</th></tr></thead>' +
        '<tbody><tr><td>a</td><td>b</td><td>c</td></tr></tbody></table>\n'
    )
  })

  it('renders an empty cell as nbsp', async () => {
    const input = ['| H1 | H2 |', '| --- | --- |', '| a |  |'].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<table><thead><tr><th>H1</th><th>H2</th></tr></thead>' +
        '<tbody><tr><td>a</td><td>\u00a0</td></tr></tbody></table>\n'
    )
  })

  it('accepts `+` in a header separator row', async () => {
    const input = ['| a | b |', '|+---+---+', '| c | d |'].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<table><thead><tr><th>a</th><th>b</th></tr></thead>' +
        '<tbody><tr><td>c</td><td>d</td></tr></tbody></table>\n'
    )
  })

  it('does not require leading or trailing pipes', async () => {
    const input = ['H1 | H2', '--- | ---', 'a | b'].join('\n')
    expect((await renderMarkdown(input)).html).toBe(
      '<table><thead><tr><th>H1</th><th>H2</th></tr></thead>' +
        '<tbody><tr><td>a</td><td>b</td></tr></tbody></table>\n'
    )
  })

  it('keeps an escaped pipe inside a code span verbatim', async () => {
    const input = ['| H1 | H2 |', '| --- | --- |', '| `a\\|b` | c |'].join('\n')
    expect((await renderMarkdown(input)).html).toContain(
      '<td><code>a\\|b</code></td><td>c</td>'
    )
  })
})

describe('kramdown typographic symbols', () => {
  it('renders en and em dashes', async () => {
    expect((await renderMarkdown('a -- b')).html).toBe('<p>a \u2013 b</p>\n')
    expect((await renderMarkdown('a --- b')).html).toBe('<p>a \u2014 b</p>\n')
  })

  it('renders an ellipsis', async () => {
    expect((await renderMarkdown('some ... text')).html).toBe(
      '<p>some \u2026 text</p>\n'
    )
  })

  it('renders guillemets with kramdown nbsp padding', async () => {
    expect((await renderMarkdown('<< a >>')).html).toBe(
      '<p>\u00ab\u00a0a\u00a0\u00bb</p>\n'
    )
  })

  it('leaves code spans alone', async () => {
    expect((await renderMarkdown('`x -- y "q"`')).html).toBe(
      '<p><code>x -- y "q"</code></p>\n'
    )
  })

  it('leaves fenced code alone', async () => {
    expect((await renderMarkdown('```\nx -- y "q"\n```')).html).toBe(
      '<pre><code>x -- y "q"\n</code></pre>\n'
    )
  })

  it('leaves raw <code> content alone', async () => {
    expect((await renderMarkdown('<code>x -- y "q"</code>')).html).toBe(
      '<p><code>x -- y "q"</code></p>\n'
    )
  })
})

describe('kramdown smart quotes', () => {
  it('curls double quotes in prose', async () => {
    expect((await renderMarkdown('He said "hello" to me')).html).toBe(
      '<p>He said \u201chello\u201d to me</p>\n'
    )
  })

  it('curls single quotes and apostrophes in prose', async () => {
    expect((await renderMarkdown("It's a 'test' here")).html).toBe(
      '<p>It\u2019s a \u2018test\u2019 here</p>\n'
    )
  })

  it('opens a quote that starts an emphasis span', async () => {
    expect((await renderMarkdown('*"hi"*')).html).toBe(
      '<p><em>\u201chi\u201d</em></p>\n'
    )
  })
})

describe('IAL shims', () => {
  it('drops an unterminated IAL with no closing brace', () => {
    expect(dropUnterminatedIALs('```\nx\n```\n{: .-shortcuts')).toBe(
      '```\nx\n```'
    )
  })

  it('drops a same-line IAL whose quoted value never closes', () => {
    expect(dropUnterminatedIALs('```\nx\n```\n{: data-line="1,3,5,7 }')).toBe(
      '```\nx\n```'
    )
  })

  it('keeps a well-formed IAL', () => {
    expect(dropUnterminatedIALs('# h\n{: .heading}')).toBe('# h\n{: .heading}')
  })

  it('keeps an unterminated IAL that sits inside a fence', () => {
    const input = '```\n{: .-shortcuts\n```'
    expect(dropUnterminatedIALs(input)).toBe(input)
  })

  it('swallows up to the next `}` and re-emits the classes (kramdown quirk)', () => {
    const input = [
      '| a | b |',
      '| --- | --- |',
      '| c | d |',
      '{: .-shortcuts',
      '',
      '### Swallowed',
      '',
      '| e | f |',
      '| --- | --- |',
      '| g | h |',
      '{: .-shortcuts-right}'
    ].join('\n')
    expect(dropUnterminatedIALs(input)).toBe(
      [
        '| a | b |',
        '| --- | --- |',
        '| c | d |',
        '{: .-shortcuts .-shortcuts-right }'
      ].join('\n')
    )
  })

  it('escapes single-backtick spans whose content starts with whitespace', () => {
    expect(escapeWhitespaceCodeSpans('a `  ` b')).toBe('a \\`  \\` b')
    expect(escapeWhitespaceCodeSpans('a ` x` b')).toBe('a \\` x` b')
    expect(escapeWhitespaceCodeSpans('a `  x  ` b')).toBe('a \\`  x  \\` b')
  })

  it('leaves parsed code spans alone', () => {
    expect(escapeWhitespaceCodeSpans('a `x ` b')).toBe('a `x ` b')
    expect(escapeWhitespaceCodeSpans('a `a b` b')).toBe('a `a b` b')
    expect(escapeWhitespaceCodeSpans('a ``  `` b')).toBe('a ``  `` b')
  })

  it('refloats an IAL that follows a blank line to the next block', () => {
    expect(refloatIALs('```\nx\n```\n\n{: .-wrap}\n\nhello')).toBe(
      '```\nx\n```\n\n\nhello\n{: .-wrap}'
    )
  })

  it('leaves a trailing IAL in place', () => {
    expect(refloatIALs('# h\n{: .heading}')).toBe('# h\n{: .heading}')
  })
})

describe('list tightness', () => {
  it('keeps a nested list tight, like kramdown', async () => {
    const input = [
      '  * Collection:',
      '    * add',
      '',
      '  * Model:',
      '    * change'
    ].join('\n')
    const { html } = await renderMarkdown(input)
    expect(html).toContain('<li>Collection:\n<ul>')
    expect(html).not.toContain('<li><p>Collection:</p>')
  })

  it('wraps a blank-separated item in <p>', async () => {
    const { html } = await renderMarkdown('* a\n\n* b')
    expect(html).toMatch(/<li>\s*<p>a<\/p>/)
    expect(html).toMatch(/<li>\s*<p>b<\/p>/)
  })
})
