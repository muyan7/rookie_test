// API经行统一管理
// 1.引入
import requests from './ajax'
// 133.1引入mock数据
import mockRequests from './mockAjax'
// 三级联动的地址http://39.98.123.211:8510/api/product/getBaseCategoryList get 无参数
// axios返回值是一个Promise对象
// 出现跨域。要去config.js里面设置代理模式
export const reqCategoryList = () =>
  requests({ url: '/product/getBaseCategoryList', method: 'get' })
// 133.2 获取banner轮播图的接口。
export const reqBannerList = () =>
  mockRequests({ url: '/banner', method: 'get' })
// 135.获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')
//141.获取搜索模块的数据 .请求地址:/api/list 请求方式:POST.请求需要带参数.
// 当前的接口(获取搜索模块的数据),给服务器传递一个默认参数(至少是一个空对象)
export const reqSearchList = (params) =>
  requests({ url: '/list', method: 'post', data: params })
//获取产品详情信息的接口  URL: /api/item/{ skuId }  请求方式：get
export const reqGoodsInfo = (proId) => requests.get(`/item/${proId}`)
//154将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqShopcarList = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
