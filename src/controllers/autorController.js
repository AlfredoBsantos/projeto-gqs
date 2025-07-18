const db = require('../database/database');

exports.criarAutor = (req, res) => {
  const { nome, nacionalidade } = req.body;
  if (!nome) {
    return res.status(400).json({ error: 'O campo "nome" é obrigatório.' });
  }
  const sql = 'INSERT INTO autores (nome, nacionalidade) VALUES (?, ?)';
  db.run(sql, [nome, nacionalidade], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao salvar o autor no banco de dados.' });
    }
    res.redirect('/autores/sucesso');
  });
};

exports.listarAutores = (req, res) => {
  const sql = 'SELECT * FROM autores';
  db.all(sql, [], (err, rows) => {
    if (err) { return res.status(500).json({ error: 'Erro ao buscar autores.' }); }
    res.status(200).json(rows);
  });
};

exports.buscarAutorPorId = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM autores WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) { return res.status(500).json({ error: 'Erro ao buscar autor.' }); }
    if (!row) { return res.status(404).json({ error: 'Autor não encontrado.' }); }
    res.status(200).json(row);
  });
};

exports.atualizarAutor = (req, res) => {
  const { id } = req.params;
  const { nome, nacionalidade } = req.body;
  if (!nome) { return res.status(400).json({ error: 'O campo "nome" é obrigatório.' }); }
  const sql = 'UPDATE autores SET nome = ?, nacionalidade = ? WHERE id = ?';
  db.run(sql, [nome, nacionalidade, id], function(err) {
    if (err) { return res.status(500).json({ error: 'Erro ao atualizar autor.' }); }
    if (this.changes === 0) { return res.status(404).json({ error: 'Autor não encontrado para atualização.' }); }
    res.status(200).json({ message: `Autor com ID ${id} atualizado com sucesso.` });
  });
};

exports.deletarAutor = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM autores WHERE id = ?';
  db.run(sql, [id], function(err) {
    if (err) { return res.status(500).json({ error: 'Erro ao deletar autor.' }); }
    if (this.changes === 0) { return res.status(404).json({ error: 'Autor não encontrado para deleção.' }); }
    res.status(200).json({ message: `Autor com ID ${id} deletado com sucesso.` });
  });
};