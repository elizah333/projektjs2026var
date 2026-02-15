const title = document.getElementById('gateTitle');
const gate = document.getElementById('entryGate');
const yesBtn = document.getElementById('gateYes');
const noBtn = document.getElementById('gateNo');
const msg = document.getElementById('gateMsg');

const allowed = localStorage.getItem('berriesAllowed') === 'yes';
if (allowed) {
  gate.hidden = true;
} else {
  gate.hidden = false;
  yesBtn?.focus();
}

yesBtn?.addEventListener('click', () => {
  localStorage.setItem('berriesAllowed', 'yes');
  gate.hidden = true;
});

noBtn?.addEventListener('click', () => {
  localStorage.removeItem('berriesAllowed');

  gate.classList.add('denied');

  title.textContent = 'ACCESS DENIED';
  msg.textContent = 'You’re not berryfied to enter. Changed your mind?';
});
