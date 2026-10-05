import grayMatter from 'gray-matter'
import { ZodError } from 'zod'
import {
  SheetFrontmatterSchema,
  type SheetFrontmatter
} from '~/types/SheetFrontmatter'

export type SheetPage = {
  slug: string
  markdown: string
  frontmatter: SheetFrontmatter
}

class FrontmatterValidationError extends Error {
  filePath: string

  constructor(message: string, options: ErrorOptions & { filePath: string }) {
    super(message, options)
    this.name = 'FrontmatterValidationError'
    this.filePath = options.filePath
  }
}
/**
 * Returns pages
 */

export async function getPages(): Promise<Record<string, SheetPage>> {
  const files = import.meta.glob(
    [
      '../../*.md',
      '../../*/*.md',
      '!../../README.md',
      '!../../CONTRIBUTING.md',
      '!../../404.md',
      '!../../index.md',
      '!../../index@2016.md'
    ],
    {
      eager: true,
      query: '?raw',
      import: 'default'
    }
  ) as Record<string, string>

  return mapGlobToPages(files)
}

export function mapGlobToPages(
  files: Record<string, string>
): Record<string, SheetPage> {
  const result: Record<string, SheetPage> = {}

  for (const [filePath, rawContent] of Object.entries(files)) {
    const slug = filePath.replace(/^\.\.\/\.\.\//, '').replace(/\.md$/, '')
    // ^ filePath == "../../README.md"

    const res = grayMatter(rawContent)
    // ^ res == { content: '...', data: {} }

    const frontmatter = (() => {
      try {
        return SheetFrontmatterSchema.parse(res.data)
      } catch (err) {
        if (!(err instanceof ZodError)) throw err
        const debugInfo = JSON.stringify(err.flatten().fieldErrors)
        const newErr = new FrontmatterValidationError(
          `Zod validation error: '${filePath}' ${debugInfo}`,
          { cause: err, filePath }
        )

        throw newErr
      }
    })()

    result[slug] = { slug, markdown: res.content, frontmatter }
  }
  return result
}
