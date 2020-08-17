// vue-router源码实现
// 需求分析
// 1.作为一个插件存在：实现VueRouter类和install方法
// 2.实现两个全局组件：router-view用于显示匹配组件内容，router-link用于跳转
// 3.监控url变化：监听hashchange或popstate事件
// 4.响应最新url（让router-view重新刷新）：创建一个响应式的属性current，当它改变时获取对应组件并显示
import Vue from 'vue'
import VueRouter from './kvue-router'
import Home from '../views/Home.vue'

// Vue-router是一个插件，1.应用插件
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

// 2.创建Vue-router实例
const router = new VueRouter({
  routes
})

export default router
