import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './output.css';
import App from './App';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fa from './locales/fa.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fa: { translation: fa },
    },
    lng: localStorage.getItem('language') || 'en', // Load from localStorage
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

// Save language to localStorage on change
i18n.on('languageChanged', lng => {
  console.log('i18next language changed to:', lng); // Debug log
  localStorage.setItem('language', lng);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);