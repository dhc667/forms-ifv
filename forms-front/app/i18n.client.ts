import i18n from './i18n';

// Get language from URL parameter on client-side
const urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.get('lang');

if (lang && Array.isArray(i18n.options.supportedLngs) && i18n.options.supportedLngs.includes(lang)) {
  i18n.changeLanguage(lang);
}

export default i18n;