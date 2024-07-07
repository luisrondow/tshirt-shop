import { expect, test } from '@nuxt/test-utils/playwright'

test('has page title', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })

  await expect(page).toHaveTitle(/TShirt Shop/)
})

test('should render home page correctly', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })

  await expect(page.getByRole('link', { name: 'T-Shirt Shop' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Shop', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Basket' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'TShirt 1' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'TShirt 2' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'TShirt 3' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'TShirt 4' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'TShirt 5' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '© 2024 TSHIRT SHOP' })).toBeVisible()
})

test('should render basket page correctly', async ({ page, goto }) => {
  await goto('/basket', { waitUntil: 'hydration' })

  await expect(page).toHaveURL(/\/basket/)
  await expect(page.getByText('Your basket is empty')).toBeVisible()
})

test('should add item to basket', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })

  await page.getByRole('button', { name: 'Add to basket' }).first().click()
  await expect(page.getByRole('link', { name: 'Basket 1' })).toBeVisible()
  await page.getByRole('button', { name: 'Add to basket' }).first().click()
  await expect(page.getByTestId('basket-count')).toHaveText('2')
})

test('should remove item from basket correctly', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })

  await page.getByRole('button', { name: 'Add to basket' }).first().click()
  await page.getByRole('button', { name: 'View in Basket >' }).click()
  await page.getByRole('heading', { name: 'TShirt 1' }).click()
  await page.getByRole('button', { name: 'Remove' }).click()
  await expect(page.getByText('Your basket is empty')).toBeVisible()
})

test('should complete a purchase correctly', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  await page.getByRole('button', { name: 'Add to basket' }).first().click()
  await page.getByRole('button', { name: 'View in Basket >' }).click()

  await expect(page).toHaveURL(/\/basket/)
  await expect(page.locator('div').filter({ hasText: /^Standard Shipping - €5\.99$/ })).toBeVisible()
  await expect(page.getByTestId('total-price')).toContainText('€25.99')

  await page.getByRole('button', { name: 'Next' }).click()
  await expect(page.getByText('Please enter a valid email')).toBeVisible()

  await page.getByPlaceholder('Enter your email').fill('test@email.com')
  page.once('dialog', (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`)
    dialog.dismiss().catch(() => {})
  })
  await page.getByRole('button', { name: 'Pay' }).click()

  await expect(page).not.toHaveURL(/\/basket/)
  await expect(page.getByTestId('basket-count')).toContainText('0')
})

test('should trigger price change when selecting a different shipping option and different quantity', async ({
  page,
  goto,
}) => {
  await goto('/', { waitUntil: 'hydration' })

  await page.getByRole('button', { name: 'Add to basket' }).first().click()
  await page.getByRole('button', { name: 'View in Basket >' }).click()

  await expect(page.getByTestId('sub-total')).toContainText('€20.00')
  await expect(page.getByTestId('shipping-price')).toContainText('€5.99')
  await expect(page.getByTestId('total-price')).toContainText('€25.99')

  await page.locator('div').filter({ hasText: /^1$/ }).nth(2).click()
  await page.getByRole('button', { name: '2', exact: true }).click()
  await expect(page.getByTestId('sub-total')).toContainText('€40.00')

  await page.getByLabel('Next-Day Shipping - €').check()
  await expect(page.getByTestId('shipping-price')).toContainText('€19.99')

  await expect(page.getByTestId('total-price')).toContainText('€59.99')
})

test.describe('mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('should complete a purchase correctly', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })
    await page.getByRole('button', { name: 'Add to basket' }).first().click()
    await page.getByRole('button', { name: 'View in Basket >' }).click()
    await page.getByText('Go to checkout').click()

    await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible()
    await expect(page.getByTestId('sub-total')).toContainText('€20.00')
    await expect(page.getByTestId('shipping-price')).toContainText('€5.99')
    await expect(page.getByTestId('total-price')).toContainText('€25.99')

    await page.getByRole('button', { name: 'Next' }).click()
    await expect(page.getByText('Please enter a valid email')).toBeVisible()

    await page.getByPlaceholder('Enter your email').fill('teste@email.com')
    page.once('dialog', (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`)
      dialog.dismiss().catch(() => {})
    })
    await page.getByRole('button', { name: 'Pay' }).click()

    await expect(page).not.toHaveURL(/\/basket/)
    await expect(page.getByTestId('basket-count')).toContainText('0')
  })
})
