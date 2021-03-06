// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import '../theme/index.css'
import Element from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
Vue.use(Element)
import cookie from './store/cookie.js'
Vue.prototype.$cookie = cookie
import axios from 'axios'
import Qs from 'qs'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
if (window['context'] === undefined) {
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
  }
  window['context'] = location.origin + '/V6.0'
}
axios.defaults.baseURL = window.location.origin + '/haimen/'
Vue.prototype.$baseUrl = window.location.origin + window.location.pathname
window.setInterval(function () {
  if (window.sessionStorage.getItem('userInfo1') == null) {
  } else {
    const mParams = {
      creditno: JSON.parse(window.sessionStorage.getItem('userInfo1')).creditno,
      telphone: JSON.parse(window.sessionStorage.getItem('userInfo1')).telphone,
      studyLength: 5
    }
    axios.post('exam/insertStudyLengthByCredit', Qs.stringify(mParams)).then(function (resp) {
      if (resp.data.respCode === '1000000') {
      } else {
        alert(resp.data.respMsg)
      }
    }).then(function (resp) {
    })
  }
}, 300000)
axios.interceptors.request.use(function (config) {
  if (cookie.getCookie('token')) {
    config.headers.token = cookie.getCookie('token')
  } else if (config.url.substring(config.url.length - 5, config.url.length) !== 'login') {
    // alert('登录过期，请重新登录')
    // window.location.hash = '#/'
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
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('admin') > 0) {
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    if (userInfo.deptLevel === '1') {
      next()
    } else {
      alert('你无权访问该页面')
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
