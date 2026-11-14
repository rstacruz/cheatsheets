import { icons as logos } from '@iconify-json/logos'
import { icons as simpleIcons } from '@iconify-json/simple-icons'
import { icons as iconParkOutline } from '@iconify-json/icon-park-outline'
import { getIconData, iconToSVG, replaceIDs } from '@iconify/utils'
import type { SheetLogo } from './logos'

const sets = {
  logos,
  'simple-icons': simpleIcons,
  'icon-park-outline': iconParkOutline
}

export type LogoVariant = 'bare' | 'app'

export type ResolvedLogo =
  | {
      kind: 'svg'
      attributes: Record<string, string>
      body: string
      tint: string | null
    }
  | { kind: 'img'; src: string; tint: string | null }

/** Resolve a registry entry to build-time SVG or a static file. */
export function resolveLogo(logo: SheetLogo | null): ResolvedLogo | null {
  if (!logo) return null
  if (logo.kind === 'file') return { kind: 'img', src: logo.src, tint: null }

  const icon = getIconData(sets[logo.set], logo.name)
  if (!icon) throw new Error(`Unknown logo: ${logo.set}:${logo.name}`)

  const { body, viewBox, attributes } = iconToSVG(icon)
  // iconToSVG() defaults to width/height="1em"; pin the intrinsic size to the
  // viewBox so CSS can scale the mark to fill its slot
  attributes.width = viewBox[2]
  attributes.height = viewBox[3]

  return {
    kind: 'svg',
    attributes,
    body: replaceIDs(body),
    tint: dominantColor(body)
  }
}

/**
 * Most common non-black/white fill. Drives the soft app-icon background.
 * `simple-icons` use `currentColor`, so they fall back to the site accent.
 */
function dominantColor(body: string): string | null {
  const counts = new Map<string, number>()

  for (const match of body.matchAll(
    /(?:fill|stop-color)="(#[0-9a-fA-F]{3,8})"/g
  )) {
    const color = match[1].toLowerCase()
    if (/^#(?:fff(?:fff)?|000(?:000)?)$/.test(color)) continue
    counts.set(color, (counts.get(color) ?? 0) + 1)
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null
}
