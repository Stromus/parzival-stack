import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { format as dateFnsFormat } from 'date-fns'
import { enUS, fr } from 'date-fns/locale'
import { z, ZodErrorMap, ZodIssueCode } from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import zodErrorFr from 'zod-i18n-map/locales/fr/zod.json'
import zodErrorEn from 'zod-i18n-map/locales/en/zod.json'

import appEn from '@Locale/app.en.trans.json'
import appFr from '@Locale/app.fr.trans.json'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        app: appEn,
        zod: zodErrorEn,
      },
      fr: {
        app: appFr,
        zod: zodErrorFr,
      },
    },
    ns: ['app', 'zod'],
    defaultNS: 'app',
    debug: true,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  })

const customZodErrorMap: ZodErrorMap = (issue, ctx) => {
  const t = i18n.t
  console.log(issue)
  if (issue.code === ZodIssueCode.custom) {
    if (issue.params)
      return { message: t(issue.params.translation, { ...issue.params }) }
  }

  return zodI18nMap(issue, ctx)
}

z.setErrorMap(customZodErrorMap)

const dateLocales = { fr: fr, en: enUS }

i18n.services.formatter?.add('dateDistance', (value, lng, options) => {
  return dateFnsFormat(value, options.format, {
    locale: dateLocales[(lng as keyof typeof dateLocales) ?? 'fr'],
    ...options,
  })
})
