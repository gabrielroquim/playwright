import { expect } from '@playwright/test';

export class MoviePage {

    constructor(page) {
        this.page = page
    }
    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle')
        //expressao regular para verificar se a URL contém /admin, indicando que o usuário foi redirecionado para a área de administração após o login bem-sucedido
        await expect(this.page).toHaveURL(/.*admin/)
    }

}

