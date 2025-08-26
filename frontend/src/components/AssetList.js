import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';

export default function AssetList() {
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/assets/');
        setAssets(Array.isArray(data) ? data : (data?.results ?? []));
      } catch (e) {
        setError('Failed to load assets');
        // eslint-disable-next-line no-console
        console.error(e);
      }
    })();
  }, []);

  if (error) return <div className="error">{error}</div>;
  if (!assets.length) return <div>No assets yet.</div>;

  return (
    <ul className="asset-list">
      {assets.map(a => (
        <li key={a.id}>
          <strong>{a.name || a.filename || `Asset #${a.id}`}</strong>
        </li>
      ))}
    </ul>
  );
}