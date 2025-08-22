// frontend/src/api/projects.js
// API Service

import api from './axiosInstance';

export async function fetchProjects() {
  const response = await api.get('projects/');
  return response.data;
}

export async function createProject(payload) {
  const response = await api.post('projects/', payload);
  return response.data;
}

export async function deleteProject(id) {
  await api.delete(`projects/${id}/`);
}
