<template>
  <div style="height:100%">
    <van-loading type="spinner" color="#1989fa" size="50px" v-show="!fal" />
    <div class="evaluuate" v-show="fal">
      <div class="evaluuate_box1">
        <div class="left">
          <p class="yellow">{{goodsMsg.score}}</p>
          <p>综合评分</p>
          <p class="gray">高于周边商家 69.2%</p>
        </div>
        <div class="right">
          <p v-for="i in arr" :key="i">
            <span class="mark">服务态度</span>
            <van-rate v-model="goodsMsg.score" readonly size />
            <span class="yellow">{{goodsMsg.score}}</span>
          </p>
          <p>
            <span class="mark">送达时间</span>
            &emsp;
            <span class="gray">{{goodsMsg.deliveryTime}}分钟</span>
          </p>
        </div>
      </div>
      <div class="evaluuate_box2" id="Eavluate_msg_box">
        <div>
          <div class="evaluate_classify">
            <van-button type="info">全部 57</van-button>
            <van-button color="#CCECF7">满意 47</van-button>
            <van-button color="#EAEBED">不满意 10</van-button>
          </div>
          <!-- 只看有内容的评价 -->
          <div class="evaluate_content gray">
            <van-icon name="checked" />只看有内容的评价
          </div>
          <!-- 评价的内容 -->
          <div class="evaluate_content_msg">
            <div class="evaluate_list" v-for="(item,i) in ratings" :key="i">
              <img :src="item.avatar" />
              <div class="evaluate_list_msg">
                <p>
                  <span>{{item.username}}</span>
                  <span>{{time(item.rateTime)}}</span>
                </p>
                <p>
                  <van-rate v-model="item.score" readonly size="12px" />
                  <span class="gray" style="margin-left:10px">{{item.deliveryTime}}分钟送达</span>
                </p>
                <p>{{item.text}}</p>
                <p>
                  <i v-if="item.rateType==1">👎</i>
                  <van-icon name="good-job-o" v-else />
                  <span class="text" v-for="o in item.recommend" :key="o">{{o}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_APP_GOODS_RATINGS, API_APP_GOODS_SELLER } from "@/api/apis";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      ratings: [],
      value: 4,
      goodsMsg: [],
      arr: [1, 2],
      fal: false
    };
  },
  created() {
    API_APP_GOODS_RATINGS().then(res => {
      this.ratings = res.data.data;
      this.fal = true;
    });
    API_APP_GOODS_SELLER().then(res => {
      console.log(res.data);
      this.goodsMsg = res.data.data;
    });
  },
  methods: {
    //转换时间
    time(date) {
      let Year = this.time_num(new Date(date).getFullYear());
      let Month = this.time_num(new Date(date).getMonth() + 1);
      let Date1 = this.time_num(new Date(date).getDate());
      let Hours = this.time_num(new Date(date).getHours());
      let Minutes = this.time_num(new Date(date).getMinutes());
      let Seconds = this.time_num(new Date(date).getSeconds());
      return (
        Year +
        "-" +
        Month +
        "-" +
        Date1 +
        " " +
        Hours +
        ":" +
        Minutes +
        ":" +
        Seconds
      );
    },
    //补零
    time_num(num) {
      return num < 10 ? "0" + num : num;
    }
  },
  mounted() {
    new BScroll("#Eavluate_msg_box");
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
.evaluuate {
  display: flex;
  height: 100%;
  flex-flow: column;
  .gray {
    color: #ccc;
  }
  .evaluuate_box1 {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    background: #fff;

    margin-top: 1px;
    padding: 16px 0 0px 16px;
    .yellow {
      color: rgb(225, 170, 21);
    }

    .left {
      border-right: 1px solid #ccc;

      p {
        margin-right: 20px;
        text-align: center;

        &:nth-child(1) {
          font-size: 30px;
        }
        &:nth-child(2) {
          font-size: 16px;
          margin-top: 6px;
          margin-bottom: 6px;
        }
      }
    }
    .right {
      flex: 2;
      box-sizing: border-box;
      .mark {
        text-align: center;
        font-size: 12px;
      }
      // margin-left: 20px;
      p {
        margin-top: 10px;
        display: flex;
        align-items: center;
        &:nth-child(1) {
          margin: 0;
        }
      }
    }
  }
  .evaluuate_box2 {
    margin-top: 30px;
    background: #fff;
    flex: 1;
    display: flex;
    flex-flow: column;
    overflow: auto;
    .evaluate_classify {
      padding: 0px 0 10px 30px;
      .van-button {
        margin-right: 10px;
        &:nth-child(2) {
          color: #000 !important;
        }
        &:nth-child(3) {
          color: #000 !important;
        }
      }
    }
    .evaluate_content {
      margin: 0 30px 10px 30px;
      border-top: 1px solid #ccc;
      font-size: 14px;
      padding-top: 10px;
    }
    .evaluate_content_msg {
      border-top: 1px solid #ccc;
      flex: 1;
      // overflow: auto;
      .evaluate_list {
        margin: 10px 30px;
        display: flex;
        border-bottom: 1px solid #ccc;
        padding: 10px;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .evaluate_list_msg {
          flex: 1;
          p {
            margin-top: 6px;
            &:nth-child(1) {
              margin: 0;
              display: flex;
              justify-content: space-between;
            }
            &:nth-child(3) {
              width: 200px;
              white-space: wrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            &:nth-child(4) {
              display: flex;
              align-items: center;
              font-size: 14px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 260px;
              .text {
                display: inline-block;
                width: 50px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                border: 1px solid #ccc;
                border-radius: 4px;
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>