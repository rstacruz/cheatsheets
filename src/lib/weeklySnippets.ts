import type { SheetPage } from './page'

export const WEEKLY_SNIPPET_COUNT = 8

const MS_PER_DAY = 86_400_000

/**
 * ISO week key for a date, eg "2026-W48". Uses UTC so the selection is the
 * same everywhere during the build.
 */
export function isoWeekKey(date: Date): string {
  const day = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  )
  // Shift to Thursday, which always belongs to the current ISO week.
  day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay() || 7))
  const year = day.getUTCFullYear()
  const yearStart = Date.UTC(year, 0, 1)
  const week = Math.ceil(((day.getTime() - yearStart) / MS_PER_DAY + 1) / 7)
  return `${year}-W${String(week).padStart(2, '0')}`
}

/** FNV-1a hash, used to turn the week key into a PRNG seed. */
function hashSeed(input: string): number {
  let hash = 2166136261

  for (let index = 0; index < input.length; index++) {
    hash ^= input.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }

  return hash >>> 0
}

/** Mulberry32: small deterministic PRNG. */
function createRandom(seed: number): () => number {
  let state = seed

  return () => {
    state = (state + 0x6d2b79f5) | 0
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Picks a stable random subset of sheets for one week. The same week always
 * yields the same selection; a new week yields a new one.
 */
export function selectWeeklySnippets(
  pages: SheetPage[],
  date: Date,
  count = WEEKLY_SNIPPET_COUNT
): SheetPage[] {
  const shuffled = [...pages]
  const random = createRandom(hashSeed(isoWeekKey(date)))

  for (let index = shuffled.length - 1; index > 0; index--) {
    const swapWith = Math.floor(random() * (index + 1))
    ;[shuffled[index], shuffled[swapWith]] = [
      shuffled[swapWith],
      shuffled[index]
    ]
  }

  return shuffled.slice(0, count)
}
