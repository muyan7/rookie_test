<template>
  <div>
    <!-- 三级联动组件；已经是全局组件，不需要在用其他方式引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- 135.7遍历复用的组件.v-for也可以在自定义标签内使用.并且通过props将数据传到子组件内. -->
    <Floor v-for="item in renderFloorList" :key="item.id" :list="item" />
    <Brand />
  </div>
</template>

<script>
// 引入其余的组件
// 轮播图列表组件
import ListContainer from '../../pages/Home/ListContainer'
// 引入今日推荐系列
import Recommend from '../../pages/Home/Recommend'
// 引入排行榜
import Rank from '../../pages/Home/Rank'
// 引入猜你喜欢
import Like from '../../pages/Home/Like'
// 引入楼层推荐
import Floor from '../../pages/Home/Floor'
// 引入商标
import Brand from '../../pages/Home/Brand'
// 135.5引入仓库中的数据
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    // 135.4派发action,获取floor组见的数据
    this.$store.dispatch('getFloorList')
   /*  // 164.3请求得到登录数据.在路由守卫里面派发了
    this.$store.dispatch('getUserInfo') */ 
  },
  // 135.6获取数据到本组件内
  computed: {
    ...mapState({
      renderFloorList: (state) => state.home.floorList,
    }),
  },
}
</script>

<style></style>
