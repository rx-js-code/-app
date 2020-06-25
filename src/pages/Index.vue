<template>
  <div class="index">
    <div class="header">
      <div>
        <div v-show="img_show">
          <img src="../assets/imgs/1_01.gif" alt style="width:100%;height:200px" />
        </div>
        <div v-show="!img_show">
          <div class="img">
            <div class="bgcolor" :style="`background-image:url(${data.avatar})`"></div>
            <van-row class="title">
              <van-col span="4">
                <van-image
                  class="imgs"
                  width="100px"
                  height="100px"
                  fit="contain"
                  :src="data.avatar"
                />
              </van-col>
              <van-col span="16" offset="4">
                <div class="title_right">
                  <p @click="showPopup" class="name">
                    <img src="../assets/imgs/brand@2x.png" alt />
                    {{data.name}}
                  </p>
                  <p class="time">{{data.description}}/{{data.deliveryTime}}分钟送达</p>
                  <div class="supports">
                    <img class="img_supports" src="../assets/imgs/decrease_1@2x.png" alt />
                    <span v-for="v in data.supports" :key="v.id">{{v}},</span>
                  </div>
                </div>
              </van-col>
            </van-row>
          </div>
          <div class="notice">
            <van-notice-bar
              scrollable
              color="#fff"
              background="rgba(255,0,0,0.5)"
              :text="data.bulletin+'致力于为消费者提供时尚、美味、健康的精品牛排，让您体验不一样的异域风情，热情周到的服务，为顾客提供了一个享受轻松、快乐、惬意的生活空间，吸引了众多热爱西餐一族，成为亲朋、恋人、同事、挚友及单身贵族时常驻足的地方。'"
            />
          </div>
          <div class="router_box">
            <router-link to="/" :class="{activate:$route.path=='/'}">商品</router-link>
            <router-link to="/review" :class="{activate:$route.path=='/review'}">评论</router-link>
            <router-link to="/merchant" :class="{activate:$route.path=='/merchant'}">商家</router-link>
          </div>
          <!-- 模态框 -->
          <van-popup class="model" v-model="show">
            <!-- <van-popup v-model="show" closeable close-icon-position="top-left" /> -->
            <div class="model_box">
              <h1>{{data.name}}</h1>
              <p>
                <van-rate v-model="value" />
              </p>
              <p>
                <van-divider :style="{ color: '#FFF', borderColor: '#fff', padding: '0 20px' }">优惠信息</van-divider>
              </p>
              <P v-for="(k,i) in data.supports" :key="i">
                <img src="../assets/imgs/special_1@2x.png" alt />
                {{k}}
              </P>
              <p>
                <van-divider :style="{ color: '#FFF', borderColor: '#fff', padding: '0 20px' }">商家公告</van-divider>
              </p>
              <p>{{data.bulletin}}致力于为消费者提供时尚、美味、健康的精品牛排，让您体验不一样的异域风情，热情周到的服务，为顾客提供了一个享受轻松、快乐、惬意的生活空间，吸引了众多热爱西餐一族，成为亲朋、恋人、同事、挚友及单身贵族时常驻足的地方。</p>
            </div>
          </van-popup>
        </div>
      </div>
    </div>

    <div class="main">
      <router-view></router-view>
    </div>
    <div class="foo">
      <div class="mun">
        <goodscar id="goodscar" v-show="goodscar_flag"></goodscar>
        <!-- 购物车图标 -->
        <div class="goodscar_icon">
          <van-icon
            class="goodscar_icon_0"
            v-show="this.$store.getters.shopcarlist.length ==0"
            size="40"
            :badge="amount"
            name="shopping-cart-o"
            color="#808589"
            @click="goodscar_switch()"
          />
          <van-icon
            class="goodscar_icon_1"
            v-show="this.$store.getters.shopcarlist.length >0"
            size="40"
            :badge="amount"
            name="shopping-cart-o"
            color="#333333"
            @click="goodscar_switch()"
          />
          <span v-show="totalPrices.toFixed(2)>0">￥{{totalPrices.toFixed(2)}}</span>
        </div>
        <p class="deliveryPrice">另需配送费￥{{data.deliveryPrice}}元</p>
      </div>
      <button class="btn_accounts_no" v-show="totalPrices.toFixed(2)<20">￥20起送</button>
      <button class="btn_accounts_yes" v-show="totalPrices.toFixed(2)>=20">去结算</button>
    </div>
  </div>
</template>
<script>
import { API_APP_GOODS_SELLER, IP } from "@/api/apis.js";
import goodscar from "./Goodscar";
export default {
  components: {
    goodscar
  },
  data() {
    return {
      goodscar_flag: false,
      img_show: true,
      value: 3,
      show: false,
      data: {}
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    goodscar_switch() {
      this.goodscar_flag = !this.goodscar_flag;
    }
  },
  computed: {
    totalPrices() {
      let total = 0;
      this.$store.getters.shopcarlist.forEach(v => {
        total += v.num * v.price;
      });
      return total;
    },
    amount() {
      let nums = 0;
      this.$store.getters.shopcarlist.forEach(v => {
        nums += v.num;
      });
      return nums;
    }
  },

  created() {
    setTimeout(() => {
      this.img_show = false;
      API_APP_GOODS_SELLER().then(res => {
        res.data.data.avatar = res.data.data.avatar.replace(
          "http://127.0.0.1:5000",
          IP
        );
        this.data = res.data.data;
      });
    }, 2000);
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  width: 100%;

  body {
    height: 100%;
    width: 100%;
    .index {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .header {
        height: 200px;
        display: flex;
        flex-direction: column;
        .model {
          background: none;
          color: #fff;
          width: 100%;
          height: 100%;
          text-align: center;
          .model_box {
            padding: 20% 10%;
            font-size: 12px;
            .van-divider {
              font-size: 20px;
            }
          }
          // h2 {
          //   text-align: center;
          // }
          // .van-overlay {
          //   background: none;
          //   width: 100%;
          //   height: 100%;
          // }
          // .van-popup {
          //   width: 100%;
          //   height: 100%;
          // }
        }
        .img {
          height: 120px;
          flex: 1;
          position: relative;
          .bgcolor {
            height: 120px;
            width: 100%;
            background-size: 100% 100%;
            filter: blur(15px);
          }
          .title {
            position: absolute;
            top: 10px;
            left: 10px;
            .van-col--4 {
              .imgs {
                height: 100%;
                width: 100%;
              }
            }
            .van-col--16 {
              color: #f2f2f2;
              font-size: 14px;
              .title_right {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .name {
                  color: #444444;
                  font-weight: 700;
                  font-size: 16px;

                  margin-top: 3%;
                  img {
                    vertical-align: bottom;
                    height: 13%;
                    width: 13%;
                  }
                }
                .time {
                  margin: 6% 0;
                }
                .supports {
                  font-size: 12px;
                  .img_supports {
                    height: 5%;
                    width: 5%;
                  }
                }
              }
            }
          }
        }
        .router_box {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          a {
            color: #4f5257;
            font-size: 16px;
          }
          .activate {
            color: red;
          }
        }
        .notice {
          height: 30px;
        }
      }
      .main {
        flex: 1;
        box-sizing: border-box;
        overflow: auto;
      }
      .foo {
        height: 50px;
        width: 100%;
        color: #808589;
        background: #141c27;
        position: fixed;
        bottom: 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btn_accounts_no {
          height: 100%;
          width: 20%;
          background: #2b343b;
          border: none;
          outline: none;
          font-size: 16px;
          font-weight: 700;
        }
        .btn_accounts_yes {
          height: 100%;
          width: 20%;
          background: #f3ca3c;
          border: none;
          outline: none;
          font-size: 16px;
          font-weight: 700;
        }
        .mun {
          height: 100%;
          line-height: 100%;
          flex: 1;
          display: flex;
          // justify-content: center;
          align-content: center;
          #goodscar {
            width: 100%;
            position: fixed;
            bottom: 50px;
            background: #fff;
            padding-bottom: 15px;
            max-height: 40%;
            overflow: auto;

            border-top: 1px solid #000;
          }

          .goodscar_icon {
            display: flex;
            .goodscar_icon_0 {
              width: 50px;
              height: 50px;
              background: #333;
              border-radius: 50%;
              position: relative;
              top: -10px;
              margin: 0 10px;
              background-size: contain;
              background-repeat: no-repeat;
              flex-shrink: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .goodscar_icon_1 {
              width: 50px;
              height: 50px;
              background: #f3ca3c;
              border-radius: 50%;
              position: relative;
              top: -10px;
              margin: 0 10px;
              background-size: contain;
              background-repeat: no-repeat;
              flex-shrink: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            span {
              text-align: center;
              line-height: 50px;
            }
          }

          .deliveryPrice {
            line-height: 50px;
            font-size: 14px;
            margin-left: 10%;
          }
        }
      }
    }
  }
}
</style>
