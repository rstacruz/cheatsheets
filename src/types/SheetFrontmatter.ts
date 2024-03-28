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
  deprecated_by: z.string().optional().describe('Name of newer sheet'),
  intro: z
    .string()
    .optional()
    .describe(
      'Introduction text in Markdown. Appears above the fold and on meta descriptions.'
    )
})

export type SheetFrontmatter = z.infer<typeof SheetFrontmatterSchema>
