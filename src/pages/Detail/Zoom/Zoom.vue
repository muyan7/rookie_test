<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="getPosition"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  // 151.7可改变的初始值
  data() {
    return {
      currentIndex: 0,
    }
  },
  props: ['skuImageList'],
  // 150.4 空数组的第一项是undefined，所以让图片接受的数组第一项是个空对象，
  computed: {
    imgObj() {
      // 151.6让传过来的值通过data来接收到这里
      return this.skuImageList[this.currentIndex] || {}
    },
  },
  // 151.5接收兄弟组件传过来的自定义索引号
  mounted() {
    this.$bus.$on('getIndex', (index) => {
      this.currentIndex = index
    })
  },
  // 152改变遮罩层的位置
  methods: {
    // mask的位置处理
    getPosition(event) {
      let mask = this.$refs.mask
      let top = event.offsetY - mask.offsetHeight / 2
      let left = event.offsetX - mask.offsetWidth / 2
      // console.log(top,left)
      if (top < 0) top = 0
      if (top >= mask.offsetHeight) top = mask.offsetHeight
      if (left < 0) left = 0
      if (left >= mask.offsetWidth) left = mask.offsetWidth
      mask.style.top = top + 'px'
      mask.style.left = left + 'px'
      // 大盒子的处理
      let big = this.$refs.big
      big.style.top = -2 * top + 'px'
      big.style.left = -2 * left + 'px'
    },
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;
  cursor: move;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;
    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
