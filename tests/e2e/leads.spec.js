// @ts-ignore

import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage'

let landingPage

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
})

test('deve cadastrar um novo lead na fila de espera', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('GabsQA qualidade', 'gabsqa@qualidades.com.br')

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await landingPage.toastHaveText(message)

});


test('nao deve cadastrar com email incorreto', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('GabsQA qualidade', 'gabsqaqualidades.com.br')

  await landingPage.alertHaveText('Email incorreto')

});

test('nao deve cadastrar quando o nome não é informado', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'gabsqa@qualidades.com.br')

  await landingPage.alertHaveText('Campo obrigatório')

});

test('nao deve cadastrar quando o email nao é informado', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('GabsQAs qualidade', '')

  await landingPage.alertHaveText('Campo obrigatório')
});

test('nao deve cadastrar quando nenhum campo é informado', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  // como tem dois campos obrigatórios, o ideal é verificar os dois alertas, por isso usamos toHaveText com um array, para verificar os dois alertas de uma vez
  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);

});



