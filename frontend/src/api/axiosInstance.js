// frontend/public/modules/axiosInstance.js
const axios = window.axios;
if (!axios) {
  throw new Error('Axios UMD is not loaded. Include <script src="https://unpkg.com/axios/dist/axios.min.js"></script> before using modules/axiosInstance.js');
}

function computeBaseURL() {
  const envUrl = typeof process !== 'undefined' ? process.env?.REACT_APP_API_URL : undefined;
  if (envUrl) return envUrl.replace(/\/+$/, '/');
  if (typeof window !== 'undefined' && window.location?.origin && window.location.origin !== 'null') {
    return `${window.location.origin.replace(/\/+$/, '')}/api/`;
  }
  return 'http://localhost:8000/api/';
}

const api = axios.create({
  baseURL: computeBaseURL(),
  headers: { 'Content-Type': 'application/json' },
});

// Always send cookies (needed for session/CSRF)
api.defaults.withCredentials = true;

// Simple, regex-free cookie reader
function getCookie(name) {
  const target = name + '=';
  const parts = document.cookie.split(';');
  for (let part of parts) {
    part = part.trim();
    if (part.startsWith(target)) {
      return decodeURIComponent(part.slice(target.length));
    }
  }
  return null;
}

// Prime CSRF cookie via safe GET if missing
async function ensureCsrfCookie() {
  if (getCookie('csrftoken')) return;
  try { await fetch('/api/csrf/', { credentials: 'include' }); } catch {}
  if (getCookie('csrftoken')) return;
  try { await fetch('/api/', { credentials: 'include' }); } catch {}
}

api.interceptors.request.use(
  async (config) => {
    const method = (config.method || 'get').toLowerCase();

    // If you have a token, attach it using an auto-detected scheme:
    // - If the stored value already includes a scheme (e.g., "Token x" or "Bearer x"), use it as-is.
    // - Otherwise prefer "Token" (common for DRF token auth); fall back to "Bearer" if you know your backend is JWT.
    const raw = localStorage.getItem('authToken');
    if (raw) {
      const hasScheme = /\s/.test(raw);
      config.headers.Authorization = hasScheme ? raw : `Token ${raw}`;
    }

    // For unsafe methods, ensure CSRF cookie and set X-CSRFToken
    if (['post', 'put', 'patch', 'delete'].includes(method)) {
      await ensureCsrfCookie();
      const csrf = getCookie('csrftoken');
      if (csrf) config.headers['X-CSRFToken'] = csrf;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const loginUrl = new URL('login.html', window.location.href).href;
      window.location.href = loginUrl;
    }
    return Promise.reject(error);
  }
);

export default api;
