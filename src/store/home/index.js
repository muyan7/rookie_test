// home模块的小仓库
// 102引进需要发送请求路径
import { reqCategoryList, reqBannerList,reqFloorList } from '../../api'
// state:仓库，存储数据
const state = {
  // 107 服务器返回的是一个数组，
  // 所以不能乱用初始值，要看服务器返回的是啥。根据接口的返回值来设置初始值
  categoryList: [],
  // 133.5准备空数组，放mockbanner的数据
  bannerList: [],
  // 135.3.因为floor是多个组件,所以不能在floor组件内部发送请求,要在home的路由里面发送.
  floorList:[]
}
// mutations :修改state的唯一手段
const mutations = {
  // 105通过在actions里面的处理回调到这里面
  CATEGORYLIST(state, categoryList) {
    // 106tate.categoryList仓库中的数据等于解构出来的result.data===categoryList
    // console.log(categoryList)
    state.categoryList = categoryList
  },
  // 133.6处理回调
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  // 135.2 传参..仓库中floor的数据(服务器)是个数组.仓库中的state不能乱写
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
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
    // 如果code是200就提交mutation.
    if (result.code === 200) commit('CATEGORYLIST', result.data)
  },
  // 133.4获取首页轮播图mock数据
  async getBannerList({commit}) {
    let result = await reqBannerList()
    // console.log(result)
    if (result.code === 200) commit('GETBANNERLIST', result.data)
  },
  // 135.1获取floor数据
  async getFloorList({commit}) {
    let result = await reqFloorList()
    // console.log(result)
    if (result.code === 200) commit('GETFLOORLIST', result.data)
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
