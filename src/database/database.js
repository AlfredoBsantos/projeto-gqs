// src/database/database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        
        // Garante que a tabela AUTORES exista
        db.run(`CREATE TABLE IF NOT EXISTS autores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            nacionalidade TEXT
        )`, (err) => {
            if (err) {
                console.error('Erro ao criar tabela de autores:', err.message);
            } else {
                console.log('Tabela de autores pronta ou já existente.');
            }
        });

        // --- NOVO ---
        // Garante que a tabela LIVROS exista
        db.run(`CREATE TABLE IF NOT EXISTS livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            ano_publicacao INTEGER,
            autor_id INTEGER,
            FOREIGN KEY (autor_id) REFERENCES autores(id)
        )`, (err) => {
            if (err) {
                console.error('Erro ao criar tabela de livros:', err.message);
            } else {
                console.log('Tabela de livros pronta ou já existente.');
            }
        });
    }
});

module.exports = db;