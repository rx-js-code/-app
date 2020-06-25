import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)


var store = new Vuex.Store({
  state: {
    goodsList: []
  },
  mutations: {
    //初始化商品列表
    goodsList(state, arr) {
      state.goodsList = arr


    },
    changeGoodsList(state, params) {
      for (let obj of state.goodsList) {
        for (let v of obj.foods) {
          if (v.id == params.id) {
            v.num += params.val
            return
          }
        }
      }
    }
  },
  getters: {

    shopcarlist(state) {
      let arr = []
      for (let obj of state.goodsList) {
        for (let v of obj.foods) {
          if (v.num > 0) {
            arr.push(v)
          }
        }
      }
      return arr
    },

  }
})



export default store
