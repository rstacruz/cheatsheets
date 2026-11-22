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

    subtitle: z
      .string()
      .trim()
      .min(1)
      .refine((value) => value.split(/\s+/).length <= 5, {
        message: 'Subtitle must be 5 words or fewer'
      })
      .optional()
      .describe('One-line description shown under the title (max 5 words).'),

    category: z
      .string()
      .optional()
      .describe(
        'Nav group. `Hidden` unlists the sheet. Every group except `Others` holds 3-16 sheets; `Others` holds at most 12.'
      ),
    weight: z.number().optional().describe('Sorts higher in the "top" lists.'),
    tags: z
      .string()
      .array()
      .optional()
      .describe('`Featured` puts the sheet on the home page.'),
    updated: z.date().optional().describe('"Last updated" and recent lists.'),
    last_verified_with: z
      .string()
      .max(160)
      .optional()
      .describe(
        'Versions and runtime used to verify examples (max 160 chars). Required for t1 and t2 sheets.'
      ),
    tier: z
      .enum(['t1', 't2'])
      .optional()
      .describe(
        'Review tier: t1 is audited before t2. Not a cadence; not rendered.'
      ),
    fragments: z
      .array(z.string().trim().min(1).max(16))
      .min(12)
      .max(20)
      .optional()
      .describe(
        'Short fragments shown muted with a bottom fade on the homepage card. Required for t1 and t2 sheets.'
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
      .refine((value) => !/^[ \t\r]*$/m.test(value.trim()), {
        message: '`intro` must be a single paragraph'
      })
      .optional()
      .describe(
        'One Markdown paragraph (max 500 chars). Also used in meta descriptions.'
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
  .superRefine((value, ctx) => {
    if (value.tier !== 't1' && value.tier !== 't2') return
    if (!value.fragments) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['fragments'],
        message: '`fragments` is required for t1 and t2 sheets'
      })
    }

    if (value.last_verified_with) return

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['last_verified_with'],
      message: '`last_verified_with` is required for t1 and t2 sheets'
    })
  })

export type SheetFrontmatter = z.infer<typeof SheetFrontmatterSchema>
