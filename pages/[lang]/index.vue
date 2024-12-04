<template>
  <div class="body">
    <Header :trans="1" />

    <query />

    <Footer />
  </div>
</template>


<script lang="ts" setup>
const { t } = useI18n()
useHead({
  title: `DNS解析记录查询 - Lookup DNS`,
  meta: [
    { hid: "keywords", name: "keywords", content: "DNS解析记录查询, Lookup DNS" },
    {
      hid: "description",
      name: "description",
      content: "Lookup DNS 是一个免费的 DNS 解析记录查询工具，可以帮助您快速查询和分析 DNS 解析记录。",
    },
  ],
});
</script>

<style scoped>
.body {
  background-image: url("/static/img/bg.jpg");
  /* background-image: url("https://cdn.pixabay.com/photo/2019/07/22/20/36/mountains-4356017_1280.jpg"); */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}
</style>