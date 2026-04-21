![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)

<p align="center">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/gabrielroquim/playwright?color=6E40C9&style=flat-square">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/gabrielroquim/playwright?color=6E40C9&style=flat-square">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-6E40C9?style=flat-square">
  <img alt="Playwright" src="https://img.shields.io/badge/tested%20with-Playwright-6E40C9?style=flat-square&logo=playwright">
</p>

---

## 🤘 Sobre

Repositório do projeto de testes automatizados do sistema **Zombie Plus**, construído no curso **Playwright Zombie Edition**! O Playwright é uma ferramenta de código aberto desenvolvida pela Microsoft que revoluciona a automação de testes em sistemas web, oferecendo uma abordagem eficaz e altamente confiável.

---

## 💻 Tecnologias

<p>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img alt="Playwright" src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white">
  <img alt="Faker" src="https://img.shields.io/badge/Faker.js-FF6B6B?style=for-the-badge&logo=javascript&logoColor=white">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
</p>

---

## 🤖 Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) rodando localmente
- Navegadores Playwright instalados

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/gabrielroquim/playwright.git
cd playwright

# 2. Instalar as dependências
npm install

# 3. Instalar os navegadores do Playwright
npx playwright install
```

### Executando os testes

```bash
# Executar todos os testes em headless
npx playwright test

# Executar com interface gráfica (UI mode)
npx playwright test --ui

# Executar um arquivo específico
npx playwright test tests/e2e/movies.spec.js

# Executar e gerar relatório
npx playwright test --reporter=html
```

### Relatório

```bash
npx playwright show-report
```

---

## 📁 Estrutura do projeto

```
tests/
├── e2e/              # Testes end-to-end
│   ├── leads.spec.js
│   ├── login.spec.js
│   └── movies.spec.js
└── support/          # Helpers e configurações
    ├── actions/      # Page Objects
    ├── api/          # Chamadas de API
    └── fixtures/     # Dados de teste
```

---

<p align="center">Feito com 🧟 no curso Playwright Zombie Edition</p>
