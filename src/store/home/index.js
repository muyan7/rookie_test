// home模块的小仓库
// 102引进需要发送请求路径
import { reqCategoryList } from '../../api'
// state:仓库，存储数据
const state = {
  // 107 服务器返回的是一个数组，
  // 所以不能乱用初始值，要看服务器返回的是啥。根据接口的返回值来设置初始值
  categoryList: [],
}
// mutations :修改state的唯一手段
const mutations = {
  // 105通过在actions里面的处理回调到这里面
  CATEGORYLIST(state, categoryList) {
    // 106tate.categoryList仓库中的数据等于解构出来的result.data===categoryList
    // console.log(categoryList)
    state.categoryList = categoryList
  },
}
// action : 处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 101找到需要处理改函数的action
  // {commit}是解构赋值对应context.commit
  async categoryList(context) {
    // 103拿到结果，获取的式promise数据。需要通过await和async这一对组合就能直接获取数据来处理
    let result = await reqCategoryList()
    // 104提交数据,返回的数一个数组
    // console.log(result)
    // console.log(context)
    const { commit } = context
    // console.log(result.data)
    if (result.code === 200) commit('CATEGORYLIST', result.data)
  },
}
// getters:计算属性，简化数据仓库，获取数据更加方便
const getters = {}

// 对外暴露store实例
export default {
  state,
  mutations,
  actions,
  getters,
}
