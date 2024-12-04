<template>
  <div class="dns-query">
    <header class="dns-query__header">
      <h1>MX解析查询</h1>
    </header>
    <main class="dns-query__container">
      <section class="search-section">
        <div class="search-form">
          <el-input
            v-model="username"
            placeholder="输入域名"
            class="search-form__input"
            size="large"
            @keyup.enter="query"
          >
            <template #append>
              <el-select
                size="large"
                v-model="currentDnsCategory"
                placeholder="Select"
                style="width: 150px"
              >
                <el-option label="Restaurant" value="1" />
                <el-option label="Order No." value="2" />
                <el-option label="Tel" value="3" />
              </el-select>
            </template>
          </el-input>
          <el-button
            type="primary"
            @click="query"
            class="search-form__button"
            size="large"
            :loading="loading"
          >
          <el-icon v-if="!loading"><MagicStick /></el-icon> 
          <span style="margin-left: 10px;" >查 询</span>
          </el-button>
        </div>
      </section>

      <el-table
      :data="tableData"
      :span-method="arraySpanMethod"
      
      style="width: 100%; margin-top: 20px"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="area" label="检测地区" width="180" />
      <el-table-column prop="value" label="记录值" />
      <el-table-column prop="priority" label="优先级" />
      <el-table-column prop="ttl" label="TTL" />
    </el-table>
    
    <div v-if="loading" class="loading-container">
      <el-icon class="is-loading"><Loading /></el-icon>
      <span class="loading-text">加载中...</span>
    </div>

      <section class="tips-section">
        <h2 class="tips-section__title">{{ $t("ti-shi") }}</h2>
        <div class="tips-section__content">
          <p>
            {{
              $t(
                "pinmx-fei-lin-shi-you-xiang-zhu-yi-chuang-jian-hou-bao-cun-mi-ma-fou-ze-you-xiang-wu-fa-zhao-hui-huo-zhe-zhu-ce-zhang-hao-chuang-jian-he-zhang-hao-jin-hang-bang-ding"
              )
            }}
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { Loading,MagicStick } from '@element-plus/icons-vue'
import type { TableColumnCtx } from 'element-plus'
import { ref } from 'vue'

interface Dns {
  area: string
  value: string
  priority: string
  ttl: string
  isGrey: boolean,
  rowSpan?: number
}

interface SpanMethodProps {
  row: Dns
  column: TableColumnCtx<Dns>
  rowIndex: number
  columnIndex: number
}

interface DnsCate {
  id: string;
  value: string;
}

const loading = ref<boolean>(false);

const arraySpanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
  if (columnIndex === 0) { // 第一列进行合并
    if (row.rowSpan !== undefined) {
      return {
        rowspan: row.rowSpan,
        colspan: 1
      };
    }
  }
  return {
    rowspan: 1,
    colspan: 1
  };
}

const tableRowClassName = ({
  row
}: {
  row: Dns
  rowIndex: number
}) => {
  if (row.isGrey) {
    return 'row-grey'
  }
  return ''
}

// 响应式变量定义
const { t } = useI18n();
const DnsCate = ref<DnsCate[]>([
  { id: "mx", value: "MX解析" },
  { id: "a", value: "A解析" },
  { id: "ns", value: "NS解析" },
  { id: "txt", value: "TXT解析" },
]);
let currentDnsCategory = ref<string>("MX"); // 当前选中的域名后缀
const username = ref<string>(""); // 用户名输入框

const tableData = ref<Dns[]>([
  {
    area: '12987122',
    value: 'Tom',
    priority: '234',
    ttl: '3.2',
    isGrey: false
  },
])

const query = () => {
  loading.value = true;
  const newRows = [
    {
      area: '12987123',
      value: 'Jerry', 
      priority: '123',
      ttl: '4.5',
      bgColor: 'red',
      rowSpan: 2,
      isGrey: true
    },
    {
      area: '12987123',
      value: 'Jerry',
      priority: '123', 
      ttl: '4.5',
      bgColor: 'red',
      rowSpan: 0,
      isGrey: true
    }
  ];
  
  tableData.value.push(...newRows);

  const newRows2 = [
    {
      area: '12987123',
      value: 'Jerry', 
      priority: '123',
      ttl: '4.5',
      bgColor: 'red',
      rowSpan: 2,
      isGrey: false
    },
    {
      area: '12987123',
      value: 'Jerry',
      priority: '123', 
      ttl: '4.5',
      bgColor: 'red',
      rowSpan: 0,
      isGrey: false
    }
  ];
  
  tableData.value.push(...newRows2);
}

onMounted(async () => {});
</script>

<style scoped>
/* 基础样式 */
.dns-query {
  color: var(--el-text-color-primary);
}

/* 头部样式 */
.dns-query__header h1 {
  font-size: 2rem;
  text-align: center;
  color: #fff;
  margin-bottom: 1rem;
}

/* 容器样式 */
.dns-query__container {
  max-width: 800px;
  margin: 2.5rem auto;
  padding: 2.5rem;
  background-color: var(--el-bg-color);
  border-radius: 8px;
  box-shadow: var(--el-box-shadow-light);
}

.dns-query__container :deep(.el-input-group__append) {
  background: #fff;
  color: #000;
}


/* 搜索表单样式 */
.search-section {
  margin-bottom: 2rem;
}

.search-form {
  display: flex;
  gap: 0;
}

.search-form__input {
  flex: 1;
}

.search-form__select {
  width: 120px;
}

/* 移除相邻元素的边框重叠 */
.search-form :deep(.el-input__wrapper) {
  border-radius: 4px 0 0 4px;
}

.search-form__select :deep(.el-input__wrapper) {
  border-radius: 0;
  margin-left: -1px;
}


.search-form__button {
  margin-left: 10px;
  min-width: 200px;
}

/* 提示区域样式 */
.tips-section {
  margin-top: 3rem;
  padding: 1.25rem;
  background-color: var(--el-fill-color-light);
  border-radius: 8px;
}

.tips-section__title {
  font-size: 1.125rem;
  font-weight: bold;
  color: var(--el-text-color-primary);
  margin-bottom: 1rem;
}

.tips-section__content {
  color: var(--el-text-color-regular);
  font-size: 0.875rem;
  line-height: 1.6;
}


@media (max-width: 767px) {
  .dns-query__container {
    padding: 1.25rem;
    margin: 1rem;
  }

  .search-form {
    flex-direction: column;
    gap: 1rem;
  }

  .search-form__input,
  .search-form__select,
  .search-form__button {
    width: 100%;
    margin-left: 0;
  }
}

:deep(.row-grey ){
  background-color: #f0f8ff;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  color: var(--el-text-color-secondary);
}

.loading-text {
  font-size: 14px;
  margin-left: 10px;
}
</style>
