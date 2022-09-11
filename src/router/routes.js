// 专门放置路由路径和组测
//引入路由组件
import Home from '../../src/pages/Home'
import Login from '../../src/pages/Login'
import Register from '../../src/pages/Register'
import Search from '../../src/pages/Search'
import Detail from '../../src/pages/Detail' //商品详情页
import AddCartSuccess from '../../src/pages/AddCartSuccess' //添加至购物车
import ShopCart from '../../src/pages/ShopCart' //购物车结算
import Trade from '../../src/pages/Trade' //交易结算中心
import Pay from '../../src/pages/Pay' //支付页面
import PaySuccess from '../../src/pages/PaySuccess' //支付成功页面
import Center from '../../src/pages/Center' //支付成功页面
// 引入二级路由组件
import MyOrder from '../../src/pages/Center/MyOrder'
import GroupOrder from '../../src/pages/Center/GroupOrder'

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
  // 156.购物车结算页
  {
    name: 'shopcart',
    path: '/shopcart',
    component: ShopCart,
    meta: { show: true },
  },
  // 167配置交易路由
  {
    name: 'trade',
    path: '/trade',
    component: Trade,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopcart') next()
      else next(false)
    },
  },
  // 169.1支付页面
  {
    name: 'pay',
    path: '/pay',
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') next()
      else next(false)
    },
  },
  // 170支付成功页面PaySuccess
  {
    name: 'paysuccess',
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true },
  },
  // 171个人中心
  {
    name: 'center',
    path: '/center',
    component: Center,
    meta: { show: true },
    // 二级路由
    children: [
      {
        path: 'myorder',
        component: MyOrder,
      },
      {
        path: 'grouporder',
        component: GroupOrder,
      },
      // 重定向
      {
        path: '/center',
        redirect: '/center/myorder',
      },
    ],
  },
  // 配置路由首页。重定向，项目跑起来后访问/，立马就让他定向到首页
  {
    path: '*',
    redirect: '/home',
  },
]
