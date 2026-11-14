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

export type ResolvedLogo =
  | { kind: 'svg'; attributes: Record<string, string>; body: string }
  | { kind: 'img'; src: string }

/** Resolve a registry entry to build-time SVG or a static file. */
export function resolveLogo(logo: SheetLogo | null): ResolvedLogo | null {
  if (!logo) return null
  if (logo.kind === 'file') return { kind: 'img', src: logo.src }

  const icon = getIconData(sets[logo.set], logo.name)
  if (!icon) throw new Error(`Unknown logo: ${logo.set}:${logo.name}`)

  const { body, attributes } = iconToSVG(icon)
  return { kind: 'svg', attributes, body: replaceIDs(body) }
}

/** Tile markup for places that need a string (eg, the intro card HTML). */
export function logoHtml(
  logo: SheetLogo | null,
  size: number,
  className = ''
): string {
  const resolved = resolveLogo(logo)
  if (!resolved) return ''

  const inner =
    resolved.kind === 'img'
      ? `<img src="${resolved.src}" alt="" />`
      : `<svg ${Object.entries(resolved.attributes)
          .map(([key, value]) => `${key}="${value}"`)
          .join(' ')}>${resolved.body}</svg>`

  return `<span class="logo-tile ${className}" style="--logo-size:${size}px" aria-hidden="true">${inner}</span>`
}
