window.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('track');
  if (!track) return;

  const DURATION_MS = 5000;
  const PAUSE_MS = 1500;

  function slideOnce() {
    track.style.transition = `transform ${DURATION_MS}ms linear`;
    track.style.transform = 'translateX(-100%)';

    const onDone = () => {
      track.removeEventListener('transitionend', onDone);

      track.appendChild(track.firstElementChild);

      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';

      setTimeout(() => {
        requestAnimationFrame(() => requestAnimationFrame(slideOnce));
      }, PAUSE_MS);
    };

    track.addEventListener('transitionend', onDone);
  }

  setTimeout(slideOnce, PAUSE_MS);
});
