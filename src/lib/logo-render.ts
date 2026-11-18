import { icons as logos } from '@iconify-json/logos'
import { icons as simpleIcons } from '@iconify-json/simple-icons'
import { icons as iconParkOutline } from '@iconify-json/icon-park-outline'
import { icons as devicon } from '@iconify-json/devicon'
import { getIconData, iconToSVG, replaceIDs } from '@iconify/utils'
import type { SheetLogo } from './logos'

const sets = {
  logos,
  'simple-icons': simpleIcons,
  'icon-park-outline': iconParkOutline,
  devicon
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

  const { body, viewBox, attributes } = iconToSVG(icon)
  // iconToSVG() defaults to width/height="1em"; pin the intrinsic size to the
  // viewBox so CSS can scale the mark to fill its slot
  attributes.width = viewBox[2]
  attributes.height = viewBox[3]

  return { kind: 'svg', attributes, body: replaceIDs(body) }
}
