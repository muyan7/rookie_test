<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />

    <div class="main">
      <div class="py-container">
        <!--bread 面包屑带有X的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 145面包屑处理，删除分类的名字 -->
            <li
              class="with-x"
              v-if="searchParams.categoryName"
              @click="removeCategoryName"
            >
              {{ searchParams.categoryName }} <i>x</i>
            </li>
            <!-- 145.7关键字的面包屑 -->
            <li
              class="with-x"
              v-if="searchParams.keyword"
              @click="removeKeywordName"
            >
              {{ searchParams.keyword }} <i>x</i>
            </li>
            <!-- 146.6品牌的面包屑展示 -->
            <li
              class="with-x"
              v-if="searchParams.trademark"
              @click="removeTrademarkdName"
            >
              {{ searchParams.trademark.split(':')[1] }} <i>x</i>
            </li>
            <!-- 147.6平台售卖属性值展示 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
              @click="removeAttrdName(index)"
            >
              {{ attrValue.split(':')[1] }} <i>x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- 146.3绑定品牌自定义事件，147.2属性自定义事件。 -->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!--排序的结构 -->
              <!-- 148判断类名 -->
              <ul class="sui-nav">
                <!-- 149排序的操作 -->
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <!-- 148.3箭头 -->
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-jiantou_xiangshang': isAsc,
                        'icon-jiantou_xiangxia': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-jiantou_xiangshang': isAsc,
                        'icon-jiantou_xiangxia': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`"><img :src="item.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="item.title">{{
                      item.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 149.分页器得要是全局组件,传输数据给子组件 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
// 141.4引入数据
// import {mapState} from "vuex"
// 141.8 引入getters数据
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      // 142.2带给服务器的参数
      searchParams: {
        categoryId1: '', // 以及分类id
        categoryId2: '',
        categoryId3: '',
        categoryName: '', // 分类的名字
        keyword: '', // 关键字
        order: '1:asc', // 排序
        pageNo: 1, //当前的页面，默认是第一页 。分页器
        pageSize: 10, //每页的数据条数。
        props: [], //平台售卖的属性操作的参数
        trademark: '', //品牌
      },
    }
  },

  components: {
    SearchSelector,
  },
  beforeMount() {
    // console.log(this.$route.query,this.$route.params)
    // 142.5在发请求之前，把接口需要传递参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
    // 141.2获取接口数据
    // 142由于用户每次搜索都需要发送请求，所以不能只放在mounted。因为这个功能只是在组件挂在完毕执行一次
    // this.$store.dispatch('getSearchList',{})、
    // 142.3 在发请求之前带给服务参数[searchParams参数发生变化有数值带给服务器]
    //142.4所以这一步需要放到mounted之前进行，beforMount组件挂载完毕之前执行一次。
    this.getData()
  },
  // 141.3处理数据
  computed: {
    /* ...mapState({
  // 141.5这样获取的数据链接太长，不建议这样写，移动到仓库的getters来处理
  goodsList:state=> state.search.searchList.goodsList
}) */
    // 141.9mapGetters的写法，传递的时数组，因为getters没有划分模块（home,search）。
    ...mapGetters(['goodsList']),
    // 148.1计算类名是否含有1或者2
    isOne() {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') !== -1
    },
    // 148.2判断箭头的指向
    isAsc() {
      return this.searchParams.order.indexOf('asc') !== -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') !== -1
    },
    // 149.8获取分页器数据
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    // 142.1封装数据成函数，需要的时候调用就好了
    getData() {
      // console.log(this.searchParams)
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 145.1删除分类的函数
    removeCategoryName() {
      // 145.2 把数据置空就好了，v-if就成了false.当数据没有的时候又需要发送请求。从新渲染
      this.searchParams.categoryName = undefined
      // 145.3让参数为空。
      //  145.4设置undefined减少请求数据的条数。
      this.searchParams.categoryId1 = undefined
      this.searchParams.categoryId2 = undefined
      this.searchParams.categoryId3 = undefined
      // 145.3重新发送请求
      this.getData()
      // 145.5地址栏也需要改变，将数据清空。可以借助路由跳转。自己跳转自己
      // this.$router.push({name:'search'})
      // 145.6但是不能删除输入框传进来的params参数
      if (this.$route.params)
        this.$router.push({ name: 'search', params: this.$route.params })
    },
    // 145.8删除关键字的函数
    removeKeywordName() {
      // 145.9给服务器的参数searchParams的keyword置空。
      this.searchParams.keyword = undefined
      // 145.10再次发送请求
      this.getData()
      // 145.11但是hearder组件中的关键字依然没有清除。组件通信。全局事件总线。
      // 145.13通知兄弟组件header清除关键字
      this.$bus.$emit('clearKeyword')
      // 145.15将url中params数据删除。进行路由的跳转
      if (this.$route.query)
        this.$router.push({ name: 'search', query: this.$route.query })
    },
    // 146.4自定义事件的触发
    trademarkInfo(trademark) {
      // console.log(trademark)
      // 整理品牌传过来的参数。id和名称
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      console.log(`${trademark.tmId}:${trademark.tmName}`)
      // 146.5再次发送请求
      this.getData()
    },
    // 146.7删除品牌信息
    removeTrademarkdName() {
      this.searchParams.trademark = undefined
      this.getData()
    },
    // 147.3手机平台属性的自定义事件的回调函数
    attrInfo(item, itemValue) {
      // console.log(item, itemValue)
      // 147.4处理好数据成字符串放入数组
      let props = `${item.attrId}:${itemValue}:${item.attrName}`
      // 147.5判断是否含有props数据。数组去重.
      if (this.searchParams.props.indexOf(props) === -1)
        this.searchParams.props.push(props)
      this.getData()
    },
    // 147.7删除平台售卖属性
    removeAttrdName(index) {
      this.searchParams.props.splice(index, 1)
      // 再次发送请求
      this.getData()
    },
    // 148.1排序的操作
    changeOrder(flag) {
      // 2flag标记是点击了综合还是价格
      let originOrder = this.searchParams.order
      console.log(originOrder)
      // 3获取最开始状态
      let originFlag = originOrder.split(':')[0]
      let originSort = originOrder.split(':')[1]
      // 4准备一个新的ordr属性值
      let newOrder = ''
      // 判断点击的是综合还是价格
      newOrder =
        flag === originFlag
          ? `${originFlag}:${originSort === 'asc' ? 'desc' : 'asc'}`
          : `${flag}:${'desc'}`
      // 148.5将新的值赋给searchParams
      this.searchParams.order = newOrder
      this.getData()
    },
     //149.9自定义事件的回调函数---获取当前第几页
    getPageNo(pageNo) {
      //整理带给服务器参数
      this.searchParams.pageNo = pageNo;
      //再次发请求
      this.getData();
    },
  },
  // 144解决search只能发送一次请求的问题。利用watch监视
  watch: {
    // 监听属性.路由的信息是否发生变化。不需要加this
    $route() {
      // console.log(newValue,oldValue)
      // console.log(this.searchParams)
      // 144.1再次发送请求之前仍然需要整理带给服务器的参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // console.log(this.searchParams)
      this.getData()
      // 144.2让参数为空
      this.searchParams.categoryId1 = undefined
      this.searchParams.categoryId2 = undefined
      this.searchParams.categoryId3 = undefined
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          position: relative;
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          padding-right: 20px;

          i {
            position: absolute;
            right: 0;
            top: -5px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
            &:hover {
              color: #f31212;
            }
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #4cffdb;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #41fecf;

                strong {
                  font-weight: 700;
                  em {
                    font-size: 14px;
                  }
                  i {
                    margin-left: 5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

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
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #fb6b64;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #55dff8;
                    background-color: #52f9ff;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .active {
        background: skyblue;
      }
    }
  }
}
</style>
