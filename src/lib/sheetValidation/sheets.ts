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

/** Collects findings per sheet slug, for checks with per-sheet allowances */
export async function collectSheetFindingsBySlug(
  find: (source: string) => SheetFinding[]
): Promise<Record<string, SheetFinding[]>> {
  const result: Record<string, SheetFinding[]> = {}
  for (const { slug, source } of await sheetSources()) {
    const findings = find(source)
    if (findings.length) result[slug] = findings
  }
  return result
}

/** Findings beyond a sheet's baseline allowance, formatted for assertions */
export function overAllowance(
  findings: Record<string, SheetFinding[]>,
  allowance: Record<string, number>
): string[] {
  const excess: string[] = []
  for (const [slug, list] of Object.entries(findings)) {
    const allowed = allowance[slug] ?? 0
    if (list.length > allowed) {
      excess.push(
        ...list.slice(allowed).map((f) => `${slug}:${f.line}: ${f.text}`)
      )
    }
  }
  return excess
}
