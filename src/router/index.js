import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue';
import Game from '../views/Game.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/game/:name&:surname&:size',
    name: 'game',
    component: Game,
    meta: { reuse: false },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
