// Apply a saved appearance before the first paint; unavailable storage is harmless.
(()=>{
  let mode='system';
  try { const saved=localStorage.getItem('komorebi:theme'); if(['light','dark','system'].includes(saved))mode=saved; } catch {}
  document.documentElement.dataset.theme=mode==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):mode;
})();
