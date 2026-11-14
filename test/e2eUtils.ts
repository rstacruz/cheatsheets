import { expect, type Page } from '@playwright/test'
import type { JsonLdDocument } from '~/types/JsonLdDocument'

/**
 * Helper: assert that a `<meta>` tag has a given `name` and `content`
 */

export async function expectMeta(
  page: Page,
  options:
    | { name: string; content: string }
    | { property: string; content: string }
) {
  const { content } = options
  const metaElement = page.locator(
    'name' in options
      ? `meta[name="${options.name}"]`
      : `meta[property="${options.property}"]`
  )
  await expect(metaElement).toHaveAttribute('content', content)
}

/**
 * Retrieves all JSON-LD payloads from the page.
 */

export async function getLdJsonPayloads(
  page: Page
): Promise<Array<null | JsonLdDocument>> {
  const elements = await page
    .locator('script[type="application/ld+json"]')
    .all()

  return Promise.all(
    elements.map(async (element) => {
      const text = await element.textContent()
      return text ? JSON.parse(text) : null
    })
  )
}
