import { readFileSync, writeFileSync } from 'node:fs'
import grayMatter from 'gray-matter'
import { SheetFrontmatterSchema } from '../../src/types/SheetFrontmatter'

const KEY = 'last_verified_at'

function formatDate(date: Date): string {
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${KEY} must be YYYY-MM-DD`)
  }
  return date.toISOString().slice(0, 10)
}

/** Replaces or inserts the stamp, leaving every other frontmatter byte alone */
export function replaceLastVerifiedAt(source: string, date: Date): string {
  const value = formatDate(date)
  const lines = source.split('\n')

  if (lines[0] !== '---') throw new Error('sheet has no leading frontmatter')
  const end = lines.indexOf('---', 1)
  if (end === -1) throw new Error('sheet has no closing frontmatter delimiter')

  const matching = lines.flatMap((line, index) =>
    index > 0 && index < end && /^\s*last_verified_at\s*:/.test(line)
      ? [index]
      : []
  )
  if (matching.length > 1) throw new Error(`duplicate ${KEY} in frontmatter`)

  const updated = lines.findIndex(
    (line, index) => index > 0 && index < end && /^updated\s*:/.test(line)
  )
  const stamp = `${KEY}: ${value}`

  if (matching.length) lines[matching[0]] = stamp
  else if (updated !== -1) lines.splice(updated + 1, 0, stamp)
  else lines.splice(end, 0, stamp)

  return lines.join('\n')
}

/** Writes the stamp after validating the exact bytes through the sheet schema */
export function setLastVerifiedAt(filePath: string, date: Date) {
  const source = readFileSync(filePath, 'utf8')
  const updated = replaceLastVerifiedAt(source, date)
  const frontmatter = SheetFrontmatterSchema.parse(grayMatter(updated).data)

  writeFileSync(filePath, updated)
  return frontmatter
}
