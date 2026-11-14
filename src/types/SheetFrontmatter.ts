import { z } from 'zod'

export const SheetLinkSchema = z.object({
  title: z.string().min(1).describe('Link text.'),
  url: z.string().min(1).describe('Absolute URL or page-relative path.')
})

export type SheetLink = z.infer<typeof SheetLinkSchema>

export const SheetFrontmatterSchema = z
  .object({
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
    tier: z
      .enum(['t1', 't2'])
      .optional()
      .describe(
        'Review tier: t1 is audited before t2. Not a cadence; not rendered.'
      ),
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
    archived: z
      .string()
      .optional()
      .describe(
        'Archive note in Markdown. Unlists the sheet and renders the note in a notice.'
      ),
    intro: z
      .string()
      .max(500)
      .optional()
      .describe(
        'Introduction card text in Markdown (max 500 chars). Also used in meta descriptions.'
      ),
    links: z
      .array(SheetLinkSchema)
      .max(4)
      .optional()
      .describe('Links shown in the Introduction card (max 4).')
  })
  .refine((value) => !value.intro || (value.links?.length ?? 0) > 0, {
    message: '`intro` requires at least one `links` entry',
    path: ['links']
  })

export type SheetFrontmatter = z.infer<typeof SheetFrontmatterSchema>
