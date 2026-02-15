(() => {
  const loader = document.getElementById('fakeLoader');
  if (!loader) return;

  let timer = null;
  let lastTrigger = null;

  const openLoader = (triggerEl) => {
    lastTrigger = triggerEl || null;

    loader.hidden = false;
    loader.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-loading');

    loader.tabIndex = -1;
    loader.focus();

    clearTimeout(timer);
    timer = setTimeout(closeLoader, 2000);
  };

  const closeLoader = () => {
    clearTimeout(timer);
    timer = null;

    loader.hidden = true;
    loader.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-loading');

    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
  };

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-placeholder="true"]');
    if (!a) return;

    e.preventDefault();
    openLoader(a);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !loader.hidden) closeLoader();
  });

  loader.addEventListener('click', (e) => {
    if (e.target === loader) closeLoader();
  });
})();
