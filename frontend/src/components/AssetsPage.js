// components/AssetsPage.js
// Simple bundler-free React component to list assets for ?projectId=###

import { fetchAssetsForProject } from '../api/assets.js';

export default function AssetsPage() {
  const { useEffect, useState } = React;

  const [assets, setAssets] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function getProjectIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('projectId');
    return id ? String(id) : null;
  }

  async function loadAssets(id) {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAssetsForProject(id);
      setAssets(Array.isArray(data) ? data : (data?.results ?? []));
    } catch (e) {
      setError('Failed to load assets for this project.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const id = getProjectIdFromURL();
    setProjectId(id);
    if (id) loadAssets(id);
  }, []);

  if (!projectId) {
    return React.createElement('div', { className: 'assets-error' }, 'Missing projectId in URL.');
  }

  return React.createElement(
    'section',
    { className: 'assets-container' },
    React.createElement('h2', null, `Assets for Project #${projectId}`),
    loading
      ? React.createElement('div', null, 'Loading assets…')
      : error
        ? React.createElement('div', { className: 'assets-error' }, error)
        : assets.length === 0
          ? React.createElement('div', null, 'No assets found for this project.')
          : React.createElement('ul', { className: 'asset-list' },
              assets.map((a) =>
                React.createElement('li', { key: a.id, className: 'asset-item' },
                  React.createElement('div', { className: 'asset-name' }, a.name || `Asset #${a.id}`),
                  a.status ? React.createElement('div', { className: 'asset-status' }, `Status: ${a.status}`) : null
                )
              )
            )
  );
}