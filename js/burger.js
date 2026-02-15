function setupOverlayMenu({
  root,
  openBtnSelector,
  overlaySelector,
  closeBtnSelector,
  bodyClass,
}) {
  const openBtn = root.querySelector(openBtnSelector);
  const overlay = root.querySelector(overlaySelector);
  const closeBtn = overlay?.querySelector(closeBtnSelector);

  if (!openBtn || !overlay || !closeBtn) return;

  const openMenu = () => {
    overlay.classList.add('is-open');
    overlay.hidden = false;
    document.body.classList.add(bodyClass);
    openBtn.setAttribute('aria-expanded', 'true');
    closeBtn.focus();
  };

  const closeMenu = () => {
    overlay.classList.remove('is-open');
    overlay.hidden = true;
    document.body.classList.remove(bodyClass);
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.focus();
  };

  openBtn.addEventListener('click', () => {
    const isOpen = openBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else openMenu();
  });

  closeBtn.addEventListener('click', closeMenu);

  overlay.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

export function initBurgerMenu() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  setupOverlayMenu({
    root: nav,
    openBtnSelector: '.nav-burger',
    overlaySelector: '.nav-overlay',
    closeBtnSelector: '.nav-close',
    bodyClass: 'nav-open',
  });
}
