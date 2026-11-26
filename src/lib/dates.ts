export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

/**
 * Formats a date as "Nov 25, 2026". YAML dates parse as UTC midnight, so use
 * UTC getters to keep the day from shifting in western time zones.
 */

export function formatShortDate(date: Date): string {
  const month = MONTHS[date.getUTCMonth()]
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
}
