const express = require('express');
const db = require('./src/database/database');
const autorRoutes = require('./src/routes/autorRoutes');
const livroRoutes = require('./src/routes/livroRoutes');

const app = express();
const port = 3000;

app.use(express.json());
// Adicionado para que o formulário HTML funcione corretamente
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('O servidor está funcionando!');
});

// Usa os roteadores para os respectivos endpoints
app.use('/autores', autorRoutes);
app.use('/livros', livroRoutes);

app.listen(port, () => {
  console.log(`Servidor iniciado. Acesse em http://localhost:${port}`);
});