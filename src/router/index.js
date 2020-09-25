import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/pages/index')
    },
    {
      path: '/location/:id',
      name: 'location',
      component: () => import('@/pages/location/location')
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: () => import('@/pages/merchant/merchant')
    }
  ]
})
