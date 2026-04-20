import { test, expect } from '../support'
import data from '../support/fixtures/movies.json' assert { type: 'json' }

import { executeSQL } from '../support/fixtures/database'
import { Movies } from '../support/actions/Movies'


test.beforeAll(async () => {
  await executeSQL('DELETE FROM movies;')
})

test('deve cadastrar um novo filme', async ({ page }) => {
  const movie = data.create

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.movies.create(movie)
  await page.toast.containText('Cadastro realizado com sucesso!')
})

test('não deve cadastrar quando o título do filme já existe', async ({ page, request }) => {
  const movie = data.duplicate

  await request.api.postMovie(movie)

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.movies.create(movie)
  await page.toast.containText('Este conteúdo já encontra-se cadastrado no catálogo')
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.movies.goForm()
  await page.movies.submit()

  await page.movies.alertHaveText([
    'Por favor, informe o título.',
    'Por favor, informe a sinopse.',
    'Por favor, informe a empresa distribuidora.',
    'Por favor, informe o ano de lançamento.'
  ])

}) 