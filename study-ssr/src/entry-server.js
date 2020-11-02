// 调用刚才在main里面的工厂函数创建实例

import { createApp } from './main'

// 该函数会被express路由处理函数调用,用于创建vue实例
export default context => {
	// 返回promise，为了确保异步的操作都结束
	return new Promise((resolve, reject) => {
		const { app, router, store } = createApp(context) // createApp 能得到一个router实例

		// 显示首屏处理（让其跳转首屏）
		router.push(context.url)// 路由器有三种模式：hash/history/abstract

		// 检测路由就绪事件
		// router.onReady(() => {// 如果路由已经准备好了，就让它就绪，否则就报错
		// 	resolve(app) // 调用Promise实例的resolve回调函数
		// }, reject)

		// 存在异步数据获取的时候需要等待数据获取完成再resolve(app)
		router.onReady(() => {
			// 获取匹配的路由组件数组
			const matchedComponents = router.getMatchedComponents();
			// 若无匹配则抛出异常
			if (!matchedComponents.length) {
				return reject({ code: 404 });
			}
			// 对所有匹配的路由组件调用可能存在`asyncData()`
			Promise.all(
				matchedComponents.map(Component => {
					if (Component.asyncData) {
						return Component.asyncData({
							store,
							route: router.currentRoute,
						});
					}
				}),
			)
				.then(() => {
					// 所有预取钩子resolve后，
					// store 已经填充入渲染应用所需状态
					// 将状态附加到上下文，且 `template` 选项用于 renderer 时，
					// 状态将自动序列化为 `window.__INITIAL_STATE__` , 并注入 HTML
					context.state = store.state;

					resolve(app);// 返回创建的vue实例,真正的使用者为renderer.rendertoString()
				})
				.catch(reject);

		}, reject)
	})
}
