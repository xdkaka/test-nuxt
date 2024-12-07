import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQueryConfig } from './useQueryConfig'

export function useQueryType() {
  const route = useRoute()
  const { availableLocales } = useI18n()
  const { QueryTypeList } = useQueryConfig()

  // 获取当前路径
  const currentPath = computed(() => {
    const pathSegments = route.path.split('/').filter(Boolean)
    const firstSegment = pathSegments[0] as typeof availableLocales[number]
    return pathSegments.length > 1 && availableLocales.includes(firstSegment)
      ? pathSegments[1]
      : pathSegments[0]
  })

  // 根据路由匹配查询类型
  const matchedType = computed(() => 
    QueryTypeList.value.find(type => type.page.slice(1) === currentPath.value)
  )

  // 当前查询类型
  const currentQueryType = ref<string>(matchedType.value ? matchedType.value.value : "")

  return {
    currentPath,
    matchedType,
    currentQueryType
  }
} 