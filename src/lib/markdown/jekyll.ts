import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

/**
 * The Ruby pre-pass' Jekyll shims: `{% raw %}` fences and
 * `{% include common/<file>.md title="..." %}`. Anything else (`{% if %}`,
 * non-common includes) stays literal text
 */

export function expandJekyll(input: string): string {
  let out = String(input)

  out = out.replace(/^{% ?raw ?%}\n/gm, '') // raw on its own line
  out = out.replace(/{% ?raw ?%}/g, '') // inline in another line
  out = out.replace(
    /{% include (common\/[^ ]+) title="([^"]+)" %}/g,
    (_, file: string, title: string) => {
      const filepath = path.posix.normalize(`_includes/${file}`)

      if (filepath.startsWith('/') || filepath.startsWith('.')) {
        throw new Error(`Invalid include - ${filepath}`)
      }
      if (!existsSync(filepath)) {
        throw new Error(`Cannot find include - ${filepath}`)
      }

      const data = readFileSync(filepath, 'utf8')
      return data.replace(/{{ include\.title }}/g, title)
    }
  )
  out = out.replace(/^{% ?endraw ?%}\n/gm, '')
  out = out.replace(/{% ?endraw ?%}/g, '')
  out = out.replace(/ {%- if 0 -%}{%- endif -%} /g, '') // Used in jinja.md
  out = out.replace(/{%- raw -%}\n?/g, '') // Used in jinja.md

  return out
}
