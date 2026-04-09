import { test } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

let loginPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
})

test('deve logar como administrador', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await loginPage.isLoggedIn()
})

test('não deve logar com a senha incorreta', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'wrongpassword')

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

    await loginPage.toastHaveText(message)
})