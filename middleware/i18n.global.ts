import { defineNuxtRouteMiddleware } from '#app'
import { useI18n } from 'vue-i18n'

type LocaleType = "en-US" | "zh-CN" | "ja" | "de" | "es" | "fr" | "nb-NO" | "nl-NL" | "pt-BR" | "ru" | "sv-SE" | "tr" | "uk-UA" | "zh-TW"

export default defineNuxtRouteMiddleware((to) => {
  const { locale } = useI18n()
  const newLocale = to.params.lang as LocaleType
  
  if (newLocale && newLocale !== locale.value) {
    locale.value = newLocale
  }
})