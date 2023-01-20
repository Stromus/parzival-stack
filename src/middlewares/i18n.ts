import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { format as dateFnsFormat } from 'date-fns'
import { enUS, fr } from 'date-fns/locale'

import appEn from '@Locale/app.en.trans.json'
import appFr from '@Locale/app.fr.trans.json'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        app: appEn,
      },
      fr: {
        app: appFr,
      },
    },
    ns: ['app', 'common', 'order'],
    defaultNS: 'app',
    debug: true,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  })

const dateLocales = { fr: fr, en: enUS }

i18n.services.formatter?.add('dateDistance', (value, lng, options) => {
  return dateFnsFormat(value, options.format, {
    locale: dateLocales[(lng as keyof typeof dateLocales) ?? 'fr'],
    ...options,
  })
})
