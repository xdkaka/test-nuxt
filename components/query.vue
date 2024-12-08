<template>
  <div class="dns-query">
    <header class="dns-query__header">
      <h1>{{ currentType.subject }}</h1>
    </header>
    <main class="dns-query__container">
      <section class="search-section">
        <div class="search-form">
          <el-input
            v-model="username"
            :placeholder="t('shu-ru-yu-ming-huo-ip')"
            class="search-form__input"
            size="large"
            @keyup.enter="query"
          >
            <template #append>
              <el-select
                size="large"
                v-model="currentQueryType"
                :placeholder="t('xuan-ze-ji-lu-lei-xing')"
                class="search-form__select"
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

          <div class="dns-server dns-server-1">
            <el-radio-group v-model="dnsServerType" size="small" @change="handleDnsServerTypeChange">
              <el-radio-button :label="t('mo-ren-dns-fu-wu-qi')" value="default" />
              <el-radio-button :label="t('zhi-ding-dns-fu-wu-qi')" value="custom" />
            </el-radio-group>
            <el-input
              v-model="dnsServer"
              :placeholder="t('dns-fu-wu-qi-di-zhi')"
              size="small"
              :disabled="dnsServerType === 'default'"
              class="dns-server__input"
              @keyup.enter="query"
            ></el-input>
          </div>

          <el-button
            type="primary"
            @click="query"
            class="search-form__button"
            size="large"
            :loading="loading"
            :disabled="loading"
          >
            <el-icon v-if="!loading"><MagicStick /></el-icon>
            <span class="button-text">{{ t('cha-xun') }}</span>
          </el-button>

          <el-button
            type="danger"
            @click="stopQuery"
            class="search-form__button"
            size="large"
            v-if="loading"
          >
            <el-icon><CircleClose /></el-icon>
            <span class="button-text">{{ t('ting-zhi') }}</span>
          </el-button>
        </div>

        <div class="dns-server dns-server-2">
          <el-radio-group v-model="dnsServerType" size="small" @change="handleDnsServerTypeChange">
            <el-radio-button :label="t('mo-ren-dns-fu-wu-qi')" value="default" />
            <el-radio-button :label="t('zhi-ding-dns-fu-wu-qi')" value="custom" />
          </el-radio-group>
          <el-input
            v-model="dnsServer"
            :placeholder="t('dns-fu-wu-qi-di-zhi')"
            size="small"
            :disabled="dnsServerType === 'default'"
            class="dns-server__input"
            style="width: 200px"
            @keyup.enter="query"
          ></el-input>
        </div>
      </section>

      <el-table
        v-if="showTable"
        :data="tableData"
        :span-method="arraySpanMethod"
        :row-class-name="tableRowClassName"
        :fit="true"
      >
        <el-table-column
          v-for="column in currentColumns"
          :key="column?.prop"
          :prop="column?.prop"
          :label="column?.label"
          :min-width="column?.minWidth"
        >
          <template #default="scope">
            <template v-if="column?.prop === 'ip'">
              <div class="ip-cell" v-if="scope.row.ip && scope.row.ip !== '-'">
                <div>{{ scope.row.ip }}</div>
                <el-icon
                  v-if="!scope.row.failed"
                  class="copy-icon"
                  @click="copyToClipboard(scope.row.ip)"
                >
                  <DocumentCopy />
                </el-icon>
                <el-tag v-if="scope.row.location" type="warning" size="small">
                  {{ scope.row.location }}
                </el-tag>
              </div>
            </template>
            <template v-else-if="column?.prop === 'rtt'">
              <span v-if="scope.row.failed">{{ t('cha-xun-shi-bai') }}</span>
              <span v-else :class="getRttClass(scope.row.rtt)">
                {{ formatRtt(scope.row.rtt) }}
              </span>
            </template>
            <template v-else-if="column?.prop === 'ping_time'">
              <span v-if="scope.row.failed">{{ t('cha-xun-shi-bai') }}</span>
              <span v-else-if="!scope.row.ping_time" class="rtt-slow">{{ t('chao-shi') }}</span>
              <span v-else :class="getRttClass(scope.row.ping_time)">
                {{ formatRtt(scope.row.ping_time) }}
              </span>
            </template>
            <template v-else-if="column?.prop === 'region'">
              {{ scope.row.region && scope.row.region !== '' ? t(`region.${scope.row.region}`) : '' }}
            </template>
            <template v-else-if="column?.prop === 'ttl'">
              <template v-if="scope.row.ttl">{{ scope.row.ttl }}</template>
            </template>
            <template v-else-if="column?.prop === 'txt'">
              <div class="value-cell">
                <div v-for="(item, index) in scope.row.txt" :key="index">
                  {{ item }}
                  <el-icon
                    v-if="item && item !== ''&& item !== '-' && !scope.row.failed"
                    class="copy-icon"
                    @click="copyToClipboard(item)"
                  >
                    <DocumentCopy />
                  </el-icon>
                </div>
              </div>
            </template>
            <template
              v-else-if="
                ['value', 'target', 'host', 'ptr'].includes(column?.prop || '')
              "
            >
              <div class="value-cell">
                {{ scope.row[column?.prop || ''] || "-" }}
                <el-icon
                  v-if="
                    scope.row[column?.prop || ''] &&
                    scope.row[column?.prop || ''] !== '' &&
                    scope.row[column?.prop || ''] !== '-' &&
                    !scope.row.failed
                  "
                  class="copy-icon"
                  @click="copyToClipboard(scope.row[column?.prop || ''])"
                >
                  <DocumentCopy />
                </el-icon>
              </div>
            </template>
            <template v-else>
              <div class="value-cell">
                <div>{{ scope.row[column?.prop || ''] || "-" }}</div>
              </div>
            </template>
          </template>
        </el-table-column>
      </el-table>

      <div v-if="loading" class="loading-container">
        <el-icon class="is-loading"><Loading /></el-icon>
        <span class="loading-text">{{ t('jia-zai-zhong') }}...</span>
      </div>

      <section v-if="!showTable" class="tips-section">
        <h2 class="tips-section__title">{{ t("ti-shi") }}</h2>
        <div
          class="tips-section__content"
          v-html="currentType.htmlContent"
        ></div>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { Loading, MagicStick, DocumentCopy, CircleClose } from "@element-plus/icons-vue";
import type { TableColumnCtx } from "element-plus";
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getRegionList, queryDNS } from "~/api/query";
import { useQueryType } from '~/composables/useQueryType'
const { columnConfig, QueryTypeList } = useQueryConfig()
import type { Dns, DNSRecordMX, DNSRecordA, DNSRecordCNAME, DNSRecordNS, DNSRecordTXT, DNSRecordPTR, DNSRecordPing } from '~/composables/useQueryConfig'

interface SpanMethodProps {
  row: Dns;
  column: TableColumnCtx<Dns>;
  rowIndex: number;
  columnIndex: number;
}

const router = useRouter();
const route = useRoute();
const loading = ref<boolean>(false);
const showTable = ref<boolean>(false);
const dnsServerType = ref((route.query.dns_server_type as string) || 'default');
const dnsServer = ref((route.query.dns_server as string) || '127.0.0.1');
const shouldStop = ref<boolean>(false);

// 根据当前记录类型获取对应的列配置
const currentColumns = computed(() => {
  return (
    columnConfig[
      currentQueryType.value.toLowerCase() as keyof typeof columnConfig
    ] || []
  );
});

const arraySpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  if (columnIndex === 0) {
    // 第一列进行合并
    if (row.rowSpan !== undefined) {
      return {
        rowspan: row.rowSpan,
        colspan: 1,
      };
    }
  }
  return {
    rowspan: 1,
    colspan: 1,
  };
};

const tableRowClassName = ({ row }: { row: Dns; rowIndex: number }) => {
  if (row.failed) {
    return "row-failed";
  }
  if (row.isGrey) {
    return "row-grey";
  }
  return "";
};

// 响应式变量定义
const { t } = useI18n();

// 使用提取的组合式函数
const { currentPath, currentQueryType } = useQueryType()

// 如果currentQueryType为空,设置为a
if (!currentQueryType.value) {
  currentQueryType.value = 'a'
}

// 获取当前类型的完整信息
const currentType = computed(() => {
  const type = QueryTypeList.value.find((type) => type.value === currentQueryType.value) || QueryTypeList.value[0];
  // 确保subject使用翻译函数
  return {
    ...type,
    subject: t(type.subject)
  };
});

// 从路由参数初始化输入框值
const username = ref<string>((route.query.host as string) || "");

const tableData = ref<Dns[]>([]);
// 记录上一次renderList的最后一个isGrey状态
const lastIsGrey = ref<boolean>(false);

// 处理记录类型变更
const handleTypeChange = (value: string) => {
  const selectedType = QueryTypeList.value.find((item) => item.value === value);
  if (selectedType) {
    // 在路由跳转前重置相关状态
    showTable.value = false;
    tableData.value = [];
    
    // 使用 localePath 处理多语言路由
    const localePath = useLocalePath();
    router.push(localePath({
      path: selectedType.page,
      query: {
        host: username.value,
        dns_server_type: dnsServerType.value,
        dns_server: dnsServer.value
      },
    }));
  }
};

// 处理DNS服务器类型变更
const handleDnsServerTypeChange = (value: string | number | boolean | undefined) => {
  if (typeof value === 'string') {
    if (value === 'default') {
      dnsServer.value = '127.0.0.1';
    }
    // 更新URL参数
    router.push({
      query: {
        ...route.query,
        dns_server_type: value,
        dns_server: dnsServer.value
      }
    });
  }
};

// 复制到剪贴板
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    ElMessage.success(t('yi-fu-zhi-dao-jian-tie-ban') +": "+text);
  });
};

// 格式化响应时间
const formatRtt = (rtt: string) => {
  if (!rtt) return "";
  const ms = parseFloat(rtt);
  return `${Math.floor(ms)}ms`;
};

// 获取响应时间样式
const getRttClass = (rtt: string) => {
  if (!rtt) return "";
  const ms = parseFloat(rtt);
  if (ms > 100) return "rtt-slow";
  if (ms < 50) return "rtt-fast";
  return "";
};

// 渲染list数据
const renderList = (list: any[], regionKey: string) => {
  if (shouldStop.value) return;
  
  // 从上次的状态开始交替
  let isGrey = !lastIsGrey.value;

  // 如果list为空，添加一条无数据记录
  if (!list || list.length === 0) {
    tableData.value.push({
      region: regionKey,
      value: "-",
      priority: "",
      ttl: "",
      ip: "-",
      location: "",
      rtt: "-",
      isGrey: isGrey,
      rowSpan: 1,
      host: "-",
      ptr: "-",
      txt: "-",
      ping_time: "-",
    });
    lastIsGrey.value = isGrey;
    return;
  }

  const newRows = list.map((item, index) => {
    if (currentQueryType.value === "mx") {
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
        rowSpan: index === 0 ? list.length : 0,
      };
      return row;
    } else if (currentQueryType.value === "a") {
      const record = item as DNSRecordA;
      const row: Dns = {
        region: regionKey,
        value: record.ip,
        priority: "",
        ttl: String(record.ttl),
        ip: record.ip,
        location: record.location,
        rtt: record.rtt,
        isGrey: isGrey,
        rowSpan: index === 0 ? list.length : 0,
      };
      return row;
    } else if (currentQueryType.value === "cname") {
      const record = item as DNSRecordCNAME;
      const row: Dns = {
        region: regionKey,
        value: "",
        priority: "",
        ttl: String(record.ttl),
        ip: record.ip,
        location: record.location,
        rtt: record.rtt,
        target: record.target,
        isGrey: isGrey,
        rowSpan: index === 0 ? list.length : 0,
      };
      return row;
    } else if (currentQueryType.value === "ns") {
      const record = item as DNSRecordNS;
      const row: Dns = {
        region: regionKey,
        value: record.host,
        priority: "",
        ttl: String(record.ttl),
        ip: record.ip,
        location: record.location,
        rtt: record.rtt,
        isGrey: isGrey,
        rowSpan: index === 0 ? list.length : 0,
        host: record.host,
      };
      return row;
    } else if (currentQueryType.value === "txt") {
      const record = item as DNSRecordTXT;
      const row: Dns = {
        region: regionKey,
        value: "",
        txt: record.txt,
        priority: "",
        ttl: String(record.ttl),
        rtt: record.rtt,
        isGrey: isGrey,
        rowSpan: index === 0 ? list.length : 0,
      };
      return row;
    } else if (currentQueryType.value === "ptr") {
      const record = item as DNSRecordPTR;
      const row: Dns = {
        region: regionKey,
        value: record.ptr,
        priority: "",
        ttl: String(record.ttl),
        ip: record.ip,
        location: record.location,
        rtt: record.rtt,
        isGrey: isGrey,
        ptr: record.ptr,
        rowSpan: index === 0 ? list.length : 0,
      };
      return row;
    } else if (currentQueryType.value === "ping") {
      const record = item as DNSRecordPing;
      const row: Dns = {
        region: regionKey,
        value: record.ip,
        priority: "",
        ttl: "",
        ip: record.ip,
        location: record.location,
        rtt: record.rtt,
        isGrey: isGrey,
        rowSpan: index === 0 ? list.length : 0,
        ping_time: record.ping_time,
      };
      return row;
    }

    return {
      region: "",
      value: "",
      priority: "",
      ttl: "",
      location: "",
      isGrey: false,
      ptr: "",
      host: "",
      txt: "",
      ping_time: "",
    };
  });

  // 记录这次renderList的isGrey状态
  lastIsGrey.value = isGrey;

  if (!shouldStop.value) {
    tableData.value.push(...newRows);
  }
};

// 停止查询
const stopQuery = () => {
  shouldStop.value = true;
  loading.value = false;
  showTable.value = true;
};

const query = async () => {
  if (!username.value) {
    ElMessage({ message: t('qing-shu-ru-cha-xun-de-nei-rong'), type: "warning" });
    return;
  }

  if (dnsServerType.value === 'custom' && !dnsServer.value) {
    ElMessage({ message: t('qing-shu-ru-dns-fu-wu-qi-di-zhi'), type: "warning" });
    return;
  }

  // 更新URL参数
  router.push({
    query: {
      ...route.query,
      host: username.value,
      dns_server_type: dnsServerType.value,
      dns_server: dnsServer.value
    },
  });

  loading.value = true;
  tableData.value = []; // 清空之前的数据
  showTable.value = true;
  shouldStop.value = false;

  let regionList: any[] = [];
  try {
    const response = await getRegionList({
      query_type: currentQueryType.value.toLowerCase(),
      host: username.value,
      dns_server: dnsServerType.value === 'custom' ? dnsServer.value : "127.0.0.1"
    });
    const { data = {} } = response || {};
    regionList = data.list || [];
  } catch (err: any) {
    const errMsg = err?.msg || String(err) || t('shi-bai');
    ElMessage({ message: errMsg, type: "error", plain: true });
    loading.value = false;
    return;
  }

  try {
    for (const region of regionList) {
      if (shouldStop.value) break;
      
      try {
        const response = await queryDNS({
          region_id: region.id,
          query_type: currentQueryType.value.toLowerCase(),
          host: username.value,
          dns_server: dnsServerType.value === 'custom' ? dnsServer.value : "127.0.0.1"
        });
        const { data = {} } = response || {};
        const list = data.list || [];
        renderList(list, region.region_key);
      } catch (err: any) {
        // 查询失败时添加失败行
        if (!shouldStop.value) {
          tableData.value.push({
            region: region.region_key,
            value: "",
            priority: "",
            ttl: "",
            ip: "",
            location: "",
            rtt: "",
            isGrey: false,
            failed: true,
            rowSpan: 1,
          });
        }
      }
    }
  } finally {
    loading.value = false;
  }
};

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
  max-width: 1200px;
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
  width: 150px;
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

.button-text {
  margin-left: 10px;
}

/* DNS服务器选择区域 */
.dns-server {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
}

.dns-server__input {
  /* width: 150px; */
}

.dns-server__input :deep(.el-input__wrapper) {
  border-radius: 4px;
}

/* 响应式显示控制 */
.dns-server-1 {
  display: none;
}

.dns-server-2 {
  display: flex; align-items: center; gap: 10px;
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
    /* width: 100%; */
    margin-left: 0;
  }

  .dns-server-1 {
    display: flex;
  }

  .dns-server-2 {
    display: none;
  }
}

:deep(.row-grey) {
  background-color: #f0f8ff;
}

:deep(.row-failed) {
  background-color: #fef0f0;
  color: #f56c6c;
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

.ip-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.copy-icon {
  cursor: pointer;
  color: #409eff;
}

.copy-icon:hover {
  color: #79bbff;
}

.rtt-slow {
  color: #f56c6c;
}

.rtt-fast {
  color: #67c23a;
}
</style>
