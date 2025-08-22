// frontend/public/components/assets-page.js (path as referenced by assets.html)
import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(window.location.search);
}

function AssetList() {
  const query = useQuery();
  const projectId = query.get('projectId');
  const projectName = query.get('projectName');

  const [assets, setAssets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let url = '/api/assets/';
    const params = {};
    if (projectId) {
      // Backend should support filtering by ?project=<id>
      params.project = projectId;
    }

    setLoading(true);
    axios
      .get(url, { params })
      .then(res => setAssets(res.data))
      .catch(() => setError('Failed to load assets'))
      .finally(() => setLoading(false));
  }, [projectId]);

  return (
    <div style={{ padding: '1rem' }}>
      <header>
        <h1>
          {projectId
            ? `Assets for Project: ${projectName || projectId}`
            : 'All Assets'}
        </h1>
        <nav>
          <a href="upload.html">Upload Asset</a> |{' '}
          <a href="project-management.html">Back to Projects</a>
        </nav>
      </header>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {assets.map(a => (
            <li key={a.id}>
              <strong>{a.name || a.file}</strong>
              {a.status ? ` — ${a.status}` : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const mount = document.getElementById('assetList');
createRoot(mount).render(<AssetList />);