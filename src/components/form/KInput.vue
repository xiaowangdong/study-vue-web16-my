<!-- @format -->

<template>
	<div>
		<!-- 自定义双向绑定 1.value属性绑定 @input -->
		<!-- v-bind="$attrs" 作用是展开$attrs每一项都附加上去（placeholder） -->
		<input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
	</div>
</template>

<script>
	import emitter from '@/mixins/emitter'
	export default {
		inheritAttrs: false, // 设置为false避免设置到根元素上，取消继承,可以避免展开$attrs每一项都会附加属性
		mixins: [emitter],
		props: {
			value: {
				type: String,
				default: '',
			},
			type: {
				type: String,
				default: 'text',
			},
		},
		methods: {
			onInput(e) {
				// 派发一个input事件即可
				this.$emit('input', e.target.value)

				// 通知父级执行校验
				// this.$parent.$emit('validate') // 存在耦合
				this.dispatch('KFormItem', 'validate')
			},
		},
	}
</script>

<style lang="scss" scoped></style>
