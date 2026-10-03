import { z } from 'zod'

export const SheetFrontmatterSchema = z.object({
  title: z
    .union([z.string(), z.number()])
    .transform((x) => x.toString())
    .pipe(z.string())
    .optional(),

  category: z.string().optional(),
  weight: z.number().optional(),
  tags: z.string().array().optional(),
  updated: z.date().optional(),
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
  redirect_to: z
    .string()
    .optional()
    .describe(
      'Marks this sheet as a redirect stub. The stub still has a generated route; the actual 301s live in public/_redirects.'
    ),
  intro: z
    .string()
    .optional()
    .describe(
      'Introduction text in Markdown. Appears above the fold and on meta descriptions.'
    )
})

export type SheetFrontmatter = z.infer<typeof SheetFrontmatterSchema>
