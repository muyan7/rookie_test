<template>
  <!-- 头部 -->
  <header>
    <div class="topStyle">
      <div class="top w">
        <div class="leftWelcome">
          <p>商品会欢迎您!</p>
          <p>
            <span>请</span>
            <a calss="login" href="#">登录</a>|
            <a calss="login" href="#">免费注册</a>
          </p>
        </div>
        <div class="rightOrder">
          <a class="myorder" href="#">我的订单</a>|
          <a class="myorder" href="#">我的购物车</a>|
          <a class="myorder" href="#">我的尚品汇</a>|
          <a class="myorder" href="#">尚品汇会员</a>|
          <a class="myorder" href="#">企业采购</a>|
          <a class="myorder" href="#">关注尚品汇</a>|
          <a class="myorder" href="#">合作招商</a>|
          <a class="myorder" href="#">商家后台</a>
        </div>
      </div>
    </div>
    <div class="bottom w">
      <h1 class="logoArea">
        <a href="#" class="logo" title="尚品居"
          ><img src="./images/logo.png" alt=""
        /></a>
      </h1>
      <div class="searchArea">
        <form action="">
          <input type="text" name="" id="" placeholder="輸入點什麽吧" />
          <button class="searchBtn">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="less" scoped>
// 头部
header {
  .topStyle {
    background-color: #eaeaea;
    width: 100%;
    height: 30px;
    line-height: 30px;
    .top {
      display: flex;
      justify-content: space-between;
      height: 100%;
      .leftWelcome {
        display: flex;
        p {
          margin-right: 20px;
          .login {
            margin-right: 10px;
          }
          :nth-of-type(2) {
            margin-left: 10px;
          }
        }
      }
      .rightOrder {
        .myorder {
          padding: 0 10px;
        }
      }
    }
  }
  .bottom {
    height: 106px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logoArea {
      margin-left: 45px;
      .logo {
        display: inline-block;
        width: 175px;
        height: 56px;
      }
    }
    .searchArea {
      display: flex;
      width: 560px;
      height: 32px;
      flex-wrap: nowrap;
      font-size: 0;
      input {
        height: 100%;
        font-size: 16px;
        outline: none;
        width: 490px;
        border: 2px solid red;
        text-indent: 2em;
      }
      .searchBtn {
        height: 100%;
        width: 65px;
        background-color: red;
        color: rgb(255, 255, 255);
        border: none;
        font-size: 16px;
      }
    }
  }
}
</style>
