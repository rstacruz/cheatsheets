import { getPages } from '../page'

const MAX_WORDS = 5

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
