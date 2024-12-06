// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: '/js/lookup_dns.js',
          type: 'text/javascript'
        }
      ]
    }
  },
  ssr: true,
  nitro: {
    preset: 'static',
  },
  i18n: {
    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    defaultLocale: "en-US",
    locales: [
      { code: "en-US", iso: "en-US", file: "../../locales/en-US.json", dir: 'ltr' },
      { code: "zh-CN", iso: "zh-CN", file: "../../locales/zh-CN.json", dir: 'auto' },
      { code: "ja", iso: "ja", file: "../../locales/ja.json", dir: 'auto' },
      { code: "de", iso: "de", file: "../../locales/de.json", dir: 'ltr' },
      { code: "es", iso: "es", file: "../../locales/es.json", dir: 'ltr' },
      { code: "fr", iso: "fr", file: "../../locales/fr.json", dir: 'ltr' },
      { code: "nb-NO", iso: "nb-NO", file: "../../locales/nb-NO.json", dir: 'ltr' },
      { code: "nl-NL", iso: "nl-NL", file: "../../locales/nl-NL.json", dir: 'ltr' },
      { code: "pt-BR", iso: "pt-BR", file: "../../locales/pt-BR.json", dir: 'ltr' },
      { code: "ru", iso: "ru", file: "../../locales/ru.json", dir: 'ltr' },
      { code: "sv-SE", iso: "sv-SE", file: "../../locales/sv-SE.json", dir: 'ltr' },
      { code: "tr", iso: "tr", file: "../../locales/tr.json", dir: 'ltr' },
      { code: "uk-UA", iso: "uk-UA", file: "../../locales/uk-UA.json", dir: 'ltr' },
      { code: "zh-TW", iso: "zh-TW", file: "../../locales/zh-TW.json", dir: 'auto' },
    ],
    detectBrowserLanguage: {
      alwaysRedirect: false,
      fallbackLocale: 'en-US',
      redirectOn: 'root',
      useCookie: true,
      cookieCrossOrigin: true,
      cookieDomain: process.env.NODE_ENV === 'prod'?'*.lookup-dns.com':"localhost",
      cookieKey: 'lookup-dns-language',
      cookieSecure: false,
    },
    vueI18n: "./i18n.config.ts",
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@element-plus/nuxt'],
  runtimeConfig: {
    public: {
      environment: process.env.NODE_ENV,
    }
  },
})