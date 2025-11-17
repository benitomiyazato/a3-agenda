const express = require('express');
const {
  getCompromissos,
  getCompromisso,
  postCompromisso,
  deleteCompromisso,
} = require('../controllers/compromissos');

const router = express.Router();

/* LISTAR TODOS */
router.get('/', getCompromissos);

/* BUSCAR POR ID */
router.get('/:id', getCompromisso);

/* ADICIONAR */
router.post('/', postCompromisso);

/* REMOVER */
router.delete('/:id', deleteCompromisso);

module.exports = router;
