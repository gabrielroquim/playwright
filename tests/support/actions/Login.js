import { expect } from '@playwright/test'

export class Login {

    constructor(page) {
        this.page = page
    }

    async do(email, password, username) {
        await this.visit()
        await this.submit(email, password)
        await this.isLoggedIn(username)
    }

    async visit() {
        await this.page.goto('/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submit(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        //Aqui estamos usando xpath para localizar o botão de login, mas o ideal seria usar getByRole ou getByText, para tornar o teste mais legível e menos propenso a falhas caso a estrutura do HTML mude. Por exemplo, poderíamos usar:
        //await loginPage.submit('      
        //await this.page.locator('//button[text()="Entrar"]').click()

        // ou usar getByText para localizar o botão pelos seu papel e nomes:
        await this.page.getByText('Entrar').click()
    }

    async alertHaveText(text) {
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }

    async isLoggedIn(username) {
        const loggedUser = this.page.locator('.logged-user')
        await expect(loggedUser).toHaveText(`Olá, ${username}`) // aqui você pode colocar o nome do usuário logado, ou algum texto que indique que o login foi bem sucedido    
    }

}