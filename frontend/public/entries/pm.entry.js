// frontend/public/entries/pm.entry.js
// This is the entry for bundling the Project Management page.
// It relies on React and ReactDOM globals (loaded via UMD script tags in HTML).

import ProjectManagement from '../modules/ProjectManagement.js';
import { fetchProjects, createProject, deleteProject } from '../modules/projects.js';

(function mount() {
  // Optional: expose API for debugging
  window.ProjectAPI = { fetchProjects, createProject, deleteProject };

  const rootEl = document.getElementById('pm-root');
  if (!rootEl) {
    console.error('Mount element #pm-root not found.');
    return;
  }
  ReactDOM.createRoot(rootEl).render(
    React.createElement(ProjectManagement, {}, null)
  );
})();