import { test as base } from "@playwright/test"

import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { MoviesPage } from '../pages/MoviesPage'
import { Toast } from '../pages/Components'

const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page,
            landingPage: new LandingPage(page),
            loginPage: new LoginPage(page),
            moviesPage: new MoviesPage(page),
            toast: new Toast(page)
        })
    }
})

export { test }