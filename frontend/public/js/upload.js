(function () {
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }
  const projectId = getQueryParam('projectId');
  document.getElementById('projectId').value = projectId || '';

  const form = document.getElementById('uploadForm');
  const errBox = document.getElementById('uploadError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errBox.style.display = 'none';
    errBox.textContent = '';

    if (!projectId) {
      errBox.textContent = 'Missing projectId in URL.';
      errBox.style.display = 'block';
      return;
    }

    const fd = new FormData(form);
    fd.append('project', projectId);

    const csrf = getCsrfCookie();

    try {
    (async function () {
      const API_BASE = (window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL) || 'http://localhost:8000/api/';
      const apiUrl = (path) => new URL(String(path || '').replace(/^\//, ''), API_BASE).toString();
      await axios.post(apiUrl('assets/upload/'), fd, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      window.location.href = `/project.html?projectId=${encodeURIComponent(projectId)}`;
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        (err?.response?.status === 403 ? 'Forbidden (likely CSRF or not authenticated).' : 'Upload failed.');
      errBox.textContent = msg;
      errBox.style.display = 'block';
      // Optional: log response for debugging
      console.error(err?.response || err);
    }
  });
})();