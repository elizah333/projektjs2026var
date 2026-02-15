import { t } from './i18n.js';

const STORAGE_KEY = 'berries.list.v1';

const els = {
  form: document.querySelector('.berry-form'),
  name: document.getElementById('berryName'),
  type: document.getElementById('berryType'),
  msg: document.querySelector('.berry-msg'),
  search: document.getElementById('berrySearch'),
  sort: document.getElementById('berrySort'),
  list: document.querySelector('.berry-list'),
  empty: document.querySelector('.berry-empty'),
};

const defaultBerries = [];

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultBerries;
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : defaultBerries;
  } catch {
    return defaultBerries;
  }
};

const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
};

const state = {
  items: load(),
  query: '',
  sort: 'az',
};

const setMessage = (text, kind = '') => {
  if (!els.msg) return;
  els.msg.textContent = text;
  els.msg.dataset.kind = kind;
};

const getVisibleItems = () => {
  const q = state.query.trim().toLowerCase();

  const items = state.items.filter((b) => b.name.toLowerCase().includes(q));

  items.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  if (state.sort === 'za') items.reverse();

  return items;
};

const render = () => {
  if (!els.list || !els.empty) return;

  const items = getVisibleItems();

  els.list.innerHTML = '';

  if (state.items.length === 0) {
    els.empty.hidden = false;
    els.empty.textContent = t('noBerries');
    return;
  }

  if (items.length === 0) {
    els.empty.hidden = false;
    els.empty.textContent = t('noMatches');
    return;
  }

  els.empty.hidden = true;

  for (const berry of items) {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${berry.name}</strong>
      <span>(${t(`type_${berry.type}`)})</span>
        <button
    type="button"
    data-action="remove"
    data-id="${berry.id}">
    X
  </button>
    `;
    els.list.append(li);
  }
};

const init = () => {
  if (!els.form || !els.name || !els.type || !els.search || !els.sort || !els.list) {
    return;
  }

  render();

  els.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = els.name.value.trim();
    const type = els.type.value;

    if (name.length < 2) {
      setMessage(t('invalidBerry'), 'error');
      return;
    }

    state.items.push({ id: crypto.randomUUID(), name, type });
    save();
    render();

    els.form.reset();
    els.name.focus();
    setMessage(t('saved'), 'success');
  });

  els.search.addEventListener('input', () => {
    state.query = els.search.value;
    render();
  });

  els.sort.addEventListener('change', () => {
    state.sort = els.sort.value;
    render();
  });

  els.list.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === 'remove' && id) {
      state.items = state.items.filter((b) => b.id !== id);
      save();
      render();
      setMessage(t('removed'), 'success');
    }
  });
  document.addEventListener('langchange', () => render());
};

init();
