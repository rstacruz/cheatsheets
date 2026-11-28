import { writeFile } from 'node:fs/promises'

await writeFile(
  new URL('../dist/_routes.json', import.meta.url),
  JSON.stringify({ version: 1, include: ['/search', '/search/'], exclude: [] })
)
