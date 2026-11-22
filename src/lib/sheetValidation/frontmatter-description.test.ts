import { getPages } from '../page'
import {
  isSheetSlug,
  loadBaseline,
  saveBaseline,
  updatingBaseline
} from './baseline'

const CHEATSHEET = /\bcheatsheets?\b/i

const MATCHES = [
  'A cheatsheet of commands',
  'Cheatsheets for CSS',
  'commands, CHEATSHEET'
]

it.each(MATCHES)('detects the word in %s', (description) => {
  expect(CHEATSHEET.test(description)).toBe(true)
})

test('the detector ignores other descriptions', () => {
  expect(CHEATSHEET.test('A syntax reference')).toBe(false)
})

test('no sheet description contains the word cheatsheet', async () => {
  const pages = await getPages()
  const findings: string[] = []

  for (const page of Object.values(pages)) {
    if (!isSheetSlug(page.slug)) continue
    const description = page.frontmatter.description
    if (description && CHEATSHEET.test(description)) {
      findings.push(`${page.slug}: ${description}`)
    }
  }

  if (updatingBaseline)
    return saveBaseline('frontmatter-description.json', findings)

  const allowed = new Set(
    loadBaseline<string[]>('frontmatter-description.json', [])
  )
  expect(findings.filter((finding) => !allowed.has(finding))).toEqual([])
})
