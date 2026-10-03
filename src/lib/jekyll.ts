import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

/**
 * Expands the Jekyll-ish shims the legacy Ruby renderer used to handle
 * before the markdown engine: `{% raw %}` fences and a reduced subset of
 * `{% include common/<file>.md title="…" %}` includes.
 *
 * Ported line-for-line from the Ruby pre-pass so the rendered output stays
 * identical. Anything else (`{% include header.html %}`, `{% if %}`) is left
 * as literal text, exactly as before.
 */

export function expandJekyll(input: string): string {
  let out = String(input)

  out = out.replace(/^{% ?raw ?%}\n/gm, '') // raw on its own line
  out = out.replace(/{% ?raw ?%}/g, '') // inline in another line
  out = out.replace(
    /{% include (common\/[^ ]+) title="([^"]+)" %}/g,
    (_, file: string, title: string) => {
      // a reduced subset of Jekyll includes
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
