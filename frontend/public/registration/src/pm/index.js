// JavaScript
import React from 'react';
import { createRoot } from 'react-dom/client';
import ProjectManagement from '../components/ProjectManagement.js';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('pm-root');
  if (!rootEl) return;

  const root = createRoot(rootEl);
  root.render(<ProjectManagement />);
});