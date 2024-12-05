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
                v-model="currentQueryType"
                placeholder="选择记录类型"
                style="width: 150px"
                @change="handleTypeChange"
              >
                <el-option 
                  v-for="item in QueryTypeList" 
                  :key="item.value"
                  :label="item.label" 
                  :value="item.value" 
                />
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
        v-if="showTable"
        :data="tableData"
        :span-method="arraySpanMethod"
        style="width: 100%; margin-top: 20px"
        :row-class-name="tableRowClassName"
      >
        <el-table-column 
          v-for="column in currentColumns" 
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :width="getColumnWidth(column.prop)"
        >
          <template #default="scope" v-if="column.prop === 'ip'">
            <div>
              <div>
                {{ scope.row.ip }}
              </div>
              <el-tag v-if="scope.row.location" type="warning" size="mini" >
                  {{ scope.row.location }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    
      <div v-if="loading" class="loading-container">
        <el-icon class="is-loading"><Loading /></el-icon>
        <span class="loading-text">加载中...</span>
      </div>

      <section v-if="!showTable" class="tips-section">
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getRegionList,queryDNS } from "~/api/query";

// MX记录类型定义
interface DNSRecordMX {
  type: string;
  priority: number;
  host: string;
  ip: string;
  location: string;
  ttl: number;
  name: string;
  rtt: string;
}

// A记录类型定义
interface DNSRecordA {
  type: string;
  ip: string;
  location: string;
  ttl: number;
  name: string;
  rtt: string;
}

// CNAME记录类型定义
interface DNSRecordCNAME {
  type: string;
  target: string;
  ip: string;
  location: string;
  ttl: number;
  name: string;
  rtt: string;
}

interface Dns {
  region: string
  value: string
  priority: string
  ttl: string
  isGrey: boolean,
  rowSpan?: number
  ip?: string
  location?: string
  rtt?: string
  target?: string
}

interface TableColumn {
  prop: string
  label: string
  width?: string
}

interface SpanMethodProps {
  row: Dns
  column: TableColumnCtx<Dns>
  rowIndex: number
  columnIndex: number
}

interface QueryType {
  label: string;
  value: string;
  page: string;
}

const router = useRouter()
const loading = ref<boolean>(false);
const showTable = ref<boolean>(false);

// 定义不同记录类型的列配置
const columnConfig = {
  mx: [
    { prop: 'region', label: '检测地区', width: '180' },
    { prop: 'value', label: '记录值' },
    { prop: 'priority', label: '优先级' },
    { prop: 'ttl', label: 'TTL' },
    { prop: 'ip', label: 'IP' },
    { prop: 'rtt', label: '响应时间' }
  ],
  a: [
    { prop: 'region', label: '检测地区', width: '180' },
    { prop: 'ip', label: 'IP' },
    { prop: 'ttl', label: 'TTL' },
    { prop: 'rtt', label: '响应时间' }
  ],
  cname: [
    { prop: 'region', label: '检测地区', width: '180' },
    { prop: 'target', label: '记录值' },
    { prop: 'ip', label: 'IP' },
    { prop: 'ttl', label: 'TTL' },
    { prop: 'rtt', label: '响应时间' }
  ]
};

// 根据当前记录类型获取对应的列配置
const currentColumns = computed(() => {
  return columnConfig[currentQueryType.value.toLowerCase() as keyof typeof columnConfig] || [];
});

// 根据列的prop获取列的宽度
const getColumnWidth = (prop: string) => {
  if (prop === 'ip') {
    return '250';
  } else if (prop === 'region') {
    return '100';
  }
  return '';
};

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
const QueryTypeList = ref<QueryType[]>([
  { label: "MX解析", value: "mx", page: "/mx" },
  { label: "A解析", value: "a", page: "/a" },
  { label: "NS解析", value: "ns", page: "/ns" },
  { label: "TXT解析", value: "txt", page: "/txt" }
]);
let currentQueryType = ref<string>("a"); // 当前选中的域名后缀
const username = ref<string>(""); // 用户名输入框

const tableData = ref<Dns[]>([])
// 记录上一次renderList的最后一个isGrey状态
const lastIsGrey = ref<boolean>(false);

// 处理记录类型变更
const handleTypeChange = (value: string) => {
  const selectedType = QueryTypeList.value.find(item => item.value === value)
  if (selectedType) {
    router.push(selectedType.page)
  }
}

// 渲染list数据
const renderList = (list:any[], regionKey: string)=>{
  // 从上次的状态开始交替
  let isGrey = !lastIsGrey.value;
  
  const newRows = list.map((item, index) => {
    if(currentQueryType.value === 'mx') {
      const record = item as DNSRecordMX;
      const row: Dns = {
        region: regionKey,
        value: record.host,
        priority: String(record.priority),
        ttl: String(record.ttl),
        ip: record.ip,
        location: record.location,
        rtt: record.rtt,
        isGrey: isGrey,
        rowSpan: index === 0 ? list.length : 0
      };
      return row;
    } else if(currentQueryType.value === 'a') {
      const record = item as DNSRecordA;
      const row: Dns = {
        region: regionKey,
        value: record.ip,
        priority: '',
        ttl: String(record.ttl),
        ip: record.ip,
        location: record.location,
        rtt: record.rtt,
        isGrey: isGrey,
        rowSpan: index === 0 ? list.length : 0
      };
      return row;
    } else if(currentQueryType.value === 'cname') {
      const record = item as DNSRecordCNAME;
      const row: Dns = {
        region: regionKey,
        value: '',
        priority: '',
        ttl: String(record.ttl),
        ip: record.ip,
        location: record.location,
        rtt: record.rtt,
        target: record.target,
        isGrey: isGrey,
        rowSpan: index === 0 ? list.length : 0
      };
      return row;
    }
    
    return {
      region: '',
      value: '',
      priority: '',
      ttl: '',
      location: '',
      isGrey: false
    };
  });
  
  // 记录这次renderList的isGrey状态
  lastIsGrey.value = isGrey;
  
  tableData.value.push(...newRows);
}

const query =  async () => {
  if (!username.value) {
    ElMessage({ message: "请输入域名", type: "warning" });
    return;
  }

  loading.value = true;
  tableData.value = []; // 清空之前的数据

  let regionList:any[] = [];
  try {
    const response = await getRegionList({});
    const { data = {} } = response || {};
    regionList = data.list || [];

    loading.value = false;
  } catch (err) {
    ElMessage({ message: String(err) || "失败", type: "error", plain: true });
    loading.value = false;
  }

  for (const region of regionList) {
    try {
      const response = await queryDNS({
        region_id: region.id,
        query_type: currentQueryType.value.toLowerCase(),
        host: username.value
      });
      const { data = {} } = response || {};
      const list = data.list || [];
      renderList(list, region.region_key);
      showTable.value = true;
    } catch (err) {
      ElMessage({ message: String(err) || "失败", type: "error", plain: true });
    }
  }
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
