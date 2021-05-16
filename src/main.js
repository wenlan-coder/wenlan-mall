import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUi from 'element-ui'
import  'element-ui/lib/theme-chalk/index.css'  //Element UI样式
import VueAwesomeSwiper from 'vue-awesome-swiper' 
import 'swiper/css/swiper.css'
Vue.prototype.$bus = new Vue()  //事件总线bus，进行简单同组件传值
Vue.use(elementUi)  //使用element-ui组件
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)  //使用swiper组件
Vue.config.productionTip = false  
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  //时间格式年月日、时分秒
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
