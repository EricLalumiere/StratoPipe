// JavaScript
import api from './axiosInstance.js';

function getCsrfCookie() {
  const name = 'csrftoken=';
  const parts = document.cookie.split(';');
  for (let part of parts) {
    part = part.trim();
    if (part.startsWith(name)) return decodeURIComponent(part.slice(name.length));
  }
  return null;
}

export async function fetchProjects() {
  const res = await api.get('projects/');
  return res.data;
}

export async function createProject(payload) {
  const csrf = getCsrfCookie();
  const res = await api.post('projects/', payload, {
    headers: {
      ...(csrf ? { 'X-CSRFToken': csrf } : {})
    }
  });
  return res.data;
}

export async function deleteProject(id) {
  const csrf = getCsrfCookie();
  await api.delete(`projects/${id}/`, {
    headers: {
      ...(csrf ? { 'X-CSRFToken': csrf } : {})
    }
  });
}
