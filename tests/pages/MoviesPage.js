import { expect } from '@playwright/test';

export class MoviesPage {

    constructor(page) {
        this.page = page
    }
    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle')
        //expressao regular para verificar se a URL contém /admin, indicando que o usuário foi redirecionado para a área de administração após o login bem-sucedido
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async create(title, overview, company, release_year) {

        await this.page.locator('a[href$="register"]').click()

        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)

        await this.page.locator('#select_company_id .react-select__indicator')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: company })
            .click()

        await this.page.locator('#select_year .react-select__indicator')
            .click()

        await this.page.locator('#select_year .react-select__option')
            .filter({ hasText: String(release_year) })
            .click()

        await this.page.getByRole('button', { name: 'Cadastrar' })
            .click()
        //DICA vc quer pegar o log do que está acontecendo na página, para isso vc pode usar o console.log para imprimir o conteúdo da página, ou seja, o HTML da página, para isso vc pode usar o método content() do page, que retorna o HTML da página, e depois imprimir esse HTML no console, assim vc consegue ver o que está acontecendo na página e identificar possíveis erros ou problemas
        // const html = await this.page.content()
        //console.log(html)
    }

}