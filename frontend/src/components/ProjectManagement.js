// components/ProjectManagement.js
// Bundler-free React component using globals (React, ReactDOM) and axios.
// Exports a default component for project-management.html to import.

// Update import to include deactivateProject
import { fetchProjects, createProject, deactivateProject } from '../api/projects.js';

export default function ProjectManagement() {
  const { useEffect, useState } = React;

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });

  async function loadProjects() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProjects();
      const raw = Array.isArray(data) ? data : (data?.results ?? []);
      const onlyActive = raw.filter(p => p?.active === true);
      setProjects(onlyActive);
    } catch (e) {
      setError('Failed to load projects.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Project name is required.');
      return;
    }
    try {
      setCreating(true);
      setError(null);
      await createProject({
        name: form.name.trim(),
        description: form.description?.trim() || '',
      });
      await loadProjects();
      setForm({ name: '', description: '' });
    } catch (e) {
      setError('Failed to create project.');
      console.error(e);
    } finally {
      setCreating(false);
    }
  }

  function onFieldChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // New: deactivate handler
  async function handleDeactivate(projectId) {
    try {
      setError(null);
      await deactivateProject(projectId);
      await loadProjects(); // refresh the list to reflect deletion (active=False)
    } catch (e) {
      setError('Failed to delete the project.');
      console.error(e);
    }
  }

  return React.createElement(
    'div',
    { className: 'pm-container' },
    // Create form
    React.createElement('section', { className: 'pm-create' },
      // Ensure there is no stray “``” after the heading line
React.createElement('h3', null, 'Create Project'),
      React.createElement('form', { onSubmit: handleCreate },
        React.createElement('div', { className: 'field' },
          React.createElement('label', { htmlFor: 'pm-name' }, 'Name'),
          React.createElement('input', {
            id: 'pm-name',
            name: 'name',
            value: form.name,
            onChange: onFieldChange,
            placeholder: 'e.g., Project ABC',
            required: true,
            className: 'neu-input'
          })
        ),
        React.createElement('div', { className: 'field' },
          React.createElement('label', { htmlFor: 'pm-desc' }, 'Description'),
          React.createElement('textarea', {
            id: 'pm-desc',
            name: 'description',
            value: form.description,
            onChange: onFieldChange,
            placeholder: 'Optional',
            rows: 3,
            className: 'neu-textarea'
          })
        ),
        React.createElement('button', { type: 'submit', disabled: creating, className: 'neu-button' },
          creating ? 'Creating…' : 'Create Project'
        )
      ),
      error && React.createElement('div', { className: 'pm-error' }, error)
    ),

    // Projects list
    React.createElement('section', { className: 'pm-list' },
      React.createElement('h3', null, 'Your Projects'),
      loading
        ? React.createElement('div', null, 'Loading projects…')
        : projects.length === 0
          ? React.createElement('div', null, 'No projects yet.')
          : React.createElement('ul', { className: 'pm-project-list' },
              projects.map((p) =>
                React.createElement('li', { key: p.id, className: 'pm-project-item' },
                  React.createElement('a', {
                    href: `/assets?projectId=${encodeURIComponent(p.id)}`,
                    title: `Open assets for ${p.name}`,
                  }, p.name),
                  p.description
                    ? React.createElement('div', { className: 'pm-project-desc' }, p.description)
                    : null,
                  // New: Delete button
                  React.createElement('button', {
                    type: 'button',
                    className: 'pm-delete-btn',
                    onClick: () => handleDeactivate(p.id),
                    title: 'Delete project',
                    style: { marginLeft: '0.75rem' }
                  }, 'Delete')
                )
              )
            )
    )
  );
}
