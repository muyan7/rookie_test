import Vue from 'vue'
import App from './App.vue'
//三级联动组件，全局组件
import TypeNav from '../src/components/TypeNav';
// 注册全局组件，第一个参数是名字，第二个参数是哪一个组件.
// 全局组件放入components文件中。
Vue.component(TypeNav.name, TypeNav)
// 关闭生产提示
Vue.config.productionTip = false
//引入路由
import router from '../src/router'
// 测试接口
import { reqCategoryList } from '../src/api';
reqCategoryList()
// 引入仓库
import store from '../src/store'
// 132.7引入mockServe.js虚拟数据
import '../src/mock/mockServe'
// 134.1引入swiper样式,以供全局swiper使用.样式没有对外暴露,所以直接引入
import 'swiper/css/swiper.css'

new Vue({
  render: (h) => h(App),
  // 注册路由：那么组件身上都具有了$route和$router属性。
  // $route一般获取路由信息【路径、query、params等】
  // $router一般经行编程式导航经行路由跳转【push|replace】
  router,
  // 注册仓库：组件实例身上具有$store属性
  store,
}).$mount('#app')
