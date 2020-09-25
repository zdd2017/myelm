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

// merchant.vue
// 通过坐标获取城市信息
export function fetchCityByPosition(poi) {
    return request({
        url: '/v2/pois/' + poi,
        method: 'get',
    })
}

// 获取食物类型
export function fetchFoodTypes(query) {
    return request({
        url: '/v2/index_entry',
        method: 'get',
        params: {
            geohash: query.geohash,
            group_type: query.type,
            flags: query.flags
        }
    })
}

// 获取商家
export function fetchMerchants(query) {
    return request({
        url: '/shopping/restaurants',
        method: 'get',
        params: {
            latitude: query.latitude,
            longitude: query.longitude,
            offset: query.offset,
            limit: query.limit,
            extras: query.extras,
            keyword: query.keyword,
            restaurant_category_id: query.id,
            restaurant_category_ids: query.ids,
            order_by: query.order,
            delivery_mode: query.mode
        }
    })
}