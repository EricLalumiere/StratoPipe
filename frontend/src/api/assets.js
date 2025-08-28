// api/assets.js
const API_BASE = 'http://localhost:8000/api/assets/';

export async function fetchAssetsForProject(projectId) {
  const url = `${API_BASE}?project=${encodeURIComponent(projectId)}`;
  const res = await axios.get(url, { withCredentials: true });
  return res.data;
}
