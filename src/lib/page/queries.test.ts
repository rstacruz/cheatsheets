import { mapGlobToPages } from '../page'
import {
  getArchivedPages,
  getPagesByCategory,
  getRelatedPages,
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

test('category listings skip deprecated sheets', () => {
  const slugs = getPagesByCategory(pages)['Others'].pages.map(
    (page) => page.slug
  )

  expect(slugs).toContain('alpha')
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
  legacy: [
    '---',
    'title: Legacy',
    'category: JavaScript',
    'deprecated: true',
    '---',
    'l'
  ].join('\n'),
  react: ['---', 'title: React', 'category: JavaScript', '---', 'r'].join('\n')
})

test('archive pages are hidden or deprecated sheets sorted by title, case-insensitively', () => {
  const slugs = getArchivedPages(archivePages).map((page) => page.slug)

  // naive sort would put 'Zeta' first (Z < a); lowercased sort puts absinthe first.
  expect(slugs).toEqual(['absinthe', 'legacy', 'Zeta'])
})

test('archive pages skip listed sheets and test fixtures', () => {
  const slugs = getArchivedPages(archivePages).map((page) => page.slug)

  expect(slugs).not.toContain('react')
  expect(slugs).not.toContain('tests/basic')
})
