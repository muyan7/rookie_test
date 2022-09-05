<template>
  <div class="pagination">
    <!-- 分页器149.1 -->
    <!-- 上 -->
    <button :disabled="pageNo===1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="computedPage.start>1" @click="$emit('getPageNo',1)" :class="{ active: pageNo == 1 }">1</button>
    <button v-if="computedPage.start>2">···</button>
    <!-- 149.6中间部分 -->
    <button v-for="(item,index) in computedPage.end" :key="index" v-show="item>=computedPage.start" @click="$emit('getPageNo',item)" :class="{active:pageNo===item}">{{item}}</button>
    <!-- 下 -->
    <button v-if="computedPage.end<totalPage-1">···</button>
    <button v-if="computedPage.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo===totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo===totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  // 149.2获取父级传输的数据
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  // 149.3利用计算属性来获取分页情况
  computed: {
    totalPage() {
      // 向上取整
    // console.log(this.total,this.pageSize);
      return Math.ceil(this.total / this.pageSize)
    },
    // 149.4计算出连续页码的页数
    computedPage() {
      const { pageNo, totalPage, continues } = this
      let start = 0,
        end = 0
      // 考虑中间开始部分
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        if (start < 1) {
          start = 1
          end=continues
        }
        if(end>totalPage){
          end=totalPage
          start=totalPage-continues+1
        }
      }
      return { start, end }
    },
  },
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: aqua;
}
</style>
