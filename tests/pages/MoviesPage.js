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
    }

}