import request from '@/config/api'
console.log('getdata')
export function fetchAllCities(type) {
    return request({
        url: '/v1/cities',
        method: 'get',
        params: {
            type: type
        }
    })
}