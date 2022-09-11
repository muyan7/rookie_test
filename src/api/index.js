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
export const reqAddShopcarList = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
//155.1获取购物车列表数据接口
//URL:/api/cart/cartList   method:get 
export const reqShopCartList = () => requests.get('/cart/cartList');
//158删除购物产品的接口
//URL:/api/cart/deleteCart/{skuId}   method:DELETE  
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});
//159修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get 
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});
//161.3获取验证码
//URL:/api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});
// 162.1注册
//url:/api/user/passport/register  method:post    phone code password
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'});
// 163登录
//URL:/api/user/passport/login  method:post phone password
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'});
//164获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo  method:get 
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});
//165退出登录
//URL:/api/user/passport/logout  get
export const reqLogout = ()=> requests({url:'/user/passport/logout',method:'get'});
//167.1获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});
//168获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'});
//169提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});
//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});
//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export  const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});
//获取个人中心的数据
//api/order/auth/{page}/{limit}  get 
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});