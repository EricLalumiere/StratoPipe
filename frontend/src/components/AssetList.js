import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssetList() {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/assets/');
                setAssets(response.data);
            } catch (error) {
                console.error('Error fetching assets:', error);
            }
        };
        fetchAssets();
    }, []);

    return (
        <div>
            <h1>Assets</h1>
            <ul>
                {assets.map(asset => (
                    <li key={asset.id}>{asset.filename}</li>
                ))}
            </ul>
        </div>
    );
}

export default AssetList;
