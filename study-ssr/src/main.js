import Vue from 'vue'
import App from './App.vue'

import { creatRouter } from './router'
import { createStore } from './store'


// 确保客户端每个组件如果有asyncData,要执行
Vue.mixin({
	beforeMount () {
		const { asyncData } = this.$options;
		if (asyncData) { // 只要检测到asyncData就执行
			// 将获取数据操作分配给 promise
			// 以便在组件中，我们可以在数据准备就绪后
			// 通过运行 `this.dataPromise.then(...)` 来执行其他任务
			this.dataPromise = asyncData({
				store: this.$store,
				route: this.$route
			});
		}
	},
});

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
	// 创建vuex的实例
	const store = createStore()

	// 2.创建Vue实例
	const app = new Vue({
		router,
		store,
		context,  // 上下文 用于给渲染器传递参数
		render: h => h(App)
	})

	return { app, router, store }
}
// 去看一下服务端入口 entry-server.js
