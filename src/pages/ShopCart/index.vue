<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in shopCartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <!-- 159.2改变选中状态 -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked == 1"
              @change="updateChecked(item, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <!-- 157修改产品个数，并传入后台 -->
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('dec', -1, item)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="item.skuNum"
              @change="handler('change', $event.target.value * 1, item)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, item)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}.00</span>
          </li>
          <li class="cart-list-con7">
            <!-- 158.2点击事件 -->
            <a class="sindelet" @click="deleteCartById(item)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 161.全选按钮控制每一个小的选择 -->
        <input class="chooseAll" type="checkbox" :checked="isChecked&&shopCartInfoList.length!==0" @change="updateAllCartChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <!-- 160删除选中的商品 -->
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 158.4节流
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  methods: {
    // 155.3获取个人购物车数据
    getData() {
      this.$store.dispatch('getShopcartList')
      // console.log(this.shopCartList.cartInfolist);
    },
    // 157修改某一个产品的个数
    handler: throttle(async function (type, disNum, item) {
      // type是区分点击的哪一个
      //disNum变化量的形参，+变化量1，-变化量-1，注意input最终个数传入的是当前的输入值（不是变化量）。
      // item，点击的那一个的参数。带id
      // console.log(type, disNum, item)
      // 向服务器发送请求，修改数据
      switch (type) {
        // 加号
        case 'add':
          //带给服务器变化的信息
          disNum = 1
          break
        case 'dec':
          disNum = item.skuNum > 1 ? -1 : 0
          break
        case 'change':
          // 非法数据（带有汉字|出现负数，）正常情况（小数，取整）
          disNum =
            isNaN(disNum) || disNum < 1 ? 0 : parseInt(disNum) - item.skuNum
          break
      }
      // console.log(disNum)
      try {
        // 派发action
        // 修改成功
        await this.$store.dispatch('shopcarList', {
          skuId: item.skuId,
          skuNum: disNum,
        })
        // 再次获取最新数据
        this.getData()
      } catch (error) {
        // 修改失败
        alert(error.message)
      }
    }, 500),
    // 158.3处理函数 deleteCartListBySkuId
    async deleteCartById(item) {
      try {
        await this.$store.dispatch('deleteCartListBySkuId', item.skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 159.3修改摸一个产品的选中状态
    async updateChecked(item, event) {
      try {
        let checked = event.target.checked ? '1' : '0'
        this.$store.dispatch('updateCheckedByid', {
          skuId: item.skuId,
          isChecked: checked,
        })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 160.1删除选中的产品
   async deleteAllCheckedCart(){
    try {
       await  this.$store.dispatch('deleteAllCheckedCart')
      this.getData()
    } catch (error) {
      alert (error.message)
    }
    },
    // 161.1修改全选按钮
   async updateAllCartChecked(event){
     try {
       let isChecked=event.target.checked? '1':'0'
    // 派发请求
   await this.$store.dispatch('updateAllCartChecked',isChecked)
   this.getData()
     } catch (error) {
       alert (error.message)
     }
    }
  },
  computed: {
    ...mapGetters(['shopCartList']),
    // 捞取数据
    shopCartInfoList() {
      // console.log(this.shopCartList.cartInfoList)
      return this.shopCartList.cartInfoList || []
    },
    // 计算总价
    totalPrice() {
      let sum = 0
      this.shopCartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice
      })
      return sum
    },
    // 全选
    isChecked() {
      return this.shopCartInfoList.every((item) => item.isChecked === 1)
    },
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
