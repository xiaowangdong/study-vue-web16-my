import krouterView from "./krouter-view";
import krouterLink from "./krouter-link";


// 1.实现一个插件 (将router实例挂载到prototype上,挂载$router)
let Vue ;

class KVueRouter {
	constructor(options) { // 接收传进来的构造配置参数
		this.$options = options

		// 需要创建响应式的current属性
		// 利用Vuet提供的defineReactive做响应化
		// 这样将来current变化的时候，依赖的组件会重新渲染
		Vue.util.defineReactive(this,'current','/')//Vue.util.defineReactive(object,attrs(attributes),default)可以给指定对象设置指定属性默认值为/

		// new一个vue的实例，使用vue中data方法可以实现数据响应式 使用时this.current 改为 this.app.current
		// this.app = new Vue({
		// 	data() {
		// 		return {
		// 			current : '/'
		// 		}
		// 	}
		// })

		// 创建一个current属性用来存储当前路径
		// this.current = '/'

		// 监控url变化
		window.addEventListener('hashchange',this.onHashChange.bind(this))// 使用了全局对象window，需要绑定下this,防止之后的this变成window
		// 刷新时响应
		window.addEventListener('hashchange',this.onHashChange.bind(this))


		// 创建一个路由映射表
		this.routeMap = {}
		options.routes.forEach(route => {
			this.routeMap[route.path] = route
		})
	}

	onHashChange() {
		console.log(window.location.hash);
		this.current = window.location.hash.slice(1)
	}
}

KVueRouter.install = function(_Vue) {
	Vue = _Vue; // 保存构造函数，在KVueRouter里面使用

	// 挂载$router
	// 如何获取根实例里面的router选项
	Vue.mixin({
		beforeCreate() { // 只要使用混入生命周期的钩子或者方法就能拿到所有组件的实例
			// console.log(this);
			// 确保根实例的时候才执行
			if(this.$options.router){ // 组件实例中的$options有自己所有的选项,只有根实例（main.js）才有router
				Vue.prototype.$router = this.$options.router // 实现了将router挂载到prototype上，通过this访问当前实例就可以调用
			}
		}
	})

	// 任务2：实现两个全局组件router-link和router-view
	Vue.component('router-link',krouterLink) // 创建全局组件Vue.component()
	Vue.component('router-view',krouterView)
}

export default KVueRouter