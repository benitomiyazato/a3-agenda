let compromissos = [
  {
    id: 0,
    titulo: 'Reunião de Projeto',
    descricao: 'Reunião para desenvolvimento do projeto empresa',
    dataInicio: new Date('2025-11-12T10:00:00'),
    dataFim: new Date('2025-11-12T10:00:00'),
    categoria: "Trabalho",
    local: "",
    link: "zoom.com/sala",
  },
  {
    id: 1,
    titulo: 'Consulta Medica',
    descricao: 'Odonto',
    dataInicio: new Date('2025-11-15T10:00:00'),
    dataFim: new Date('2025-11-12T10:00:00'),
    categoria: "Saúde",
    local: "consultorio doutor luiz",
    link: "",
  },
  {
    id: 2,
    titulo: 'Academia',
    descricao: '',
    dataInicio: new Date('2025-11-21T10:00:00'),
    dataFim: new Date('2025-11-12T10:00:00'),
    categoria: "Saúde",
    local: "gavioes",
    link: "",
  },
  {
    id: 3,
    titulo: 'Reunião A3',
    descricao: 'Reunião para desenvolvimento do projeto A3',
    dataInicio: new Date('2025-11-21T10:00:00'),
    dataFim: new Date('2025-11-12T10:00:00'),
    categoria: "Estudos",
    local: "",
    link: "zoom.com/sala",
  },
  {
    id: 4,
    titulo: 'Jantar em Familia',
    descricao: '',
    dataInicio: new Date('2025-11-22T19:00:00'),
    dataFim: new Date('2025-11-12T10:00:00'),
    categoria: "Família",
    local: "Restaurante Chique",
    link: "",
  }
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

function editarCompromisso(id, novosDados) {
  const index = compromissos.findIndex((c) => c.id === id);

  if (index === -1) {
    return null; // não encontrado
  }

  // Atualiza apenas os campos enviados
  compromissos[index] = {
    ...compromissos[index],
    ...novosDados,
    id: compromissos[index].id, // garante que o id não seja alterado
  };

  return compromissos[index];
}



module.exports = {
  adicionarCompromisso,
  removerCompromisso,
  listarCompromissos,
  buscarCompromissoPorId,
  editarCompromisso
};
