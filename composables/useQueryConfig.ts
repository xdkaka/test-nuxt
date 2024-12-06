export const useQueryConfig = () => {
  const nuxtApp = useNuxtApp()
  const { t } = nuxtApp.$i18n

   const columnConfig = {
    mx: [
        { prop: "region", label: t('jian-ce-di-qu'), minWidth: "150" },
        { prop: "value", label: t('ji-lu-zhi'), minWidth: "300" },
        { prop: "priority", label: t('you-xian-ji') },
        { prop: "ttl", label: "TTL" },
        { prop: "ip", label: "IP", minWidth: "450" },
        { prop: "rtt", label: t('xiang-ying-shi-jian') }
    ],
    a: [
        { prop: "region", label: t('jian-ce-di-qu'), minWidth: "150" },
        { prop: "ip", label: "IP", minWidth: "450" },
        { prop: "ttl", label: "TTL" },
        { prop: "rtt", label: t('xiang-ying-shi-jian') }
    ],
    cname: [
        { prop: "region", label: t('jian-ce-di-qu'), minWidth: "150" },
        { prop: "target", label: t('ji-lu-zhi'), minWidth: "300" },
        { prop: "ip", label: "IP", minWidth: "450" },
        { prop: "ttl", label: "TTL" },
        { prop: "rtt", label: t('xiang-ying-shi-jian') },
    ],
    ns: [
        { prop: "region", label: t('jian-ce-di-qu'), minWidth: "150" },
        { prop: "host", label: t('ji-lu-zhi'), minWidth: "300" },
        { prop: "ip", label: "IP", minWidth: "450" },
        { prop: "ttl", label: "TTL" },
        { prop: "rtt", label: t('xiang-ying-shi-jian') },
    ],
    txt: [
        { prop: "region", label: t('jian-ce-di-qu'), minWidth: "150" },
        { prop: "txt", label: t('ji-lu-zhi'), minWidth: "500" },
        { prop: "ttl", label: "TTL" },
        { prop: "rtt", label: t('xiang-ying-shi-jian') },
    ],
    ptr: [
        { prop: "region", label: t('jian-ce-di-qu'), minWidth: "150" },
        { prop: "ptr", label: t('ji-lu-zhi'), minWidth: "300" },
        { prop: "ip", label: "IP", minWidth: "450" },
        { prop: "ttl", label: "TTL" },
        { prop: "rtt", label: t('xiang-ying-shi-jian') },
    ],
    ping: [
        { prop: "region", label: t('jian-ce-di-qu'), minWidth: "150" },
        { prop: "ip", label: "IP", minWidth: "450" },
        { prop: "rtt", label: t('xiang-ying-shi-jian') },
    ],
}

const QueryTypeList = ref<QueryType[]>([
    { label: t('mx-jie-xi'), subject: t('mx-jie-xi-cha-xun'), value: "mx", page: "/mx", catogory: "domain", title: t('mx-jie-xi-ji-lu-cha-xun-you-jian-fu-wu-qi-jie-xi-jian-ce-gong-ju'), keywords: t('mx-ji-lu-cha-xun-you-jian-fu-wu-qi-dns-jie-xi-mx-you-xian-ji'), description: t('zhuan-ye-de-mx-ji-lu-zai-xian-cha-xun-gong-ju-kuai-su-jian-ce-you-jian-fu-wu-qi-jie-xi-pei-zhi-xian-shi-mx-ji-lu-you-xian-ji-ttl-zhi-ji-xiang-ying-shi-jian-bang-zhu-zhen-duan-you-jian-xi-tong-pei-zhi-wen-ti'), htmlContent: t('mx-jie-xi-html-content') },
    { label: t('a-jie-xi'), subject: t('a-jie-xi-cha-xun'), value: "a", page: "/a", catogory: "domain", title: t('a-ji-lu-ji-lu-cha-xun-yu-ming-ip-di-zhi-jie-xi-cha-xun-gong-ju'), keywords: t('a-ji-lu-cha-xun-yu-ming-jie-xi-ip-di-zhi-dns-jian-ce'), description: t('quan-wei-de-a-ji-lu-zai-xian-cha-xun-gong-ju-shi-shi-cha-kan-yu-ming-jie-xi-de-ip-di-zhi-zhi-chi-duo-di-qu-jian-ce-xian-shi-ttl-zhi-he-xiang-ying-shi-jian-zhu-nin-kuai-su-zhen-duan-jie-xi-pei-zhi'), htmlContent: t('a-jie-xi-html-content') },
    { label: t('cname-jie-xi'), subject: t('cname-jie-xi-cha-xun'), value: "cname", page: "/cname", catogory: "domain", title: t('cname-ji-lu-cha-xun-yu-ming-bie-ming-jie-xi-jian-ce-gong-ju'), keywords: t('cname-ji-lu-yu-ming-bie-ming-dns-jie-xi-yu-ming-jian-ce'), description: t('zhuan-ye-de-cname-ji-lu-cha-xun-gong-ju-jian-ce-yu-ming-bie-ming-pei-zhi-xian-shi-mu-biao-yu-ming-jie-xi-ip-ji-ttl-zhi-bang-zhu-nin-yan-zheng-cdn-deng-fu-wu-pei-zhi-shi-fou-zheng-que'), htmlContent: t('cname-jie-xi-html-content') },
    { label: t('ns-jie-xi'), subject: t('ns-jie-xi-cha-xun'), value: "ns", page: "/ns", catogory: "domain", title: t('ns-ji-lu-ji-lu-cha-xun-yu-ming-fu-wu-qi-jie-xi-jian-ce-gong-ju'), keywords: t('ns-ji-lu-cha-xun-yu-ming-fu-wu-qi-dns-fu-wu-qi-yu-ming-jie-xi'), description: t('zhuan-ye-de-ns-ji-lu-zai-xian-cha-xun-gong-ju-jian-ce-yu-ming-fu-wu-qi-pei-zhi-xian-shi-ns-fu-wu-qi-di-zhi-ip-ji-xiang-ying-shi-jian-bang-zhu-zhen-duan-yu-ming-jie-xi-yi-chang-wen-ti'), htmlContent: t('ns-jie-xi-html-content') },
    { label: t('txt-jie-xi'), subject: t('txt-jie-xi-cha-xun'), value: "txt", page: "/txt", catogory: "domain", title: t('txt-ji-lu-ji-lu-cha-xun-yu-ming-wen-ben-ji-lu-cha-xun-gong-ju'), keywords: t('txt-ji-lu-cha-xun-spf-ji-lu-dkim-yu-ming-yan-zheng'), description: t('zai-xian-txt-ji-lu-cha-xun-gong-ju-kuai-su-cha-kan-yu-ming-de-txt-ji-lu-xin-xi-zhi-chi-spf-dkim-deng-ji-lu-cha-xun-bang-zhu-pei-zhi-yu-ming-you-jian-an-quan-yan-zheng'), htmlContent: t('txt-jie-xi-html-content') },
    { label: t('ptr-fan-xiang-jie-xi'), subject: t('ptr-fan-xiang-jie-xi-cha-xun'), value: "ptr", page: "/ptr", catogory: "ip", title: t('ptr-fan-xiang-jie-xi-ji-lu-cha-xun-ip-fan-xiang-jie-xi-jian-ce-gong-ju'), keywords: t('ptr-ji-lu-fan-xiang-jie-xi-ip-fan-cha-yu-ming-dns-jian-ce'), description: t('zhuan-ye-de-ptr-ji-lu-cha-xun-gong-ju-ti-gong-ip-di-zhi-fan-xiang-jie-xi-jian-ce-xian-shi-dui-ying-de-yu-ming-xin-xi-bang-zhu-zhen-duan-you-jian-fu-wu-qi-fan-xiang-jie-xi-pei-zhi'), htmlContent: t('ptr-jie-xi-html-content') },
    { label: t('ping-jian-ce'), subject: t('ping-jian-ce-cha-xun'), value: "ping", page: "/ping", catogory: "host", title: t('ping-ji-lu-jian-ce-wang-luo-lian-tong-xing-ce-shi-gong-ju'), keywords: t('ping-jian-ce-wang-luo-yan-chi-lian-tong-xing-ce-shi-xiang-ying-shi-jian'), description: t('duo-di-qu-ping-jian-ce-gong-ju-ce-shi-fu-wu-qi-wang-luo-lian-tong-xing-neng-xian-shi-bu-tong-di-qu-xiang-ying-shi-jian-bang-zhu-zhen-duan-wang-luo-fang-wen-zhi-liang-wen-ti'), htmlContent: t('ping-jie-xi-html-content') },
]);

  return {
    columnConfig,
    QueryTypeList
  }
}

interface QueryType {
    label: string;
    value: string;
    page: string;
    catogory: string;
    title: string;
    keywords: string;
    description: string;
    htmlContent: string;
    subject: string;
}