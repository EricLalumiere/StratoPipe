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

    try {
      // Updated URL to hit the backend server directly
      await axios.post('http://localhost:8000/api/assets/upload/', fd, {
        withCredentials: true,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });
      window.location.href = `/project.html?projectId=${encodeURIComponent(projectId)}`;
    } catch (err) {
      const msg = err?.response?.data?.error || 'Upload failed.';
      errBox.textContent = msg;
      errBox.style.display = 'block';
    }
  });
})();