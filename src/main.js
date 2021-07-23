import Vue from 'vue'
import App from './App.vue'
import axios from './http'
import CONFIG from './config'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import './icons' // icon

Vue.config.productionTip = false
Vue.use(ElementUI)

//註冊全域
Vue.prototype.$axios = axios
Vue.prototype.$API_URL = CONFIG.API_URL

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
