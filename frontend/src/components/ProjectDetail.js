// components/ProjectDetail.js
// Bundler-free React component using globals (React, ReactDOM) and axios.

import { fetchProjectById } from '../api/projects.js';
import { fetchAssetsForProject } from '../api/assets.js';

export default function ProjectDetail() {
  const { useEffect, useState } = React;
  const [project, setProject] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Read ?projectId=... from the URL
  function getProjectId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('projectId');
  }

  useEffect(() => {
    const projectId = getProjectId();
    if (!projectId) {
      setError('Missing projectId in URL.');
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [proj, assetList] = await Promise.all([
          fetchProjectById(projectId),
          fetchAssetsForProject(projectId),
        ]);
        setProject(proj);
        setAssets(Array.isArray(assetList) ? assetList : (assetList?.results ?? []));
      } catch (e) {
        console.error(e);
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return React.createElement('div', null, 'Loading project…');
  if (error) return React.createElement('div', { className: 'pm-error' }, error);
  if (!project) return React.createElement('div', null, 'Project not found.');

  return React.createElement(
    'div',
    { className: 'pm-container' },
    React.createElement('section', { className: 'pm-detail' },
      React.createElement('h2', null, project.name || 'Untitled Project'),
      project.description
        ? React.createElement('p', null, project.description)
        : null,
      React.createElement('div', { className: 'pm-meta' },
        // Render a few common metadata fields if present
        project.created_at ? React.createElement('div', null, `Created: ${new Date(project.created_at).toLocaleString()}`) : null,
        project.updated_at ? React.createElement('div', null, `Updated: ${new Date(project.updated_at).toLocaleString()}`) : null,
        project.owner ? React.createElement('div', null, `Owner: ${project.owner}`) : null
      )
    ),
    React.createElement('section', { className: 'pm-assets' },
      React.createElement('h3', null, 'Assets in this Project'),
      assets.length === 0
        ? React.createElement('div', null, 'No assets yet.')
        : React.createElement('ul', { className: 'pm-project-assets' },
            assets.map((a) =>
              React.createElement('li', { key: a.id, className: 'pm-asset-item' },
                React.createElement('a', {
                  href: `/asset.html?assetId=${encodeURIComponent(a.id)}`,
                  title: `Open asset ${a.name}`,
                }, a.name || `Asset #${a.id}`),
                a.asset_type ? React.createElement('span', { style: { marginLeft: '0.5rem', color: '#666' } }, `(${a.asset_type})`) : null
              )
            )
          )
    )
  );
}

// Mount when the page loads (only if you aren’t bundling this file)
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('project-root');
  if (root) {
    ReactDOM.createRoot(root).render(React.createElement(ProjectDetail));
  }
});