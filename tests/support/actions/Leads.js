const { expect } = require('@playwright/test')

export class Leads {
    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('/');
    }

    async openLeadModal() {
        // getByRole é a forma mais recomendada pelo Playwright
        await this.page.getByRole('button', { name: /Aperte o play/ }).click();

        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera');

    }

    async submitLeadForm(name, email) {
        // getByPlaceholder é prático quando o input tem um placeholder descritivo
        await this.page.getByPlaceholder('informe seu nome').fill(name)
        await this.page.getByPlaceholder('informe seu email').fill(email)

        //em vez de usar xpath, podemos usar getByText para localizar o botão pelo texto visível
        await this.page.getByTestId('modal')
            .getByText('Quero entrar na fila!').click()
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}