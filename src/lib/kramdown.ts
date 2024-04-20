import { spawn } from 'node:child_process'
import crypto from 'node:crypto'
import { readFile } from 'node:fs/promises'

export type KramdownResult = {
  html: string
}

/**
 * Renders via Ruby Kramdown
 */

export async function renderKramdown(input: string): Promise<KramdownResult> {
  return (await renderKramdownFromCache(input)) ?? renderKramdownJIT(input)
}

/**
 * Tries to get from .cache/ (left by `npm run cache_markdown`).
 */

async function renderKramdownFromCache(
  input: string
): Promise<KramdownResult | undefined> {
  const digest = crypto.createHash('sha256').update(input.trim()).digest('hex')
  const cachePath = `.cache/${digest}.html`

  try {
    const result = await readFile(cachePath, 'utf-8')
    return { html: result }
  } catch (err) {
    if (import.meta.env.PROD) console.log(`Cache MISS (${cachePath})`)
  }
}

/**
 * Renders via Kramdown by invoking Ruby.
 */

function renderKramdownJIT(input: string): Promise<KramdownResult> {
  return new Promise((resolve, reject) => {
    let output = ''
    const child = spawn('bundle', ['exec', 'ruby', './src/ruby/kramdown.rb'])
    child.stdin.write(input)
    child.stdin.end()

    child.stdout.on('data', (data: string) => {
      output += data
    })

    child.on('exit', (code: number) => {
      if (code !== 0) {
        reject(new Error(`Exited with code ${code}`))
      } else {
        resolve({ html: output })
      }
    })
  })
}
