// tests/integration/autores.test.js

// Este é um exemplo de como seu app.js precisa ser configurado para os testes
// Por enquanto, vamos assumir que ele está configurado corretamente.
// Se encontrarmos problemas, ajustaremos o app.js.
const request = require('supertest');
const express = require('express');

// Precisamos importar e usar as rotas no nosso app de teste
const autorRoutes = require('../../src/routes/autorRoutes');

// Criamos um app express SÓ PARA OS TESTES
const app = express();
app.use(express.json());
app.use('/autores', autorRoutes);


// Início dos testes
describe('Testes dos Endpoints de Autores', () => {
  let autorId;

  it('Deve criar um novo autor via POST /autores', async () => {
    const response = await request(app)
      .post('/autores')
      .send({
        nome: 'Autor de Teste',
        nacionalidade: 'Testelândia'
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('autorId');
    autorId = response.body.autorId; // Guarda o ID para usar nos outros testes
  });

  it('Deve listar todos os autores via GET /autores', async () => {
    const response = await request(app).get('/autores');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Espera que a lista não esteja vazia
  });

  it('Deve buscar um autor específico por ID via GET /autores/:id', async () => {
    const response = await request(app).get(`/autores/${autorId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(autorId);
  });
  
  it('Deve retornar erro 404 para um autor inexistente', async () => {
    const response = await request(app).get('/autores/9999'); // ID que provavelmente não existe
    expect(response.statusCode).toBe(404);
  });

  it('Deve atualizar um autor via PUT /autores/:id', async () => {
    const response = await request(app)
      .put(`/autores/${autorId}`)
      .send({
        nome: 'Autor de Teste Atualizado',
        nacionalidade: 'Testelândia'
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain('atualizado com sucesso');
  });

  it('Deve deletar um autor via DELETE /autores/:id', async () => {
    const response = await request(app).delete(`/autores/${autorId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain('deletado com sucesso');
  });
});