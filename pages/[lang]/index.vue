<template>
  <div class="body">
    <Header :trans="1" />
    <query />
    <Footer />
  </div>
</template>


<script lang="ts" setup>
const { t } = useI18n()
const { QueryTypeList } = useQueryConfig()
const { currentPath, currentQueryType } = useQueryType()

const defaultSEO = {
  title: t('default-seo-title'),
  keywords: t('default-seo-keywords'),
  description: t('default-seo-description')
}

const currentType = computed(() => {
  if (!currentQueryType.value) {
    return defaultSEO
  }
  return QueryTypeList.value.find(item => item.value === currentQueryType.value) || defaultSEO
})

useHead({
  title: currentType.value.title + ' - Lookup DNS',
  meta: [
    { hid: "keywords", name: "keywords", content: currentType.value.keywords },
    {
      hid: "description", 
      name: "description",
      content: currentType.value.description,
    },
  ],
});
</script>

<style scoped>
.body {
  background-image: url("/static/img/bg.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}
</style>