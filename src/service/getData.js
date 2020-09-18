import request from '@/config/api'

export function fetchCities(type) {
    return request({
        url: '/v1/cities',
        method: 'get',
        params: {
            type: type
        }
    })
}

export function fetchPlaceInfo(query) {
    return request({
        url: '/v1/pois',
        method: 'get',
        params: {
            type: query.type,
            city_id: query.id,
            keyword: query.keyword
        }
    })
}

// 获取当前所在城市
export function fetchCurrentCity(id) {
    return request({
        url: '/v1/cities/' + id,
        method: 'get',
    })
}