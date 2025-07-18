// src/controllers/livroController.js
const db = require('../database/database');

// CREATE: Adiciona um novo livro
exports.criarLivro = (req, res) => {
    const { titulo, ano_publicacao, autor_id } = req.body;
    if (!titulo || !autor_id) {
        return res.status(400).json({ error: 'Título e autor_id são obrigatórios.' });
    }
    const sql = 'INSERT INTO livros (titulo, ano_publicacao, autor_id) VALUES (?, ?, ?)';
    db.run(sql, [titulo, ano_publicacao, autor_id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Erro ao salvar o livro.' });
        }
        res.status(201).json({ message: 'Livro criado com sucesso!', livroId: this.lastID });
    });
};

// READ: Lista todos os livros (com o nome do autor)
exports.listarLivros = (req, res) => {
    // Usamos um JOIN para buscar o nome do autor junto com os dados do livro
    const sql = `
        SELECT L.id, L.titulo, L.ano_publicacao, A.nome as autor_nome
        FROM livros L
        JOIN autores A ON L.autor_id = A.id
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar livros.' });
        }
        res.status(200).json(rows);
    });
};

// READ: Busca um livro por ID (com o nome do autor)
exports.buscarLivroPorId = (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT L.id, L.titulo, L.ano_publicacao, A.nome as autor_nome
        FROM livros L
        JOIN autores A ON L.autor_id = A.id
        WHERE L.id = ?
    `;
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar livro.' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }
        res.status(200).json(row);
    });
};

// UPDATE: Atualiza um livro
exports.atualizarLivro = (req, res) => {
    const { id } = req.params;
    const { titulo, ano_publicacao, autor_id } = req.body;
    if (!titulo || !autor_id) {
        return res.status(400).json({ error: 'Título e autor_id são obrigatórios.' });
    }
    const sql = 'UPDATE livros SET titulo = ?, ano_publicacao = ?, autor_id = ? WHERE id = ?';
    db.run(sql, [titulo, ano_publicacao, autor_id, id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar livro.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Livro não encontrado para atualização.' });
        }
        res.status(200).json({ message: `Livro com ID ${id} atualizado com sucesso.` });
    });
};

// DELETE: Deleta um livro
exports.deletarLivro = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM livros WHERE id = ?';
    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar livro.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Livro não encontrado para deleção.' });
        }
        res.status(200).json({ message: `Livro com ID ${id} deletado com sucesso.` });
    });
};