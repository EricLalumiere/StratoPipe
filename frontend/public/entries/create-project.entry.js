// frontend/public/entries/create-project.entry.js
// This bundles the Create Project page logic.
// It relies on Axios UMD via window.axios (loaded in HTML) through modules/axiosInstance.js.

import { createProject } from '../modules/projects.js';

(function wireForm() {
  const form = document.getElementById('create-form');
  const status = document.getElementById('status');
  const nameEl = document.getElementById('name');
  const descEl = document.getElementById('description');

  if (!form) {
    console.error('Create form #create-form not found.');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (status) status.style.display = 'none';

    const payload = {
      name: nameEl?.value?.trim() || '',
      description: descEl?.value?.trim() || '',
    };

    if (!payload.name) return;

    try {
      await createProject(payload);
      window.location.href = 'project-management.html';
    } catch (err) {
      const msg =
        (err.response && (err.response.data?.detail || err.response.data?.error)) ||
        (err.response ? `Request failed with status ${err.response.status}` : 'Network error');
      if (status) {
        status.textContent = `Failed to create project: ${msg}`;
        status.style.display = 'block';
      }
      console.error(err);
    }
  });
})();