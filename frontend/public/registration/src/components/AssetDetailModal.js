// Desc: Modal component to show asset details

import React from 'react';

const modalStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
};

const modalContentStyle = {
  backgroundColor: '#fff', padding: '20px', borderRadius: '5px', maxWidth: '600px', width: '90%'
};

const AssetDetailModal = ({ asset, onClose }) => {
  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <span onClick={onClose} style={{ float: 'right', cursor: 'pointer', fontSize: '20px' }}>
          &times;
        </span>
        <h2>{asset.name}</h2>
        <img
          src={asset.render_result ? asset.render_result : asset.thumbnail}
          alt={asset.name}
          style={{ maxWidth: '100%' }}
        />
        <p>Status: {asset.status}</p>
        {asset.ai_data && (
          <div>
            <h3>AI Analysis</h3>
            <p>{asset.ai_data.analysis} (Confidence: {asset.ai_data.confidence})</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetDetailModal;
