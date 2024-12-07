<template>
  <div>
    <div class="tools" :class="{ 'black-bg': black === 1 }">
      <div class="tools-inner">
        <div class="tools-column">
          <h3>{{ t("yu-ming-cha-xun") }}</h3>
          <NuxtLinkLocale
            v-for="item in dnsQueries"
            :key="item.value"
            :to="localePath(item.page)"
          >
            {{ item.label }}
          </NuxtLinkLocale>
        </div>
        <div class="tools-column">
          <h3>{{ t("ip-cha-xun") }}</h3>
          <NuxtLinkLocale
            v-for="item in ipQueries"
            :key="item.value"
            :to="localePath(item.page)"
          >
            {{ item.label }}
          </NuxtLinkLocale>
        </div>
        <div class="tools-column">
          <h3>{{ t("host-cha-xun") }}</h3>
          <NuxtLinkLocale
            v-for="item in hostQueries"
            :key="item.value"
            :to="localePath(item.page)"
          >
            {{ item.label }}
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
    <footer class="footer" :class="{ 'black-bg': black === 1 }">
      <p>Copyright © {{ currentYear }} GetMX LLC. All rights reserved.</p>
    </footer>
    <WhatsappButton />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
const { QueryTypeList } = useQueryConfig();
const { t } = useI18n();
const localePath = useLocalePath();
defineProps({
  black: {
    type: Number as PropType<number>,
    default: -1,
  },
});

const currentYear = computed(() => new Date().getFullYear());

const dnsQueries = computed(() =>
  QueryTypeList.value.filter((item) => item.catogory === "domain")
);
const ipQueries = computed(() =>
  QueryTypeList.value.filter((item) => item.catogory === "ip")
);
const hostQueries = computed(() =>
  QueryTypeList.value.filter((item) => item.catogory === "host")
);
</script>

<style scoped>
.black-bg {
  background-color: #1e2331;
}
.tools {
  color: #fff;
  padding: 20px;
}
.tools-inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 15px;
}
.tools-column {
  text-align: center;
  padding: 10px;
}
.tools h3 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #fff;
}
.tools a {
  display: block;
  color: #fff;
  text-decoration: none;
  margin-bottom: 12px;
  font-size: 14px;
}
.tools a:hover {
  color: #007bff;
}

.footer {
  color: #fff;
  text-align: center;
  padding: 30px;
}
.footer p {
  margin: 5px 0;
  font-size: 14px;
}

@media screen and (max-width: 768px) {
  .tools-inner {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .tools-column {
    padding: 5px;
  }
  .tools h3 {
    font-size: 16px;
    margin-bottom: 15px;
  }
  .tools a {
    margin-bottom: 8px;
    font-size: 12px;
  }
}

@media screen and (max-width: 480px) {
  .tools-inner {
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
  }
}
</style>
