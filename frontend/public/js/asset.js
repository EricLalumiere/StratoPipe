// JavaScript
(function () {
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  const assetId = getQueryParam('assetId');
  const versionSelect = document.getElementById('versionSelect');
  const vFile = document.getElementById('vFile');
  const vDesc = document.getElementById('vDesc');
  const vUser = document.getElementById('vUser');
  const vCreated = document.getElementById('vCreated');
  const assetTitle = document.getElementById('assetTitle');

  if (!assetId) {
    console.error('Missing assetId in URL');
    return;
  }

  async function loadAssetAndVersions() {
    const [assetRes, versionsRes] = await Promise.all([
      axios.get(`http://localhost:8000/api/assets/${encodeURIComponent(assetId)}/`, { withCredentials: true }),
      axios.get(`http://localhost:8000/api/assets/${encodeURIComponent(assetId)}/versions/`, { withCredentials: true }),
    ]);

    const asset = assetRes.data;
    if (asset?.name) assetTitle.textContent = `Asset: ${asset.name}`;

    const versions = versionsRes.data?.versions || [];
    versionSelect.innerHTML = '';
    versions.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.number;
      opt.textContent = `v${v.number}`;
      versionSelect.appendChild(opt);
    });

    if (versions.length) {
      versionSelect.value = String(Math.max(...versions.map(v => v.number)));
      applyVersion(versions, Number(versionSelect.value));
    }

    versionSelect.addEventListener('change', () => {
      applyVersion(versions, Number(versionSelect.value));
    });
  }

  function applyVersion(versions, number) {
    const v = versions.find(x => x.number === number);
    if (!v) return;
    vFile.textContent = v.file || '';
    vDesc.textContent = v.description || '';
    vUser.textContent = v.user != null ? String(v.user) : '';
    vCreated.textContent = v.created_at ? new Date(v.created_at).toLocaleString() : '';
  }

  loadAssetAndVersions().catch(err => {
    console.error(err?.response || err);
    alert('Failed to load asset data.');
  });
})();