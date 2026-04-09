import { test } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

import { Toast } from '../pages/Components'

let loginPage
let toast

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
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
    await toast.haveText(message)
})

test('não deve logar quando email é incorreto', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('wwwwwwwwwzombieplus.com', 'wrongpassword')
   
    await loginPage.alertHavetext('Email incorreto')
})

test('não deve logar quando email não é informado', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('', 'wrongpassword')
   
    await loginPage.alertHavetext('Campo obrigatório')
})

test('não deve logar quando senha não é informada', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', '')
   
    await loginPage.alertHavetext('Campo obrigatório')
})

test('não deve logar quando nenhum campo é informado', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('', '')
   
    await loginPage.alertHavetext([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
})