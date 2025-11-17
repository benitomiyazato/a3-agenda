import axios from 'axios';
import type { Compromisso } from '../tipos/compromissos';

const API_URL = 'http://localhost:3000/compromissos';

/* LISTAR TODOS */
export const listarCompromissos = async () => {
  const response = await axios.get(API_URL);
  return response.data as Compromisso[];
};

/* BUSCAR POR ID */
export const buscarCompromissoPorId = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data as Compromisso;
};

/* ADICIONAR (POST) */
export const adicionarCompromisso = async (
  compromisso: Omit<Compromisso, 'id'>
) => {
  const response = await axios.post(API_URL, {
    ...compromisso,
    data: compromisso.data.toISOString(), // garante que a data esteja no formato JSON
  });
  return response.data as Compromisso;
};

/* REMOVER (DELETE) */
export const removerCompromisso = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
