/**
 * Per-sheet logo registry. Square marks preferred; no wordmarks.
 *
 * Sources (all devDependencies, rendered at build time):
 * - `@iconify-json/logos` (CC0) — colour brand marks
 * - `@iconify-json/simple-icons` (CC0) — square mono fallbacks
 * - `@iconify-json/icon-park-outline` (Apache-2.0) — non-brand glyphs
 * - `public/assets/logos/*.svg` — marks with no Iconify set entry
 *
 * `tier` is a review field and never drives rendering.
 */

export type SheetLogo =
  | { kind: 'set'; set: 'logos' | 'simple-icons'; name: string }
  | { kind: 'glyph'; set: 'icon-park-outline'; name: string }
  | { kind: 'file'; src: string }

export const sheetLogos: Record<string, SheetLogo> = {
  bash: { kind: 'set', set: 'logos', name: 'bash-icon' },
  'claude-code': { kind: 'set', set: 'logos', name: 'claude-icon' },
  'docker-compose': { kind: 'set', set: 'logos', name: 'docker-icon' },
  go: { kind: 'set', set: 'simple-icons', name: 'go' },
  javascript: { kind: 'set', set: 'logos', name: 'javascript' },
  kotlin: { kind: 'set', set: 'logos', name: 'kotlin-icon' },
  react: { kind: 'set', set: 'logos', name: 'react' },
  skills: { kind: 'glyph', set: 'icon-park-outline', name: 'layers' },
  typescript: { kind: 'set', set: 'logos', name: 'typescript-icon' },
  vim: { kind: 'set', set: 'logos', name: 'vim' },
  xpath: { kind: 'glyph', set: 'icon-park-outline', name: 'code' },
  'aws-s3': { kind: 'set', set: 'logos', name: 'aws-s3' },
  codex: { kind: 'set', set: 'logos', name: 'codex' },
  curl: { kind: 'set', set: 'simple-icons', name: 'curl' },
  datetime: { kind: 'glyph', set: 'icon-park-outline', name: 'calendar' },
  docker: { kind: 'set', set: 'logos', name: 'docker-icon' },
  herdr: { kind: 'file', src: '/assets/logos/herdr.svg' },
  'herdr-agents': { kind: 'file', src: '/assets/logos/herdr.svg' },
  'herdr-keys': { kind: 'file', src: '/assets/logos/herdr.svg' },
  'hermes-cli': { kind: 'set', set: 'simple-icons', name: 'hermes' },
  'http-status': { kind: 'glyph', set: 'icon-park-outline', name: 'info' },
  markdown: { kind: 'set', set: 'simple-icons', name: 'markdown' },
  mise: { kind: 'file', src: '/assets/logos/mise.svg' },
  mysql: { kind: 'set', set: 'logos', name: 'mysql-icon' },
  npm: { kind: 'set', set: 'logos', name: 'npm-icon' },
  opencode: { kind: 'set', set: 'simple-icons', name: 'opencode' },
  terraform: { kind: 'set', set: 'logos', name: 'terraform-icon' },
  // Featured, non-tiered
  'intl-datetime': { kind: 'glyph', set: 'icon-park-outline', name: 'globe' }
}

export function getSheetLogo(slug: string): SheetLogo | null {
  return sheetLogos[slug] ?? null
}
