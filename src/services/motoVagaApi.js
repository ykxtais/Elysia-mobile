import { api } from './api';

// helpers para paginação da api
function normalizeList(res) {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.items)) return d.items;
  if (Array.isArray(d?.data)) return d.data;
  return [];
}

// moto
export async function listMotos() {
  const res = await api.get('/motos');
  return normalizeList(res);
}
export async function createMoto({ placa, marca, modelo, ano }) {
  const body = { placa, marca, modelo, ano: Number(ano) || 0 };
  const res = await api.post('/motos', body);
  return res.data;
}
export async function updateMoto(id, { placa, marca, modelo, ano }) {
  const body = { placa, marca, modelo, ano: Number(ano) || 0 };
  const res = await api.put(`/motos/${id}`, body);
  return res.data;
}
export async function deleteMoto(id) {
  const res = await api.delete(`/motos/${id}`);
  return res.data;
}

// vaga
export async function listVagas() {
  const res = await api.get('/vagas');
  return normalizeList(res);
}
export async function createVaga({ status, numero, patio }) {
  const body = { status, numero, patio };
  const res = await api.post('/vagas', body);
  return res.data;
}
export async function updateVaga(id, { status, numero, patio }) {
  const body = { status, numero, patio };
  const res = await api.put(`/vagas/${id}`, body);
  return res.data;
}
export async function deleteVaga(id) {
  const res = await api.delete(`/vagas/${id}`);
  return res.data;
}
