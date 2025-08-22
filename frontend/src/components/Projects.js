// frontend/public/api/projects.js
import axios from 'axios';

function authHeaders() {
  // If you use token auth, implement here, e.g.:
  // const token = localStorage.getItem('access_token');
  // return token ? { Authorization: `Bearer ${token}` } : {};
  return {};
}

export async function fetchProjects() {
  const res = await axios.get('/api/projects/', { headers: authHeaders() });
  return res.data;
}

export async function createProject(payload) {
  const res = await axios.post('/api/projects/', payload, { headers: authHeaders() });
  return res.data;
}

export async function deleteProject(id) {
  await axios.delete(`/api/projects/${id}/`, { headers: authHeaders() });
  return true;
}