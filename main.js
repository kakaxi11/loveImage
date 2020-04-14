import Vue from 'vue'
import App from './App'
import request from'static/request.js'

Vue.config.productionTip = false
Vue.prototype.request = request   //挂载封装的数据请求函数

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
