<template>
  <div style="height:100%">
    <van-loading type="spinner" color="#1989fa" size="50px" v-show="!fal" />
    <div class="merchant" v-show="fal">
      <div id="merchant_box">
        <div>
          <div class="merchant_box1">
            <div class="merchant_box1_header">
              <div class="left">
                <p>{{goodsMsg.name}}</p>
                <p>
                  <van-rate v-model="value" readonly size="14px" />
                  ({{goodsMsg.score}}) 月售{{goodsMsg.sellCount}}单
                </p>
              </div>
              <div class="right">
                <p>
                  <van-icon name="like" size="40" color="red" />
                </p>
                <p>已收藏</p>
              </div>
            </div>
            <div class="merchant_box1_foot">
              <div>
                起送价
                <br />
                <span>20</span>元
              </div>
              <div>
                商家配送
                <br />
                <span>4</span>元
              </div>
              <div>
                平均配送时间
                <br />
                <span>39</span>分钟
              </div>
            </div>
          </div>
          <div class="merchant_box2">
            <h2>公告与活动</h2>
            <p>{{goodsMsg.bulletin}}</p>
            <p v-for="item in goodsMsg.supports" :key="item">
              <img src="../../assets/imgs/decrease_1@2x.png" alt />
              {{item}}
            </p>
          </div>
          <div class="merchant_box3">
            <div>商家实景</div>
            <div v-for="item in goodsMsg.pics" :key="item">
              <img :src="(item.replace('http://127.0.0.1:5000','http://192.168.1.7:5000'))" alt />
            </div>
          </div>
          <div class="merchant_box4">
            <div>商家信息</div>
            <p>该商家支持开发票，请在下单时填写好发票抬头</p>
            <p>品类：其他菜系、包子粥店</p>
            <p>地址：天府新谷1号楼</p>
            <p>营业时间：{{goodsMsg.date}}</p>
            <!-- 占位 -->
            <p></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_APP_GOODS_SELLER } from "@/api/apis";

import BScroll from "better-scroll";
export default {
  data() {
    return {
      value: 4,
      goodsMsg: [],
      fal: false
    };
  },

  created() {
    API_APP_GOODS_SELLER().then(res => {
      this.goodsMsg = res.data.data;
      this.goodsMsg.date = this.goodsMsg.date.map(o => this.time(o)).join("-");
      this.fal = true;
      console.log(this.goodsMsg);
    });
  },
  methods: {
    //转换时间
    time(date) {
      // let Year = this.time_num(new Date(date).getFullYear());
      // let Month = this.time_num(new Date(date).getMonth() + 1);
      // let Date1 = this.time_num(new Date(date).getDate());
      let Hours = this.time_num(new Date(date).getHours());
      let Minutes = this.time_num(new Date(date).getMinutes());
      let Seconds = this.time_num(new Date(date).getSeconds());
      return (
        // Year +
        // "-" +
        // Month +
        // "-" +
        // Date1 +
        // " " +
        Hours + ":" + Minutes + ":" + Seconds
      );
    },
    //补零
    time_num(num) {
      return num < 10 ? "0" + num : num;
    }
  },
  mounted() {
    new BScroll("#merchant_box");
  }
};
</script>

<style lang="scss" scoped>
.van-loading {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.merchant {
  display: flex;
  height: 100%;
  flex-flow: column;
  > div {
    overflow: auto;
    .merchant_box1 {
      height: 180px;
      background: #fff;
      .merchant_box1_header {
        height: 40px;
        border-bottom: 1px solid #ccc;
        margin-top: 1px;
        display: flex;
        padding: 30px 14px;
        margin: 0 16px;
        justify-content: space-between;
        align-items: center;
        .left {
          p {
            &:nth-child(1) {
              font-size: 22px;
            }
            &:nth-child(2) {
              margin-top: 10px;
            }
          }
        }
        .right {
          font-size: 16px;
        }
      }
      .merchant_box1_foot {
        display: flex;
        text-align: center;
        font-size: 16px;
        margin-top: 10px;
        div {
          width: 100%;
          &:nth-child(2) {
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
          }
        }
        span {
          font-size: 30px;
        }
      }
    }
    .merchant_box2 {
      background: #fff;
      margin-top: 30px;
      h2 {
        font-size: 20px;
        padding: 30px 30px 10px 30px;
      }
      p {
        border-bottom: 1px solid #ccc;
        margin: 0 30px 20px 30px;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        &:nth-child(2) {
          word-break: break-all;
          margin: 0 30px 20px 30px;
          color: red;
          line-height: 16px;
        }
        img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
      }
    }
    .merchant_box3 {
      background: #fff;
      margin-top: 30px;
      div {
        font-size: 22px;
        padding: 30px 0 0 30px;
        img {
          width: 100px;
          height: 100px;
          margin-right: 10px;
        }
        &:nth-child(2) {
          padding-top: 10px;
          padding-bottom: 20px;
        }
      }
    }
    .merchant_box4 {
      background: #fff;
      margin-top: 30px;
      div {
        font-size: 22px;
        padding: 30px 0 0 30px;
      }
      p {
        border-bottom: 1px solid #ccc;
        margin: 0 30px 20px 30px;
        padding-bottom: 20px;
        &:nth-child(2) {
          padding-top: 20px;
        }
        &:nth-child(5) {
          margin-bottom: 50px;
          border: 0;
        }
      }
    }
  }
}
</style>