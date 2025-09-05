// JavaScript
var axios = window.axios;
if (!axios) {
  throw new Error('Axios UMD is not loaded. Include <script src="https://unpkg.com/axios/dist/axios.min.js"></script> before using modules/axiosInstance.js');
}

function computeBaseURL() {
  // Prefer a globally provided base (set by the HTML), then env-injected, then a safe default.
  const fromGlobal = (typeof window !== "undefined" && window.__API_BASE__) ? window.__API_BASE__ : undefined;
  const fromEnv = (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) ? process.env.REACT_APP_API_URL : undefined;
  const url = fromGlobal || fromEnv || "http://localhost:8000/api/";
  return url.replace(/\/+$/, "/");
}
function getCsrfCookie() {
  const name = 'csrftoken=';
  const parts = document.cookie.split(';');
  for (let part of parts) {
    part = part.trim();
    if (part.startsWith(name)) return decodeURIComponent(part.slice(name.length));
  }
  return null;
}

const api = axios.create({
  baseURL: computeBaseURL(),
  headers: { "Content-Type": "application/json" }
});

api.defaults.withCredentials = true;

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    const method = (config.method || 'get').toLowerCase();
    if (['post', 'put', 'patch', 'delete'].includes(method)) {
      const csrf = getCsrfCookie();
      if (csrf) {
        config.headers['X-CSRFToken'] = csrf;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const loginUrl = new URL("login.html", window.location.href).href;
      window.location.href = loginUrl;
    }
    return Promise.reject(error);
  }
);

export default api;
