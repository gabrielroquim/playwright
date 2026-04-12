import { test } from '@playwright/test'

import { LoginPage } from '../pages/LoginPage'
import { MoviePage } from '../pages/MoviePage'
import { Toast } from '../pages/Components'

let loginPage
let toast
let moviePage


test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
    moviePage = new MoviePage(page)
})

test('deve cadastrar um novo filme', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviePage.isLoggedIn()
})