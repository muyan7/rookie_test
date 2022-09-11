//155.2购物车结算仓库
import {
  reqShopCartList,
  reqDeleteCartById,
  reqUpdateCheckedByid,
} from '../../api'
const state = {
  shopCartList: [],
}
const mutations = {
  GETSHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList
  },
}
const actions = {
  // 获取购物车列表数据
  async getShopcartList({ commit }) {
    const result = await reqShopCartList()
    // console.log(result)
    if (result.code === 200) commit('GETSHOPCARTLIST', result.data)
  },
  // 158.1删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    //  返回的是个空
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  //  159.1修改某一个购物车产品的选中状态
  async updateCheckedByid({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 160.2删除全部选中的产品
  deleteAllCheckedCart({ getters, dispatch }) {
    // context就是小仓库，直接结构context里面可以直接调用。里面有这一页的所有属性值，也包括dispatch（派发action）
    // console.log(context);
    // 获取购物车中全部的产品(是个数组)
    let promiseAll=[]
    getters.shopCartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
        // console.log(result);
      // 将每一次返回的promise添加到数组当中
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  },
  // 161.2修改全部产品的状态
  updateAllCartChecked({ state, dispatch },isChecked) {
    console.log(state, dispatch,isChecked);
    let promiseAll=[]
    state.shopCartList[0].cartInfoList.forEach(item => {
      let promise=dispatch('updateCheckedByid',{skuId:item.skuId,isChecked})
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
const getters = {
  // 处理数据
  shopCartList(state) {
    // console.log(state.shopCartList[0])
    return state.shopCartList[0] || {}
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
}
