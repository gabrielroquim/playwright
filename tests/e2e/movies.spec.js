import { test, expect } from '@playwright/test'

import { LoginPage } from '../pages/LoginPage'
import { MoviesPage } from '../pages/MoviesPage'
import { Toast } from '../pages/Components'

let loginPage
let toast
let moviesPage

test.beforeEach(({ page }) => {
  loginPage = new LoginPage(page)
  toast = new Toast(page)
  moviesPage = new MoviesPage(page)
})

test('deve cadastrar um novo filme', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('admin@zombieplus.com', 'pwd123')
  await moviesPage.isLoggedIn()

  await moviesPage.create('The Walking Dead', 'A série acompanha um grupo de sobreviventes em um mundo pós-apocalíptico dominado por zumbis, conhecidos como "walkers". O grupo é liderado por Rick Grimes, um ex-policial que acorda de um coma para descobrir que o mundo mudou drasticamente. Juntos, eles enfrentam desafios constantes, como a escassez de recursos, a ameaça dos walkers e a luta pela sobrevivência em meio a outros grupos de humanos hostis.', 'AMC Studios', 2010)
})