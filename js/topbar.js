const topbar = document.getElementById('topbar');
const closeBtn = document.getElementById('closetopbar');

if (topbar) {
  setTimeout(() => {
    topbar.classList.add('show');
  }, 200);

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      topbar.classList.remove('show');
      topbar.classList.add('hide');
    });
  }
}
