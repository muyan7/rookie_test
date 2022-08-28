// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用路由
Vue.use(VueRouter)
//引入路由组件
import Home from '../../src/pages/Home'
import Login from '../../src/pages/Login'
import Register from '../../src/pages/Register'
import Search from '../../src/pages/Search'
// 配置路由并暴露
export default new VueRouter({
  // 配置
  routes: [
    {
      path:'/home',
      component:Home
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    }, {
      path:'/search',
      component:Search
    },
  ]
})