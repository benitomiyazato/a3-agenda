export interface Compromisso {
  id: number;
  titulo: string;
  descricao: string;
  data: Date;
}


let compromissos: Compromisso[] = [
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
    data: new Date('2025-11-14T15:00:00'),
  },
];


let contadorId = 2;
export const adicionarCompromisso = (compromisso: Omit<Compromisso, 'id'>) => {
  contadorId += 1;
  const compromissoComId = { ...compromisso, id: contadorId };
  compromissos.push(compromissoComId);
};

export const removerCompromisso = (id: number) => {
  compromissos = compromissos.filter((comp) => comp.id !== id);
};

export const listarCompromissos = () => {
  return compromissos;
};

export const buscarCompromissoPorId = (id: number) => {
  return compromissos.find((comp) => comp.id === id);
};
