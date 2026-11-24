import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * `src/styles/components/` is retired: Astro components should carry Tailwind
 * classes, and Markdown prose lives in `src/styles/markdown/`. These files are
 * the remaining exception list.
 *
 * Remove an entry when its file is deleted. Never add one; if CSS is genuinely
 * needed, add it to `src/styles/components/` and justify it in review first.
 */
const LINE_BUDGET: Record<string, number> = {
  'related-post-item.css': 64,
  'related-post-list.css': 23,
  'related-posts-area.css': 20,
  'related-posts-callout.css': 48,
  'related-posts-group.css': 18,
  'related-posts-section.css': 59
}

const dir = 'src/styles/components'

const files = readdirSync(dir)
  .filter((file) => file.endsWith('.css'))
  .sort()

describe('src/styles/components', () => {
  it('holds only the retired files', () => {
    expect(files).toEqual(Object.keys(LINE_BUDGET).sort())
  })

  it('does not grow', () => {
    const grown = files.filter((file) => {
      const lines = readFileSync(join(dir, file), 'utf8')
        .split('\n')
        .filter((line) => line.trim()).length

      return lines > LINE_BUDGET[file]
    })

    expect(grown).toEqual([])
  })
})
