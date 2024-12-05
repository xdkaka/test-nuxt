
import request from '@/utils/request'
export function getRegionList(data:any) {
    return request({
        method: 'post',
        path: '/v1/region/list',
        params: data
    })
}

export function queryDNS(data:any) {
    return request({
        method: 'post',
        path: '/v1/query',
        params: data
    })
}