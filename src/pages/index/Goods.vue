<template>
  <div style="height: 100%;">
    <div class="goods" v-show="img_show">
      <div id="goods_left">
        <div>
          <van-sidebar v-model="activeKey">
            <van-sidebar-item
              @click="clickLeftTitle(i)"
              v-for="(item,i) in goodsList"
              :key="item.id"
              :title="item.name"
            />
          </van-sidebar>
        </div>
      </div>
      <div id="goods_right">
        <div style="goods_right">
          <div class="goods_right_title" v-for="(v,i) in goodsList" :key="v.id" :id="i">
            <p>{{v.name}}</p>
            <van-card
              class="goods_list"
              v-for="(k,i) in v.foods"
              :key="i"
              :num="k.num"
              :price="k.price"
              :desc="k.goodsDesc"
              :title="k.name"
              :thumb="(k.imgUrl.replace('http://127.0.0.1:5000',IP))"
              :origin-price="(k.price*1.5).toFixed(0)"
            >
              <template #footer>
                <van-button v-show="k.num>0" @click="goodsnum(-1,k.id)" size="mini">-</van-button>
                <van-button @click="goodsnum(1,k.id)" size="mini">+</van-button>
              </template>
            </van-card>
          </div>
        </div>
      </div>
    </div>
    <div>
      <img src="../../assets/imgs/1_02.gif" alt style="width:100%;height:100% " v-show="!img_show" />
    </div>
  </div>
</template>
<script>
import { API_APP_GOODS_LIST, IP } from "@/api/apis.js";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      IP,
      img_show: false,
      activeKey: 0,
      // data: [{ foods: [], name: "" }],
      foods: {}
    };
  },
  created() {
    setTimeout(() => {
      this.img_show = true;
      API_APP_GOODS_LIST().then(res => {
        let arr = res.data.goodsList;
        //添加字段
        for (let v of arr) {
          for (let val of v.foods) {
            val.num = 0;
          }
        }
        //初始化
        this.$store.commit("goodsList", arr);
      });
    }, 2000);
  },
  mounted() {
    const BScroll_left = new BScroll(document.getElementById("goods_left"), {
      click: true
    });
    this.BScroll_right = new BScroll(document.getElementById("goods_right"), {
      probeType: 3
    });
    this.BScroll_right.on("scroll", obj => {
      let _y = Math.abs(obj.y); //绝对值
      for (let obj of this.getHeightArr) {
        if (_y >= obj.min && _y < obj.max) {
          this.activeKey = obj.index;
          break;
        }
      }
    });
    console.log(BScroll_left);
  },
  methods: {
    // 点击左侧标题事件
    clickLeftTitle(index) {
      this.activeKey = index;
      //点击左侧某个选项卡，跳转到右侧对应div
      this.BScroll_right.scrollToElement(document.getElementById(index), 600);
    },
    //点击加减
    goodsnum(val, id) {
      this.$store.commit("changeGoodsList", { val, id });
    }
  },
  computed: {
    goodsList() {
      return this.$store.state.goodsList;
    },
    getHeightArr() {
      let heightarr = [];
      let totalHeight = 0;
      //获取所有div高度
      for (let i = 0; i < this.goodsList.length; i++) {
        let divHeight = document.getElementById(i).offsetHeight; //当前div高度
        heightarr.push({
          index: i,
          max: totalHeight + divHeight,
          min: totalHeight
        });
        totalHeight += divHeight;
      }
      return heightarr;
    }
  }
};
</script>


<style lang="scss" >
.goods {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 0 50px 0;
  box-sizing: border-box;

  .goods_left {
    width: 100px;
    height: 100%;
    overflow: auto;
  }
  #goods_right {
    overflow: auto;
    flex: 1;
    height: 100%;
    .goods_right {
      overflow: auto;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .goods_right_title {
      width: 100%;
      .van-card__price {
        color: red;
        font-weight: 700;
      }
    }
    .goods_list {
      width: 100%;
    }
  }
}
</style>