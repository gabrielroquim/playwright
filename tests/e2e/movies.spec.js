import { test } from '../support/index'
import data from '../support/fixtures/movies.json' assert { type: 'json' }

import { executeSQL } from '../support/fixtures/database'

test('deve cadastrar um novo filme', async ({ page }) => {
  const movie = data.create
  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}';`)
  
  await page.loginPage.visit()
  await page.loginPage.submit('admin@zombieplus.com', 'pwd123')
  await page.moviesPage.isLoggedIn()

  await page.moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)

  await page.toast.containText('Cadastro realizado com sucesso!')
})