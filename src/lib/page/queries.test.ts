import { mapGlobToPages } from '../page'
import {
  getArchivedPages,
  getFeaturedPages,
  getListedSheetCount,
  getNewPages,
  getPagesByCategory,
  getRecentPages,
  getRelatedPages,
  getSnippetPages,
  getSnippetsByCategory,
  getTopPages,
  getUpdatedPages
} from './queries'

const pages = mapGlobToPages({
  alpha: [
    '---',
    'category: Test',
    'created_at: 2020-01-01',
    'weight: -1',
    '---',
    'a'
  ].join('\n'),
  beta: [
    '---',
    'category: Test',
    'created_at: 2020-01-01',
    'weight: -2',
    'deprecated: true',
    '---',
    'b'
  ].join('\n'),
  gamma: [
    '---',
    'category: Test',
    'created_at: 2020-01-01',
    'weight: 0',
    'deprecated_by: /alpha',
    '---',
    'c'
  ].join('\n'),
  delta: [
    '---',
    'category: Test',
    'created_at: 2020-01-01',
    'weight: 1',
    '---',
    'd'
  ].join('\n'),
  epsilon: [
    '---',
    'category: Test',
    'created_at: 2020-01-01',
    'weight: 2',
    'archived: Old and unmaintained.',
    '---',
    'e'
  ].join('\n'),
  snippet: [
    '---',
    'title: Snippet',
    'category: Test',
    'created_at: 2020-01-01',
    'layout: snippet',
    'tags: [Featured]',
    'updated: 2024-01-01',
    '---',
    's'
  ].join('\n'),
  tiered: [
    '---',
    'category: Test',
    'created_at: 2020-01-01',
    'tier: t2',
    'last_verified_with: "Tool 1.0."',
    'fragments: [a, b, c, d, e, f, g, h, i, j, k, l]',
    'updated: 2024-06-01',
    'last_verified_at: 2024-06-01',
    '---',
    't'
  ].join('\n'),
  untiered: [
    '---',
    'category: Test',
    'created_at: 2020-01-01',
    'updated: 2024-06-02',
    '---',
    'u'
  ].join('\n'),
  tieredT3: [
    '---',
    'category: Test',
    'created_at: 2020-01-01',
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
      'created_at: 2020-01-01',
      'layout: snippet',
      '---',
      'z'
    ].join('\n'),
    alpha: [
      '---',
      'title: Alpha',
      'category: CLI',
      'created_at: 2020-01-01',
      'layout: snippet',
      '---',
      'a'
    ].join('\n'),
    beta: [
      '---',
      'title: Beta',
      'category: Git',
      'created_at: 2020-01-01',
      'layout: snippet',
      '---',
      'b'
    ].join('\n'),
    article: [
      '---',
      'title: Article',
      'category: CLI',
      'created_at: 2020-01-01',
      '---',
      'x'
    ].join('\n')
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
  absinthe: [
    '---',
    'title: absinthe',
    'category: Hidden',
    'created_at: 2020-01-01',
    '---',
    'a'
  ].join('\n'),
  Zeta: [
    '---',
    'title: Zeta',
    'category: Hidden',
    'created_at: 2020-01-01',
    '---',
    'z'
  ].join('\n'),
  'tests/basic': [
    '---',
    'title: Basic',
    'category: Hidden',
    'created_at: 2020-01-01',
    '---',
    'b'
  ].join('\n'),
  legacy: [
    '---',
    'title: Legacy',
    'category: JavaScript',
    'created_at: 2020-01-01',
    'deprecated: true',
    '---',
    'l'
  ].join('\n'),
  old: [
    '---',
    'title: Old',
    'category: JavaScript',
    'created_at: 2020-01-01',
    'archived: No longer maintained.',
    '---',
    'o'
  ].join('\n'),
  react: [
    '---',
    'title: React',
    'category: JavaScript',
    'created_at: 2020-01-01',
    '---',
    'r'
  ].join('\n')
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

const latestPages = mapGlobToPages({
  aardvark: [
    '---',
    'category: Test',
    'created_at: 2026-11-28',
    '---',
    'a'
  ].join('\n'),
  ant: ['---', 'category: Test', 'created_at: 2026-11-28', '---', 'a'].join(
    '\n'
  ),
  alpha: [
    '---',
    'category: Test',
    'created_at: 2026-11-20',
    'updated: 2026-11-28',
    '---',
    'a'
  ].join('\n'),
  'snippet-x': [
    '---',
    'title: Snippet X',
    'category: Test',
    'created_at: 2026-11-27',
    'updated: 2026-11-28',
    'layout: snippet',
    '---',
    's'
  ].join('\n'),
  zeta: [
    '---',
    'category: Test',
    'created_at: 2020-01-01',
    'updated: 2026-11-28',
    '---',
    'z'
  ].join('\n'),
  beta: [
    '---',
    'category: Test',
    'created_at: 2026-11-29',
    'deprecated: true',
    '---',
    'b'
  ].join('\n'),
  superseded: [
    '---',
    'category: Test',
    'created_at: 2026-11-29',
    'deprecated_by: /alpha',
    '---',
    's'
  ].join('\n'),
  oldie: [
    '---',
    'category: Test',
    'created_at: 2026-11-29',
    'archived: Old and unmaintained.',
    '---',
    'o'
  ].join('\n'),
  'hidden-x': [
    '---',
    'category: Hidden',
    'created_at: 2026-11-30',
    '---',
    'h'
  ].join('\n'),
  'tests/fixture': [
    '---',
    'category: Test',
    'created_at: 2026-12-01',
    '---',
    'f'
  ].join('\n')
})

test('new pages sort by creation date with a slug tie-break', () => {
  expect(getNewPages(latestPages).map((page) => page.slug)).toEqual([
    'aardvark',
    'ant',
    'snippet-x',
    'alpha',
    'zeta'
  ])
  expect(
    getNewPages(latestPages, { maxCount: 2 }).map((page) => page.slug)
  ).toEqual(['aardvark', 'ant'])
})

test('new pages skip unlisted sheets and test fixtures', () => {
  const slugs = getNewPages(latestPages).map((page) => page.slug)

  expect(slugs).not.toContain('beta')
  expect(slugs).not.toContain('superseded')
  expect(slugs).not.toContain('oldie')
  expect(slugs).not.toContain('hidden-x')
  expect(slugs).not.toContain('tests/fixture')
})

test('updated pages require an update date', () => {
  expect(getUpdatedPages(latestPages).map((page) => page.slug)).toEqual([
    'alpha',
    'snippet-x',
    'zeta'
  ])
})
