<!-- @format -->

<template>
	<div>
		<!-- <ElementTest></ElementTest> -->

		<!-- KForm -->
		<KForm :model="userInfo" :rules="rules" ref="loginForm">
			<!-- 用户名 -->
			<KFormItem label="用户名" prop="username">
				<KInput v-model="userInfo.username" placeholder="请输入用户名"></KInput>
			</KFormItem>
			<!-- 密码部分 -->
			<KFormItem label="密码" prop="password">
				<KInput
					v-model="userInfo.password"
					type="password"
					placeholder="请输入密码"
				></KInput>
			</KFormItem>
			<!-- 提交按钮 -->
			<KFormItem>
				<button @click="login">登录</button>
			</KFormItem>
		</KForm>
	</div>
</template>

<script>
	// import ElementTest from "@/components/form/ElementTest.vue";
	import KInput from '@/components/form/KInput.vue'
	import KFormItem from '@/components/form/KFormItem.vue'
	import KForm from '@/components/form/KForm.vue'
	// import Notice from '@/components/Notice.vue' //未封装成插件

	export default {
		data() {
			return {
				userInfo: {
					username: '',
					password: '',
				},
				rules: {
					username: [{ required: true, message: '请输入用户名称' }],
					password: [{ required: true, message: '请输入密码' }],
				},
			}
		},
		methods: {
			login() {
				this.$refs['loginForm'].validate((valid) => {
					//KForm组件中需要一个validate方法 valid为形参

					// 自定义弹窗组件，create方法已经在main.js中进行了注册，可以通过this指向的Vue实例中的create进行调用
					// 已封装
					const notice = this.$notice({
						title: '龙慧楷',
						message: valid ? '叫我小慧' : '小龙儿',
						duration: 3000,
					})
					notice.show()

					// 未封装成插件
					// const notice = this.$create(Notice,{
					// 	title: '龙慧楷',
					// 	message: valid ? '叫我小慧' : '小龙儿',
					// 	duration: 3000,
					// })
					// notice.show()

					// 使用自带弹窗
					// if (valid) {
					// 	 alert('submit');
					// } else {
					// 	console.log('error submit!')
					// 	return false
					// }
				})
			},
		},
		components: {
			KInput,
			KFormItem,
			KForm,
		},
	}
</script>

<style scoped></style>
