<template>
  <div class="body">
    1
    <div v-html="$t('test')"></div>
    {{ $t('test') }}
    <input :placeholder="placeholderContent">
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

console.log('Initial locale:', locale.value)

onMounted(() => {
  console.log('Mounted locale:', locale.value)
})

</script>