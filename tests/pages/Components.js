// Components.js é usado quando tem elementos que se repetem em várias páginas, como o toast, o alert, o header, o footer, etc. Assim, podemos criar uma classe para cada componente e reutilizar essa classe em todas as páginas que tiverem esse componente, evitando a duplicação de código e tornando os testes mais organizados e fáceis de manter. Por exemplo, podemos criar uma classe ToastComponent para lidar com os toasts e uma classe AlertComponent para lidar com os alerts, e assim por diante. Dessa forma, quando precisarmos verificar um toast ou um alert em qualquer página, basta usar a classe correspondente para fazer essa verificação de forma consistente em todos os testes.
import { expect } from '@playwright/test'

export class Toast {
    constructor(page) {
        this.page = page
    }
    
    async haveText(message) {
        const toast = this.page.locator('.toast')

        await expect(toast).toHaveText(message)
        await expect(toast).toBeHidden({ timeout: 5000 })
    }
}