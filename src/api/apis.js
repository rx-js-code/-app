import axios from "axios"; //引入axios

export const IP = "http://192.168.1.7:5000"


axios.defaults.baseURL = IP;//设置服务器地址


//获取商品数据
export const API_APP_GOODS_LIST = () => {
  return axios.get("/goods/goods_list")
}
//获取商家
export const API_APP_GOODS_SELLER = () => {
  return axios.get("/shop/seller")
}
//评论
export const API_APP_GOODS_RATINGS = () => {
  return axios.get("/shop/ratings")
}

