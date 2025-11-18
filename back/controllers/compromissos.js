const {
  adicionarCompromisso,
  listarCompromissos,
  removerCompromisso,
  buscarCompromissoPorId,
  editarCompromisso
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
  const { titulo, descricao, dataInicio, dataFim, categoria, local, link } = req.body;

  const novo = adicionarCompromisso({
    titulo,
    descricao,
    dataInicio: new Date(dataInicio),
    dataFim: new Date(dataFim),
    categoria,
    local,
    link
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

function putCompromisso(req, res) {
  const id = Number(req.params.id);
  const compromisso = buscarCompromissoPorId(id);

  if (!compromisso) {
    return res.status(404).json({ mensagem: 'Compromisso não encontrado' });
  }

  const novosDados = req.body;

  if (novosDados.dataInicio) {
    novosDados.dataInicio = new Date(novosDados.dataInicio);
  }

  if (novosDados.dataFim) {
    novosDados.dataFim = new Date(novosDados.dataFim);
  }

  const atualizado = editarCompromisso(id, novosDados);

  res.json(atualizado);
}


module.exports = {
  getCompromissos,
  getCompromisso,
  postCompromisso,
  deleteCompromisso,
  putCompromisso
};
