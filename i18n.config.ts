export default {
    legacy: false,
    fallbackLocale: ['en-US'],
    missingWarn: false,  // 禁用缺失警告
    fallbackWarn: false, // 禁用回退警告
    warnHtmlMessage: false, // 禁用 HTML 消息警告
    inheritLocale: false,// 添加这个配置来处理未找到翻译的情况
    localeCodes: {
        'en': 'en-US',
        'zh': 'zh-CN',
        'ja': 'ja',
        'de': 'de',
        'es': 'es',
        'fr': 'fr',
        'nb': 'nb-NO',
        'nl': 'nl-NL',
        'pt': 'pt-BR',
        'ru': 'ru',
        'sv': 'sv-SE',
        'tr': 'tr',
        'uk': 'uk-UA',
        'zh-TW': 'zh-TW'
    },
    missing: (locale: string, key: string) => {
        console.warn(`Missing translation: ${locale} ${key}`)
        return key
      }
}