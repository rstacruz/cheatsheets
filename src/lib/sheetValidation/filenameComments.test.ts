import type { RootContent } from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { isSheetSlug } from './baseline'
import { sheetSources, type SheetFinding } from './sheets'
import { FENCE_LINE } from './utils'

const processor = unified().use(remarkParse).use(remarkGfm)

/** File extensions that can name a code block */
const EXTENSIONS = [
  'toml',
  'ya?ml',
  'json',
  'jsx?',
  'tsx?',
  'rb',
  'py',
  'sh',
  'bash',
  'zsh',
  'fish',
  'conf',
  'ini',
  'cfg',
  'lua',
  'vim',
  'sql',
  'html',
  'css',
  'scss',
  'md',
  'txt',
  'xml',
  'csv',
  'go',
  'rs',
  'c',
  'h',
  'cc',
  'cpp',
  'java',
  'kt',
  'ex',
  'exs',
  'erb',
  'haml',
  'slim',
  'php',
  'pl',
  'ps1',
  'bat',
  'env',
  'lock',
  'gradle',
  'properties',
  'service',
  'nginx',
  'tf',
  'hcl',
  'tftest',
  'graphql',
  'prisma',
  'proto',
  'nix',
  'el',
  'tex',
  'rst',
  'vue',
  'svelte',
  'astro'
].join('|')

/** Files with no extension that still name a block */
const EXTENSIONLESS = [
  'Dockerfile',
  'Makefile',
  'Gemfile',
  'Rakefile',
  'Procfile',
  'Vagrantfile',
  'Justfile'
].join('|')

/** A path whose basename names a file, relative or under `~` */
const FILENAME = new RegExp(
  `^(?:[\\w.@%$~-]+/)*(?:[\\w.@-]+\\.(?:${EXTENSIONS})|${EXTENSIONLESS})$`
)

/** A bare token with a top-level-domain suffix is a hostname, not a file */
const TLD = /\.(?:org|com|net|io|dev)$/i

const MARKER = /^(?:<!--|\/\*|\/\/|--|#|;|%) /

/** The filename a whole-line comment labels, if it labels one */
function commentFilename(line: string): string | undefined {
  const marker = MARKER.exec(line)
  if (!marker) return undefined

  const rest = line.slice(marker[0].length).replace(/\s*(?:\*\/|-->)$/, '')
  const note = /:\s|\s{2,}/.exec(rest)
  const path = (note ? rest.slice(0, note.index) : rest).trimEnd()

  if (!path || /[\s=(]/.test(path) || path.includes('://')) return undefined
  if (path.startsWith('-') || !FILENAME.test(path)) return undefined
  if (!path.includes('/') && TLD.test(path)) return undefined
  return path
}

type BlockLine = { line: number; text: string }

/** Fenced code-block content lines, with their source line numbers */
function fencedBlocks(source: string): BlockLine[][] {
  const lines = source.split('\n')
  const blocks: BlockLine[][] = []

  const walk = (nodes: RootContent[]) => {
    for (const node of nodes) {
      if (node.type === 'code' && node.position) {
        const start = node.position.start.line
        const end = node.position.end.line
        const opening = FENCE_LINE.exec(lines[start - 1] ?? '')
        if (!opening) continue

        const closing = FENCE_LINE.exec(lines[end - 1] ?? '')
        const closed =
          closing &&
          closing[2][0] === opening[2][0] &&
          closing[2].length >= opening[2].length &&
          closing[3].trim() === ''

        blocks.push(
          lines
            .slice(start, closed ? end - 1 : end)
            .map((text, index) => ({ line: start + index + 1, text }))
        )
      }
      if (
        node.type === 'blockquote' ||
        node.type === 'list' ||
        node.type === 'listItem'
      ) {
        walk(node.children)
      }
    }
  }

  walk(processor.parse(source).children)
  return blocks
}

/**
 * Flags a code block that starts or continues with a comment naming a file.
 * The filename belongs in the H4 heading above the block, so a block that
 * names a second file has to be split.
 */
function findFilenameComments(source: string): SheetFinding[] {
  const found: SheetFinding[] = []

  for (const block of fencedBlocks(source)) {
    const first = block.findIndex(({ text }) => text.trim() !== '')
    block.forEach(({ line, text }, index) => {
      const path = commentFilename(text)
      if (!path) return
      found.push({
        line,
        text:
          index === first
            ? `${path} belongs in the H4 heading`
            : `${path} starts a second file; split the block`
      })
    })
  }

  return found
}

describe('commentFilename()', () => {
  test('accepts a filename comment', () => {
    expect(commentFilename('# app/models/user.rb')).toBe('app/models/user.rb')
  })

  test('accepts every comment marker', () => {
    expect(commentFilename('// worker.js')).toBe('worker.js')
    expect(commentFilename('-- init.lua')).toBe('init.lua')
    expect(commentFilename('; init.vim')).toBe('init.vim')
    expect(commentFilename('% preamble.tex')).toBe('preamble.tex')
    expect(commentFilename('/* setup.rb */')).toBe('setup.rb')
    expect(commentFilename('<!-- show.html.erb -->')).toBe('show.html.erb')
  })

  test('accepts a home-relative path', () => {
    expect(commentFilename('# ~/.config/yazi/keymap.toml')).toBe(
      '~/.config/yazi/keymap.toml'
    )
  })

  test('accepts an extensionless filename', () => {
    expect(commentFilename('# Gemfile')).toBe('Gemfile')
    expect(commentFilename('# Dockerfile')).toBe('Dockerfile')
  })

  test('strips a trailing note', () => {
    expect(commentFilename('# tmux.conf: let image protocols through')).toBe(
      'tmux.conf'
    )
    expect(commentFilename('# tmux.conf  let image protocols through')).toBe(
      'tmux.conf'
    )
  })

  test('rejects an indented comment', () => {
    expect(commentFilename('  # Include/exclude')).toBeUndefined()
  })

  test('rejects a marker with no space', () => {
    expect(commentFilename('#foo.rb')).toBeUndefined()
  })

  test('rejects a marker with two spaces', () => {
    expect(commentFilename('#  foo.rb')).toBeUndefined()
  })

  test('rejects an xpath', () => {
    expect(commentFilename('//ul/li')).toBeUndefined()
  })

  test('rejects an assignment', () => {
    expect(commentFilename('# syntax=docker/dockerfile:1')).toBeUndefined()
  })

  test('rejects a URL', () => {
    expect(
      commentFilename('# https://github.com/fnando/gem-open')
    ).toBeUndefined()
  })

  test('rejects a flag', () => {
    expect(commentFilename('# --foo.rb')).toBeUndefined()
  })

  test('rejects a call', () => {
    expect(commentFilename('# puts("foo.rb")')).toBeUndefined()
  })

  test('rejects a bare domain', () => {
    expect(commentFilename('# editorconfig.org')).toBeUndefined()
  })

  test('rejects a sentence', () => {
    expect(commentFilename('# Include/exclude')).toBeUndefined()
  })

  test('rejects an unknown extension', () => {
    expect(commentFilename('# notes.xyz')).toBeUndefined()
  })
})

describe('findFilenameComments()', () => {
  test('flags a filename comment on the first line', () => {
    const input = ['```ruby', '# example.rb', 'puts 1', '```'].join('\n')
    expect(findFilenameComments(input)).toEqual([
      { line: 2, text: 'example.rb belongs in the H4 heading' }
    ])
  })

  test('flags a filename comment below the first line', () => {
    const input = ['```ruby', 'puts 1', '# example.rb', 'puts 2', '```']
    expect(findFilenameComments(input.join('\n'))).toEqual([
      { line: 3, text: 'example.rb starts a second file; split the block' }
    ])
  })

  test('treats a leading blank line as no content', () => {
    const input = ['```ruby', '', '# example.rb', 'puts 1', '```']
    expect(findFilenameComments(input.join('\n'))).toEqual([
      { line: 3, text: 'example.rb belongs in the H4 heading' }
    ])
  })

  test('allows a comment inside an indented code block', () => {
    const input = ['    # example.rb', '    puts 1'].join('\n')
    expect(findFilenameComments(input)).toEqual([])
  })

  test('allows a comment outside a code block', () => {
    expect(findFilenameComments('Text about # example.rb')).toEqual([])
  })

  test('allows a comment in a blockquote', () => {
    const input = ['> ```ruby', '> # example.rb', '> puts 1', '> ```'].join(
      '\n'
    )
    expect(findFilenameComments(input)).toEqual([])
  })

  test('allows a comment in a nested list fence', () => {
    const input = ['- item', '', '  ```ruby', '  # example.rb', '  ```'].join(
      '\n'
    )
    expect(findFilenameComments(input)).toEqual([])
  })

  test('flags each block separately', () => {
    const input = [
      '```ruby',
      '# a.rb',
      '```',
      '',
      '```ruby',
      '# b.rb',
      '```'
    ].join('\n')
    expect(findFilenameComments(input)).toEqual([
      { line: 2, text: 'a.rb belongs in the H4 heading' },
      { line: 6, text: 'b.rb belongs in the H4 heading' }
    ])
  })
})

test('filename comments become H4 headings', async () => {
  const findings: string[] = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const { line, text } of findFilenameComments(source)) {
      findings.push(`${slug}:${line}: ${text}`)
    }
  }

  expect(findings).toEqual([])
})
