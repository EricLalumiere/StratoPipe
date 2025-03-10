// main React app component that integrates assets and notifications

import React from 'react';
import AssetList from './components/AssetList';
import NotificationHandler from './notifications/NotificationHandler';

const App = () => {
  return (
    <div>
      <h1>StratoPipe</h1>
      <NotificationHandler />
      <AssetList />
    </div>
  );
};

export default App;
