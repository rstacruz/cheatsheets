import { existsSync, globSync, readFileSync } from 'node:fs'

describe('component CSS layout', () => {
  it('has no per-component stylesheet directory', () => {
    expect(existsSync('src/styles/components')).toBe(false)
  })

  it('has no imports from a per-component stylesheet directory', () => {
    const importing = globSync('src/**/*.{astro,css}').filter((file) =>
      /styles\/components\//.test(readFileSync(file, 'utf8'))
    )

    expect(importing).toEqual([])
  })
})
