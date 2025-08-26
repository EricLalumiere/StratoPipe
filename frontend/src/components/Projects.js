// api/projects.js
// Minimal API helpers using axios; assumes auth session is already established.

const API_BASE = '/api/projects/';

export async function fetchProjects() {
  const res = await axios.get(API_BASE, { withCredentials: true });
  return res.data;
}

export async function createProject(payload) {
  const res = await axios.post(API_BASE, payload, { withCredentials: true });
  return res.data;
}

// Optional: delete, update, etc. could be added here.