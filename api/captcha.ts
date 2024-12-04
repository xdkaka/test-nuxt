
import request from '@/utils/request'
export function getCaptcha(data:any) {
    return request({
        api_url: 'RANDOM_API_URL',
        method: 'post',
        path: '/v1/captcha/get',
        params: data
    })
}