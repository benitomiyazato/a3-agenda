const express = require('express');
const cors = require('cors');
const compromissosRoutes = require('./routes/compromissos');

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json());

app.use('/compromissos', compromissosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
