import { z } from 'zod'

const NOTE_DATE =
  /\b(?:19|20)\d{2}-\d{1,2}(?:-\d{1,2})?\b|\b\d{1,2}[/-]\d{1,2}[/-](?:19|20)\d{2}\b|\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{1,2}(?:st|nd|rd|th)?,?\s+(?:19|20)\d{2}\b|\b\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(?:19|20)\d{2}\b/i
const NOTE_PR = /#\d+\b/

export const SHEET_LAYOUTS = ['snippet', 'versus'] as const

export type SheetLayout = (typeof SHEET_LAYOUTS)[number]

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
      .describe('Sheet, H1, and <title> text. Falls back to the filename.'),
    link_title: z
      .string()
      .trim()
      .min(1)
      .optional()
      .describe(
        'Short title for link lists such as the homepage. Falls back to `title`.'
      ),

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
    updated: z
      .date()
      .optional()
      .describe(
        '"Last updated" and recent lists. Also stamps the <title> of t1 sheets.'
      ),
    last_verified_with: z
      .string()
      .max(160)
      .refine((value) => !NOTE_DATE.test(value), {
        message:
          '`last_verified_with` must not contain dates; use versions only'
      })
      .refine((value) => !NOTE_PR.test(value), {
        message: '`last_verified_with` must not contain PR numbers'
      })
      .optional()
      .describe(
        'Versions the examples target (max 160 chars). Required for tiered sheets.'
      ),
    tier: z
      .enum(['t1', 't2', 't3'])
      .optional()
      .describe(
        'Review tier: t1 weekly, t2 every six weeks, t3 best effort; see `_docs/tiers.md`. A t1 <title> ends with the `updated` month and year.'
      ),
    layout: z
      .enum(SHEET_LAYOUTS)
      .optional()
      .describe(
        'Page layout: `snippet` uses the two-column snippet cards and omits "cheatsheet" from the H1; `versus` gives every H3 card full width with one H4 column each.'
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
    seo_title: z
      .string()
      .trim()
      .max(60)
      .optional()
      .describe(
        'Full <title> override (max 60 chars). Defaults to "<title> cheatsheet", with " (Nov 2026)" appended for t1 sheets.'
      ),
    description: z
      .string()
      .trim()
      .transform((value) => value.replace(/\s+/g, ' '))
      .refine((value) => value.length <= 155, {
        message: 'Description must be 155 characters or fewer'
      })
      .optional()
      .describe('Full meta description, used verbatim (max 155 chars).'),
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
    if (!value.tier) return
    if (value.tier !== 't3' && !value.fragments) {
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
      message: '`last_verified_with` is required for tiered sheets'
    })
  })

export type SheetFrontmatter = z.infer<typeof SheetFrontmatterSchema>
