import { expect } from '@playwright/test'

export class LoginPage {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submit(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        //Aqui estamos usando xpath para localizar o botão de login, mas o ideal seria usar getByRole ou getByText, para tornar o teste mais legível e menos propenso a falhas caso a estrutura do HTML mude. Por exemplo, poderíamos usar:
        //await loginPage.submit('      
        //await this.page.locator('//button[text()="Entrar"]').click()

        // ou usar getByText para localizar o botão pelo seu papel e nome:
        await this.page.getByText('Entrar').click()
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle')
        //expressao regular para verificar se a URL contém /admin, indicando que o usuário foi redirecionado para a área de administração após o login bem-sucedido
        await expect(this.page).toHaveURL(/.*admin/)
    }
}