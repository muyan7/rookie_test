// 引入并使用vuex
import Vue from 'vue';
import Vuex from 'vuex';
// 使用
Vue.use(Vuex)
// 引入小仓库
import home from './home';
import search from './search';
// 150.2小仓库数据放入大仓库中
import detail from './detail';
// 155.3引入购物车列表小仓库
import shopcart from './shopcart';
// 161.5引入注册与登录模块的小仓库
import user from './user';
// 167.2引入交易中心的仓库
import trade from './trade';
// 外对暴露一个store的实例对象
// 对外暴露store实例
export default new Vuex.Store({
  // 实现vuex仓库模块式开发存储数据
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})