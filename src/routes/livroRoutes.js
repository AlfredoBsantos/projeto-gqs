// src/routes/livroRoutes.js
const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

// CREATE
router.post('/', livroController.criarLivro);

// READ (todos)
router.get('/', livroController.listarLivros);

// READ (por ID)
router.get('/:id', livroController.buscarLivroPorId);

// UPDATE (por ID)
router.put('/:id', livroController.atualizarLivro);

// DELETE (por ID)
router.delete('/:id', livroController.deletarLivro);

module.exports = router;