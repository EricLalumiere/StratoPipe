// components/ProjectManagement.js
// Bundler-free React component using globals (React, ReactDOM) and axios.
// Exports a default component for project-management.html to import.

import { fetchProjects, createProject } from '../api/projects.js';

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
      // Only keep active projects on the client side
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
      // Refresh the list immediately after creation
      await loadProjects();
      // Reset form
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

  return React.createElement(
    'div',
    { className: 'pm-container' },
    // Create form
    React.createElement('section', { className: 'pm-create' },
      React.createElement('div', { className: 'neu-frame' },
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
      )
    ),

    // add a spacer
    React.createElement('div', { style: { height: '1rem' } }),

    // Projects list
    React.createElement('section', { className: 'pm-list' },
      React.createElement('div', { className: 'neu neu-frame' },
        React.createElement('h3', null, 'Your Projects'),
        loading
          ? React.createElement('div', null, 'Loading projects…')
          : projects.length === 0
            ? React.createElement('div', null, 'No projects yet.')
            : React.createElement('ul', { className: 'pm-project-list' },
                projects.map((p) =>
                  React.createElement('li', { key: p.id, className: 'pm-project-item' },
                    React.createElement('div', {
                      className: 'pm-project-row',
                      style: {
                        display: 'flex',
                        alignItems: 'baseline',
                        columnGap: '0.75rem',
                        rowGap: '0.25rem',
                        flexWrap: 'wrap'
                      }
                    },
                      React.createElement('a', {
                        className: 'neu-link',
                        href: `/project.html?projectId=${encodeURIComponent(p.id)}`,
                        title: `Open assets for ${p.name}`,
                      }, p.name),
                      p.description
                        ? React.createElement('span', { className: 'pm-project-desc' }, p.description)
                        : null
                    )
                  )
                )
              )
      )
    )
  );
}
