import { test } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

let loginPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
})

test('deve logar como administrador', async ({ page }) => {
    await loginPage.visit()

    await loginPage.submit('tests@ese.com.br', '123456')

})