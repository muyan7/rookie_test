<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list">
          <!-- 143.2渲染到页面 -->
          <!-- 146处理品牌渲染页面 -->
          <li
            v-for="item in trademarkList"
            :key="item.tmId"
            @click="tradeMarkHandler(item)"
          >
            <a>{{ item.tmName }}</a>
          </li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <!-- 147平台售卖属性的地方 -->
    <div class="type-wrap" v-for="item in attrsList" :key="item.attrId">
      <div class="fl key">{{ item.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <!-- 相应的属性值 -->
          <li
            v-for="(itemValue, index) in item.attrValueList"
            :key="index"
            @click="attrInfo(item, itemValue)"
          >
            <a>{{ itemValue }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
// 143.获取列表 attrsList trademarkList 的数据
import { mapGetters } from 'vuex'
export default {
  name: 'SearchSelector',
  //143.1将数据提取出来
  computed: {
    ...mapGetters(['attrsList', 'trademarkList']),
  },
  // 146.1品牌事件的处理函数
  methods: {
    // 146.2一定要在父组件中发送请求，父组件中的searchParams参数师带给服务器的参数。子组件要把点击的品牌信息传给父组件
    // 子给父传用到自定义事件
    tradeMarkHandler(trademark) {
      // console.log(trademark)
      this.$emit('trademarkInfo', trademark)
    },
    // 147.1平台售卖值的点击事件
    attrInfo(item, itemValue) {
      // console.log(123);
      // console.log(item,itemValue)
      this.$emit('attrInfo',item, itemValue)

      // 
    },
  },
}
</script>

<style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          font-style: italic;

          a {
            font-size: 14px;
            font-weight: 700;
            color: rgb(50, 170, 245);
            cursor: pointer;
          }
          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;

          a {
            text-decoration: none;
            color: #666;
            cursor: pointer;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

      .sui-btn {
        display: inline-block;
        padding: 2px 14px;
        box-sizing: border-box;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        color: #666;
      }
    }
  }
}
</style>
