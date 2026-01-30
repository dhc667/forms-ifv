import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'es'],
    fallbackLng: 'es', // Spanish as default
    defaultNS: 'common',

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupQuerystring: 'lang',
    },

    backend: {
      loadPath: process.env.NODE_ENV === 'production' 
        ? '/forms-front/locales/{{lng}}/{{ns}}.json'
        : '/locales/{{lng}}/{{ns}}.json'
      ,
    },

    ns: ['common', 'navigation', 'forms', 'validation', 'schemas', 'my-forms', 'create-schema', 'form-builder'],
  });

export default i18n;