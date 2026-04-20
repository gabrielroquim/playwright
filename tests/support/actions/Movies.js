import { expect } from '@playwright/test';

export class Movies {

    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async create(movie) {

        await this.goForm()

        await this.page.getByLabel('Titulo do filme').fill(movie.title)
        await this.page.getByLabel('Sinopse').fill(movie.overview)

        await this.page.locator('#select_company_id .react-select__indicator')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.company })
            .click()

        await this.page.locator('#select_year .react-select__indicator')
            .click()

        await this.page.locator('#select_year .react-select__option')
            .filter({ hasText: String(movie.release_year) })
            .click()

        await this.page.locator('input[name=cover]')
            .setInputFiles('tests/support/fixtures' + movie.cover)


        if (movie.featured) {
            await this.page.locator('.featured .react-switch').click()
        }

        await this.submit()
        //DICA vc quer pegar o log do que está acontecendo na página, para isso vc pode usar o console.log para imprimir o conteúdo da página, ou seja, o HTML da página, para isso vc pode usar o método content() do page, que retorna o HTML da página, e depois imprimir esse HTML no console, assim vc consegue ver o que está acontecendo na página e identificar possíveis erros ou problemas
        // const html = await this.page.content()
        //console.log(html)
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async remove(title) {
        await this.page.getByRole('row', { name: title }).getByRole('button').click()
        await this.page.click('.confirm-removal')
    }

}