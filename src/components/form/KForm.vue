<!-- @format -->

<template>
	<div>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'KForm',
		componentName: 'KForm',
		provide() {
			// 提供一个值,往后面子组件传
			return {
				form: this, // ElementUI中form组件直接将form组件实例向下传
			}
		},
		props: {
			model: {
				type: Object,
				required: true,
			},
			rules: {
				type: Object,
			},
		},
		created() {
			this.feilds = []
			this.$on('kkb.form.addField', (item) => {
				this.feilds.push(item)
			})
			// 移除
		},
		methods: {
			validate(cb) {
				//validate 需要一个回调函数 cb显示失败还是成功 因为在index中validate有一个回调函数，返回一个Boolean值
				//  获取所有孩子KFormItem, map遍历每一项
				//  tasks返回一个数组[resultPromise] 数组中为最后校验结果
				// const tasks = this.$children // 存在耦合
				// 	.filter((item) => item.prop) // 过滤掉没有prop属性的Item，在index中并没有prop，不过滤在KFormItem中会报错
				// 	.map((item) => item.validate())

				// 在这里解除耦合$children
				const tasks = this.feilds.map((item) => item.validate())

				// 批量统一处理所有的Promis结果 validate返回之后是没有参数的,then()之后不会抛出异常，一定会校验通过,如果catch到了就校验失败了
				Promise.all(tasks)
					.then(() => cb(true)) // cb被调用就会返回Boolean给validate在index的login中就能知道全局校验是失败还是成功了
					.catch(() => cb(false))
			},
		},
	}
</script>

<style lang="scss" scoped></style>
