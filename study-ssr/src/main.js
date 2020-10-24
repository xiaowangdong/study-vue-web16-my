import Vue from 'vue'
import App from './App.vue'

import { creatRouter } from './router'

Vue.config.productionTip = false

// new Vue({
//   store,
//   router,
//   render: h => h(App)
// }).$mount('#app')

// 需要一个创建Vue实例的工厂函数
// 返回工厂函数，每次请求创建一个Vue实例
export function createApp (context) {

	// 1.创建路由器的实例
	const router = creatRouter()

	// 2.创建Vue实例
	const app = new Vue({
		router,
		context,  // 上下文 用于给渲染器传递参数
		render: h => h(App)
	})

	return { app, router }
}
// 去看一下服务端入口 entry-server.js
