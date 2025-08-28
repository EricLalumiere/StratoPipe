(function () {
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  // Read csrftoken from cookies
  function getCsrfCookie() {
    const name = 'csrftoken=';
    const parts = document.cookie.split(';');
    for (let part of parts) {
      part = part.trim();
      if (part.startsWith(name)) return decodeURIComponent(part.slice(name.length));
    }
    return null;
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
      await axios.post('http://localhost:8000/api/assets/upload/', fd, {
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          // Include CSRF token if present (required for Django session-auth POST)
          ...(csrf ? { 'X-CSRFToken': csrf } : {}),
          // Django’s CSRF checks also validate Referer for HTTPS; safe to include for local dev
          'Referer': 'http://localhost:8000/'
        }
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