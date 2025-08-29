// JavaScript
(function () {
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
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

  const assetId = getQueryParam('assetId');
  if (!assetId) {
    console.error('Missing assetId in URL');
    return;
  }

  // Common DOM references (guarded usage later)
  const versionSelect = document.getElementById('versionSelect');
  const vFile = document.getElementById('vFile');
  const vDesc = document.getElementById('vDesc');
  const vUser = document.getElementById('vUser');
  const vCreated = document.getElementById('vCreated');
  const downloadBtn = document.getElementById('downloadBtn') || null;

  // Version-up form elements
  const newDesc = document.getElementById('newDesc');
  const statusSelect = document.getElementById('statusSelect') || document.getElementById('newStatus');
  const newFile = document.getElementById('newFile');
  const versionUpForm = document.getElementById('versionUpForm');
  const versionUpError = document.getElementById('versionUpError');

  let versionsCache = [];

  async function loadStatuses() {
    if (!statusSelect) {
      console.warn('Status select element not found (#statusSelect or #newStatus). Skipping statuses load.');
      return;
    }
    const res = await axios.get('http://localhost:8000/api/versions/statuses/', { withCredentials: true });
    const choices = res.data?.choices || [];
    statusSelect.innerHTML = '';
    choices.forEach(({ key, label }) => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = label;
      statusSelect.appendChild(opt);
    });
  }

  async function loadAssetAndVersions() {
    const [assetRes, versionsRes] = await Promise.all([
      axios.get(`http://localhost:8000/api/assets/${encodeURIComponent(assetId)}/`, { withCredentials: true }),
      axios.get(`http://localhost:8000/api/assets/${encodeURIComponent(assetId)}/versions/`, { withCredentials: true }),
    ]);

    const asset = assetRes.data;
    const titleEl = document.getElementById('assetTitle');
    if (asset?.name && titleEl) titleEl.textContent = `Asset: ${asset.name}`;

    versionsCache = versionsRes.data?.versions || [];
    refreshVersionsDropdown();
    applyCurrentVersion();
  }

  function refreshVersionsDropdown() {
    if (!versionSelect) return;
    versionSelect.innerHTML = '';
    versionsCache
      .slice()
      .sort((a, b) => a.number - b.number)
      .forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.number;
        opt.textContent = `v${v.number}`;
        versionSelect.appendChild(opt);
      });
    if (versionsCache.length) {
      versionSelect.value = String(Math.max(...versionsCache.map(v => v.number)));
    }
  }

  function applyCurrentVersion() {
    if (!versionSelect) return;
    const current = versionsCache.find(v => String(v.number) === String(versionSelect.value));
    if (!current) return;

    if (vFile) vFile.textContent = current.file || '';
    if (vDesc) vDesc.textContent = current.description || '';
    if (vCreated) vCreated.textContent = current.created_at ? new Date(current.created_at).toLocaleString() : '';
    if (vUser) vUser.textContent = ''; // or set the logged-in user name if desired
    if (downloadBtn) downloadBtn.href = current.file || '#';
  }

  if (versionSelect) {
    versionSelect.addEventListener('change', applyCurrentVersion);
  }

  if (versionUpForm) {
    versionUpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (versionUpError) {
        versionUpError.style.display = 'none';
        versionUpError.textContent = '';
      }

      const fd = new FormData();
      fd.append('description', newDesc?.value || '');

      if (!statusSelect || !statusSelect.value) {
        if (versionUpError) {
          versionUpError.textContent = 'Please choose a status.';
          versionUpError.style.display = 'block';
        }
        return;
      }
      fd.append('status', statusSelect.value);

      if (!newFile?.files?.length) {
        if (versionUpError) {
          versionUpError.textContent = 'Please select a file.';
          versionUpError.style.display = 'block';
        }
        return;
      }
      fd.append('file', newFile.files[0]);

      const csrf = getCsrfCookie();

      try {
        const res = await axios.post(
          `http://localhost:8000/api/assets/${encodeURIComponent(assetId)}/version-up/`,
          fd,
          {
            withCredentials: true,
            headers: {
              ...(csrf ? { 'X-CSRFToken': csrf } : {}),
              'X-Requested-With': 'XMLHttpRequest',
              'Referer': 'http://localhost:8000/',
            },
          }
        );
        const newVersion = res.data?.version;
        if (newVersion) {
          versionsCache.push(newVersion);
          refreshVersionsDropdown();
          if (versionSelect) {
            versionSelect.value = String(newVersion.number);
          }
          applyCurrentVersion();
          if (newDesc) newDesc.value = '';
          if (statusSelect) statusSelect.selectedIndex = 0;
          if (newFile) newFile.value = '';
        }
      } catch (err) {
        if (versionUpError) {
          const msg = err?.response?.data?.error || 'Version up failed.';
          versionUpError.textContent = msg;
          versionUpError.style.display = 'block';
        }
        console.error(err?.response || err);
      }
    });
  }

  (async function init() {
    await loadStatuses();
    await loadAssetAndVersions();
  })().catch(err => {
    console.error('Initialization failed', err?.response || err);
    alert('Failed to initialize asset page.');
  });
})();