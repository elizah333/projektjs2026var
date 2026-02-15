import { translations } from './translations.js';

const STORAGE_KEY = 'lang';
let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

export function setLang(lang) {
  currentLang = translations[lang] ? lang : 'en';
  localStorage.setItem(STORAGE_KEY, currentLang);
  applyTranslations();
}

export function getLang() {
  return currentLang;
}

export function t(key) {
  return translations[currentLang]?.[key] ?? translations.en?.[key] ?? key;
}

export function applyTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });

  root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    el.setAttribute('placeholder', t(key));
  });

  document.documentElement.lang = currentLang;
}
export function initLanguage() {
  const select = document.getElementById('language-select');
  if (!select) return;

  select.value = currentLang;

  select.addEventListener('change', (e) => {
    setLang(e.target.value);
    document.dispatchEvent(new Event('langchange'));
  });

  applyTranslations();
}
