import axios from 'axios'
import baseurl from './config.js'

// 创建axios实例
const service = axios.create({
    baseURL: baseurl, // api 的 base_url
    timeout: 120000 // 请求超时时间
})

// 配置响应拦截器
service.interceptors.response.use(
    (response) => {
        // 权限问题报错
        if (response.data.retcode == 10003 || response.data.retcode == 10004 || response.data.retcode == 10011) {
            alert("无权限访问或登录信息已过期，请返回登录页重新登录后重试!")
            return Promise.reject(response.data)
        } else {
            //只将请求结果的data字段返回
            return Promise.resolve(response.data)
        }
    },
    (err) => {
        console.log(err, 'err')
        //发生网络错误后会走到这里
        alert("网络请求异常")
        return Promise.reject("网络请求异常：" + err.message)
    }
)
// 配置请求拦截器
// service.interceptors.request.use((request) => {
//     // 请求头携带token
//     request.headers["token"] = uni.getStorageSync('token');
//     return request;
// })

export default service