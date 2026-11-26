const shortDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC'
})

const monthYear = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC'
})

/**
 * Formats a date as "Nov 25, 2026". YAML dates parse as UTC midnight, so
 * format in UTC to keep the day from shifting in western time zones.
 */

export function formatShortDate(date: Date): string {
  return shortDate.format(date)
}

/** Formats a date as "Nov 2026", as used in t1 sheet titles. */

export function formatMonthYear(date: Date): string {
  return monthYear.format(date)
}
