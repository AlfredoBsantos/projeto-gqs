const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');
const path = require('path');

// Rota para servir a VIEW de cadastro
router.get('/novo', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'cadastro-autor.html'));
});

// Rota para exibir a mensagem de SUCESSO após o cadastro
router.get('/sucesso', (req, res) => {
    res.send('<h1>Autor criado com sucesso!</h1><p><a href="/autores/novo">Cadastrar outro autor</a></p>');
});

// CREATE: Endpoint da API para criar
router.post('/', autorController.criarAutor);

// READ: Endpoints da API para ler
router.get('/', autorController.listarAutores);
router.get('/:id', autorController.buscarAutorPorId);

// UPDATE: Endpoint da API para atualizar
router.put('/:id', autorController.atualizarAutor);

// DELETE: Endpoint da API para remover
router.delete('/:id', autorController.deletarAutor);

module.exports = router;