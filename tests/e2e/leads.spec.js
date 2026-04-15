import { test, expect  } from '../support'
import { faker } from '@faker-js/faker'


test('deve cadastrar um novo lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message)
});


test('nao deve cadastrar quando o email já existe', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

 const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message)
});

test('nao deve cadastrar com email incorreto', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('GabsQA qualidade', 'gabsqaqualidades.com.br')

  await page.landing.alertHaveText('Email incorreto')
});

test('nao deve cadastrar quando o nome não é informado', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'gabsqa@qualidades.com.br')

  await page.landing.alertHaveText('Campo obrigatório')
});

test('nao deve cadastrar quando o email nao é informado', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('GabsQAs qualidade', '')

  await page.landing.alertHaveText('Campo obrigatório')
});

test('nao deve cadastrar quando nenhum campo é informado', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')

  // como tem dois campos obrigatórios, o ideal é verificar os dois alertas, por isso usamos toHaveText com um array, para verificar os dois alertas de uma vez
  await page.landing.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);

});