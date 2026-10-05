import { z } from 'zod'

export const SheetFrontmatterSchema = z.object({
  title: z
    .union([z.string(), z.number()])
    .transform((x) => x.toString())
    .pipe(z.string())
    .optional()
    .describe('Sheet name. Falls back to the filename.'),

  category: z
    .string()
    .optional()
    .describe('Nav group. `Hidden` unlists the sheet.'),
  weight: z.number().optional().describe('Sorts higher in the "top" lists.'),
  tags: z
    .string()
    .array()
    .optional()
    .describe('`Featured` puts the sheet on the home page.'),
  updated: z.date().optional().describe('"Last updated" and recent lists.'),
  keywords: z
    .string()
    .array()
    .optional()
    .describe(
      'Search keywords. Appears in meta descriptions, and helps in search.'
    ),
  description: z
    .string()
    .optional()
    .describe('Custom meta description. Takes precedence over keywords.'),
  deprecated: z
    .boolean()
    .optional()
    .describe(
      'Show a deprecation notice and unlist the sheet, like `category: Hidden`'
    ),
  deprecated_by: z
    .string()
    .optional()
    .describe('Name of newer sheet (also marks the sheet as deprecated)'),
  intro: z
    .string()
    .optional()
    .describe(
      'Introduction text in Markdown. Appears above the fold and on meta descriptions.'
    )
})

export type SheetFrontmatter = z.infer<typeof SheetFrontmatterSchema>
