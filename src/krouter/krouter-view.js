export default {
		render(h){
			// 获取path对应的component
			// 从创建路由映射表里解构
			const {routeMap,current} = this.$router
			const component = routeMap[current].component || null;
			return h(component)

			// 未创建路由映射表时
			// let component = null
			// this.$router.$options.routes.forEach(route => {
			// 	if(route.path === this.$router.current) {
			// 		component = route.component
			// 	}
			// })
			// return h(component)
		}
}