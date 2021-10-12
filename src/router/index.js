import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'first-demo',
    component: () => import('../views/First-demo.vue')
  },
  {
    path: '/second',
    name: 'second-demo',
    component: () => import('../views/Second-demo.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
