import { mapGlobToPages } from '../page'
import {
  getArchivedPages,
  getFeaturedPages,
  getListedSheetCount,
  getPagesByCategory,
  getRecentPages,
  getRelatedPages,
  getSnippetPages,
  getSnippetsByCategory,
  getTopPages
} from './queries'

const pages = mapGlobToPages({
  alpha: ['---', 'category: Test', 'weight: -1', '---', 'a'].join('\n'),
  beta: [
    '---',
    'category: Test',
    'weight: -2',
    'deprecated: true',
    '---',
    'b'
  ].join('\n'),
  gamma: [
    '---',
    'category: Test',
    'weight: 0',
    'deprecated_by: /alpha',
    '---',
    'c'
  ].join('\n'),
  delta: ['---', 'category: Test', 'weight: 1', '---', 'd'].join('\n'),
  epsilon: [
    '---',
    'category: Test',
    'weight: 2',
    'archived: Old and unmaintained.',
    '---',
    'e'
  ].join('\n'),
  snippet: [
    '---',
    'title: Snippet',
    'category: Test',
    'layout: snippet',
    'tags: [Featured]',
    'updated: 2024-01-01',
    '---',
    's'
  ].join('\n'),
  tiered: [
    '---',
    'category: Test',
    'tier: t2',
    'last_verified_with: "Tool 1.0."',
    'fragments: [a, b, c, d, e, f, g, h, i, j, k, l]',
    'updated: 2024-06-01',
    'last_verified_at: 2024-06-01',
    '---',
    't'
  ].join('\n'),
  untiered: ['---', 'category: Test', 'updated: 2024-06-02', '---', 'u'].join(
    '\n'
  ),
  tieredT3: [
    '---',
    'category: Test',
    'tier: t3',
    'last_verified_with: "Tool 1.0."',
    'updated: 2024-06-03',
    '---',
    't3'
  ].join('\n')
})

test('related pages skip deprecated sheets', () => {
  const slugs = getRelatedPages(pages, pages.alpha).map((page) => page.slug)

  expect(slugs).toContain('delta')
  expect(slugs).not.toContain('beta')
  expect(slugs).not.toContain('gamma')
})

test('top pages skip deprecated sheets', () => {
  const slugs = getTopPages(pages, pages.alpha).map((page) => page.slug)

  expect(slugs).toContain('delta')
  expect(slugs).not.toContain('beta')
  expect(slugs).not.toContain('gamma')
})

test('category listings skip deprecated sheets', () => {
  const slugs = getPagesByCategory(pages)['Others'].pages.map(
    (page) => page.slug
  )

  expect(slugs).toContain('alpha')
  expect(slugs).not.toContain('beta')
  expect(slugs).not.toContain('gamma')
})

test('homepage listings exclude snippets when asked', () => {
  const categorySlugs = getPagesByCategory(pages, {
    excludeSnippets: true
  })['Others'].pages.map((page) => page.slug)

  expect(categorySlugs).not.toContain('snippet')
  expect(
    getFeaturedPages(pages, { excludeSnippets: true }).map((page) => page.slug)
  ).not.toContain('snippet')
  expect(
    getRecentPages(pages, { excludeSnippets: true }).map((page) => page.slug)
  ).not.toContain('snippet')
})

test('snippet pages are collected separately', () => {
  expect(getSnippetPages(pages).map((page) => page.slug)).toEqual(['snippet'])
})

test('snippets are grouped by category in nav order', () => {
  const snippetPages = mapGlobToPages({
    zeta: [
      '---',
      'title: Zeta',
      'category: Git',
      'layout: snippet',
      '---',
      'z'
    ].join('\n'),
    alpha: [
      '---',
      'title: Alpha',
      'category: CLI',
      'layout: snippet',
      '---',
      'a'
    ].join('\n'),
    beta: [
      '---',
      'title: Beta',
      'category: Git',
      'layout: snippet',
      '---',
      'b'
    ].join('\n'),
    article: ['---', 'title: Article', 'category: CLI', '---', 'x'].join('\n')
  })

  const grouped = getSnippetsByCategory(snippetPages)

  expect(grouped.map((category) => category.title)).toEqual(['CLI', 'Git'])
  expect(grouped[0].pages.map((page) => page.slug)).toEqual(['alpha'])
  expect(grouped[1].pages.map((page) => page.slug)).toEqual(['beta', 'zeta'])
})

test('recent pages only include t1 and t2 sheets', () => {
  const slugs = getRecentPages(pages, { excludeSnippets: true }).map(
    (page) => page.slug
  )

  expect(slugs).toEqual(['tiered'])
  expect(slugs).not.toContain('tieredT3')
})

test('archived sheets are unlisted', () => {
  expect(
    getRelatedPages(pages, pages.alpha).map((page) => page.slug)
  ).not.toContain('epsilon')
  expect(
    getTopPages(pages, pages.alpha).map((page) => page.slug)
  ).not.toContain('epsilon')
  expect(
    getPagesByCategory(pages)['Others'].pages.map((page) => page.slug)
  ).not.toContain('epsilon')
})

const archivePages = mapGlobToPages({
  absinthe: ['---', 'title: absinthe', 'category: Hidden', '---', 'a'].join(
    '\n'
  ),
  Zeta: ['---', 'title: Zeta', 'category: Hidden', '---', 'z'].join('\n'),
  'tests/basic': ['---', 'title: Basic', 'category: Hidden', '---', 'b'].join(
    '\n'
  ),
  legacy: [
    '---',
    'title: Legacy',
    'category: JavaScript',
    'deprecated: true',
    '---',
    'l'
  ].join('\n'),
  old: [
    '---',
    'title: Old',
    'category: JavaScript',
    'archived: No longer maintained.',
    '---',
    'o'
  ].join('\n'),
  react: ['---', 'title: React', 'category: JavaScript', '---', 'r'].join('\n')
})

test('archive pages are hidden, deprecated, or archived sheets sorted by title, case-insensitively', () => {
  const slugs = getArchivedPages(archivePages).map((page) => page.slug)

  // case-sensitive sort puts 'Legacy' and 'Zeta' first (uppercase < lowercase);
  // the lowercased sort puts absinthe first.
  expect(slugs).toEqual(['absinthe', 'legacy', 'old', 'Zeta'])
})

test('archive pages skip listed sheets and test fixtures', () => {
  const slugs = getArchivedPages(archivePages).map((page) => page.slug)

  expect(slugs).not.toContain('react')
  expect(slugs).not.toContain('tests/basic')
})

test('listed count excludes hidden, deprecated, and archived sheets', () => {
  expect(getListedSheetCount(pages)).toBe(6)
  expect(getListedSheetCount(archivePages)).toBe(1)
})
