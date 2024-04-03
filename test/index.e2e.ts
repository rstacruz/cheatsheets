import { expect, test } from '@playwright/test'
import type { JsonLdBreadcrumbList } from '~/types/JsonLdDocument'
import { expectMeta, getLdJsonPayloads } from './e2eUtils'

test('homepage', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Devhints — TL;DR for developer documentation')
  const linksToAssert = [
    { name: 'Xpath', href: '/xpath' },
    { name: 'React', href: '/react' },
    { name: 'Bash', href: '/bash' }
  ]

  for (const { name, href } of linksToAssert) {
    await expect(page.getByRole('link', { name }).first()).toHaveAttribute(
      'href',
      href
    )
  }

  // Share buttons
  const shareOnFacebook = page.getByLabel('Share on Facebook')
  const facebookHref = await shareOnFacebook.getAttribute('href')
  expect(facebookHref).toEqual(
    'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevhints.io%2F'
  )

  const shareOnTwitter = page.getByLabel('Share on Twitter')
  const twitterHref = await shareOnTwitter.getAttribute('href')
  expect(twitterHref).toEqual(
    'https://twitter.com/intent/tweet?text=Ridiculous%20collection%20of%20web%20development%20cheatsheets%20https%3A%2F%2Fdevhints.io%2F'
  )
})

test('search', async ({ page }) => {
  await page.goto('/')
  await page.getByPlaceholder('Search...').click()
  await page.getByPlaceholder('Search...').fill('es6')

  // Pick the first
  await page.getByRole('option', { name: 'ES2015+' }).click()

  // Navigate to next page
  await expect(page).toHaveTitle('ES2015+ cheatsheet')
  await expect(
    page.getByRole('heading', { name: 'ES2015+ cheatsheet' })
  ).toBeVisible()
})

test('date pages', async ({ page }) => {
  await page.goto('/strftime')
  await page
    .getByRole('heading', { name: 'strftime format cheatsheet' })
    .focus()
  await page.getByRole('heading', { name: 'Presets' }).focus()

  // This should make the `{% include %}` directive work
  await page.goto('/moment')
  await page.getByRole('heading', { name: 'Moment.js cheatsheet' }).focus()
  await page.getByRole('heading', { name: 'Parsing' }).focus()
  await page
    .getByRole('heading', { name: 'Internationalization', exact: true })
    .focus()
  await page.getByRole('heading', { name: 'Add' }).focus()

  await page.goto('/datetime')
  await page.getByRole('heading', { name: 'strftime format' }).focus()
  await page.getByRole('heading', { name: 'Moment.js format' }).focus()
})

test('/knex', async ({ page }) => {
  await page.goto('/knex')

  // Assert Markdown text
  await expectMeta(page, {
    name: 'description',
    content:
      'One-page guide to Knex: usage, examples, and more. Knex is an SQL query builder for Node.js. This guide targets v0.13.0.'
  })

  // Share buttons
  const shareOnFacebook = page.getByLabel('Share on Facebook')
  const facebookHref = await shareOnFacebook.getAttribute('href')
  expect(facebookHref).toEqual(
    'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevhints.io%2Fknex'
  )

  const shareOnTwitter = page.getByLabel('Share on Twitter')
  const twitterHref = await shareOnTwitter.getAttribute('href')
  expect(twitterHref).toEqual(
    'https://twitter.com/intent/tweet?text=The%20ultimate%20cheatsheet%20for%20Knex%20https%3A%2F%2Fdevhints.io%2Fknex'
  )
})

test('/sinon', async ({ page }) => {
  await page.goto('/sinon')

  const ldJsonPayloads = await getLdJsonPayloads(page)

  const payload2 = ldJsonPayloads[1] as JsonLdBreadcrumbList
  expect(payload2.itemListElement[0].item['@id']).toEqual(
    'https://devhints.io/#javascript-libraries'
  )
})

test('/tests/keywords_test', async ({ page }) => {
  await page.goto('/tests/keywords_test')

  await expectMeta(page, {
    name: 'description',
    content:
      'Variables · Functions · Interpolation · Brace expansions · Loops · Conditional execution · Command substitution · One-page guide to Intro test'
  })
})
