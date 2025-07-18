// tests/integration/livros.test.js
const request = require('supertest');
const express = require('express');

// Precisamos de ambas as rotas para o teste funcionar
const autorRoutes = require('../../src/routes/autorRoutes');
const livroRoutes = require('../../src/routes/livroRoutes');

// Criamos um app express SÓ PARA OS TESTES
const app = express();
app.use(express.json());
app.use('/autores', autorRoutes);
app.use('/livros', livroRoutes);


describe('Testes dos Endpoints de Livros', () => {
  let autorId;
  let livroId;

  // Antes de todos os testes de livro, cria um autor para que possamos associar livros a ele
  beforeAll(async () => {
    const response = await request(app)
      .post('/autores')
      .send({ nome: 'Autor para Livros', nacionalidade: 'Literária' });
    autorId = response.body.autorId;
  });

  it('Deve criar um novo livro via POST /livros', async () => {
    const response = await request(app)
      .post('/livros')
      .send({
        titulo: 'Livro de Teste',
        ano_publicacao: 2025,
        autor_id: autorId
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('livroId');
    livroId = response.body.livroId;
  });

  it('Deve listar todos os livros via GET /livros', async () => {
    const response = await request(app).get('/livros');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Deve buscar um livro específico por ID via GET /livros/:id', async () => {
    const response = await request(app).get(`/livros/${livroId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(livroId);
    expect(response.body).toHaveProperty('autor_nome'); // Verifica se o JOIN funcionou
  });

  it('Deve atualizar um livro via PUT /livros/:id', async () => {
    const response = await request(app)
      .put(`/livros/${livroId}`)
      .send({
        titulo: 'Livro de Teste Atualizado',
        ano_publicacao: 2026,
        autor_id: autorId
      });
    
    expect(response.statusCode).toBe(200);
  });

  it('Deve deletar um livro via DELETE /livros/:id', async () => {
    const response = await request(app).delete(`/livros/${livroId}`);
    expect(response.statusCode).toBe(200);
  });

  // Não se esqueça de deletar o autor criado no início para não sujar o banco
  afterAll(async () => {
      await request(app).delete(`/autores/${autorId}`);
  });
});