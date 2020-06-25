import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '../pages/index/Goods.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Goods',
    component: Goods
  },

  {
    path: '/review',
    name: 'Review',

    component: () => import('../pages/index/Review.vue')
  },
  {
    path: '/merchant',
    name: 'Merchant',

    component: () => import('../pages/index/Merchant.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
