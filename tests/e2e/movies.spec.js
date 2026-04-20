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
  await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
})

test('deve poder remover um filme', async ({ page, request }) => {
  const movie = data.to_remove
  await request.api.postMovie(movie)

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

  await page.click('.request-removal')
  await page.click('.confirm-removal')
  await page.popup.haveText('Filme removido com sucesso.')

  // DICA  usando xpath//
  // //td[text()="Dawn of the Dead"]/..//button

})

test('não deve cadastrar quando o título do filme já existe', async ({ page, request }) => {
  const movie = data.duplicate

  await request.api.postMovie(movie)

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.movies.create(movie)
  await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.movies.goForm()
  await page.movies.submit()

  await page.movies.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório'
  ])
}) 