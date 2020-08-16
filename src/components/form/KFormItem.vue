<!-- @format -->

<template>
	<div>
		<!-- label -->
		<label v-if="label">{{ label }}</label>

		<slot></slot>

		<!-- 校验信息显示 -->
		<p v-if="error" class="_p">{{ error }}</p>
	</div>
</template>

<script>
	// Async-validator 可以在github上查看
	import Schema from 'async-validator'
	import emitter from '@/mixins/emitter'

	export default {
		name: 'KFormItem',
		componentName: 'KFormItem', // dispatch所需要的参数
		mixins: [emitter],
		inject: ['form'], // 注入KFormItem的对象名字叫form
		data() {
			return {
				error: '', //error是空说明校验通过
			}
		},
		props: {
			label: {
				type: String,
				default: '',
			},
			prop: {
				type: String,
			},
		},
		mounted() {
			this.$on('validate', () => {
				this.validate()
			})

			//  派发事件通知KForm，新增一个KFormItem实例
			if (this.prop) {
				this.dispatch('KForm', 'kkb.form.addField', [this])
			}
		},
		methods: {
			validate() {
				// 当前规则是什么
				// console.log(this.form.rules[this.prop]);
				const rules = this.form.rules[this.prop]

				// 当前值
				// console.log(this.form.model[this.prop]);
				const value = this.form.model[this.prop]

				// 校验描述对象
				const desc = { [this.prop]: rules } // 描述对象desc的key是this.prop，值是规则
				// 创建导入Schema的实例
				// 创建Schema实例的时候传入校验规则，后续在调用schema的时候，传入校验源，利用校验规则去校验校验源，结果在回调函数errors中
				const schema = new Schema(desc)
				// 传入校验源  validate返回一个Promise函数
				return schema.validate({ [this.prop]: value }, (errors) => {
					if (errors) {
						this.error = errors[0].message // message为rules里指定的错误提示信息
					} else {
						// 校验通过
						this.error = ''
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	._p {
		margin: 0 auto;
		color: red;
		font-size: 5px;
	}
</style>
