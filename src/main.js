import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUi from 'element-ui'
import  'element-ui/lib/theme-chalk/index.css'  //Element UI样式
import VueAwesomeSwiper from 'vue-awesome-swiper' 
import 'swiper/css/swiper.css'
Vue.prototype.$bus = new Vue()
Vue.use(elementUi)  //使用element-ui组件
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)  //使用swiper组件
Vue.config.productionTip = false  

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
