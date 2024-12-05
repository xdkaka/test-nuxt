export const columnConfig = {
    mx: [
        { prop: "region", label: "检测地区", minWidth: "100" },
        { prop: "value", label: "记录值", minWidth: "300" },
        { prop: "priority", label: "优先级" },
        { prop: "ttl", label: "TTL" },
        { prop: "ip", label: "IP", minWidth: "450" },
        { prop: "rtt", label: "响应时间" }
    ],
    a: [
        { prop: "region", label: "检测地区", minWidth: "100" },
        { prop: "ip", label: "IP", minWidth: "450" },
        { prop: "ttl", label: "TTL" },
        { prop: "rtt", label: "响应时间" }
    ],
    cname: [
        { prop: "region", label: "检测地区", minWidth: "100" },
        { prop: "target", label: "记录值", minWidth: "300" },
        { prop: "ip", label: "IP", minWidth: "450" },
        { prop: "ttl", label: "TTL" },
        { prop: "rtt", label: "响应时间" },
    ],
    ns: [
        { prop: "region", label: "检测地区", minWidth: "100" },
        { prop: "host", label: "记录值", minWidth: "300" },
        { prop: "ip", label: "IP", minWidth: "450" },
        { prop: "ttl", label: "TTL" },
        { prop: "rtt", label: "响应时间" },
    ],
    txt: [
        { prop: "region", label: "检测地区", minWidth: "100" },
        { prop: "txt", label: "记录值", minWidth: "500" },
        { prop: "ttl", label: "TTL" },
        { prop: "rtt", label: "响应时间" },
    ],
    ptr: [
        { prop: "region", label: "检测地区", minWidth: "100" },
        { prop: "ptr", label: "记录值", minWidth: "300" },
        { prop: "ip", label: "IP", minWidth: "450" },
        { prop: "ttl", label: "TTL" },
        { prop: "rtt", label: "响应时间" },
    ],
    ping: [
        { prop: "region", label: "检测地区", minWidth: "100" },
        { prop: "ip", label: "IP", minWidth: "450" },
        { prop: "rtt", label: "响应时间" },
    ],
};
interface QueryType {
    label: string;
    value: string;
    page: string;
    catogory: string;
}
export const QueryTypeList = ref<QueryType[]>([
    { label: "MX解析", value: "mx", page: "/mx" ,catogory:"domain"},
    { label: "A解析", value: "a", page: "/a" ,catogory:"domain"},
    { label: "CNAME解析", value: "cname", page: "/cname" ,catogory:"domain"},
    { label: "NS解析", value: "ns", page: "/ns" ,catogory:"domain"},
    { label: "TXT解析", value: "txt", page: "/txt" ,catogory:"domain"},
    { label: "PTR解析", value: "ptr", page: "/ptr" ,catogory:"ip"},
    { label: "PING检测", value: "ping", page: "/ping" ,catogory:"host"},
]);