// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'static',
  },
  i18n: {
    baseUrl: process.env.NODE_ENV === 'production'
      ? 'https://lookup-dns.com'
      : 'http://localhost:9529',
    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    defaultLocale: "en-US",
    locales: [
      { code: "en-US", iso: "en-US", file: "../../locales/en-US.json", dir: 'ltr' },
      { code: "zh-CN", iso: "zh-CN", file: "../../locales/zh-CN.json", dir: 'auto' }
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
  // devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@element-plus/nuxt'],
  runtimeConfig: {
    public: {
      environment: process.env.NODE_ENV,
    }
  },
})