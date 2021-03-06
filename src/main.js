import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import api from './config/api.js'
import qs from 'qs'
import NProgress from 'nprogress' 
// import 'nprogress/nprogress.css
import 'nprogress/nprogress.css'


Vue.config.productionTip = false
Vue.prototype.$api=api
Vue.prototype.$qs = qs
Vue.use("ElementUI")


NProgress.configure({     
    easing: 'ease',  // 动画方式    
    speed: 500,  // 递增进度条的速度    
    showSpinner: false, // 是否显示加载ico    
    trickleSpeed: 200, // 自动递增间隔    
    minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, from , next) => {
    // 每次切换页面时，调用进度条
    NProgress.start();
 
    // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
    next();
});

router.afterEach(() => {  
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
