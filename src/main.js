import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import create from './utils/create'
import router from './router'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()
// Vue.prototype.$create = create //注册create方法

Vue.use(create)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
