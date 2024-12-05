<template>
  <div>
    <div class="tools" :class="{ 'black-bg': black === 1 }">
      <div class="tools-inner">
        <div class="tools-column">
          <h3>域名查询</h3>
          <a v-for="item in dnsQueries" 
             :key="item.value" 
             :href="item.page" 
             target="_blank">
            {{ item.label }}
          </a>
        </div>
        <div class="tools-column">
          <h3>IP查询</h3>
          <a v-for="item in ipQueries" 
             :key="item.value" 
             :href="item.page" 
             target="_blank">
            {{ item.label }}
          </a>
        </div>
        <div class="tools-column">
          <h3>Host查询</h3>
          <a v-for="item in hostQueries" 
             :key="item.value" 
             :href="item.page" 
             target="_blank">
            {{ item.label }}
          </a>
        </div>
      </div>
    </div>
    <footer class="footer" :class="{ 'black-bg': black === 1 }">
      <p>Copyright © 2024 GetMX LLC. All rights reserved.</p>
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { QueryTypeList } from './model';

const localePath = useLocalePath();
defineProps({
  black: {
    type: Number as PropType<number>,
    default: -1,
  },
});

const dnsQueries = computed(() => QueryTypeList.value.filter(item => item.catogory === "domain"));
const ipQueries = computed(() => QueryTypeList.value.filter(item => item.catogory === "ip"));
const hostQueries = computed(() => QueryTypeList.value.filter(item => item.catogory === "host"));
</script>

<style scoped>
.black-bg{
  background-color: #1e2331;
}
.tools {
 
  color: #fff;
  /* padding: 40px 0; */
}
.tools-inner {
  display: flex;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;
}
.tools-column {
  flex: 1;
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
</style>
