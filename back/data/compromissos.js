let compromissos = [
  {
    id: 0,
    titulo: 'Reunião de Projeto',
    descricao: 'Reunião para desenvolvimento do projeto A3',
    data: new Date('2025-11-12T10:00:00'),
  },
  {
    id: 1,
    titulo: 'Consulta Médica',
    descricao: 'Consulta médica - check-up anual.',
    data: new Date('2025-11-14T15:00:00'),
  },
  {
    id: 2,
    titulo: 'Consulta Médica',
    descricao: 'Consulta médica - check-up anual.',
    data: new Date('2025-11-14T15:00:00'),
  },
  {
    id: 3,
    titulo: 'Consulta Médica',
    descricao: 'Consulta médica - check-up anual.',
    data: new Date('2025-11-14T15:00:00'),
  },
  {
    id: 4,
    titulo: 'Consulta Médica',
    descricao: 'Consulta médica - check-up anual.',
    data: new Date('2025-11-21T15:00:00'),
  },
];

let contadorId = 4;

function adicionarCompromisso(compromisso) {
  contadorId++;
  const compromissoComId = { ...compromisso, id: contadorId };
  compromissos.push(compromissoComId);
  return compromissoComId;
}

function removerCompromisso(id) {
  compromissos = compromissos.filter((c) => c.id !== id);
}

function listarCompromissos() {
  return compromissos;
}

function buscarCompromissoPorId(id) {
  return compromissos.find((c) => c.id === id);
}

module.exports = {
  adicionarCompromisso,
  removerCompromisso,
  listarCompromissos,
  buscarCompromissoPorId,
};
