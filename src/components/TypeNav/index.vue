<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container w">
      <!-- 114事件的委派，保证移出大标题的时候才消失active类名 -->
      <div @mouseleave="removeIndex">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <div class="sort">
          <!-- 一级分类 -->
          <!-- 121事件委派跳转，避免重复多次渲染。但是要考虑如何获取a标签，一二三级如何区别-->
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(item1, index) in renderCategoryList"
              :key="item1.categoryId"
              :class="{ active: currentIndex === index }"
            >
              <h3 @mouseenter="checkoutIndex(index)">
                <a
                  href="#"
                  :data-categoryName="item1.categoryName"
                  :data-categoryId1="item1.categoryId"
                  >{{ item1.categoryName }}</a
                >
              </h3>
              <!-- 116 判断currentIndex === index 来显示盒子 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex === index ? 'block' : 'none' }"
              >
                <!-- 二级分类 -->
                <div
                  class="subitem"
                  v-for="item2 in item1.categoryChild"
                  :key="item2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        href="#"
                        :data-categoryName="item2.categoryName"
                        :data-categoryId2="item2.categoryId"
                        >{{ item2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <!-- 三级分类 -->
                      <em
                        v-for="item3 in item2.categoryChild"
                        :key="item3.categoryId"
                      >
                        <a
                          href="#"
                          :data-categoryName="item3.categoryName"
                          :data-categoryId3="item3.categoryId"
                          >{{ item3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 118引入lodash，按需引入。因为lodash是默认暴露，所以不需要加大括号{throttle}
import throttle from 'lodash/throttle'
// 108 获取数据
export default {
  name: 'TypeNav',
  // 110处理鼠标样式
  data() {
    return {
      // 111初始化索引号，方便寻找每一个需要的小li
      currentIndex: -1,
    }
  },
  // 组件挂在完毕，就向服务器请求数据
  mounted() {
    // 100通知Vuex发送请求，获取数据，存储于仓库中。
    this.$store.dispatch('categoryList')
  },
  // 109计算属性
  computed: {
    ...mapState({
      //110当使用这个计算属性的时候，该函数会立刻执行一次
      // 注入一个参数state。是大仓库中的数据，包含home和search
      renderCategoryList: (state) => state.home.categoryList,
    }),
  },
  //112添加方法来控制索引号
  methods: {
    // 113 index 鼠标移入赋值索引值。控制类名的true和false
    /* checkoutIndex(index) {
      this.currentIndex = index
      // 117快速划入一级分类导航区，会出现丢失触发现象。是因为浏览器反应不过来，可能会导致卡顿现象。
      // 利用防抖与节流来处理。即连续的快速触发自会触发一次。
      // console.log('鼠标进入'+index)
    }, */
    // 119利用节流来保证重复执行后只执行少量。别用箭头函数。
    checkoutIndex: throttle(function (index) {
      this.currentIndex = index
    }, 32),
    // 114鼠标离开的事件回调
    removeIndex() {
      // 115 鼠标离开后就去变为原来的
      this.currentIndex = -1
    },
    // 120进行search页面跳转.利用事件委派。获取点击的每一个a标签
    goSearch(event) {
      // this.$router.push({name:'search'})
      // 点击a标签才会经行路由跳转。获取a,加上自定义标签
      // console.log(event.target) 获取当前触发事件的节点
      // console.log(event.target.dataset) //获取对象，里面有需要的参数
      // 122解构除自定义属性的值
      const { categoryname, categoryid1, categoryid2, categoryid3 } =
        event.target.dataset
      // console.log(event.target.dataset)
      // 122.1包装传参的对象路径名
      let location={name:'search'}
      // 122.2传参的参数
      let query={categoryName:categoryname}
      // 122.3判断是否具有这个属性才进行参数的赋值
      if (categoryname) {
        if(categoryid1) query.categoryId1=categoryid1
        else if(categoryid2) query.categoryId2=categoryid2
        else query.categoryId3=categoryid3
      }
      // 122.4将以及封装好的query对象再次放入location对象中
      location.query=query
      // console.log(query);
      // console.log(location);
      // 122.5只用发送一次push
      this.$router.push(location)
    },
  },
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #12fbe8;
  .container {
    display: flex;
    position: relative;
    .all {
      width: 210px;
      height: 45px;
      background-color: #12fbe8;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .active {
          background-color: rgb(44, 248, 255);
        }
      }
    }
  }
}
</style>
