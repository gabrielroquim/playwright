import { test as base, expect } from "@playwright/test"

import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { MoviesPage } from '../pages/MoviesPage'
import { Toast } from '../pages/Components'

const test = base.extend({
    page: async ({ page }, use) => {

        const context = page
        context['landingPage'] = new LandingPage(page)
        context['loginPage'] = new LoginPage(page)
        context['moviesPage'] = new MoviesPage(page)
        context['toast'] = new Toast(page)

    }
})

export { test, expect }