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
  ].join('\n')
})

test('related pages skip deprecated sheets', () => {
  const slugs = getRelatedPages(pages, pages.alpha).map((page) => page.slug)

  expect(slugs).toContain('gamma')
  expect(slugs).not.toContain('beta')
})

test('top pages skip deprecated sheets', () => {
  const slugs = getTopPages(pages, pages.alpha).map((page) => page.slug)

  expect(slugs).toContain('gamma')
  expect(slugs).not.toContain('beta')
})
