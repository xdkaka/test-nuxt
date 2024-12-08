<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script lang="ts" setup>
const { locale } = useI18n()
const route = useRoute()

// 监听路由变化
watch(
  () => route.path,
  async (newPath) => {
    const newLocale = newPath.split('/')[1] as "en-US" | "zh-CN" | "ja" | "de" | "es" | "fr" | "nb-NO" | "nl-NL" | "pt-BR" | "ru" | "sv-SE" | "tr" | "uk-UA" | "zh-TW"
    if (newLocale && newLocale !== locale.value) {
      locale.value = newLocale
    }
  },
  { immediate: true }
)
</script>
<style>
@import 'element-plus/dist/index.css';
html,body{
  box-sizing: border-box;
  background-color: rgba(249,249,249);
  padding:0;
  margin:0;
  font-family: 'Inter', 'Helvetica Neue', Arial, -apple-system, BlinkMacSystemFont, sans-serif;
}
div{
  box-sizing: border-box;
  padding:0;
  margin:0;
  font-family: 'Inter', 'Helvetica Neue', Arial, -apple-system, BlinkMacSystemFont, sans-serif;
}
</style>