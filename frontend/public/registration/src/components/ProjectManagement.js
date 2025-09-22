// components/ProjectManagement.js
import React, { useEffect, useState } from 'react';
import { fetchProjects, createProject, deactivateProject } from '../api/projects.js';

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [deletingIds, setDeletingIds] = useState(new Set());

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

  async function handleSoftDelete(projectId, projectName) {
    const ok = window.confirm(`Soft delete project "${projectName}"? This will hide it from lists.`);
    if (!ok) return;

    setDeletingIds(prev => new Set(prev).add(projectId));
    try {
      await deactivateProject(projectId);
      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (e) {
      console.error(e);
      setError(`Failed to delete "${projectName}".`);
    } finally {
      setDeletingIds(prev => {
        const next = new Set(prev);
        next.delete(projectId);
        return next;
      });
    }
  }

  return React.createElement(
    'div',
    { className: 'pm-container' },
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
    React.createElement('div', { style: { height: '1rem' } }),
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
                        : null,
                      React.createElement('button', {
                        type: 'button',
                        onClick: () => handleSoftDelete(p.id, p.name),
                        disabled: deletingIds.has(p.id),
                        className: 'neu-button danger',
                        title: 'Soft delete (deactivate) this project'
                      }, deletingIds.has(p.id) ? 'Deleting…' : 'Delete')
                    )
                  )
                )
              )
      )
    )
  );
}
