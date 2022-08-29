<template>
  <div>
    <!-- 三级联动组件；已经是全局组件，不需要在用其他方式引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor/>
    <Floor/>
    <Brand/>
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
export default {
  name: 'Home',
  components:{ListContainer,Recommend,Rank,Like,Floor,Brand}
}
</script>

<style></style>
