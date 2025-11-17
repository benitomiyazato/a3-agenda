const express = require('express');
const compromissosRoutes = require('./routes/compromissos');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/compromissos', compromissosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
