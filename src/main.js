// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import './store/global'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Element)
import cookie from './store/cookie.js'
Vue.prototype.$cookie = cookie
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
if (window['context'] === undefined) {
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
  }
  window['context'] = location.origin + '/V6.0'
}
axios.defaults.baseURL = window.location.origin + '/haimentest/'
Vue.prototype.$baseUrl = window.location.origin + window.location.pathname
axios.interceptors.request.use(function (config) {
  if (cookie.getCookie('token')) {
    config.headers.token = cookie.getCookie('token')
  } else if (config.url.substring(config.url.length - 5, config.url.length) !== 'login') {
    alert('登录过期，请重新登录')
    window.location.hash = '#/'
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})
Vue.prototype.$ajax = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
