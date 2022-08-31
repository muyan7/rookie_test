// API经行统一管理
// 1.引入
import requests from './request'
// 三级联动的地址http://39.98.123.211:8510/api/product/getBaseCategoryList get 无参数
// axios返回值是一个Promise对象
// 出现跨域。要去config.js里面设置代理模式
export const reqCategoryList = () =>
  requests({
    url: 'product/getBaseCategoryList',
    method: 'get',
  })
