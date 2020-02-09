import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import common_es from "./translations/es/common.json";
import common_en from "./translations/en/common.json";


const resources = {
  en: {
    translation: common_en
  },
  es: {
    translation: common_es
  }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) 
  .init({
    resources,
    initImmediate: false,
    fallbackLng: 'en',
    lng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
     react: {
    wait: true,
    bindStore: false,
    nsMode: "default",
    useSuspense: false,
  },
})

export default i18n;