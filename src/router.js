import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreateAnOrder from './views/Sales_promotion/CreateAnOrder.vue'
import Activity_list from './views/Sales_promotion/activity_Management/activity_list.vue'
import Official_Activity_list from './views/Sales_promotion/activity_Management/official_activity_list.vue'

Vue.use(Router)



export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
			children: [  //这里就是二级路由的配置
        {
          path: '/CreateAnOrder',
          name: 'CreateAnOrder',
          component: CreateAnOrder
        },{
          path: '/Activity_list',
          name: 'Activity_list',
          component: Activity_list
        },{
          path: '/official_activity_list',
          name: 'Official_Activity',
          component: Official_Activity_list
        }
        
      ]
    },
    {
      path: '/',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
