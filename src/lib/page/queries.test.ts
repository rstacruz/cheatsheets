import { mapGlobToPages } from '../page'
import { getRelatedPages, getTopPages } from './queries'

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
