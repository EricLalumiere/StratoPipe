// frontend/public/modules/projects.js
import api from './axiosInstance.js';

export async function fetchProjects() {
  const res = await api.get('projects/');
  return res.data;
}

export async function createProject(payload) {
  const res = await api.post('projects/', payload);
  return res.data;
}

export async function deleteProject(id) {
  await api.delete(`projects/${id}/`);
}