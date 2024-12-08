type LocaleCode = "en-US" | "zh-CN" | "ja" | "de" | "es" | "fr" | "nb-NO" | "nl-NL" | "pt-BR" | "ru" | "sv-SE" | "tr" | "uk-UA" | "zh-TW";

export const getLanguageList = () => {
  const languageList = [
    {
      language: "en-US",
      title: "English",
    },
    {
      language: "ja",
      title: "日本語",
    },
    {
      language: "de",
      title: "Deutsch",
      desc: "德语",
    },
    {
      language: "es",
      title: "Español",
      desc: "西班牙语",
    },
    {
      language: "fr",
      title: "Français",
      desc: "法语",
    },
    {
      language: "nb-NO",
      title: "Norsk bokmål",
      desc: "挪威语",
    },
    {
      language: "nl-NL",
      title: "Nederlands",
      desc: "荷兰语",
    },
    {
      language: "pt-BR",
      title: "Português (Brasil)",
      desc: "葡萄牙语（巴西）",
    },
    {
      language: "ru",
      title: "Русский",
      desc: "俄语",
    },
    {
      language: "sv-SE",
      title: "Svenska",
      desc: "瑞典语",
    },
    {
      language: "tr",
      title: "Türkçe",
      desc: "土耳其语",
    },
    {
      language: "uk-UA",
      title: "Українська",
      desc: "乌克兰语",
    },
    {
      language: "zh-CN",
      title: "简体中文",
    },
    {
      language: "zh-TW",
      title: "繁體中文",
    },
  ];  return languageList.map(item => ({
    ...item,
    language: item.language as LocaleCode
  }));
};