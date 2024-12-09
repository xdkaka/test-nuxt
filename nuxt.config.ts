// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
      { code: "en-US",file: "../../locales/en-US.json"},
      { code: "zh-CN",file: "../../locales/zh-CN.json" }
    ],
    detectBrowserLanguage: {
      alwaysRedirect: false,
      fallbackLocale: 'en-US',
      redirectOn: 'root',
      useCookie: true,
      cookieCrossOrigin: true,
      cookieDomain: "localhost",
      cookieKey: 'language',
      cookieSecure: false,
    },
    vueI18n: "./i18n.config.ts"
  },
  compatibilityDate: '2024-04-03',
  // devtools: { enabled: true },
  modules: ['@nuxtjs/i18n'],
  runtimeConfig: {
    public: {
      environment: process.env.NODE_ENV,
    }
  },
})