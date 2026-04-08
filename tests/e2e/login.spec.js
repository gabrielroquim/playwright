import { test } from '@playwright/test'

test('deve logar como administrador', async ({ page }) => {

    await page.goto('http://localhost:3000/login')

    const loginForm = page.locator('.login-form')
    await expect(loginForm).toBeVisible()

})