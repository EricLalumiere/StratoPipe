var axios = window.axios;
if (!axios) {
  throw new Error('Axios UMD is not loaded. Include <script src="https://unpkg.com/axios/dist/axios.min.js"></script> before using modules/axiosInstance.js');
}

function computeBaseURL() {
  const envUrl = typeof process !== "undefined" ? "http://localhost:8000/api/" : undefined;
  if (envUrl) return envUrl.replace(/\/+$/, "/");
  if (typeof window !== "undefined" && window.location?.origin && window.location.origin !== "null") {
    return `${window.location.origin.replace(/\/+$/, "")}/api/`;
  }
  return "http://localhost:8000/api/";
}

// Helper to read csrftoken cookie
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

// Ensure cookies (sessionid/csrftoken) are sent
api.defaults.withCredentials = true;

// Attach Authorization token if present and CSRF token for unsafe methods
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
