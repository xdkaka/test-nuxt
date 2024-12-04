
import request from '@/utils/request'
export function getDomainList(data:any) {
    return request({
        api_url: 'RANDOM_API_URL',
        method: 'post',
        path: '/v1/random-mail/domain/list',
        params: data
    })
}


export function createRandomMailByToken(data:any) {
    return request({
        api_url: 'RANDOM_API_URL',
        method: 'post',
        path: '/v1/random-mail/create',
        params: data
    })
}

export function getRandomMailList(data:any) {
    return request({
        api_url: 'RANDOM_API_URL',
        method: 'post',
        path: '/v1/random-mail/list',
        params: data
    })
}

export function createRandomMailByDevice(data:any) {
    return request({
        api_url: 'RANDOM_API_URL',
        method: 'post',
        path: '/v1/random-mail/create-by-device',
        params: data
    })
}

