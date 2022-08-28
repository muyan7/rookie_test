<template>
  <div>
    <h1>搜索路由</h1>
    <h1>我是params参数：{{ $route.params.keyword }}</h1>
    <h1>我是query参数：{{ $route.query.k}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Search',
}
</script>

<style></style>
