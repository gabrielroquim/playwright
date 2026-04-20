import { test, expect } from '../support'

test('deve logar como administrador', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn('Admin')
})

test('não deve logar com a senha incorreta', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'wrongpassword')

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.toast.containText(message)
})

test('não deve logar quando email é incorreto', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('wwwwwwwwwzombieplus.com', 'wrongpassword')

    await page.login.alertHaveText('Email incorreto')
})

test('não deve logar quando email não é informado', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', 'wrongpassword')

    await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar quando senha não é informada', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', '')

    await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar quando nenhum campo é informado', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', '')

    await page.login.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório'
    ])
})