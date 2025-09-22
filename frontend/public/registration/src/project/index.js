// JavaScript
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('project-root');
  if (!rootEl) return;
  const root = createRoot(rootEl);
  root.render(<App />);
});