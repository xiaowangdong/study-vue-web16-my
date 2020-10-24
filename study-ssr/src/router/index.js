import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

// const routes = [
// 	{
// 		path: '/',
// 		name: 'Home',
// 		component: Home
// 	},
// 	{
// 		path: '/about',
// 		name: 'About',
// 		// route level code-splitting
// 		// this generates a separate chunk (about.[hash].js) for this route
// 		// which is lazy-loaded when the route is visited.
// 		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
// 	}
// ]

// 导出的是一个单例
// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router

// 修改1.路由这里是工厂函数 why? 使用的是服务端渲染，用户每次的请求都是全新的用户，会有多个客户端，所有每次都要导出一个新的VueRouter实例，面向的是多个客户端
export function creatRouter () {
	return new VueRouter({
		routes: [
			{ path: "/", component: Home },
			{ path: "/about", component: About }
		]
	});
}