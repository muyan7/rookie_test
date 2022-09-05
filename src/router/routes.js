// 专门放置路由路径和组测
//引入路由组件
import Home from '../../src/pages/Home'
import Login from '../../src/pages/Login'
import Register from '../../src/pages/Register'
import Search from '../../src/pages/Search'
import Detail from '../../src/pages/Detail'
import AddCartSuccess from '../../src/pages/AddCartSuccess'
export default [
  {
    name: 'home',
    path: '/home',
    component: Home,
    meta: { show: true }, //控制页面显示组件。
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: { show: false },
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: { show: false },
  },
  {
    name: 'search',
    // 需要parmas传参的地方需要：keyword占位。
    path: '/search/:keyword',
    component: Search,
    meta: { show: true },
  },
  {
    name: 'detail',
    path: '/detail/:proId',
    component: Detail,
    meta: { show: true },
  },
  // 155.注册加入购物车成功的路由 AddCartSuccess
  {
    name: 'addcartsuccess',
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true },
  },

  // 配置路由首页。重定向，项目跑起来后访问/，立马就让他定向到首页
  {
    path: '*',
    redirect: '/home',
  },
]