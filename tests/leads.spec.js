// @ts-check
import { test, expect } from '@playwright/test';


// =============================================================================
// FORMAS DE LOCALIZAR ELEMENTOS NO PLAYWRIGHT
// =============================================================================
//
// 1. getByRole  → recomendado, semântico e acessível
//    page.getByRole('button', { name: /Aperte o play/ }).click()
//    page.getByRole('textbox', { name: 'Nome' }).fill('valor')
//
// 2. getByPlaceholder  → prático para inputs com placeholder visível
//    page.getByPlaceholder('Seu nome completo').fill('valor')
//
// 3. getByLabel  → usa o texto do <label> associado ao input
//    page.getByLabel('Nome completo').fill('valor')
//
// 4. getByText  → localiza por texto visível na página
//    page.getByText('Cadastrar').click()
//
// 5. locator com seletor CSS → mais flexível, similar ao querySelector
//    page.locator('#name').fill('valor')              → por id
//    page.locator('.btn-primary').click()             → por classe
//    page.locator('input[name="name"]').fill('valor') → por atributo name
//    page.locator('input[placeholder="Seu nome"]').fill('valor') → por placeholder
//
// DICA: Prefira getByRole > getByLabel > getByPlaceholder > locator CSS
//       Evite locators frágeis como xpath ou índices numéricos.
// =============================================================================
// DICAS ADICIONAIS usando xpath:
// =============================================================================
// Usar o inspetor do navegador para identificar elementos
// No campo de pesquisa, usar XPath para verificar quantos elementos possuem a mesma ID
// Esse XPath pode ser usado na automação
// Exemplo:
// //button[text()="Aperte o play... se tiver coragem"]
// outro exemplo: //button[text()="Quero entrar na fila!"]
//=======================================
// DICA
//=======================================
//  pagar HTML do modal de sucesso para verificar o conteúdo e entender melhor o que está acontecendo
// await page.getByText('seus dados conosco').click()
// const content = await page.content()
// console.log(content), ai vc vai ver no console log copia o html cria uma pasta modal e coloca esse html lá, ai vc pode abrir esse html no navegador e inspecionar o elemento do toast para criar um locator mais robusto, por exemplo usando a classe do toast ou o texto do toast
// ==================================================

test('deve cadastrar um novo lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // getByRole é a forma mais recomendada pelo Playwright
  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  // getByPlaceholder é prático quando o input tem um placeholder descritivo
  await page.getByPlaceholder('Seu nome completo').fill('gabs qa')
  await page.getByPlaceholder('Seu email').fill('gabs.qa@qualidade.com')

  //em vez de usar xpath, podemos usar getByText para localizar o botão pelo texto visível
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await expect(page.locator('.toast')).toHaveText(message)

  await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 })

  //await page.getByText('seus dados conosco').click()
  //const content = await page.content()
  //console.log(content)
});


test('nao deve cadastrar com email incorreto', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // getByRole é a forma mais recomendada pelo Playwright
  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  // getByPlaceholder é prático quando o input tem um placeholder descritivo
  await page.getByPlaceholder('Seu nome completo').fill('gabs qa')
  await page.getByPlaceholder('Seu email').fill('gabriel.com.br')

  //em vez de usar xpath, podemos usar getByText para localizar o botão pelo texto visível
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Email incorreto')

});

test('nao deve cadastrar quando o nome não é informado', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // getByRole é a forma mais recomendada pelo Playwright
  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  // getByPlaceholder é prático quando o input tem um placeholder descritivo
  await page.getByPlaceholder('Seu email').fill('gabriel@qacom.br')

  //em vez de usar xpath, podemos usar getByText para localizar o botão pelo texto visível
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')

});


test('nao deve cadastrar quando o email nao é informado', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // getByRole é a forma mais recomendada pelo Playwright
  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  // getByPlaceholder é prático quando o input tem um placeholder descritivo
  await page.getByPlaceholder('Seu nome completo').fill('gabs qa')
  //em vez de usar xpath, podemos usar getByText para localizar o botão pelo texto visível
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')

});

test('nao deve cadastrar quando nenhum campo é informado', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')

});



