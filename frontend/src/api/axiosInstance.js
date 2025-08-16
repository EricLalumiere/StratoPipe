// frontend/src/api/axiosInstance.js
import axios from 'axios';

// Base config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/',
  headers: { 'Content-Type': 'application/json' }
});

// Attach token automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Global 401 handler (optional)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // e.g. redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
