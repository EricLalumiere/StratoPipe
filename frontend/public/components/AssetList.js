import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AssetDetailModal from './AssetDetailModal';

// Constants for inline styles
const styles = {
  container: { padding: '20px' },
  list: { listStyle: 'none', padding: 0 },
  listItem: {
    cursor: 'pointer',
    marginBottom: '10px',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  errorText: { color: 'red' },
};

// Extracted fetch logic
const fetchAssets = async (setAssets, setError, setIsLoading) => {
  try {
    const response = await axios.get('/api/assets/');
    setAssets(response.data);
    setError(null); // Clear any previous errors
  } catch {
    setError('Error fetching assets. Please try again later.');
  } finally {
    setIsLoading(false);
  }
};

// Helper function for rendering body content
const renderContent = ({ isLoading, error, assets, setSelectedAsset }) => {
  if (isLoading) return <p>Loading assets...</p>;
  if (error) return <p style={styles.errorText}>{error}</p>;
  if (assets.length === 0)
    return <p>No assets available. Upload some to get started!</p>;

  return (
    <ul style={styles.list}>
      {assets.map((asset) => (
        <li
          key={asset.id}
          style={styles.listItem}
          onClick={() => setSelectedAsset(asset)}
        >
          {asset.thumbnail && <img src={asset.thumbnail} alt={asset.name} width="100" />}
          <p style={{ margin: 0 }}>{asset.name}</p>
        </li>
      ))}
    </ul>
  );
};

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAssets(setAssets, setError, setIsLoading);
  }, []);

  return (
    <div style={styles.container}>
      <h2>Your Assets</h2>
      {renderContent({ isLoading, error, assets, setSelectedAsset })}
      {selectedAsset && (
        <AssetDetailModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
      )}
    </div>
  );
};

export default AssetList;