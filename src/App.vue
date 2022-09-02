<template>
  <div>
    <Header />
    <!-- 我是根组件 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted() {
    //129指派发一次请求action,获取商品分类的三级列表的数据
    this.$store.dispatch('categoryList')
  },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  cursor: pointer;
}
</style>
