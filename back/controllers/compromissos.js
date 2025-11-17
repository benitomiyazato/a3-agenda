const {
  adicionarCompromisso,
  listarCompromissos,
  removerCompromisso,
  buscarCompromissoPorId,
} = require('../data/compromissos');

function getCompromissos(req, res) {
  res.json(listarCompromissos());
}

function getCompromisso(req, res) {
  const id = Number(req.params.id);
  const compromisso = buscarCompromissoPorId(id);

  if (!compromisso) {
    return res.status(404).json({ mensagem: 'Compromisso não encontrado' });
  }

  res.json(compromisso);
}

function postCompromisso(req, res) {
  const { titulo, descricao, data } = req.body;

  const novo = adicionarCompromisso({
    titulo,
    descricao,
    data: new Date(data),
  });

  res.status(201).json(novo);
}

function deleteCompromisso(req, res) {
  const id = Number(req.params.id);
  const compromisso = buscarCompromissoPorId(id);

  if (!compromisso) {
    return res.status(404).json({ mensagem: 'Compromisso não encontrado' });
  }

  removerCompromisso(id);
  res.json({ mensagem: 'Compromisso removido' });
}

module.exports = {
  getCompromissos,
  getCompromisso,
  postCompromisso,
  deleteCompromisso,
};
