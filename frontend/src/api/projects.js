// JavaScript
// API functions for managing projects
// Uses axios instance with base URL and credentials
// Handles CSRF token for POST and DELETE requests
// Exports functions: fetchProjects, createProject, deleteProject
//--------------------------------------------

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

// Add this export alongside existing exports (e.g., fetchProjects, createProject)
export async function deactivateProject(projectId) {
  // If this file uses a configured axios instance, use it here as well.
  // Example with a base axios import:
  // return axios.patch(`/api/projects/${projectId}/`, { active: false });

  // Example if this file uses an axiosInstance:
  // return axiosInstance.patch(`/api/projects/${projectId}/`, { active: false });

  // If the file already defines a common client variable, reuse it:
  return axios.patch(`/api/projects/${projectId}/`, { active: false });
}
