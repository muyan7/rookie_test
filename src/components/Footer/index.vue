<template>
  <!-- 底部 -->
  <footer>
    <div class="footer-top w">
      <div class="footerguild">
        <h4>购物指南</h4>
        <ul class="footerguildCon">
          <li>购物流程</li>
          <li>会员介绍</li>
          <li>生活旅行/团购</li>
          <li>常见问题</li>
          <li>购物指南</li>
        </ul>
      </div>
      <div class="footerguild">
        <h4>配送方式</h4>
        <ul class="footerguildCon">
          <li>上门自提</li>
          <li>211限时达</li>
          <li>配送服务查询</li>
          <li>配送费收取标准</li>
          <li>海外配送</li>
        </ul>
      </div>
      <div class="footerguild">
        <h4>支付方式</h4>
        <ul class="footerguildCon">
          <li>货到付款</li>
          <li>在线支付</li>
          <li>分期付款</li>
          <li>邮局汇款</li>
          <li>公司转账</li>
        </ul>
      </div>
      <div class="footerguild">
        <h4>售后服务</h4>
        <ul class="footerguildCon">
          <li>售后政策</li>
          <li>价格保护</li>
          <li>退款说明</li>
          <li>返修/退换货</li>
          <li>取消订单</li>
        </ul>
      </div>
      <div class="footerguild">
        <h4>特色服务</h4>
        <ul class="footerguildCon">
          <li>夺宝岛</li>
          <li>DIY装机</li>
          <li>延保服务</li>
          <li>尚品汇E卡</li>
          <li>尚品汇通信</li>
        </ul>
      </div>
      <div class="footerguild">
        <h4>帮助中心</h4>
        <img src="./images/QR.png" />
      </div>
    </div>
    <div class="footer-bottom w">
      <ul class="friend-link">
        <li><a href="#" class="about">关于我们</a></li>
        |
        <li><a href="#" class="about">联系我们</a></li>
        |
        <li><a href="#" class="about">关于我们</a></li>
        |
        <li><a href="#" class="about">商家入驻</a></li>
        |
        <li><a href="#" class="about">营销中心</a></li>
        |
        <li><a href="#" class="about">友情链接</a></li>
        |
        <li><a href="#" class="about">关于我们</a></li>
        |
        <li><a href="#" class="about">营销中心</a></li>
        |
        <li><a href="#" class="about">友情链接</a></li>
        |
        <li><a href="#" class="about">关于我们</a></li>
      </ul>
      <p class="address">地址：北京市昌平区宏福科技园综合楼6层</p>
      <p>京ICP备19006430号</p>
    </div>
  </footer>
  
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="less" scoped>
//底部
footer {
  background-color: #eaeaea;
  width: 100%;
  height: 322px;
  .footer-top {
    display: flex;
    justify-content: space-evenly;
    height: 205px;
    padding: 20px 20px 20px 40px;
    border-bottom: 1px solid #999;
    .footerguild {
      h4 {
        margin-bottom: 3px;
      }
      img {
        width: 120px;
        height: 120px;
      }
      .footerguildCon {
        li {
          height: 18px;
        }
      }
    }
  }
  .footer-bottom {
    text-align: center;
    padding: 20px;
    .friend-link {
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;
      li {
        margin: 0 10px;
      }
    }
    .address {
      margin: 10px;
    }
  }
}
</style>
