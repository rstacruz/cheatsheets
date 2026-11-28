import { getPages } from '../page'
import { SheetFrontmatterSchema } from '~/types/SheetFrontmatter'

const MAX_WORDS = 5

const REQUIRED = {
  intro: 'Hello',
  links: [{ title: 'Docs', url: 'https://example.com' }]
}

const fiveWords = {
  ...REQUIRED,
  created_at: new Date('2020-01-01'),
  subtitle: 'one two three four five'
}
const sixWords = {
  ...REQUIRED,
  created_at: new Date('2020-01-01'),
  subtitle: 'one two three four five six'
}

test('the schema accepts a five-word subtitle', () => {
  expect(SheetFrontmatterSchema.parse(fiveWords).subtitle).toBe(
    fiveWords.subtitle
  )
})

test('the schema rejects a six-word subtitle', () => {
  expect(() => SheetFrontmatterSchema.parse(sixWords)).toThrow()
})

test('every sheet has a subtitle of five words or fewer', async () => {
  const pages = await getPages()
  const findings: string[] = []

  for (const page of Object.values(pages)) {
    // Published sheets live at the repository root; subdirectories hold
    // docs, includes, fixtures, and local artefacts.
    if (page.slug.includes('/')) continue

    const subtitle = page.frontmatter.subtitle?.trim()
    if (!subtitle) {
      findings.push(`${page.slug}: missing subtitle`)
      continue
    }

    const words = subtitle.split(/\s+/)
    if (words.length > MAX_WORDS) {
      findings.push(`${page.slug}: ${words.length} words: ${subtitle}`)
    }

    if (/^(?:a|an|the)\s/i.test(subtitle)) {
      findings.push(`${page.slug}: starts with an article: ${subtitle}`)
    }

    if (/[.!?]$/.test(subtitle)) {
      findings.push(`${page.slug}: ends with punctuation: ${subtitle}`)
    }

    const title = page.frontmatter.title ?? page.slug
    if (subtitle.toLowerCase() === title.toLowerCase()) {
      findings.push(`${page.slug}: repeats the title`)
    }
  }

  expect(findings).toEqual([])
})
