import Vue from 'vue'
import Notice from '@/components/Notice'

// 实现弹窗组件
// 弹窗这类组件的特点是它们在当前vue实例之外独立存在！！！，通常挂载于body；它们是通过JS动态创建的，不需要在任何组件中声明。


function create(Component, props) { // create方法最终目标是将组件实例进行返回
	// 组件构造函数如何获取？
	// 1.Vue.extend()
	const Ctor = Vue.extend(Component)
	// 获得组件实例
	const comp = new Ctor({propsData:props})
	// 挂载
	comp.$mount()
	// 进行手动挂载
	document.body.appendChild(comp.$el)
	// 摧毁
	comp.remove = function() {
		document.body.removeChild(comp.$el) // 删除dom中挂载的组件
		comp.$destroy() // 摧毁comp组件实例,释放内存
	}
	// 2.render()
	// const vm = new Vue({ // 借助Vue创建一个实例
	// 	// h是createElement,返回VNode
	// 	// 需要$mount挂载之后才会变成真是dom,会将Component作为根组件进行渲染
	// 	render: h => h(Component,{props}),
	// }).$mount() // 不去指定宿主元素，则会创建真实dom，但是不会追加操作（不会进行挂载）

	// // 获取真实dom 进行手动挂载，通过$el可以获取创建的真实dom
	// document.body.appendChild(vm.$el)

	// // 如何获取组件的实例
	// const comp = vm.$children[0]

	// // 删除
	// // 挂载之后，需要记得删除，否则一直追加会侵占内存
	// comp.remove = function() {
	// 	document.body.removeChild(vm.$el) // 删除dom中挂载的组件
	// 	vm.$destroy() // 摧毁vm组件实例,释放内存
	// }

	return comp //返回创建的组件


}

// export default create

// 作为插件导出
export default {
	install(Vue){
		// 注册一个Vue原型
		Vue.prototype.$notice = function (options) {
			return create(Notice,options)
		}


		// $alert
	}
}