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

test('deve cadastrar um novo lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // getByRole é a forma mais recomendada pelo Playwright
  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');
  
  // getByPlaceholder é prático quando o input tem um placeholder descritivo
  await page.getByPlaceholder('Seu nome completo').fill('gabs qa');
  await page.getByPlaceholder('Seu email').fill('gabs.qa@qualidade.com');
});

