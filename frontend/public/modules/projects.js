import api from './axiosInstance.js';

export async function fetchProjects() {
  const res = await api.get('projects/');
  return res.data;
}

export async function createProject(payload) {
  // Ensure newly created projects are active
  const res = await api.post('projects/', { ...payload, active: true });
  return res.data;
}

export async function deleteProject(id) {
  await api.delete(`projects/${id}/`);
}

export async function deactivateProject(projectId) {
  // Set active to false to "soft delete"
  const res = await api.patch(`projects/${projectId}/`, { active: false });
  return res.data;
}