// 133此页面是发送mock请求所复制的ajax.js文件，只是需要把/api换成/mock。
// 对于axios的二次封装
import axios from 'axios';
//引入进度条
// console.log(axios)
import nprogress from 'nprogress';
// console.log(nprogress);
// start ：进度条开始 done：进度条结束
// 引入进度条样式
import 'nprogress/nprogress.css';
// 利用axios对象的方法create，创建一个axios实例
// 此时的request就相当于axios。
const requests = axios.create({
  //配置对象
  // 基础路径，发送请求，路径中会出现api
  baseURL:'/mock',
  // 代表请求超时时间
  timeout:5000,
})
// 请求拦截器：在发出请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情。
requests.interceptors.request.use((config) => {
  // 进度条开始
  nprogress.start()
  // config:配置对象，对象里面有一个属性很重要，headers请求头
  return config
  
})
// 响应拦截器
requests.interceptors.response.use((res) => {
  // 进度条结束
  nprogress.done()
  // 响应成功.回调函数
  return res.data
  
},(error) => {
  // 响应失败的回调函数
  return Promise.reject( new Error('faile'))

})

// 对外暴露
export default requests