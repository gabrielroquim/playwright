export class LandingPage {
    async visit() {
        await page.goto('http://localhost:3000');
    }


    async openLeadModal() {
        // getByRole é a forma mais recomendada pelo Playwright
        await page.getByRole('button', { name: /Aperte o play/ }).click();

        await expect(
            page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera');

    }

    async submitLeadForm() {
        // getByPlaceholder é prático quando o input tem um placeholder descritivo
        await page.getByPlaceholder('informe seu nome').fill('gabs qa')
        await page.getByPlaceholder('informe seu email').fill('gabs.qa@qualidade.com')

        //em vez de usar xpath, podemos usar getByText para localizar o botão pelo texto visível
        await page.getByTestId('modal')
            .getByText('Quero entrar na fila!').click()
    }

    async toastHaveText() {
        const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
        await expect(page.locator('.toast')).toHaveText(message)

        await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 })
    }

}