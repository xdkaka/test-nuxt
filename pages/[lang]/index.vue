<template>
  <div class="body">
    <Header :trans="1" />
    <query />
    <Footer />
  </div>
</template>


<script lang="ts" setup>
import { QueryTypeList } from '~/components/model'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentPath = route.path
const currentType = QueryTypeList.value.find(item => currentPath.includes(item.page)) || QueryTypeList.value[0]

useHead({
  title: currentType.title + ' - Lookup DNS',
  meta: [
    { hid: "keywords", name: "keywords", content: currentType.keywords },
    {
      hid: "description", 
      name: "description",
      content: currentType.description,
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