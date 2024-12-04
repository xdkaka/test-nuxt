<script setup lang="ts">
// 动态导入默认语言的页面组件
const page = defineAsyncComponent(() => import('./[lang]/404.vue'))
</script>

<template>
  <page />
</template>