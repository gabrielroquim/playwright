import { test, expect } from '@playwright/test'
import data from '../support/fixtures/movies.json' assert { type: 'json' }

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
  const movie = data.create
  await loginPage.visit()
  await loginPage.submit('admin@zombieplus.com', 'pwd123')
  await moviesPage.isLoggedIn()

  await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)

  await toast.containText('Cadastro realizado com sucesso!')
})