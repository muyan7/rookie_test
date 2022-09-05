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
// 外对暴露一个store的实例对象
// 对外暴露store实例
export default new Vuex.Store({
  // 实现vuex仓库模块式开发存储数据
  modules: {
    home,
    search,
    detail
  }
})