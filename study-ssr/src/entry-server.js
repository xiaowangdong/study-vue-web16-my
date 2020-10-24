// 调用刚才在main里面的工厂函数创建实例

import { createApp } from './main'

// 该函数会被express路由处理函数调用,用于创建vue实例
export default context => {
	// 返回promise，为了确保异步的操作都结束
	return new Promise((resolve, reject) => {
		const { app, router } = createApp(context) // createApp 能得到一个router实例

		// 显示首屏处理（让其跳转首屏）
		router.push(context.url)

		// 检测路由就绪事件
		router.onReady(() => {// 如果路由已经准备好了，就让它就绪，否则就报错
			resolve(app) // 调用Promise实例的resolve回调函数
		}, reject)

	})
}
