<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container w">
      <div class="title clearfix">
        <h3 class="fl">{{ list.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <!-- 140鼠标经过事件添加和移出类名 -->
            <li :class="{ active: currentIndex === index }"
              v-for="(item, index) in list.navList"
              :key="index"
              @mouseenter="checkoutIndex(index)"
              @mouseleave="leaveIndex()"
            >
              <a data-toggle="tab">{{ item.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(item, index) in list.keywords" :key="index">
                  {{ item }}
                </li>
              </ul>
              <img :src="list.imgUrl" />
            </div>
            <div class="floorBanner">
              <!-- 135.10轮播图 -->
              <div class="swiper-container" ref="floor1Swiper">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="item in list.carouselList"
                    :key="item.id"
                  >
                    <img :src="item.imgUrl" />
                  </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>

                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="list.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 135.9引入轮播图
import Swiper from 'swiper'
// 140.1引入节流
import throttle from 'lodash/throttle'
export default {
  name: 'Floor',
  // 135.8传入的数据通过props来接收
  props: ['list'],
  data() {
    return { currentIndex: -1 }
  },
  // 135.11这里的数据是从home父级传过来的,已经实现了组件间的通信.
  // 135.12并且没有在该组建内部发送数据请求,数据在home组件挂载完毕后就发,所以不存在异步操作.
  mounted() {
    let mySwiper = new Swiper(this.$refs.floor1Swiper, {
      loop: true, //无限循环
      autoplay: true, //自动轮播
      pagination: {
        el: '.swiper-pagination',
        clickable: true, //可点击小按钮
      },
      navigation: {
        //左右切换
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  },
  // 140.2利用节流来解决移入过快的问题
  methods: {
    checkoutIndex: throttle(function (index) {
      this.currentIndex = index
    }, 32),
    // 140.3鼠标离开
    leaveIndex(){
      this.currentIndex=-1
    }
  },
}
</script>

<style lang="less" scoped>
.floor {
  margin-top: 15px;

  .py-container {
    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;
              cursor: pointer;
              &::after {
                content: '|';
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: '';
                }
              }
            }

            &.active {
              a {
                color: #48eaf5;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #46f8de;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 360px;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>
