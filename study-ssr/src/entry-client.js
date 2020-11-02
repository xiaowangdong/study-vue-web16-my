// 客户端也需要创建vue实例 , 在浏览器端运行

const { createApp } = require("./main");

const { app, router, store } = createApp()

// 当使用 template时，context.state将作为 window.__INITIAL_STATE__ 状态自动嵌入到最终HTML

if (window.__INITIAL_STATE__) {
	// 还原store状态
	store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
	// 挂载激活
	app.$mount('#app') // 可以多加一个参数true
})


