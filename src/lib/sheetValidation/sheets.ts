import { getPages } from '../page'

/** A markdown finding anchored to a source line */
export type SheetFinding = { line: number; text: string }

/** Every sheet source: pages plus the markdown includes they pull in */
export async function sheetSources(): Promise<
  Array<{ slug: string; source: string }>
> {
  const pages = await getPages()
  const includes = import.meta.glob('../../../_includes/**/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
  }) as Record<string, string>

  return [
    ...Object.values(pages).map((page) => ({
      slug: page.slug,
      source: page.markdown
    })),
    ...Object.entries(includes).map(([slug, source]) => ({ slug, source }))
  ]
}

/** Collects findings across every sheet, formatted as `slug:line: text` */
export async function collectSheetFindings(
  find: (source: string) => SheetFinding[]
): Promise<string[]> {
  const findings: string[] = []
  for (const { slug, source } of await sheetSources()) {
    for (const { line, text } of find(source)) {
      findings.push(`${slug}:${line}: ${text}`)
    }
  }
  return findings
}
