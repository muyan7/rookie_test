import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//引入路由
import router from '../src/router'
new Vue({
  render: (h) => h(App),
  // 注册路由：那么组件身上都具有了$route和$router属性。
  // $route一般获取路由信息【路径、query、params等】
  // $router一般经行编程式导航经行路由跳转【push|replace】
  router,
}).$mount('#app')
