import { reqSearchList } from '../../api'
// search模块的小仓库
// state:仓库，存储数据
const state = { searchList:{} }
// mutations :修改state的唯一手段
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList=searchList
  }
}
// action : 处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 141.1当前的getSearchList函数在调用获取服务器数据时，至少传递一个空对象参数
  async getSearchList( {commit},params={}) {
    let result = await reqSearchList({ params })
    // console.log(result,params)
    if(result.code==200) commit('GETSEARCHLIST',result.data)
  },
}
// getters:计算属性，简化数据仓库，获取数据更加方便
// 141.6项目中getters主要是就是简化仓库中的数据。
const getters = {
  // 141.7仓库处理数据。考虑没网络会返回undefined情况，所以需要或条件[]。
  goodsList(state) {
    return state.searchList.goodsList||[]
  },
  trademarkList(state) {
    return state.searchList.trademarkList||[]
  },
  attrsList(state) {
    return state.searchList.attrsList||[]
  }
}

// 对外暴露store实例
export default {
  state,
  mutations,
  actions,
  getters,
}
