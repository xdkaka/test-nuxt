<script setup lang="ts">
// 动态导入默认语言的页面组件
const Index = defineAsyncComponent(() => import('./[lang]/index.vue'))
</script>

<template>
  <Index />
</template>