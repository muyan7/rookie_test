// search模块的小仓库
// state:仓库，存储数据
const state={b:2}
// mutations :修改state的唯一手段
const mutations={}
// action : 处理action，可以书写自己的业务逻辑，也可以处理异步
const actions={}
// getters:计算属性，简化数据仓库，获取数据更加方便
const getters={}

// 对外暴露store实例
export default {
  state,
  mutations,
  actions,
  getters,
}