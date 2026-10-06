import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { findOverlongCodeLines } from './lineWidths'
import { findUnsplitTables } from './longTables'
import type { SheetFinding } from './sheets'
import { collectSheetFindingsBySlug } from './sheets'
import { findH2WithoutH3 } from './structure'

async function allowances(find: (source: string) => SheetFinding[]) {
  const findings = await collectSheetFindingsBySlug(find)
  const counts = Object.entries(findings)
    .map(([slug, list]) => [slug, list.length] as const)
    .sort(([a], [b]) => a.localeCompare(b))
  return Object.fromEntries(counts)
}

// Running the suite with UPDATE_SHEET_BASELINE=1 rewrites baselines.ts
const update = process.env.UPDATE_SHEET_BASELINE ? test : test.skip

update('writes baselines.ts', async () => {
  const data = {
    h2WithoutH3: await allowances(findH2WithoutH3),
    codeLineWidth: await allowances(findOverlongCodeLines),
    unsplitTable: await allowances(findUnsplitTables)
  }

  writeFileSync(
    resolve('src/lib/sheetValidation/baselines.ts'),
    `/**
 * Legacy allowances for the sheet checks: how many findings a sheet may keep.
 * New sheets start at zero. Regenerate after adding or fixing findings:
 *
 *   UPDATE_SHEET_BASELINE=1 pnpm vitest run src/lib/sheetValidation/updateBaseline.test.ts
 */

export type SheetBaselines = {
  h2WithoutH3: Record<string, number>
  codeLineWidth: Record<string, number>
  unsplitTable: Record<string, number>
}

export const baselines: SheetBaselines = ${JSON.stringify(data, null, 2)}
`
  )
})
