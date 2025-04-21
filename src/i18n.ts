import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import hiTranslation from './locales/hi.json';
import knTranslation from './locales/kn.json';
import mlTranslation from './locales/ml.json';
import taTranslation from './locales/ta.json';
import teTranslation from './locales/te.json';

// the translations
const resources = {
  en: {
    translation: enTranslation
  },
  hi: {
    translation: hiTranslation
  },
  kn: {
    translation: knTranslation
  },
  ml: {
    translation: mlTranslation
  },
  ta: {
    translation: taTranslation
  },
  te: {
    translation: teTranslation
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en', // language to use, if language detection is not defined
    fallbackLng: 'en', // language to use if translations in user language are not available
    
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    
    // Enable caching for better performance
    cache: {
      enabled: true
    },
    
    // Make sure translations are loaded asynchronously 
    // for better initial page load performance
    load: 'languageOnly',
    
    // Debug mode (disable in production)
    debug: process.env.NODE_ENV === 'development'
  });

export default i18n;
