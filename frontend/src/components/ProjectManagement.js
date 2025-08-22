// frontend/src/components/ProjectManagement.js
import React, { useState, useEffect } from 'react';
import { fetchProjects, createProject, deleteProject } from '../api/projects';
import '../styles/ProjectManagement.css';

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async e => {
    e.preventDefault();
    if (!form.name.trim()) return;
    try {
      const newProj = await createProject(form);
      setProjects([newProj, ...projects]);
      setForm({ name: '', description: '' });
    } catch (err) {
      setError('Failed to create project');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch {
      setError('Delete failed');
    }
  };

  return (
    <div className="pm-container">
      <h1>Your Projects</h1>

      {error && <div className="pm-error">{error}</div>}

      <form className="pm-form" onSubmit={handleCreate}>
        <input
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">Create Project</button>
      </form>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul className="pm-list">
          {projects.map(proj => (
            <li key={proj.id} className="pm-item">
              <a
                className="pm-name"
                href={`assets.html?projectId=${encodeURIComponent(proj.id)}&projectName=${encodeURIComponent(proj.name)}`}
                title="View project assets"
              >
                {proj.name}
              </a>
              <span className="pm-date">
                {proj.created_at ? new Date(proj.created_at).toLocaleDateString() : ''}
              </span>
              <button className="pm-delete" onClick={() => handleDelete(proj.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
