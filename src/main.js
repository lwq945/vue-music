import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import 'babel-polyfill'

import 'common/stylus/index.styl'
import 'swiper/dist/css/swiper.css'

fastclick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  loading: require('common/image/album.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
