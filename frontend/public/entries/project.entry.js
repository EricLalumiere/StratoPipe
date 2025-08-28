// JavaScript
// If your component self-mounts, this import is enough:
import '../components/ProjectDetail.js';

// If it does NOT self-mount, use this instead:
// import ProjectDetail from '../components/ProjectDetail.js';
// document.addEventListener('DOMContentLoaded', () => {
//   const root = document.getElementById('project-root');
//   if (root) ReactDOM.createRoot(root).render(React.createElement(ProjectDetail));
// });