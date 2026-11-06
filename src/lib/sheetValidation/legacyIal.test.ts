import { collectSheetFindings } from './sheets'
import { scanFences } from './utils'

function findLegacyIal(source: string) {
  const lines = source.split('\n')
  const { fenced } = scanFences(lines)
  return lines.flatMap((line, index) =>
    !fenced[index] && /^\s*\{:/.test(line)
      ? [{ line: index + 1, text: line.trim() }]
      : []
  )
}

test('no sheet uses a legacy IAL', async () => {
  expect(await collectSheetFindings(findLegacyIal)).toEqual([])
})
