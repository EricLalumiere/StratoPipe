// Code for displaying a list of assets and their details

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AssetDetailModal from './AssetDetailModal';

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);

  // Fetch assets on component mount
  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get('/api/assets/');
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  return (
    <div>
      <h2>Your Assets</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {assets.map(asset => (
          <li key={asset.id}
              style={{ cursor: 'pointer', marginBottom: '10px' }}
              onClick={() => setSelectedAsset(asset)}>
            {asset.thumbnail && <img src={asset.thumbnail} alt={asset.name} width="100" />}
            <p>{asset.name}</p>
          </li>
        ))}
      </ul>
      {selectedAsset && (
        <AssetDetailModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
      )}
    </div>
  );
};

export default AssetList;
