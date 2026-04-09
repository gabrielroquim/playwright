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
DICA
  async alertHavetext(text) {
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }


    // dica
    // em vez de usar .password-alert e .email-alert, poderíamos usar um método genérico como alertHaveText, que recebe o seletor do alerta e o texto esperado, tornando o código mais reutilizável e evitando a necessidade de criar métodos específicos para cada tipo de alerta. Por exemplo: ESTSamos usando mesmo coigo duas vezes com o $ usamos somenyr uam vez 
    //async alertHaveText(selector, text) {
    //    const alert = this.page.locator(selector)
    //    await expect(alert).toHaveText(text)
    //}

    //async alertEmailHaveText(text) {
    //    const alert = this.page.locator('.email-alert')
    //   await expect(alert).toHaveText(text)
    // }
}