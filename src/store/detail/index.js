import { reqGoodsInfo, reqAddShopcarList } from '../../api'
// 引入uuid的暴露.生成一个随机字符串，有一个就不能再改变了
import {getNANOID} from '../../utils/nanoid_token';
// 151.2goods详情模块的小仓库
// state:仓库，存储数据
const state = {
  goodsList: {},
  // 155.4获取每个用户的id.必须在加入购物车的时候就提交过去。通过请求头。
  nanoid_token: getNANOID(),
}
// mutations :修改state的唯一手段
const mutations = {
  GETGOODSLIST(state, goodsList) {
    state.goodsList = goodsList
  },
}
// action : 处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 当前的getSearchList函数在调用获取服务器数据时，至少传递一个空对象参数
  async getGoodsList({ commit }, proId) {
    let result = await reqGoodsInfo(proId)
    // console.log(result,params)
    if (result.code == 200) commit('GETGOODSLIST', result.data)
  },
  // 154.1将产品添加到购物车中.shopcarList这个函数返回的是个promise。
  async shopcarList({ commit }, { skuId, skuNum }) {
    let result = await reqAddShopcarList(skuId, skuNum)
    // console.log(result)
    // 加入购物车以后，前台将参数带给服务器。
    // 数据写入服务器成功，并没有返回其他数据，只是返回了一个code==200,则没必要三连环。
    // 154.5但是promise必须要返回一个值出去。什么值都可以，必须返回东西出去
    if (result.code === 200) return 'successed'
    else return Promise.reject(new Error('failed'))
  },
}

// getters:计算属性，简化数据仓库，获取数据更加方便
const getters = {
  // categoryView spuSaleAttrList skuInfo
  // 路径导航的简化
  categoryView(state) {
    // 一开始是没有数据的，所以会是个undefined，所以加一个空对象保证后台不报错。
    return state.goodsList.categoryView || {}
  },
  // 产品售卖属性
  spuSaleAttrList(state) {
    return state.goodsList.spuSaleAttrList || []
  },
  // 产品信息
  skuInfo(state) {
    return state.goodsList.skuInfo || {}
  },
}

// 对外暴露store实例
export default {
  state,
  mutations,
  actions,
  getters,
}
