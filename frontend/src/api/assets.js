// api/assets.js
// Fetch assets filtered by project. Adjust the query param if your API differs.

const ASSETS_API = '/api/assets/';

export async function fetchAssetsForProject(projectId) {
  // Common pattern: /api/assets/?project=<id>
  const res = await axios.get(`${ASSETS_API}?project=${encodeURIComponent(projectId)}`, {
    withCredentials: true,
  });
  return res.data;
}
