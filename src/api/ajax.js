// 对于axios的二次封装
import axios from 'axios'
//引入进度条
// console.log(axios)
import nprogress from 'nprogress'
// console.log(nprogress);
// start ：进度条开始 done：进度条结束
// 155.6 在当前模块引入store
import store from '../store'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 利用axios对象的方法create，创建一个axios实例
// 此时的request就相当于axios。
const requests = axios.create({
  //配置对象
  // 基础路径，发送请求，路径中会出现api
  baseURL: '/api',
  // 代表请求超时时间
  timeout: 5000,
})
// 请求拦截器：在发出请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情。
requests.interceptors.request.use((config) => {
  // 155.7 打印仓库数据是否引入成功
  // console.log(store)
  // 155.8判断是否存在nanoid
  if (store.state.detail.nanoid_token) {
    // 请求头添加一个字段(userTempId).并且带去后台
    config.headers.userTempId = store.state.detail.nanoid_token
  }
  //  164.4需要携带token给服务器.判断是否存在token
  if (store.state.user.token) {
    config.headers.token=store.state.user.token
  }
  // 进度条开始
  nprogress.start()
  // config:配置对象，对象里面有一个属性很重要，headers请求头
  return config
})
// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 进度条结束
    nprogress.done()
    // 响应成功.回调函数
    return res.data
  },
  (err) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'))
  }
)

// 对外暴露
export default requests
