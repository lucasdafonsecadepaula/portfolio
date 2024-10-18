import { test as it, expect } from '@playwright/test'

it('handles i18n routing', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL('/en')

  // A cookie remembers the last locale
  await page.goto('/pt')
  await page.goto('/')
  await expect(page).toHaveURL('/pt')
  // await page
  //   .getByRole('combobox', { name: 'Sprache ändern' })
  //   .selectOption({ value: 'en' })

  // await expect(page).toHaveURL('/en')
  // page.getByRole('heading', { name: 'next-intl example' })
})

it('handles not found pages', async ({ page }) => {
  await page.goto('/unknown')
  page.getByRole('heading', { name: 'Page not found' })

  await page.goto('/en/unknown')
  page.getByRole('heading', { name: 'Seite nicht gefunden' })
})

it("handles not found pages for routes that don't match the middleware", async ({
  page,
}) => {
  await page.goto('/test.png')
  page.getByRole('heading', { name: 'This page could not be found.' })
  await page.goto('/api/hello')
  page.getByRole('heading', { name: 'This page could not be found.' })
})

it('sets caching headers', async ({ request }) => {
  for (const pathname of ['/en', '/pt']) {
    expect((await request.get(pathname)).headers()['cache-control']).toBe(
      's-maxage=31536000, stale-while-revalidate',
    )
  }
})

it('can be used to configure metadata', async ({ page }) => {
  await page.goto('/en')
  await expect(page).toHaveTitle('next-intl example')

  await page.goto('/pt')
  await expect(page).toHaveTitle('next-intl example')
})

it('can be used to localize the page', async ({ page }) => {
  await page.goto('/en')
  page.getByRole('heading', { name: 'next-intl example' })

  await page.goto('/de')
  page.getByRole('heading', { name: 'next-intl Beispiel' })
})

it('sets a cookie', async ({ page }) => {
  function getCookieValue() {
    return page.evaluate(() => document.cookie)
  }

  const responseEn = await page.goto('/en')
  const valueEn = await responseEn?.headerValue('set-cookie')
  expect(valueEn).toContain('NEXT_LOCALE=en;')
  expect(valueEn).toContain('Path=/;')
  expect(valueEn).toContain('SameSite=lax')
  expect(valueEn).toContain('Max-Age=31536000;')
  expect(valueEn).toContain('Expires=')
  expect(await getCookieValue()).toBe('NEXT_LOCALE=en')

  const responsePt = await page.goto('/pt')
  const valuePt = await responsePt?.headerValue('set-cookie')
  expect(valuePt).toContain('NEXT_LOCALE=pt;')
  expect(valuePt).toContain('Path=/;')
  expect(valuePt).toContain('SameSite=lax')
  expect(valuePt).toContain('Max-Age=31536000;')
  expect(valuePt).toContain('Expires=')
  expect(await getCookieValue()).toBe('NEXT_LOCALE=pt')
})

it('serves a robots.txt', async ({ page }) => {
  const response = await page.goto('/robots.txt')
  const body = await response?.body()
  expect(body?.toString()).toEqual('User-Agent: *\nAllow: *\n')
})

it('serves a sitemap.xml', async ({ page }) => {
  const response = await page.goto('/sitemap.xml')
  const body = await response!.body()

  expect(body.toString().replaceAll(' ', '')).toBe(
    `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
        <url>
          <loc>http://localhost:3000/pt</loc>
          <xhtml:link rel="alternate" hreflang="pt" href="http://localhost:3000/pt" />
          <xhtml:link rel="alternate" hreflang="en" href="http://localhost:3000/en" />
        </url>
      </urlset>
  `.replaceAll(' ', ''),
  )
})

it('provides a manifest', async ({ page }) => {
  const response = await page.goto('/manifest.webmanifest')
  const body = await response!.json()
  expect(body).toEqual({
    name: 'next-intl example',
    start_url: '/',
    theme_color: '#101E33',
  })
})
