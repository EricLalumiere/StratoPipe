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

// If you also rely on cookies during dev, uncomment the next line:
// api.defaults.withCredentials = true;

api.interceptors.request.use(
  (config) => {
    const raw = localStorage.getItem('authToken');
    if (raw) {
      // If value already includes a scheme (e.g., "Token x" or "Bearer x"), send as-is.
      // Otherwise default to Bearer.
      const hasScheme = /\s/.test(raw);
      config.headers.Authorization = hasScheme ? raw : `Bearer ${raw}`;
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
