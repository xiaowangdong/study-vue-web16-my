export default {
	props: {
		to: {
			type: String,
			required : true
		},
	},
	render(h){ // 在runtime-only bulid环境下不能使用template
		// 实现的效果：<a href="#/about"></a>
		// 应用情况：<router-link to="/about">xxx</router-link>
		// h(tag,data,children)
		// console.log(this.$slots); // 为xxx,即router-link的子节点
		return h('a',{attrs:{href:'#' + this.to}}, this.$slots.default)
		// return <a href={'#' + this.to}>{this.$slots.default}</a> // JSX写法
	}
}