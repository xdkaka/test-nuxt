<template>
  <div>
    <div class="tools" :class="{ 'black-bg': black === 1 }">
      <div class="tools-inner">
        <div class="tools-column">
          <h3>域名解析查询</h3>
          <a href="https://getmx.com" target="_blank">A解析查询</a>
          <a href="https://getmx.com/mx" target="_blank">CNAME解析查询</a>
        </div>
        <div class="tools-column">
          <h3>IP查询</h3>
          <a href="https://getmx.com/mx" target="_blank">PTR反解析查询</a>
        </div>
      </div>
    </div>
    <footer class="footer" :class="{ 'black-bg': black === 1 }">
      <p>Copyright © 2024 GetMX LLC. All rights reserved.</p>
    </footer>
  </div>
</template>
<script lang="ts" setup>
const localePath = useLocalePath();
defineProps({
  black: {
    type: Number as PropType<number>,
    default: -1,
  },
});
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
