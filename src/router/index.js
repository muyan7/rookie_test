// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用路由
Vue.use(VueRouter)
//引入路由
import routes from './routes'
// 配置路由并暴露
export default new VueRouter({
  // 配置
  routes,
  // 路由滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
})
