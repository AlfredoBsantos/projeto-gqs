// cypress/e2e/cadastro_autor.cy.js
describe('Teste de Cadastro de Autor via Interface', () => {
  it('Deve preencher o formulário e cadastrar um novo autor', () => {
    // Acessa a página de cadastro [cite: 44]
    cy.visit('http://localhost:3000/autores/novo');

    // Gera um nome único para o autor para evitar duplicatas a cada teste
    const autorNome = `Autor Cypress ${Date.now()}`;

    // Preenche os campos do formulário [cite: 45]
    cy.get('input[name="nome"]').type(autorNome);
    cy.get('input[name="nacionalidade"]').type('Digital');

    // Submete o formulário [cite: 45]
    cy.get('form').submit();

    // Verifica a mensagem de confirmação [cite: 46]
    // Para isso funcionar bem, vamos ajustar o controller para enviar uma mensagem
    // em vez de JSON para requisições do formulário.
    cy.contains('Autor criado com sucesso!');
  });
});