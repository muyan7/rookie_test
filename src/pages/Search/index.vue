<template>
  <div>
    <h1>搜索路由</h1>
    <h1>我是query参数：{{ $route.query.keyword}}</h1>
    <h1>我是query参数：{{ $route.query.categoryName}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Search',
}
</script>

<style></style>
