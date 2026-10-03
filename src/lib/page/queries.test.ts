import { mapGlobToPages } from '../page'
import { getArchivedPages, getRelatedPages, getTopPages } from './queries'

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
  delta: ['---', 'category: Test', 'weight: 1', '---', 'd'].join('\n')
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

const archivePages = mapGlobToPages({
  absinthe: ['---', 'title: absinthe', 'category: Hidden', '---', 'a'].join(
    '\n'
  ),
  Zeta: ['---', 'title: Zeta', 'category: Hidden', '---', 'z'].join('\n'),
  'tests/basic': ['---', 'title: Basic', 'category: Hidden', '---', 'b'].join(
    '\n'
  ),
  package: [
    '---',
    'title: package.json',
    'category: Hidden',
    'redirect_to: /package.json',
    '---',
    ''
  ].join('\n'),
  react: ['---', 'title: React', 'category: JavaScript', '---', 'r'].join('\n')
})

test('archive pages are hidden sheets sorted by title, case-insensitively', () => {
  const slugs = getArchivedPages(archivePages).map((page) => page.slug)

  // naive sort would put 'Zeta' first (Z < a); lowercased sort puts absinthe first.
  expect(slugs).toEqual(['absinthe', 'Zeta'])
})

test('archive pages skip listed sheets, test fixtures, and redirect stubs', () => {
  const slugs = getArchivedPages(archivePages).map((page) => page.slug)

  expect(slugs).not.toContain('react')
  expect(slugs).not.toContain('tests/basic')
  expect(slugs).not.toContain('package')
})
