import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// @ts-ignore Can ignore since these files are used for testing components and not real translations
import enTranslation from '../../public/locales/en/translation.json'
// @ts-ignore Can ignore since these files are used for testing components and not real translations
import bgTranslation from '../../public/locales/bg/translation.json'

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    resources: {
      en: {
        translation: enTranslation,
      },
      bg: {
        translation: bgTranslation,
      },
    },
  })

export default i18n
