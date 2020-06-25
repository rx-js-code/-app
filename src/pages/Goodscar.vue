<template>
  <div class="Goodscar">
    <van-empty
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="购物车内暂时没有商品"
      v-show="shopcarlist.length==0"
    />
    <van-card
      v-for="item in shopcarlist"
      :key="item.id"
      :num="item.num"
      :price="(item.num*item.price).toFixed(2)"
      :title="item.name"
      :thumb="(item.imgUrl.replace('http://127.0.0.1:5000',IP))"
    >
      <template #footer>
        <van-button v-show="item.num>0" @click="goodsnum(-1,item.id)" size="mini">-</van-button>
        <van-button @click="goodsnum(1,item.id)" size="mini">+</van-button>
      </template>
    </van-card>
  </div>
</template>

<script>
import { IP } from "@/api/apis.js";
export default {
  data() {
    return {
      IP
      // goodsnum_flag: false
    };
  },
  methods: {
    //点击加减
    goodsnum(val, id) {
      this.$store.commit("changeGoodsList", { val, id });
    }
  },

  computed: {
    shopcarlist() {
      return this.$store.getters.shopcarlist;
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-image {
  .van-empty__image {
    width: 90px;
    height: 90px;
  }
}
</style>