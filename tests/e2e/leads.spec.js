import { test, expect } from '../support'
import { faker } from '@faker-js/faker'
import { executeSQL } from '../support/fixtures/database'

test.beforeAll(async () => {
  await executeSQL('DELETE FROM leads;')
})

test('deve cadastrar um novo lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
  await page.popup.haveText(message)
});


test('não deve cadastrar quando o email já existe', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)

  const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
  await page.popup.haveText(message)
});

test('não deve cadastrar com email incorreto', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('GabsQA qualidade', 'gabsqaqualidades.com.br')

  await page.leads.alertHaveText('Email incorreto')
});

test('não deve cadastrar quando o nome não é informado', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', 'gabsqa@qualidades.com.br')

  await page.leads.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando o email não é informado', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('GabsQAs qualidade', '')

  await page.leads.alertHaveText('Campo obrigatório')
});

test('nao deve cadastrar quando nenhum campo é informado', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', '')

  // como tem dois campos obrigatórios, o ideal é verificar os dois alertas, por isso usamos toHaveText com um array, para verificar os dois alertas de uma vez
  await page.leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);

});