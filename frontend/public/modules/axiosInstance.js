// JavaScript
const axios = window.axios;
if (!axios) {
  throw new Error('Axios UMD is not loaded. Include <script src="https://unpkg.com/axios/dist/axios.min.js"></script>');
}

function computeBaseURL() {
  if (typeof window !== 'undefined' && window.location?.origin && window.location.origin !== 'null') {
    return `${window.location.origin.replace(/\/+$/, '')}/api/`;
  }
  return 'http://localhost:8000/api/';
}

const api = axios.create({
  baseURL: computeBaseURL(),
  headers: { 'Content-Type': 'application/json' },
  // Map cookie->header (kept for completeness)
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

// Always send cookies
api.defaults.withCredentials = true;

// Simple cookie reader
function getCookie(name) {
  const target = name + '=';
  const parts = document.cookie.split(';');
  for (let part of parts) {
    part = part.trim();
    if (part.startsWith(target)) return decodeURIComponent(part.slice(target.length));
  }
  return null;
}

api.interceptors.request.use((config) => {
  // Optional Authorization if your API requires it
  const raw = localStorage.getItem('authToken');
  if (raw) {
    const hasScheme = /\s/.test(raw);
    // If your backend is JWT-only, change 'Token' to 'Bearer'
    config.headers.Authorization = hasScheme ? raw : `Token ${raw}`;
  }

  // Explicitly add X-CSRFToken for unsafe methods
  const method = (config.method || 'get').toLowerCase();
  if (['post', 'put', 'patch', 'delete'].includes(method)) {
    const csrf = getCookie('csrftoken');
    if (csrf) config.headers['X-CSRFToken'] = csrf;
  }

  return config;
}, (error) => Promise.reject(error));

export default api;
