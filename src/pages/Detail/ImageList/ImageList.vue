<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item, index) in skuImageList"
        :key="item.id"
      >
        <img
          :src="item.imgUrl"
          :class="{ active: currentIndex === index }"
          @click="changeActive(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'ImageList',
  data() {
    // 151.2默认样式给第一个元素
    return {
      currentIndex: 0,
    }
  },
  props: ['skuImageList'],
  // 151.3点击事件谁点击就将类名改为当前currentIndex

  methods: {
    changeActive(index) {
      // 修改响应式数据
      this.currentIndex = index
      // 151.4通知兄弟组件当前的索引值，让其修改图片
      this.$bus.$emit('getIndex',this.currentIndex)
    },
  },
  watch: {
    //151.1skuImageList 数据的变化.空数组到含有多个元素
    skuImageList: {
      // 执行hander,说明组件实例身上的四个对象数据以及加载完毕了.
      // 只能保证数据有,但是v-for渲染完结构式不得而知的.
      // nextTick在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.mySwiper, {
            // loop: true,
            navigation: {
              //左右切换
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            slidesPerView: 3, //显示几张图片
            slidesPerGroup: 1, //每次点击轮播图片的数量
          })
        })
      },
    },
  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
